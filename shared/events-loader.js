import { EVENT_ADAPTERS } from "./events-map.js";
import { UEM } from "./uem/index.js";

export function attachAllEventListeners(sbClient) {
    for (const [eventName, adapter] of Object.entries(EVENT_ADAPTERS)) {
        sbClient.on(eventName, async response => {
            console.debug(`[${eventName}]`, response.data);

            const uem = await adapter(response.data);
            if (uem) UEM.emit(uem);
        });
    }
}