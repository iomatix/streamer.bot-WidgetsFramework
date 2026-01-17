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
        const { direction, anim } = this.getParams();
        el.classList.add(`dir-${direction}`);

        // Animation (default: slide-fade)
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

        // Live mode doesn't need a stable ID, but adding it doesn't hurt
        if (alert.__id) {
            el.dataset.id = alert.__id;
        }

        container.appendChild(el);

        requestAnimationFrame(() => el.classList.add("visible"));

        setTimeout(() => {
            el.classList.add("exit");
            setTimeout(() => el.remove(), 500);
        }, 5000);
    },

    // LIST MODE — diff without flickering
    renderList(events) {
        const container = this.getContainer();

        // Map existing elements by ID
        const existing = new Map();
        container.querySelectorAll(".alert-item").forEach(el => {
            const id = el.dataset.id;
            if (id) existing.set(id, el);
        });

        // Set of new IDs
        const newIds = new Set(events.map(ev => ev.__id));

        // Remove elements that are no longer in the list
        existing.forEach((el, id) => {
            if (!newIds.has(id)) {
                el.remove();
                existing.delete(id);
            }
        });

        // Add new elements (we don't move/reorder existing ones)
        events.forEach(ev => {
            let el = existing.get(ev.__id);

            if (!el) {
                el = this.buildAlertElement(ev);
                el.dataset.id = ev.__id;

                // list mode = no entrance animation (just visible state)
                el.classList.add("visible");
                el.style.transition = "none";

                container.appendChild(el);
                existing.set(ev.__id, el);
            }
            // if already exists – do nothing, don't touch the DOM
        });
    },

    // INDEX / SINGLE MODE — only when the event actually changes
    renderIndex(event) {
        const container = this.getContainer();

        const current = container.querySelector(".alert-item");
        if (current && event && current.dataset.id === event.__id) {
            // Same event — do nothing, zero flickering
            return;
        }

        container.innerHTML = ""; // clear only when there's an actual change

        if (!event) return;

        const el = this.buildAlertElement(event);
        el.dataset.id = event.__id;

        el.classList.add("visible");
        el.style.transition = "none";

        container.appendChild(el);
    }
};