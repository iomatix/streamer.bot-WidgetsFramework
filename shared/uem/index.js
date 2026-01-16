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

    process(normalizedEvent) {
        if (!normalizedEvent) return null;

        // 1. push normalized event to buffer
        pushToBuffer(normalizedEvent);

        // 2. URL filters
        const params = new URLSearchParams(window.location.search);
        const filterParams = {
            platform: params.get("platform"),
            type: params.get("type"),
            tag: params.get("tag"),
            excludeTag: params.get("excludeTag")
        };

        if (!passesFilters(normalizedEvent, filterParams)) return null;

        // 3. return normalized event for rendering
        return normalizedEvent;
    }

};