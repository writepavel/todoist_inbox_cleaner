;; port of miro sample plugin to clojure script https://github.com/miroapp/app-examples/blob/master/buttons/signedin.html

(ns inboxcleaner.core
  (:require
   [kitchen-async.promise :as p]
   [cljs.core.async.interop :refer-macros [<p!]]
   [cljs.core.async :refer [mix pub sub mult tap chan put! take! >! <! buffer dropping-buffer sliding-buffer timeout close! alts!]])
(:require-macros
 [cljs.core.async.macros :refer [go go-loop alt!]]
 [kitchen-async.promise :as p]))

(defonce icon
         "<circle cx= \"12\" cy= \"12\" r= \"9\" fill= \"none\" fill-rule= \"evenodd\" stroke= \"currentColor\" stroke-width= \"2\" ></circle>")

(def appstate (atom {:frameInbox nil
                     :frameIdeas nil 
                     :frameTasks nil 
                     :frameReference nil 
                     :frameInProjectPlan nil 
                     :frameToDecompose nil 
                     :frameDone nil}))

(defn ->cljs
  [js-object]
(js->clj js-object :keywordize-keys true))

;; TODO. Consider creating macro js-await 
;; automatically converting result of promise to cljs.
;; But I don't want to create a go block each time..
;; Probably will use transducer to use results without need of go block  usage.

(defn clear-board
  []
  (go (let [all-widgets (->cljs (<p! (.. js/miro -board -widgets get)))
            widgetIds   (mapv #(get % :id) all-widgets)]
        (println widgetIds))))

(comment
  
  (take! (go 
           (let [all-widgets (->cljs (<p! (.. js/miro -board -widgets get)))
                 ws (mapv #(get % :id) all-widgets)]
              ws))
         #(println %)
        ;;  #(js/console.log (js-obj %))
         ))


(defn create-frames
  []
)

(defn reload-todoist-inbox
  []
(go 
  ;; (clear-board)
  (create-frames)))

;; TODO create macros for creating widgets. 
;; It hides js api and converts to js data structures.
;; Think about accuracy with go blocks and using transducers as well.

(defn create-sample-card
  [title project]
(go 
  (<p! (.create (.. js/miro -board -widgets) 
            #js {:type  "card"
                 :title "Hello"
                 :scale 0.7
                 :card  
                 #js {:customFields 
                      [ #js {:value     "project"
                             :mainColor "#ABEBC6"
                             :fontColor "#5B2C6F"
                             }]}}
                )
       
       )))

(defn sayHi
  []
  (js/alert "Hi"))

(defn bottomBar-async
  []
  (p/promise [resolve-fn reject-fn]
              (go (let [current-user (.-currentUser js/miro)
                        signed-in (<p! (.isSignedIn ^js/miro.currentUser current-user))]
                    (when signed-in
                      (resolve-fn
                       #js{:title   "signed in example"
                           :svgIcon icon
                           :onClick sayHi}))))))

(defn add-button
  []
(.onReady js/miro #(.initialize js/miro
                                #js{:extensionPoints
                                    #js{:bottomBar bottomBar-async}}))
  )


; if editor does not switch to cljs repl from clj, run this command:
;(shadow/repl :app)

(comment 
  "It is better to use core.async inside real cljs code instead of promises.
   as suggested in https://clojurescript.org/guides/promise-interop
  
   using https://cljdoc.org/d/andare/andare/1.1.587/api/cljs.core.async.interop
    suitable channel: https://clojuredocs.org/clojure.core.async/promise-chan 
   
   But be careful with core async it can be too powerful) https://www.youtube.com/watch?v=096pIlA3GDo
   discussion prior that cool interop
   https://clojureverse.org/t/async-generator-functions-in-cljs-requesting-feedback/2262/16
   
   In this post
   https://clojureverse.org/t/any-syntax-to-match-async-await-in-creating-web-servers/825/16
   It is described why core async is powerful. Promises cannot do this:
;; "
  (alt!
    some-chan
    ([x]
     (when (some? x)
       (process-some-result x)))

    other-chan
    ([x]
     (when (some? x)
       (process-other-result x)))

    (async/timeout 1000)
    ([_]
     (do-something-else))
    )
  )