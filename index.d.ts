export default useIpcListener;
/**
 * Custom React Hook that listen to channel. When a new message arrives `listener` would be called with `listener(event, args...)`
 * @param {string} channel - The name of the channel
 * @param {Function} listener - The handler function
 */
declare function useIpcListener(channel: string, listener: Function): void;
