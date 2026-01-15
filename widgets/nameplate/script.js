// Simple platform icon map – dostosuj ścieżki do swoich plików
const PLATFORM_ICONS = {
    twitch: "icons/platforms/twitch.png",
    youtube: "icons/platforms/youtube.png",
    kick: "icons/platforms/kick.png"
};

// Default config
const DEFAULTS = {
    variant: "platform",      // na razie tylko platform → Reverse = platform logo, Front = avatar + username
    direction: "left",        // left | right | top | bottom
    flip: "Y",                // Y | X
    duration: 3000,           // ms card visible
    delay: 2000,              // ms between cycles
    loop: true,
    username: "Cool User",
    avatarUrl: null,
    platform: "twitch"
};

function getParams() {
    const url = new URL(window.location.href);
    const p = url.searchParams;

    const cfg = { ...DEFAULTS };

    if (p.has("variant")) cfg.variant = p.get("variant");
    if (p.has("direction")) cfg.direction = p.get("direction");
    if (p.has("flip")) cfg.flip = p.get("flip").toUpperCase() === "X" ? "X" : "Y";
    if (p.has("duration")) cfg.duration = parseInt(p.get("duration"), 10) || DEFAULTS.duration;
    if (p.has("delay")) cfg.delay = parseInt(p.get("delay"), 10) || DEFAULTS.delay;
    if (p.has("loop")) cfg.loop = p.get("loop").toLowerCase() === "true";
    if (p.has("username")) cfg.username = p.get("username");
    if (p.has("avatarUrl")) cfg.avatarUrl = p.get("avatarUrl");
    if (p.has("platform")) cfg.platform = p.get("platform").toLowerCase();

    if (!PLATFORM_ICONS[cfg.platform]) {
        cfg.platform = "twitch";
    }

    return cfg;
}

async function loadAvatar(url) {
    if (!url) return null;
    return url;
}

function createNameplateDOM(config, avatarUrl) {
    const container = document.getElementById("nameplate-container");
    container.innerHTML = "";

    const plate = document.createElement("div");
    plate.className = `nameplate nameplate-platform-${config.platform} nameplate-dir-${config.direction}`;

    const card = document.createElement("div");
    card.className = "nameplate-card " + (config.flip === "X" ? "flip-x" : "flip-y");

    const back = document.createElement("div");
    back.className = "nameplate-face nameplate-back";
    back.innerHTML = `<img src="${PLATFORM_ICONS[config.platform]}" class="platform-logo">`;

    const front = document.createElement("div");
    front.className = "nameplate-face nameplate-front";

    const avatarHtml = avatarUrl
        ? `<img src="${avatarUrl}" class="avatar">`
        : `<img src="${PLATFORM_ICONS[config.platform]}" class="platform-logo small">`;

    front.innerHTML = `
        ${avatarHtml}
        <span class="username">${config.username}</span>
    `;

    card.appendChild(back);
    card.appendChild(front);
    plate.appendChild(card);
    container.appendChild(plate);

    return { plate, card };
}

function animateCycle(config, plate, card) {
    const flipClass = config.flip === "X" ? "flipped-x" : "flipped-y";

    requestAnimationFrame(() => {
        plate.classList.add("visible");
    });

    const flipTimeout = setTimeout(() => {
        card.classList.add(flipClass);
    }, 600);

    const exitTimeout = setTimeout(() => {
        card.classList.remove(flipClass);
        plate.classList.remove("visible");
    }, config.duration);

    return { flipTimeout, exitTimeout };
}

async function runLoop() {
    const config = getParams();
    const avatarUrl = await loadAvatar(config.avatarUrl);

    async function cycle() {
        const { plate, card } = createNameplateDOM(config, avatarUrl);
        animateCycle(config, plate, card);

        const total = config.duration + 800;

        if (config.loop) {
            setTimeout(cycle, total + config.delay);
        }
    }

    cycle();
}

document.addEventListener("DOMContentLoaded", () => {
    runLoop();
});
