import { sbClient } from "../../shared/sb-client.js";
import { normalizeEvent } from "../../shared/uem.js";
import { PLATFORM_ICONS } from "../../shared/platforms.js";

const DURATION = 3000; // ms bubble visible
const FLIP_DELAY = 600; // ms before flipping

sbClient.on("Twitch.Follow", handleRawEvent);
sbClient.on("Twitch.Sub", handleRawEvent);
sbClient.on("Twitch.Cheer", handleRawEvent);

function handleRawEvent(raw) {
    const uem = normalizeEvent(raw);
    showNameplate(uem);
}

function showNameplate(event) {
    const container = document.getElementById("nameplate-container");

    const plate = document.createElement("div");
    plate.className = `nameplate nameplate-platform-${event.platform} nameplate-dir-left`;

    const card = document.createElement("div");
    card.className = "nameplate-card";

    const back = document.createElement("div");
    back.className = "nameplate-face nameplate-back";
    back.innerHTML = `<img src="${PLATFORM_ICONS[event.platform]}" class="platform-logo">`;

    const front = document.createElement("div");
    front.className = "nameplate-face nameplate-front";
    front.innerHTML = `
        <img src="${PLATFORM_ICONS[event.platform]}" class="platform-logo small">
        <span class="username">${event.username}</span>
    `;

    card.appendChild(back);
    card.appendChild(front);
    plate.appendChild(card);
    container.appendChild(plate);

    // Slide-in
    requestAnimationFrame(() => {
        plate.classList.add("visible");
    });

    // Flip to front
    setTimeout(() => {
        card.classList.add("flipped");
    }, FLIP_DELAY);

    // Flip back + slide-out
    setTimeout(() => {
        card.classList.remove("flipped");
        plate.classList.remove("visible");
    }, DURATION);

    // Remove after animation
    setTimeout(() => {
        plate.remove();
    }, DURATION + 800);
}