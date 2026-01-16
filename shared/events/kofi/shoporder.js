export function KofiShopOrderAdapter(data) {
    const user = data.from || "Someone";
    const items = data.items?.join(", ") || "an item";
    const amount = data.amount;
    const currency = data.currency;

    const description =
        currency === "USD"
            ? `bought ${items} ($${amount})`
            : `bought ${items} (${currency} ${amount})`;

    return {
        platform: "kofi",
        type: "shoporder",
        subtype: "",
        tags: ["kofi", "shop"],
        username: user,
        description,
        attribute: "",
        message: "",
        avatar: "icons/platforms/kofi.png",
        raw: data
    };
}