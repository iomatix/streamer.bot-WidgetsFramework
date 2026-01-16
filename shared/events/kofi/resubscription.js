export function KofiResubscriptionAdapter(data) {
    const user = data.from || "Someone";
    const amount = data.amount;
    const currency = data.currency;
    const message = data.message || "";

    const description =
        currency === "USD"
            ? `resubscribed ($${amount})`
            : `resubscribed (${currency} ${amount})`;

    return {
        platform: "kofi",
        type: "resub",
        subtype: "",
        tags: ["kofi", "sub", "resub"],
        username: user,
        description,
        attribute: "",
        message,
        avatar: "icons/platforms/kofi.png",
        raw: data
    };
}