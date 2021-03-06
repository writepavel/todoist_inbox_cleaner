const icon =
    '<circle cx="12" cy="12" r="9" fill="none" fill-rule="evenodd" stroke="currentColor" stroke-width="2"></circle>'

miro.onReady(() => {
    miro.initialize({
        extensionPoints: {
            bottomBar: async () => {
                const currentUser = await miro.currentUser
                const signedIn = currentUser.isSignedIn()
                if (signedIn) {
                    return {
                        title: 'signed in example',
                        svgIcon: icon,
                        onClick: reloadTodoistInbox,
                    }
                }
            },
        },
    })
})

var frameInbox
var frameIdeas
var frameTasks
var frameReference
var frameInProjectPlan
var frameToDecompose
var frameDone

async function reloadTodoistInbox() {
    await clearBoard();
    await createFrames();
}

async function createFrames() {
    // alert('Hi! Get new sticker 6!');

    if (typeof frameIdeas == "undefined") {
        frameIdeas = await miro.board.widgets.create({
            type: 'frame',
            x: 0,
            y: 0,
            width: 350,
            height: 700,
            title: "Ideas",
            style: {
                backgroundColor: "#FFC0CB"
            }
        });
    } 

    if (typeof frameTasks == "undefined") {
        frameTasks = await miro.board.widgets.create({
            type: 'frame',
            x: 375,
            y: 0,
            width: 350,
            height: 700,
            title: "Tasks",
            style: {
                backgroundColor: "#ABEBC6"
            }
        });
    }

    if (typeof frameInProjectPlan == "undefined") {
        frameInProjectPlan = await miro.board.widgets.create({
            type: 'frame',
            x: 750,
            y: 0,
            width: 350,
            height: 700,
            title: "In Project Plan",
            style: {
                backgroundColor: "#FFE4C4"
            }
        });
    }

    if (typeof frameReference == "undefined") {
        frameReference = await miro.board.widgets.create({
        type: 'frame',
        x: 1125,
        y: 0,
        width: 350,
        height: 700,
        title: "Reference",
        style: {
            backgroundColor: "#90EE90"
        }
    });
}

if (typeof frameToDecompose == "undefined") {
    frameToDecompose = await miro.board.widgets.create({
        type: 'frame',
        x: 1500,
        y: 0,
        width: 350,
        height: 700,
        title: "To Decompose",
        style: {
            backgroundColor: "#B0C4DE"
        }
    });
}

if (typeof frameDone == "undefined") {
    frameDone = await miro.board.widgets.create({
        type: 'frame',
        x: 1875,
        y: 0,
        width: 350,
        height: 700,
        title: "Done",
        style: {
            backgroundColor: "##E0FFFF"
        }
    });
}

if (typeof frameInbox == "undefined") {
    frameInbox = await miro.board.widgets.create({
        type: 'frame',
        x: 935,
        y: 550,
        width: 2230,
        height: 350,
        style: {
            backgroundColor: "#FFA07A"
        }

    });
}

    let allFrames = await miro.board.widgets.get({
        type: 'frame'
    })
    console.log(allFrames)
}

async function createCard() {
    alert('Hi! Get new sticker 6!');
    await miro.board.widgets.create({
        type: 'card',
        title: 'Hello',
        scale: 0.7,
        card: {
            customFields: [{
                value: 'sdlkjfldsfjlsdkfjlsdkjfldskjfldskfjlkdsj',
                mainColor: '#ABEBC6',
                fontColor: '#5B2C6F'
            }]
        }
    });
    let allCards = await miro.board.widgets.get({
        type: 'card'
    })
    console.log(allCards)
}

async function clearBoard() {
    // alert('Hi! Get new sticker 6!');
    let allWidgets = await miro.board.widgets.get();
    let widgetIds = allWidgets.map(function(widget) {
        return widget.id;
      })
    miro.board.widgets.deleteById(widgetIds);

    frameInbox = undefined;
    frameIdeas = undefined;
    frameTasks = undefined;
    frameReference = undefined;
    frameInProjectPlan = undefined;
    frameToDecompose = undefined;
    frameDone = undefined;
}