export function CrowdControlTimedEffectStartedAdapter(data) {
    const effect = data.effect?.name || "an effect";

    return {
        platform: "crowdcontrol",
        type: "timed",
        subtype: "start",
        tags: ["crowdcontrol", "timed", "start"],
        username: "",
        description: `timed effect started`,
        attribute: effect,
        message: "",
        avatar: "",
        raw: data
    };
}