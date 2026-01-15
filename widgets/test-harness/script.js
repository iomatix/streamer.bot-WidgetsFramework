const widgetSelect = document.getElementById("widgetSelect");
const reloadBtn = document.getElementById("reloadBtn");
const openBtn = document.getElementById("openBtn");
const settingsPanel = document.getElementById("settingsPanel");
const previewFrame = document.getElementById("previewFrame");

const WIDGETS = {
    alerts: {
        testPage: "/widgets/alerts/test/index.html"
    },
    nameplate: {
        testPage: "/widgets/nameplate/test/index.html"
    }
};

function loadWidgetTestUI(widget) {
    const cfg = WIDGETS[widget];
    if (!cfg) return;

    settingsPanel.innerHTML = `<iframe src="${cfg.testPage}" style="width:100%;height:300px;border:none;"></iframe>`;
    previewFrame.src = ""; // will be set by widget test UI
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
