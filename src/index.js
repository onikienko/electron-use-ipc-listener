import {ipcRenderer} from 'electron';
import {useEffect, useRef} from 'react';


/**
 * Custom React Hook that listen to channel. When a new message arrives `listener` would be called with `listener(event, args...)`
 * @param {string} channel - The name of the channel
 * @param {Function} listener - The handler function
 */
const useIpcListener = (channel, listener) => {
    const savedHandler = useRef();
    useEffect(() => {
        savedHandler.current = listener;
    }, [listener]);
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
