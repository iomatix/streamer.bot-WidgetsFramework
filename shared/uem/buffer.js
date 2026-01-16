export const eventBuffer = [];
const LIMIT = 16;

export function pushToBuffer(event) {
    eventBuffer.unshift(event);
    if (eventBuffer.length > LIMIT) eventBuffer.pop();
}