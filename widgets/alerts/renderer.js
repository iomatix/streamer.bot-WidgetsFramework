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
        container.innerHTML = ""; // clear

        events.forEach(ev => {
            const el = this.buildAlertElement(ev);

            // list mode = no animations
            el.classList.add("visible");
            el.style.transition = "none";

            container.appendChild(el);
        });
    },

    // INDEX MODE
    renderIndex(event) {
        const container = this.getContainer();
        container.innerHTML = ""; // clear

        if (!event) return;

        const el = this.buildAlertElement(event);

        // index mode = no animations
        el.classList.add("visible");
        el.style.transition = "none";

        container.appendChild(el);
    }
};
