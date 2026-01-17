
import { PLATFORM_ICONS } from "../../platforms.js";

export function StreamElementsMerchAdapter(data) {
    const username = data.username || "Someone";
    const item = data.item || "an item";
    const amount = data.amount || 0;
    const currency = data.currency || "USD";

    const formattedAmount =
        currency === "USD"
            ? `$${amount}`
            : `${amount} ${currency}`;

    return {
        platform: "streamelements",
        type: "merch",
        subtype: "",
        tags: ["streamelements", "merch"],
        username,
        description: `bought merch`,
        attribute: `${item} (${formattedAmount})`,
        message: "",
        avatar: PLATFORM_ICONS.streamelements,
        raw: data
    };
}