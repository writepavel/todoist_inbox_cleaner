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
