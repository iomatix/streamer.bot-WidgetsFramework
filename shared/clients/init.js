import { createTikfinityClient } from "./tikfinity-client.js";
import { createStreamlootsClient } from "./streamloots-client.js";

export function initCustomClients(onEvent) {
    createTikfinityClient((event, data) => onEvent(event, data));
    createStreamlootsClient((event, data) => onEvent(event, data));
}