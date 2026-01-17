export const eventBuffer = [];
const LIMIT = 16;

export function pushToBuffer(event) {
    if (!event.__id) {
        if (window.crypto?.randomUUID) {
            event.__id = window.crypto.randomUUID();
        } else {
            event.__id = `ev_${Date.now()}_${Math.random().toString(16).slice(2)}`;
        }
    }

    eventBuffer.unshift(event);
    if (eventBuffer.length > LIMIT) eventBuffer.pop();
}