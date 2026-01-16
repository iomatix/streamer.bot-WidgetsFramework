import { eventsMap } from "../events-map.js";
import { UEM } from "../uem/index.js";

export async function routeEvent(eventName, data) {
    const adapter = eventsMap[eventName];
    if (!adapter) return null;

    const normalized = await adapter(data);
    const processed = UEM.process(normalized);

    return processed;
}
