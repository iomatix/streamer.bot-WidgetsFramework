import { pushToBuffer } from "./buffer.js";
import { filterEvents } from "./filters.js";

const listeners = new Map();

export const UEM = {
    emit(event) {
        if (!event) return;

        pushToBuffer(event);

        const handlers = listeners.get(event.type) || [];
        handlers.forEach(h => h(event));

        const all = listeners.get("*") || [];
        all.forEach(h => h(event));
    },

    on(type, handler) {
        if (!listeners.has(type)) listeners.set(type, []);
        listeners.get(type).push(handler);
    }
};