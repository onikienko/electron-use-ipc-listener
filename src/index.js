import {ipcRenderer} from 'electron';
import {useEffect, useRef} from 'react';


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
