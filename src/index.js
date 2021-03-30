import {ipcRenderer} from 'electron';
import {useEffect, useRef} from 'react';


/**
 * Custom React Hook that listen to channel, when a new message arrives listener would be called with handler(event, args...).
 * @param {string} channel - The name of the channel being listened for
 * @param {function} handler - The handler function
 */
const useIpcListener = (channel, handler) => {
    const savedHandler = useRef();
    useEffect(() => {
        savedHandler.current = handler;
    }, [handler]);
    useEffect(() => {
            if (!ipcRenderer) throw new Error('electron-use-ipc-listener: Use useIpcListener in the Renderer process only');
            const eventHandler = (event, ...rest) => savedHandler.current(event, ...rest);
            ipcRenderer.on(channel, eventHandler);
            return () => {
                ipcRenderer.removeListener(channel, eventHandler);
            };
        },
        [channel],
    );
};

export default useIpcListener;
