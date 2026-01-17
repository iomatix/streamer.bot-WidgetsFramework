import { ThemeManager } from "../../shared/theme.js";
import { sbClient } from "../../shared/clients/sb-client.js";
import { initCustomClients } from "../../shared/clients/init.js";
import { routeEvent } from "../../shared/events/router.js";
import { Renderer } from "./renderer.js";
import { getRenderMode, getFilteredEvents, getListCount, getIndex } from "../../shared/uem/render-modes.js";
import { eventBuffer, pushToBuffer } from "../../shared/uem/buffer.js";
import { eventsMap } from "../../shared/events-map.js";
import { UEM } from "../../shared/uem/index.js";
import { filterEvents } from "../../shared/uem/filters.js";

// Receive events from test harness
window.addEventListener("message", async (ev) => {
    if (ev.data.widget !== "alerts") return;

    // Handle test events
    if (ev.data.eventName) {
        await handleIncoming(ev.data.eventName, ev.data.data);
        return;
    }

    // Handle live CSS
    if (ev.data.css) {
        applyLiveCSS(ev.data.css);
        return;
    }
});

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
    }
    else if (mode === "list") {
        if (isAlert) {
            const events = getFilteredEvents().slice(0, getListCount());
            Renderer.renderList(events);
        }
    }
    else if (mode === "index") {
        if (isAlert) {
            const events = getFilteredEvents();
            const index = getIndex();
            Renderer.renderIndex(events[index]);
        }
    }

    sendDebug(
        alert,
        getFilteredEvents(),
        eventBuffer,
        {
            mode,
            listCount: getListCount(),
            index: getIndex(),
            dom: [...document.querySelectorAll(".alert-item")].map(el => ({
                id: el.dataset.id,
                classes: [...el.classList]
            }))
        }
    );
    return;
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

// Debug
function sendDebug(normalized, filtered, buffer, renderInfo) {
    window.parent.postMessage({
        widget: "alerts-debug",
        uem: {
            normalizedEvent: normalized,
            filteredEvents: filtered,
            eventBuffer: buffer
        },
        renderer: renderInfo
    }, "*");
}