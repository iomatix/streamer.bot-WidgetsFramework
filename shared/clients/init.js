import { createTikfinityClient } from "./tikfinity-client.js";
import { createStreamlootsClient } from "./streamloots-client.js";

export function initCustomClients(onEvent) {
    if (window.ENABLE_TIKTOK) {
        createTikfinityClient(async (event, data) => {
            await onEvent(event, data);
        });
    }

    if (window.ENABLE_STREAMLOOTS) {
        createStreamlootsClient(async (event, data) => {
            await onEvent(event, data);
        });
    }
}
