import { pushToBuffer } from "./buffer.js";
import { passesFilters } from "./filters.js";

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
    },

    process(event) {
        if (!event) return null;

        // 1. buffer
        pushToBuffer(event);

        // 2. URL params → filters
        const params = new URLSearchParams(window.location.search);
        const filterParams = {
            platform: params.get("platform"),
            type: params.get("type"),
            tag: params.get("tag"),
            excludeTag: params.get("excludeTag")
        };

        if (!passesFilters(event, filterParams)) return null;

        // 3. return event for rendering
        return event;
    }
};