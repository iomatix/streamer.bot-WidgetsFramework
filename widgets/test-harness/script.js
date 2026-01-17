const widgetSelect = document.getElementById("widgetSelect");
const reloadBtn = document.getElementById("reloadBtn");
const openBtn = document.getElementById("openBtn");
const settingsPanel = document.getElementById("settingsPanel");
const previewFrame = document.getElementById("previewFrame");

const WIDGETS = {
    alerts: {
        testPage: "/widgets/alerts/test/index.html",
        widgetUrl: "/widgets/alerts/index.html"
    },
    nameplate: {
        testPage: "/widgets/nameplate/test/index.html",
        widgetUrl: "/widgets/nameplate/index.html"
    }
};

function loadWidgetTestUI(widget) {
    const cfg = WIDGETS[widget];
    if (!cfg) return;

    settingsPanel.innerHTML = `
        <iframe
            src="${cfg.testPage}"
            style="
                width: 100%;
                height: 100%;
                min-height: 100%;
                border: none;
                flex: 1;
            "
        ></iframe>
    `;

    previewFrame.src = cfg.widgetUrl + "?debug=1";

    previewFrame.onload = () => {
        document.getElementById("url-preview").textContent = previewFrame.src;
    };
}

widgetSelect.addEventListener("change", () => {
    loadWidgetTestUI(widgetSelect.value);
});

reloadBtn.addEventListener("click", () => {
    previewFrame.contentWindow.location.reload();
});

openBtn.addEventListener("click", () => {
    window.open(previewFrame.src, "_blank");
});

// Load default widget
loadWidgetTestUI("alerts");

// Handle messages from the widget
window.addEventListener("message", (ev) => {
    if (ev.data.widget !== "alerts-debug") return;

    document.getElementById("uem-debug").textContent =
        JSON.stringify(ev.data.uem, null, 2);

    document.getElementById("renderer-debug").textContent =
        JSON.stringify(ev.data.renderer, null, 2);
});

function saveState() {
    localStorage.setItem("harnessState", JSON.stringify({
        widget: widgetSelect.value,
        theme: document.getElementById("theme-select")?.value,
        themeMode: document.getElementById("theme-mode")?.value,
        renderMode: document.getElementById("render-mode")?.value
    }));
}

const saved = JSON.parse(localStorage.getItem("harnessState") || "{}");

if (saved.widget) widgetSelect.value = saved.widget;
if (saved.theme) document.getElementById("theme-select").value = saved.theme;
if (saved.themeMode) document.getElementById("theme-mode").value = saved.themeMode;
if (saved.renderMode) document.getElementById("render-mode").value = saved.renderMode;