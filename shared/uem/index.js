import { eventBuffer, pushToBuffer } from "./buffer.js";
import { passesFilters } from "./filters.js";

const listeners = new Map();

export const UEM = {
    emit(event) {
        if (!event) return;

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
            platform: params.get("platform") || undefined,
            type: params.get("type") || undefined,
            tag: params.get("tag") || undefined,
            tagAll: params.get("tagAll") || undefined,
            excludeTag: params.get("excludeTag") || undefined
        };

        if (!passesFilters(normalizedEvent, filterParams)) return null;

        // 3. return normalized event for rendering
        return normalizedEvent;
    }
};