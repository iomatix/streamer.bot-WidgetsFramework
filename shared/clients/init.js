import { createTikfinityClient } from "./tikfinity-client.js";
import { createStreamlootsClient } from "./streamloots-client.js";

export function initCustomClients(onEvent) {
    if (window.ENABLE_TIKTOK) {
        createTikfinityClient((event, data) => onEvent(event, data));
    }

    if (window.ENABLE_STREAMLOOTS) {
        createStreamlootsClient((event, data) => onEvent(event, data));
    }
}