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
                        onClick: createFrame,
                    }
                }
            },
        },
    })
})

const frameInbox;
const frameIdeas;
const frameTasks;
const frameReference;
const frameInProjectPlan;
const frameToDecompose;

async function createFrames() {
    // alert('Hi! Get new sticker 6!');

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

    frameInbox = await miro.board.widgets.create({
        type: 'frame',
        x: 750,
        y: 550,
        width: 1800,
        height: 350,
        style: {
            backgroundColor: "#FFA07A"
        }

    });

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