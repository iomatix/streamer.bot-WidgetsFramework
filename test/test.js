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
        avatar: `https://placekittens.com/${64 + Math.floor(Math.random()*64)}/${64 + Math.floor(Math.random()*64)}`,
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

document.getElementById("apply-theme").onclick = () => {
    const theme = document.getElementById("theme-select").value;
    const frame = document.getElementById("widget-frame");

    const url = new URL(frame.src);
    if (theme) {
        url.searchParams.set("theme", theme);
    } else {
        url.searchParams.delete("theme");
    }

    frame.src = url.toString();
};