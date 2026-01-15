const username = document.getElementById("username");
const platform = document.getElementById("platform");
const variant = document.getElementById("variant");
const direction = document.getElementById("direction");
const flip = document.getElementById("flip");
const duration = document.getElementById("duration");
const delay = document.getElementById("delay");
const loop = document.getElementById("loop");
const avatarUrl = document.getElementById("avatarUrl");
const customLogo = document.getElementById("customLogo");

const applyBtn = document.getElementById("applyBtn");
const triggerBtn = document.getElementById("triggerBtn");

function buildUrl(loopOverride = null) {
    const params = new URLSearchParams();

    params.set("username", username.value);
    params.set("platform", platform.value);
    params.set("variant", variant.value);
    params.set("direction", direction.value);
    params.set("flip", flip.value);
    params.set("duration", duration.value);
    params.set("delay", delay.value);

    const loopValue = loopOverride !== null ? loopOverride : loop.checked;
    params.set("loop", loopValue);

    if (avatarUrl.value.trim() !== "") {
        params.set("avatarUrl", avatarUrl.value.trim());
    }       

    if (customLogo.value.trim() !== "") {
        params.set("customLogo", customLogo.value.trim());
    }

    return `/widgets/nameplate/?${params.toString()}`;
}

applyBtn.addEventListener("click", () => {
    const url = buildUrl();
    parent.document.getElementById("previewFrame").src = url;
});

triggerBtn.addEventListener("click", () => {
    const url = buildUrl(false);
    parent.document.getElementById("previewFrame").src = url;
});
