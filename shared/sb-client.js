import StreamerbotClient from "https://cdn.jsdelivr.net/npm/@streamerbot/client/dist/streamerbot-client.esm.js";

export const sbClient = new StreamerbotClient({
    host: "127.0.0.1",
    port: 8080,
    endpoint: "/",
    autoReconnect: true
});

sbClient.on("connected", () => {
    console.log("[SB] Connected");
});

sbClient.on("disconnected", () => {
    console.log("[SB] Disconnected");
});