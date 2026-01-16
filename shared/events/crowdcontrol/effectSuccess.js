export function CrowdControlEffectSuccessAdapter(data) {
    const username = data.user?.name || "Someone";
    const effect = data.effect?.name || "an effect";

    return {
        platform: "crowdcontrol",
        type: "effect",
        subtype: "success",
        tags: ["crowdcontrol", "effect", "success"],
        username,
        description: `effect succeeded`,
        attribute: effect,
        message: "",
        avatar: "",
        raw: data
    };
}