#  Welcome to TodoistInboxCleaner

It is Miro plugin which loads task list onto board and enable to arrange it by categories

ideas, projects, tasks, meetings.

## How to develop and test

use templates from https://github.com/miroapp/app-examples

follow this good guide: https://developers.miro.com/docs/how-to-start

For development purposes, you can serve your index.html from a local web server using [http-server](https://github.com/http-party/http-server), and can use ngrok to expose your local web server over https. Alternatively, you can use services like Glitch or GitHub Pages for hosting this static content.

from dir where `public` dir contains `index.html` file: 

```batch
npm install --global http-server
http-server
```

In another console:

```batch
ngrok http 8080
```

And it works)

## How to super-increase productivity with ClojureScript!

 - buy domain (for ssl certificate)
 - create AWS EC2 instance
 - open ports 80, 443, 9630 in AWS Security Groups
 - install nodejs and java and nginx, etc
 - copy build to remote machine
 - create ssl certificate with letsEncrypt and convert it to java format
 - run `shadow-cljs watch :app` which will serve shadow and dev servers with https
 - configure nginx to use https always and map port 80 to 8080
 - add new site as application plufin for miro
 - open any code editor supporting clojure nrepl
 - bind remote ports to local with ssh tunneling `ssh -i ./.ssh/pavel-aws-frankfurt.pem -L 3333:localhost:3333 -L9630:localhost:9630 ec2-user@cleaninbox.online`
 - open connection from editor to remote repl server `localhost:3333`
 - enjoy coding!
 

 ## Resources

 nginx on aws: https://jaygould.co.uk/2019-07-20-running-react-node-app-with-aws-ec2-nginx-and-postgres-part2/

 ssl on aws: https://www.jaygould.co.uk/2020-02-29-ssl-aws-ec2-instance-nginx/ - but it isn't required for repl-dev mode as ssl used in dev-http and shadow-cljs servers from shadow-cljs itself if ssl is enabled there.

 https://shadow-cljs.github.io/docs/UsersGuide.html#_ssl - using ssl in dev servers

 https://github.com/belovehq/aws-repl-and-beakerx - ssh-tunneling


 it probably can be achieved without buing domain
 https://expeditedsecurity.com/blog/localhost-ssl-fix/
 https://maxrohde.com/2013/09/07/setting-up-ssl-with-netty/
