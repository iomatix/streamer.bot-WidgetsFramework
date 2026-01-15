//////////////////////
// GLOBAL VARIABLES //
//////////////////////

export const avatarMap = new Map();
export const pronounMap = new Map();



//////////////////////
// HELPER FUNCTIONS //
//////////////////////

export function GetBooleanParam(paramName, defaultValue) {
    const urlParams = new URLSearchParams(window.location.search);
    const paramValue = urlParams.get(paramName);

    if (paramValue === null) return defaultValue;

    const lowercaseValue = paramValue.toLowerCase();

    if (lowercaseValue === 'true') return true;
    if (lowercaseValue === 'false') return false;

    return paramValue;
}

export function GetIntParam(paramName, defaultValue) {
    const urlParams = new URLSearchParams(window.location.search);
    const paramValue = urlParams.get(paramName);

    if (paramValue === null) return defaultValue;

    const intValue = parseInt(paramValue, 10);
    if (isNaN(intValue)) return null;

    return intValue;
}

export async function GetKickIds(username) {
    let url = `https://kick.com/api/v2/channels/${username}`;

    try {
        let response = await fetch(url);
        if (!response.ok) {
            const altUsername = username.replace(/_/g, "-");
            url = `https://kick.com/api/v2/channels/${altUsername}`;
            response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP error ${response.status}`);
        }

        const data = await response.json();
        if (data.chatroom?.id) {
            return { chatroomId: data.chatroom.id, channelId: data.chatroom.channel_id };
        }

        throw new Error("Chatroom ID not found.");
    } catch (error) {
        console.error("Failed to fetch chatroom ID:", error.message);
        return null;
    }
}

export async function GetKickSubBadges(username) {
    let url = `https://kick.com/api/v2/channels/${username}`;

    try {
        let response = await fetch(url);
        if (!response.ok) {
            const altUsername = username.replace(/_/g, "-");
            url = `https://kick.com/api/v2/channels/${altUsername}`;
            response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP error ${response.status}`);
        }

        const data = await response.json();
        return data.subscriber_badges || [];
    } catch (error) {
        console.error("Failed to fetch subscriber badges:", error.message);
        return [];
    }
}

export async function GetAvatar(username, platform) {
    const key = `${username}-${platform}`;

    if (avatarMap.has(key)) {
        console.debug(`Avatar found for ${username} (${platform}).`);
        return avatarMap.get(key);
    }

    switch (platform) {
        case 'twitch': {
            console.debug(`Fetching Twitch avatar for ${username}`);
            const response = await fetch('https://decapi.me/twitch/avatar/' + username);
            const data = await response.text();
            avatarMap.set(key, data);
            return data;
        }

        case 'kick': {
            console.debug(`Fetching Kick avatar for ${username}`);

            let url = `https://kick.com/api/v2/channels/${username}`;
            try {
                let response = await fetch(url);
                if (!response.ok) {
                    const altUsername = username.replace(/_/g, "-");
                    url = `https://kick.com/api/v2/channels/${altUsername}`;
                    response = await fetch(url);
                    if (!response.ok) throw new Error(`HTTP error ${response.status}`);
                }

                const data = await response.json();
                const avatarURL = data.user?.profile_pic || 'https://kick.com/img/default-profile-pictures/default2.jpeg';
                avatarMap.set(key, avatarURL);
                return avatarURL;
            } catch (error) {
                console.error("Failed to fetch avatar:", error.message);
                return 'https://kick.com/img/default-profile-pictures/default2.jpeg';
            }
        }
    }
}

export async function GetPronouns(platform, username) {
    if (pronounMap.has(username)) {
        return pronounMap.get(username);
    }

    const response = await client.getUserPronouns(platform, username);
    const userFound = response.pronoun.userFound;
    const pronouns = userFound ? `${response.pronoun.pronounSubject}/${response.pronoun.pronounObject}` : '';

    pronounMap.set(username, pronouns);
    return pronouns;
}

export function GetCurrentTimeFormatted() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12 || 12;

    return `${hours}:${minutes} ${ampm}`;
}

export function DecodeHTMLString(html) {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}

export function TranslateToFurry(sentence) {
    const words = sentence.toLowerCase().split(/\b/);

    const furryWords = words.map(word => {
        if (!/\w+/.test(word)) return word;

        let newWord = word
            .replace(/l/g, 'w')
            .replace(/r/g, 'w')
            .replace(/th/g, 'f')
            .replace(/you/g, 'yous')
            .replace(/my/g, 'mah')
            .replace(/me/g, 'meh')
            .replace(/very/g, 'vewy')
            .replace(/pretty/g, 'pwetty')
            .replace(/little/g, 'wittle')
            .replace(/nice/g, 'nyce');

        if (Math.random() < 0.15) newWord += ' nya~';
        else if (Math.random() < 0.1) newWord += ' >w<';
        else if (Math.random() < 0.05) newWord += ' owo';

        return newWord;
    });

    return furryWords.join('');
}

export function EscapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function RandomHex(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
        hash |= 0;
    }

    const hue = Math.abs(hash) % 360;
    const saturation = 100;
    const lightness = 55;

    function hslToHex(h, s, l) {
        s /= 100;
        l /= 100;

        const k = n => (n + h / 30) % 12;
        const a = s * Math.min(l, 1 - l);
        const f = n =>
            l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));

        const r = Math.round(255 * f(0));
        const g = Math.round(255 * f(8));
        const b = Math.round(255 * f(4));

        return (
            "#" +
            r.toString(16).padStart(2, "0") +
            g.toString(16).padStart(2, "0") +
            b.toString(16).padStart(2, "0")
        );
    }

    return hslToHex(hue, saturation, lightness);
}
