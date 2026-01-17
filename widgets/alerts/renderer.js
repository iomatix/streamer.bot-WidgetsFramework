export const Renderer = {
    getContainer() {
        return document.getElementById("alert-container");
    },

    getParams() {
        const params = new URLSearchParams(window.location.search);
        return {
            direction: params.get("dir") || "bottom-up",
            anim: params.get("anim") || "slide-fade"
        };
    },

    buildAlertElement(alert) {
        const el = document.createElement("div");
        el.classList.add("alert-item");

        // Platform theme
        if (alert.platform) el.classList.add(`platform-${alert.platform}`);
        if (alert.type) el.classList.add(`type-${alert.type}`);
        if (alert.subtype) el.classList.add(`subtype-${alert.subtype}`);

        if (Array.isArray(alert.tags)) {
            alert.tags.forEach(tag => el.classList.add(`tag-${tag}`));
        }

        const { direction, anim } = this.getParams();
        el.classList.add(`dir-${direction}`);
        el.classList.add(`anim-${anim}`);

        /* ============================================================
           NEW LAYOUT: LEFT + RIGHT COLUMNS
           ============================================================ */

        const left = document.createElement("div");
        left.classList.add("alert-left");

        const right = document.createElement("div");
        right.classList.add("alert-right");

        /* ============================================================
           AVATAR
           ============================================================ */
        if (alert.avatar) {
            const avatar = document.createElement("img");
            avatar.classList.add("alert-avatar");
            avatar.src = alert.avatar;
            left.appendChild(avatar);
        }

        /* ============================================================
           BADGES (stack under avatar)
           ============================================================ */
        if (alert.badges && alert.badges.length > 0) {
            const badgeWrap = document.createElement("div");
            badgeWrap.classList.add("alert-badges");

            alert.badges.forEach(b => {
                const img = document.createElement("img");
                img.classList.add("alert-badge");
                img.src = b.imageUrl;
                img.alt = b.name;
                badgeWrap.appendChild(img);
            });

            left.appendChild(badgeWrap);
        }

        /* ============================================================
           USERNAME
           ============================================================ */
        const user = document.createElement("div");
        user.classList.add("alert-username");
        user.innerHTML = alert.username;
        user.style.color = alert.color || "";
        right.appendChild(user);

        /* ============================================================
           DESCRIPTION (follow, sub, raid, etc.)
           ============================================================ */
        if (alert.description) {
            const desc = document.createElement("div");
            desc.classList.add("alert-description");
            desc.innerHTML = alert.description;
            right.appendChild(desc);
        }

        /* ============================================================
           ATTRIBUTE (optional)
           ============================================================ */
        if (alert.attribute) {
            const attr = document.createElement("div");
            attr.classList.add("alert-attribute");
            attr.innerHTML = alert.attribute;
            right.appendChild(attr);
        }

        /* ============================================================
           MESSAGE (chat, donation message, etc.)
           ============================================================ */
        if (alert.message) {
            const msg = document.createElement("div");
            msg.classList.add("alert-message");

            if (alert.message.parts) {
                msg.innerHTML = renderChatParts(alert.message.parts);
            } else {
                msg.innerHTML = alert.message.raw || alert.message;
            }

            right.appendChild(msg);
        }

        /* ============================================================
           APPEND LEFT + RIGHT
           ============================================================ */
        el.appendChild(left);
        el.appendChild(right);

        return el;
    },

    /* ============================================================
       LIVE MODE
       ============================================================ */
    showAlert(alert) {
        const container = this.getContainer();
        const el = this.buildAlertElement(alert);

        if (alert.__id) el.dataset.id = alert.__id;

        container.appendChild(el);

        requestAnimationFrame(() => el.classList.add("visible"));

        setTimeout(() => {
            el.classList.add("exit");
            setTimeout(() => el.remove(), 500);
        }, 5000);
    },

    /* ============================================================
       LIST MODE
       ============================================================ */
    renderList(events) {
        const container = this.getContainer();
        const existing = new Map();

        container.querySelectorAll(".alert-item").forEach(el => {
            const id = el.dataset.id;
            if (id) existing.set(id, el);
        });

        const newIds = new Set(events.map(ev => ev.__id));

        existing.forEach((el, id) => {
            if (!newIds.has(id)) {
                el.remove();
                existing.delete(id);
            }
        });

        events.forEach(ev => {
            let el = existing.get(ev.__id);

            if (!el) {
                el = this.buildAlertElement(ev);
                el.dataset.id = ev.__id;
                el.classList.add("visible");
                el.style.transition = "none";
                container.appendChild(el);
                existing.set(ev.__id, el);
            }
        });
    },

    /* ============================================================
       INDEX MODE
       ============================================================ */
    renderIndex(event) {
        const container = this.getContainer();
        const current = container.querySelector(".alert-item");

        if (current && event && current.dataset.id === event.__id) return;

        container.innerHTML = "";
        if (!event) return;

        const el = this.buildAlertElement(event);
        el.dataset.id = event.__id;
        el.classList.add("visible");
        el.style.transition = "none";

        container.appendChild(el);
    }
};

function renderChatParts(parts) {
    return parts.map(part => {
        // Text segment
        if (part.type === "text") {
            return part.text
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;");
        }

        // Emote segment
        if (part.type === "emote") {
            const classes = ["chat-emote"];
            if (part.zeroWidth) classes.push("zero-width");

            return `
                <img 
                    class="${classes.join(" ")}"
                    src="${part.imageUrl}"
                    alt="${part.text}"
                    draggable="false"
                >
            `;
        }

        return "";
    }).join("");
}
