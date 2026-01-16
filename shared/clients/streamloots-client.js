export function createStreamlootsClient(onEvent) {
    let ws = null;

    function connect() {
        ws = new WebSocket("wss://api.streamloots.com/socket");

        ws.onopen = () => console.log("[Streamloots] Connected");
        ws.onclose = () => {
            console.log("[Streamloots] Disconnected");
            setTimeout(connect, 2000);
        };
        ws.onerror = () => {
            console.log("[Streamloots] Error");
            setTimeout(connect, 2000);
        };

        ws.onmessage = msg => {
            const payload = JSON.parse(msg.data);

            // Streamloots sends events in the form:
            // { event: "cardRedeemed", data: {...} }
            if (payload.event && payload.data) {
                onEvent(payload.event, payload.data);
            }
        };
    }

    connect();
}