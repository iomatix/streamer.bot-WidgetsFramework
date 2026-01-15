console.log("Test Harness Loaded");

// Access widget inside iframe
function getWidgetAPI() {
    const frame = document.getElementById("widget-frame");
    return frame.contentWindow.WidgetAPI;
}

/****************************************************
 * EVENT SIMULATOR
 ****************************************************/

document.getElementById("sim-send").onclick = () => {
    const platform = document.getElementById("sim-platform").value;
    const type = document.getElementById("sim-type").value;

    const event = generateTestEvent(platform, type);

    const api = getWidgetAPI();
    api.pushEvent(event);
};

function generateTestEvent(platform, type) {
    return {
        platform,
        type,
        subtype: "test",
        tags: ["test", platform, type],
        username: "TestUser",
        description: `${type} event triggered`,
        attribute: "Test attribute",
        message: "This is a simulated event",
        avatar: `https://placekittens.com/${100 + Math.floor(Math.random()*50)}/${100 + Math.floor(Math.random()*50)}`,
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
        const api = getWidgetAPI();
        api.pushEvent(event);
    } catch (err) {
        alert("Invalid JSON");
    }
};

/****************************************************
 * THEME SWITCHER
 ****************************************************/

function reloadIframe() {
    const frame = document.getElementById("widget-frame");

    // Build base URL
    const url = new URL("../alerts/index.html", window.location.href);

    // Always enable debug panel
    url.searchParams.set("debug", "1");

    // Theme mode
    const themeMode = document.getElementById("theme-mode").value;
    url.searchParams.set("themeMode", themeMode);

    // Theme preset
    const theme = document.getElementById("theme-select").value;
    if (theme) url.searchParams.set("theme", theme);
    else url.searchParams.delete("theme");

    // Render mode
    const mode = document.getElementById("render-mode").value;

    // Clear previous render params
    url.searchParams.delete("index");
    url.searchParams.delete("list");

    if (mode === "index") {
        const idx = document.getElementById("render-index").value;
        url.searchParams.set("index", idx);
    }

    if (mode === "list") {
        const count = document.getElementById("render-list").value;
        url.searchParams.set("list", count);
    }

    // Apply final URL
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
 * STRESS TEST (100 events in rapid succession)
 ****************************************************/

document.getElementById("stress-test").onclick = runStressTest;

function runStressTest() {
    const api = getWidgetAPI();
    if (!api) {
        console.error("WidgetAPI not available yet. Please wait a moment and try again");
        return;
    }

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
    const delay = 30; // ms between events

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
            avatar: `https://placekittens.com/${100 + Math.floor(Math.random()*50)}/${100 + Math.floor(Math.random()*50)}`,
            raw: { stress: true }
        };

        api.pushEvent(event);
        count++;
    }, delay);
}