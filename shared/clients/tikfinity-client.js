export function createTikfinityClient(onEvent) {
    let ws = null;

    function connect() {
        ws = new WebSocket("ws://localhost:21213/");

        ws.onopen = () => console.log("[TikFinity] Connected");
        ws.onclose = () => {
            console.log("[TikFinity] Disconnected");
            setTimeout(connect, 1000);
        };
        ws.onerror = () => {
            console.log("[TikFinity] Error");
            setTimeout(connect, 1000);
        };

        ws.onmessage = msg => {
            const payload = JSON.parse(msg.data);
            onEvent(payload.event, payload.data);
        };
    }

    connect();
}