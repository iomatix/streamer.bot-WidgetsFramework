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
    return {
        source: platform,
        type: type,
        user: {
            name: "TestUser",
            avatar: `https://placekittens.com/${100 + Math.floor(Math.random() * 50)}/${100 + Math.floor(Math.random() * 50)}`
        },
        amount: Math.floor(Math.random() * 100),
        message: "This is a simulated event",
        raw: { simulated: true }
    };
}

/****************************************************
 * CUSTOM JSON EVENT
 ****************************************************/

document.getElementById("send-json").onclick = () => {
    const text = document.getElementById("json-input").value;
    try {
        const event = JSON.parse(text);
        const frame = getPreviewFrame();
        if (!frame || !frame.contentWindow) { console.warn("Preview frame not ready yet"); return; }
        frame.contentWindow.postMessage({
            widget: "alerts",
            eventName: `${event.source}.${event.type}`,
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

        const event = {
            platform,
            type,
            subtype: "stress",
            tags: ["stress", platform, type],
            username: `User${Math.floor(Math.random() * 9999)}`,
            description: `${type} event`,
            attribute: `${Math.floor(Math.random() * 100)} units`,
            message: "Stress test event",
            avatar: `https://placekittens.com/${100 + Math.floor(Math.random() * 50)}/${100 + Math.floor(Math.random() * 50)}`,
            raw: { stress: true }
        };

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
