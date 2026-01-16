export function KofiDonationAdapter(data) {
    const user = data.from || "Someone";
    const amount = data.amount;
    const currency = data.currency;
    const message = data.message || "";

    const description =
        currency === "USD"
            ? `donated $${amount}`
            : `donated ${currency} ${amount}`;

    return {
        platform: "kofi",
        type: "donation",
        subtype: "",
        tags: ["kofi", "donation"],
        username: user,
        description,
        attribute: "",
        message,
        avatar: "icons/platforms/kofi.png",
        raw: data
    };
}