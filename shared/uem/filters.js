import { eventBuffer } from "./buffer.js";

export function filterEvents(params) {
    return eventBuffer.filter(ev => {
        if (params.platform && ev.platform !== params.platform) return false;
        if (params.type && ev.type !== params.type) return false;
        if (params.tag && (!ev.tags || !ev.tags.includes(params.tag))) return false;
        if (params.excludeTag && ev.tags?.includes(params.excludeTag)) return false;
        return true;
    });
}

export function passesFilters(event, params) {
    if (params.platform && event.platform !== params.platform) return false;
    if (params.type && event.type !== params.type) return false;
    if (params.tag && (!event.tags || !event.tags.includes(params.tag))) return false;
    if (params.excludeTag && event.tags?.includes(params.excludeTag)) return false;
    return true;
}