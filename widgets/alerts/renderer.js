export const Renderer = {
    getContainer() {
        return document.getElementById("alert-container");
    },

    buildAlertElement(alert) {
        const el = document.createElement("div");
        el.classList.add("alert-item", `type-${alert.type}`);

        const avatar = document.createElement("img");
        avatar.classList.add("alert-avatar");
        avatar.src = alert.avatar;

        const user = document.createElement("div");
        user.classList.add("alert-username");
        user.innerHTML = alert.username;

        const desc = document.createElement("div");
        desc.classList.add("alert-description");
        desc.innerHTML = alert.description;

        el.appendChild(avatar);
        el.appendChild(user);
        el.appendChild(desc);

        return el;
    },

    showAlert(alert) {
        const container = this.getContainer();
        const el = this.buildAlertElement(alert);
        container.appendChild(el);

        requestAnimationFrame(() => el.classList.add("visible"));

        setTimeout(() => {
            el.classList.add("exit");
            setTimeout(() => el.remove(), 500);
        }, 5000);
    }
};