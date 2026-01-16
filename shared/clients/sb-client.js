const SB_SERVER_ADDRESS = "127.0.0.1";
const SB_SERVER_PORT = "8080";
export const sbClient = new StreamerbotClient({
    host: SB_SERVER_ADDRESS,
    port: SB_SERVER_PORT,
    endpoint: "/",
    autoReconnect: true
});