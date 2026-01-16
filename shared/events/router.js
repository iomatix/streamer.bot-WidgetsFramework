import { eventsMap } from "./events-map.js";

export function routeEvent(eventName, data) {
    const adapter = eventsMap[eventName];
    if (!adapter) return null;
    return adapter(data);
}