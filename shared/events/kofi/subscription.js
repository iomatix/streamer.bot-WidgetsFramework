export function KofiSubscriptionAdapter(data) {
    const user = data.from || "Someone";
    const amount = data.amount;
    const currency = data.currency;
    const message = data.message || "";

    const description =
        currency === "USD"
            ? `subscribed ($${amount})`
            : `subscribed (${currency} ${amount})`;

    return {
        platform: "kofi",
        type: "sub",
        subtype: "",
        tags: ["kofi", "sub"],
        username: user,
        description,
        attribute: "",
        message,
        avatar: "icons/platforms/kofi.png",
        raw: data
    };
}