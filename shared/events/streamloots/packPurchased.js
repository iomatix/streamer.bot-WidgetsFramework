export function StreamlootsPackPurchasedAdapter(data) {
    const username = data.buyer?.username || "Someone";
    const packs = data.packs || 1;

    return {
        platform: "streamloots",
        type: "pack",
        subtype: "purchased",
        tags: ["streamloots", "pack", "purchased"],
        username,
        description: `bought ${packs} pack(s)`,
        attribute: "",
        message: "",
        avatar: data.buyer?.avatar || "",
        raw: data
    };
}