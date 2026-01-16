import { filterEvents } from "./filters.js";
import { eventBuffer } from "./buffer.js";

export function getFilteredEvents() {
    const params = new URLSearchParams(window.location.search);

    const filterParams = {
        platform: params.get("platform") || null,
        type: params.get("type") || null,
        tag: params.get("tag") || null,
        excludeTag: params.get("excludeTag") || null
    };

    return filterEvents(filterParams);
}

export function getRenderMode() {
    const params = new URLSearchParams(window.location.search);

    if (params.has("index")) return "index";
    if (params.has("list")) return "list";
    return "live";
}

export function getListCount() {
    const params = new URLSearchParams(window.location.search);
    return parseInt(params.get("list") || "0", 10);
}

export function getIndex() {
    const params = new URLSearchParams(window.location.search);
    return parseInt(params.get("index") || "0", 10);
}
