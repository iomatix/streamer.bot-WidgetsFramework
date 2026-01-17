console.log("Alerts Test Panel Loaded");

// Access previewFrame in test-harness
function getPreviewFrame() {
    return parent.document.getElementById("previewFrame");
}

/****************************************************
 * EVENT SIMULATOR
 ****************************************************/

document.getElementById("sim-send").onclick = () => {
    const platform = document.getElementById("sim-platform").value;
    const type = document.getElementById("sim-type").value;

    const event = generateTestEvent(platform, type);

    const frame = getPreviewFrame();
    if (!frame || !frame.contentWindow) { console.warn("Preview frame not ready yet"); return; }
    frame.contentWindow.postMessage({
        widget: "alerts",
        eventName: `${platform}.${type}`,
        data: event
    }, "*");


};

function generateTestEvent(platform, type) {
    // It's a RAW event for adapters, not UEM.
    // For unsupported combinations, we return a minimal placeholder.

    // TWITCH
    if (platform === "twitch") {
        if (type === "follow") {
            return {
                user_id: "123456",
                user_login: "TestUser",
                user_name: "TestUser",
                followed_at: new Date().toISOString(),
                is_test: true
            };
        }

        if (type === "sub" || type === "resub") {
            return {
                sub_tier: "1000",
                is_prime: type === "sub" ? false : true,
                duration_months: 1,
                user: {
                    id: "123456",
                    login: "TestUser",
                    name: "TestUser",
                    type: "twitch",
                    badges: [],
                    subscribed: true,
                    monthsSubscribed: 1
                },
                messageId: "test-message-id",
                systemMessage: "TestUser subscribed with Prime.",
                isTest: true,
                isInSharedChat: false,
                isSharedChatHost: false,
                isFromSharedChatGuest: false
            };
        }

        if (type === "raid") {
            return {
                raider: "TestUser",
                viewers: 42,
                is_test: true
            };
        }

        if (type === "cheer") {
            return {
                bits: 100,
                user: {
                    name: "TestUser",
                    login: "TestUser"
                },
                message: "Cheer test",
                is_test: true
            };
        }
    }

    // KO-FI
    if (platform === "kofi") {
        if (type === "donation") {
            return {
                messageId: "test-message-id",
                timestamp: new Date().toISOString(),
                from: "TestUser",
                isPublic: true,
                message: "Ko-fi test donation",
                amount: "3.00",
                currency: "USD"
            };
        }

        if (type === "sub" || type === "resub") {
            return {
                messageId: "test-message-id",
                timestamp: new Date().toISOString(),
                from: "TestUser",
                isPublic: true,
                message: "Ko-fi test subscription",
                amount: "3.00",
                currency: "USD"
            };
        }
    }

    // STREAMELEMENTS
    if (platform === "streamelements") {
        if (type === "donation") {
            return {
                amount: 5,
                currency: "USD",
                username: "TestUser",
                message: "StreamElements tip test"
            };
        }
    }

    // STREAMLABS
    if (platform === "streamlabs") {
        if (type === "donation") {
            return {
                amount: 5,
                currency: "USD",
                name: "TestUser",
                message: "Streamlabs donation test"
            };
        }
    }

    // PATREON
    if (platform === "patreon") {
        if (type === "sub") {
            return {
                full_name: "TestUser",
                amount_cents: 500,
                currency: "USD",
                pledge_relationship_start: new Date().toISOString()
            };
        }
    }

    // FOURTHWALL
    if (platform === "fourthwall") {
        if (type === "donation") {
            return {
                amount: 5,
                currency: "USD",
                supporterName: "TestUser",
                message: "Fourthwall donation test"
            };
        }
    }

    // Fallback dla nieobsługiwanych kombinacji
    return {
        is_test: true,
        platform,
        type
    };
}


/****************************************************
 * CUSTOM JSON EVENT
 ****************************************************/

document.getElementById("send-json").onclick = () => {
    const text = document.getElementById("json-input").value;
    try {
        const event = JSON.parse(text);
        const platform = event.platform || event.source;
        const type = event.type || event.eventType;
        const frame = getPreviewFrame();
        if (!frame || !frame.contentWindow) { console.warn("Preview frame not ready yet"); return; }
        frame.contentWindow.postMessage({
            widget: "alerts",
            eventName: `${platform}.${type}`,
            data: event
        }, "*");

    } catch (err) {
        alert("Invalid JSON");
    }
};

/****************************************************
 * THEME + RENDER MODE
 ****************************************************/

function reloadIframe() {
    const frame = getPreviewFrame();
    if (!frame || !frame.contentWindow) { console.warn("Preview frame not ready yet"); return; }

    const url = new URL("/widgets/alerts/", window.location.origin);

    url.searchParams.set("debug", "1");

    const themeMode = document.getElementById("theme-mode").value;
    url.searchParams.set("themeMode", themeMode);

    const theme = document.getElementById("theme-select").value;
    if (theme) url.searchParams.set("theme", theme);

    const mode = document.getElementById("render-mode").value;

    if (mode === "index") {
        const idx = document.getElementById("render-index").value;
        url.searchParams.set("index", idx);
    }

    if (mode === "list") {
        const count = document.getElementById("render-list").value;
        url.searchParams.set("list", count);
    }

    frame.src = url.toString();
}

document.getElementById("apply-theme").onclick = reloadIframe;
document.getElementById("apply-render").onclick = reloadIframe;

/****************************************************
 * RENDER MODE SWITCHER
 ****************************************************/

const renderModeSelect = document.getElementById("render-mode");
const renderOptions = document.getElementById("render-options");

renderModeSelect.onchange = () => {
    const mode = renderModeSelect.value;
    renderOptions.innerHTML = "";

    if (mode === "index") {
        renderOptions.innerHTML = `
            <label>Index:</label>
            <input id="render-index" type="number" min="0" value="0">
        `;
    }

    if (mode === "list") {
        renderOptions.innerHTML = `
            <label>List Count:</label>
            <input id="render-list" type="number" min="1" value="5">
        `;
    }
};

/****************************************************
 * STRESS TEST
 ****************************************************/

document.getElementById("stress-test").onclick = runStressTest;

function runStressTest() {
    const frame = getPreviewFrame();
    if (!frame || !frame.contentWindow) { console.warn("Preview frame not ready yet"); return; }

    const platforms = [
        "twitch", "youtube", "kick", "tiktok",
        "kofi", "streamelements", "streamlabs",
        "patreon", "fourthwall"
    ];

    const types = [
        "follow", "sub", "resub", "giftsub",
        "cheer", "donation", "raid", "reward", "gift"
    ];

    let count = 0;
    const total = 100;
    const delay = 30;

    console.log("Running stress test…");

    const interval = setInterval(() => {
        if (count >= total) {
            clearInterval(interval);
            console.log("Stress test complete");
            return;
        }

        const platform = platforms[Math.floor(Math.random() * platforms.length)];
        const type = types[Math.floor(Math.random() * types.length)];

        const event = generateTestEvent(platform, type);

        frame.contentWindow.postMessage({
            widget: "alerts",
            eventName: `${platform}.${type}`,
            data: event
        }, "*");


        count++;
    }, delay);
}

/****************************************************
 * LIVE CSS EDITOR
 ****************************************************/

document.getElementById("apply-live-css").onclick = () => {
    const css = document.getElementById("live-css-editor").value;
    const frame = getPreviewFrame();
    if (!frame || !frame.contentWindow) { console.warn("Preview frame not ready yet"); return; }

    frame.contentWindow.postMessage({
        widget: "alerts",
        css
    }, "*");
};
