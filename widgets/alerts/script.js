import { ThemeManager } from "../../shared/theme.js";
import { sbClient } from "../../shared/clients/sb-client.js";
import { initCustomClients } from "../../shared/clients/init.js";
import { routeEvent } from "../../shared/events/router.js";
import { Renderer } from "./renderer.js";

ThemeManager.init();

async function handleIncoming(eventName, data) {
    const alert = await routeEvent(eventName, data);
    console.log("UEM:", alert);
    if (alert) Renderer.showAlert(alert);
}



// SB events — wildcard
sbClient.on("*", async ({ event, data }) => {
    const eventName = `${event.source}.${event.type}`;
    await handleIncoming(eventName, data);
});


// Custom events (TikTok, Streamloots)
initCustomClients(async (eventName, data) => {
    await handleIncoming(eventName, data);
});
