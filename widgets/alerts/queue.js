import { Renderer } from "./renderer.js";

export const AlertQueue = {
    queue: [],
    isShowing: false,

    enqueue(event) {
        this.queue.push(event);
        this.process();
    },

    process() {
        if (this.isShowing) return;
        if (this.queue.length === 0) return;

        const next = this.queue.shift();
        this.isShowing = true;

        Renderer.showAlert(next);

        setTimeout(() => {
            this.isShowing = false;
            this.process();
        }, 5500);
    }
};