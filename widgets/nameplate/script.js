import { GetAvatar } from "../../shared/helpers.js";
import { PLATFORM_ICONS } from "../../shared/platforms.js";
import { PLATFORM_COLORS } from "../../shared/platforms.js";   

// Default config
const DEFAULTS = {
    variant: "platform",      // platform | avatar | custom
    direction: "left",        // left | right | top | bottom
    flip: "Y",                // Y | X
    duration: 3000,           // ms card visible
    delay: 2000,              // ms between cycles
    loop: true,
    username: "Cool User",
    avatarUrl: null,
    customLogo: null,
    platform: "twitch"
};

// Read URL parameters
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
    if (p.has("customLogo")) cfg.customLogo = p.get("customLogo");
    if (p.has("platform")) cfg.platform = p.get("platform").toLowerCase();

    if (!PLATFORM_ICONS[cfg.platform]) {
        cfg.platform = "twitch";
    }

    return cfg;
}

// Intelligent avatar loader
async function loadAvatar(config) {
    // 1. If avatarUrl param exists → use it
    if (config.avatarUrl) return config.avatarUrl;

    // 2. If variant != avatar → do not fetch
    if (config.variant !== "avatar") return null;

    // 3. Only Twitch supports GetAvatar reliably
    if (config.platform !== "twitch") return null;

    // 4. Fetch Twitch avatar
    return await GetAvatar(config.username, "twitch");
}

// Build DOM for nameplate
function createNameplateDOM(config, avatarUrl) {
    const container = document.getElementById("nameplate-container");
    container.innerHTML = "";

    const plate = document.createElement("div");
    plate.className = `nameplate nameplate-platform-${config.platform} nameplate-dir-${config.direction}`;

    const card = document.createElement("div");
    card.className = "nameplate-card " + (config.flip === "X" ? "flip-x" : "flip-y");

    // BACK (reverse)
    const back = document.createElement("div");
    back.className = "nameplate-face nameplate-back";

    if (config.variant === "custom" && config.customLogo) {
        back.innerHTML = `<img src="${config.customLogo}" class="platform-logo">`;
    } else {
        back.innerHTML = `<img src="${PLATFORM_ICONS[config.platform]}" class="platform-logo">`;
    }

    // FRONT (face)
    const front = document.createElement("div");
    front.className = "nameplate-face nameplate-front";

    let frontIcon = "";

    if (config.variant === "avatar" && avatarUrl) {
        frontIcon = `<img src="${avatarUrl}" class="avatar">`;
    } else if (config.variant === "custom" && config.customLogo) {
        frontIcon = `<img src="${config.customLogo}" class="platform-logo small">`;
    } else {
        frontIcon = `<img src="${PLATFORM_ICONS[config.platform]}" class="platform-logo small">`;
    }

    front.innerHTML = `
        ${frontIcon}
        <span class="username">${config.username}</span>
    `;

    card.appendChild(back);
    card.appendChild(front);
    plate.appendChild(card);
    container.appendChild(plate);

    return { plate, card };
}

// Animate one cycle
function animateCycle(config, plate, card) {
    const flipClass = config.flip === "X" ? "flipped-x" : "flipped-y";

    // Slide-in
    requestAnimationFrame(() => {
        plate.classList.add("visible");
    });

    // Flip to front
    const flipTimeout = setTimeout(() => {
        card.classList.add(flipClass);
    }, 600);

    // Flip back + slide-out
    const exitTimeout = setTimeout(() => {
        card.classList.remove(flipClass);
        plate.classList.remove("visible");
    }, config.duration);

    return { flipTimeout, exitTimeout };
}

// Loop logic
async function runLoop() {
    const config = getParams();
    const avatarUrl = await loadAvatar(config);

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
