# electron-use-ipc-listener

### Russian invaders must die. Glory to Ukraine.

React Hook for Electron that simplifies IPC routine.

For usage in Renderer process.

## Usage

Send a message from Main process as usual.

```javascript
// main/index.js

const {app, BrowserWindow} = require('electron');
let win = null

app.whenReady().then(() => {
    win = new BrowserWindow({width: 800, height: 600});
    win.loadURL(`file://${__dirname}/index.html`);
    win.webContents.send('messageFromMain', 'whoo', 'hoo');
});
```

Use `useIpcListener` custom hook to handle message.

```javascript
// renderer/components/MyComponent.js
import React from 'react';
import useIpcListener from 'useIpcListener';


const MyComponent = () => {
    useIpcListener('messageFromMain', ((event, ...args) => {
        console.log('Received message from Main Process', ...args)
    }));
};
```

Inspired by [@use-it/event-listener](https://github.com/donavon/use-event-listener)
