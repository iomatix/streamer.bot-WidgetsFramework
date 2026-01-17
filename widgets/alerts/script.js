import { ThemeManager } from "../../shared/theme.js";
import { sbClient } from "../../shared/clients/sb-client.js";
import { initCustomClients } from "../../shared/clients/init.js";
import { routeEvent } from "../../shared/events/router.js";
import { Renderer } from "./renderer.js";
import { getRenderMode, getFilteredEvents, getListCount, getIndex } from "../../shared/uem/render-modes.js";
import { eventBuffer, pushToBuffer } from "../../shared/uem/buffer.js";
import { UEM } from "../../shared/uem/index.js";
import { filterEvents } from "../../shared/uem/filters.js";


ThemeManager.init();
async function handleIncoming(eventName, data) {
    const alert = await routeEvent(eventName, data);
    const mode = getRenderMode();
    console.log("UEM:", alert);
    // If this event does NOT produce an alert, ignore it for list/index modes.
    // This prevents flicker from Input.*, Raw.*, Action.*, etc.
    const isAlert = !!alert;

    if (mode === "live") {
        if (isAlert) Renderer.showAlert(alert);
        return;
    }

    if (mode === "list") {
        if (isAlert) {
            const events = getFilteredEvents().slice(0, getListCount());
            Renderer.renderList(events);
        }
        return;
    }

    if (mode === "index") {
        if (isAlert) {
            const events = getFilteredEvents();
            const index = getIndex();
            Renderer.renderIndex(events[index]);
        }
        return;
    }
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
