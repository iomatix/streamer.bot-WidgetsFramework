export const eventBuffer = [];
const LIMIT = 16;

export function pushToBuffer(event) {
    if (!event.__id) {
        event.__id = crypto.randomUUID();
    }

    eventBuffer.unshift(event);
    if (eventBuffer.length > LIMIT) eventBuffer.pop();
}