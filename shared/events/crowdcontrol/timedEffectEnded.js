export function CrowdControlTimedEffectEndedAdapter(data) {
    const effect = data.effect?.name || "an effect";

    return {
        platform: "crowdcontrol",
        type: "timed",
        subtype: "end",
        tags: ["crowdcontrol", "timed", "end"],
        username: "",
        description: `timed effect ended`,
        attribute: effect,
        message: "",
        avatar: "",
        raw: data
    };
}