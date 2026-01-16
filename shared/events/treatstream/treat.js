export function TreatStreamTreatAdapter(data) {
    const username = data.username || "Someone";
    const treat = data.treat || "a treat";
    const message = data.message || "";

    return {
        platform: "treatstream",
        type: "treat",
        subtype: "",
        tags: ["treatstream", "treat"],
        username,
        description: `sent you a treat!`,
        attribute: treat,
        message,
        avatar: "",
        raw: data
    };
}