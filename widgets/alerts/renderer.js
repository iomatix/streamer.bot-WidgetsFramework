export const Renderer = {
    getContainer() {
        return document.getElementById("alert-container");
    },

    buildAlertElement(alert) {
        const el = document.createElement("div");

        // Base classes
        el.classList.add("alert-item");

        // Platform theme
        if (alert.platform) {
            el.classList.add(`platform-${alert.platform}`);
        }

        // Type
        if (alert.type) {
            el.classList.add(`type-${alert.type}`);
        }

        // Subtype
        if (alert.subtype) {
            el.classList.add(`subtype-${alert.subtype}`);
        }

        // Tags
        if (Array.isArray(alert.tags)) {
            alert.tags.forEach(tag => {
                el.classList.add(`tag-${tag}`);
            });
        }

        // Direction (default: bottom-up)
        const params = new URLSearchParams(window.location.search);
        const direction = params.get("dir") || "bottom-up";
        el.classList.add(`dir-${direction}`);

        // Animation (default: slide-fade)
        const anim = params.get("anim") || "slide-fade";
        el.classList.add(`anim-${anim}`);

        // Avatar (optional)
        if (alert.avatar) {
            const avatar = document.createElement("img");
            avatar.classList.add("alert-avatar");
            avatar.src = alert.avatar;
            el.appendChild(avatar);
        }

        // Username
        const user = document.createElement("div");
        user.classList.add("alert-username");
        user.innerHTML = alert.username;
        el.appendChild(user);

        // Description
        const desc = document.createElement("div");
        desc.classList.add("alert-description");
        desc.innerHTML = alert.description;
        el.appendChild(desc);

        // Attribute (optional)
        if (alert.attribute) {
            const attr = document.createElement("div");
            attr.classList.add("alert-attribute");
            attr.innerHTML = alert.attribute;
            el.appendChild(attr);
        }

        // Message (optional)
        if (alert.message) {
            const msg = document.createElement("div");
            msg.classList.add("alert-message");
            msg.innerHTML = alert.message;
            el.appendChild(msg);
        }

        return el;
    },

    // LIVE MODE
    showAlert(alert) {
        const container = this.getContainer();
        const el = this.buildAlertElement(alert);
        container.appendChild(el);

        requestAnimationFrame(() => el.classList.add("visible"));

        setTimeout(() => {
            el.classList.add("exit");
            setTimeout(() => el.remove(), 500);
        }, 5000);
    },

    // LIST MODE
    renderList(events) {
        const container = this.getContainer();

        // Map existing DOM nodes by event ID
        const existing = new Map();
        container.querySelectorAll(".alert-item").forEach(el => {
            const id = el.dataset.id;
            if (id) existing.set(id, el);
        });

        // Build a Set of new IDs
        const newIds = new Set(events.map(ev => ev.__id));

        // Remove DOM nodes that are no longer present
        existing.forEach((el, id) => {
            if (!newIds.has(id)) el.remove();
        });

        // Add or update nodes in correct order
        events.forEach(ev => {
            let el = existing.get(ev.__id);

            if (!el) {
                // Create new element
                el = this.buildAlertElement(ev);
                el.dataset.id = ev.__id;

                // list mode = no animations
                el.classList.add("visible");
                el.style.transition = "none";

                container.appendChild(el);
            } else {
                // Element exists — ensure correct order
                if (el.nextSibling !== container.children[events.indexOf(ev)]) {
                    container.appendChild(el);
                }
            }
        });
    },

    // INDEX MODE
    renderIndex(event) {
        const container = this.getContainer();

        // If same event already displayed → do nothing
        const existing = container.querySelector(".alert-item");
        if (existing && existing.dataset.id === event?.__id) return;

        container.innerHTML = "";

        if (!event) return;

        const el = this.buildAlertElement(event);
        el.dataset.id = event.__id;

        el.classList.add("visible");
        el.style.transition = "none";

        container.appendChild(el);
    }
};
