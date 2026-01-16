import { sbClient } from "../../shared/clients/sb-client.js";
import { initCustomClients } from "../../shared/clients/init.js";
import { routeEvent } from "../../shared/events/router.js";

function handleIncoming(eventName, data) {
    const alert = routeEvent(eventName, data);
    if (alert) renderAlert(alert);
}

// SB events — wildcard
sbClient.on("*", ({ event, data }) => {
    const eventName = `${event.source}.${event.type}`;
    handleIncoming(eventName, data);
});

// Custom events (TikTok, Streamloots)
initCustomClients((eventName, data) => handleIncoming(eventName, data));