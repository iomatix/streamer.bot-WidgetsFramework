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
