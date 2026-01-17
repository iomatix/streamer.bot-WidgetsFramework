import { eventsMap } from "../events-map.js";
import { UEM } from "../uem/index.js";

export async function routeEvent(eventName, data) {
    // Find adapter by case-insensitive key match
    const key = Object.keys(eventsMap).find(
        k => k.toLowerCase() === eventName.toLowerCase()
    );
    const adapter = key ? eventsMap[key] : null;

    if (!adapter) return null;

    const normalized = await adapter(data);
    const processed = UEM.process(normalized);

    return processed;
}
