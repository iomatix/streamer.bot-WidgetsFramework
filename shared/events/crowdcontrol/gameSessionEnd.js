export function CrowdControlGameSessionEndAdapter(data) {
    return {
        platform: "crowdcontrol",
        type: "session",
        subtype: "end",
        tags: ["crowdcontrol", "session", "end"],
        username: "",
        description: `CrowdControl session ended`,
        attribute: "",
        message: "",
        avatar: "",
        raw: data
    };
}