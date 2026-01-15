/****************************************************
 * Streamer.bot Widgets Framework - Alerts Script
 * Refactored to Unified Event Model (UEM)
 * Author: Mateusz + Copilot
 ****************************************************/

/* ================================
 * 1. CONFIGURATION
 * ================================ */

const SB_SERVER_ADDRESS = "127.0.0.1";
const SB_SERVER_PORT = "8080";

// Options: "classic" or "stacked"
// - classic: one alert at a time (queue)
// - stacked: multiple alerts visible at once
const ALERT_MODE = "stacked";

// Options: "bottom-up", "top-down", "left-right", "right-left"
const ALERT_DIRECTION = "left-right";

// Options: "slide-fade", "fade", "scale"
const ALERT_ANIMATION = "scale";

// Optional tag filter from URL (?tag=...)
const PARAM_TAG = getParam("tag"); // single tag for now

// Theme mode: "platform" or "custom"
const PARAM_THEME_MODE = getParam("themeMode") || "platform";

// Platform toggles (keep as runtime feature flags)
const ENABLE_TWITCH = true;
const ENABLE_YOUTUBE = false;
const ENABLE_KICK = false;
const ENABLE_TIKTOK = false;
const ENABLE_KOFI = true;
const ENABLE_TIPPEEESTREAM = false;
const ENABLE_STREAMELEMENTS = true;
const ENABLE_STREAMLABS = false;
const ENABLE_PATREON = false;
const ENABLE_FOURTHWALL = false;

// Event buffer size (for index/list modes)
const EVENT_BUFFER_LIMIT = 16;

/* ================================
 * 2. URL PARAMS / FILTERING CONFIG
 * ================================ */

/**
 * Reads a single URL parameter by name.
 */
function getParam(name) {
	const url = new URL(window.location.href);
	return url.searchParams.get(name);
}

// index: fixed single event index (0 = newest)
const PARAM_INDEX = getParam("index") !== null ? parseInt(getParam("index"), 10) : null;

// platform: filter by platform (twitch, youtube, kick, etc.)
const PARAM_PLATFORM = getParam("platform"); // e.g. "twitch"

// type: filter by event type (sub, follow, donation, raid, etc.)
const PARAM_TYPE = getParam("type"); // e.g. "sub", "follow", "donation"

// list: render N latest events instead of a single alert
const PARAM_LIST = getParam("list") !== null ? parseInt(getParam("list"), 10) : null;

// excludeTag: optional exclusion filter (roadmap, but wired in)
const PARAM_EXCLUDE_TAG = getParam("excludeTag"); // e.g. "test"


/****************************************************
 * THEME ENGINE
 ****************************************************/

const THEME_PRESETS = {
    dark: {
        "--alert-bg": "rgba(0,0,0,0.45)",
        "--alert-blur": "18px",
        "--alert-border": "rgba(255,255,255,0.08)",
        "--alert-shadow": "0 10px 30px rgba(0,0,0,0.6)",
        "--username-size": "1.4em"
    },
    neon: {
        "--alert-bg": "rgba(0,0,0,0.25)",
        "--alert-blur": "20px",
        "--alert-border": "rgba(255,255,255,0.15)",
        "--alert-shadow": "0 0 25px #00ffff88",
        "--alert-radius": "18px"
    },
    cyberpunk: {
        "--alert-bg": "rgba(10,0,20,0.55)",
        "--alert-blur": "22px",
        "--alert-border": "rgba(255,0,255,0.25)",
        "--alert-shadow": "0 0 30px #ff00ff55",
        "--username-size": "1.45em"
    },
    pastel: {
        "--alert-bg": "rgba(255,255,255,0.35)",
        "--alert-blur": "16px",
        "--alert-border": "rgba(255,255,255,0.25)",
        "--alert-shadow": "0 10px 20px rgba(0,0,0,0.25)",
        "--alert-radius": "24px"
    },
    minimal: {
        "--alert-bg": "rgba(255,255,255,0.15)",
        "--alert-blur": "10px",
        "--alert-border": "rgba(255,255,255,0.1)",
        "--alert-shadow": "none",
        "--alert-radius": "12px"
    }
};

/**
 * Applies theme variables from URL params or presets.
 */
function applyTheme() {
    const root = document.documentElement;
    const params = new URLSearchParams(window.location.search);

    // Apply preset if provided
    if (params.has("theme")) {
        const preset = params.get("theme").toLowerCase();
        if (THEME_PRESETS[preset]) {
            Object.entries(THEME_PRESETS[preset]).forEach(([key, value]) => {
                root.style.setProperty(key, value);
            });
        }
    }

    // Apply direct overrides
    params.forEach((value, key) => {
        if (key.startsWith("--")) {
            root.style.setProperty(key, value);
        }
    });
}

// Apply theme on load
window.addEventListener("load", applyTheme);

/* ================================
 * 3. UNIFIED EVENT MODEL (UEM)
 * ================================ */

/**
 * Unified Event Model (UEM) shape:
 *
 * {
 *   platform: "twitch" | "youtube" | "kick" | ...,
 *   type: "sub" | "follow" | "donation" | "raid" | ...,
 *   subtype: "prime" | "tier1" | "gift" | ...,
 *   tags: string[],
 *   username: string,
 *   description: string,
 *   attribute: string,
 *   message: string,
 *   avatar: string,
 *   raw: any
 * }
 */

let eventBuffer = [];   // rolling buffer of latest events (for index/list modes)
let alertQueue = [];    // queue for classic/stacked alert rendering

/**
 * Pushes a UEM event into the rolling buffer.
 * Newest events are at index 0.
 */
function pushToEventBuffer(event) {
	eventBuffer.unshift(event);
	if (eventBuffer.length > EVENT_BUFFER_LIMIT) {
		eventBuffer.pop();
	}
}

/**
 * Filters events based on URL parameters and optional tag filters.
 */
function filterEvents(events) {
	return events.filter(ev => {
		if (PARAM_PLATFORM && ev.platform !== PARAM_PLATFORM) return false;
		if (PARAM_TYPE && ev.type && ev.type !== PARAM_TYPE) return false;
		if (PARAM_TAG && (!ev.tags || !ev.tags.includes(PARAM_TAG))) return false;
		if (PARAM_EXCLUDE_TAG && ev.tags && ev.tags.includes(PARAM_EXCLUDE_TAG)) return false;
		return true;
	});
}

/**
 * Central entry point for all events in UEM form.
 * - Pushes to buffer
 * - Decides rendering mode (index/list/alert)
 */
function handleEvent(uemEvent) {
	// Always keep history in buffer
	pushToEventBuffer(uemEvent);

	// Fixed index mode: render a single event by index
	if (PARAM_INDEX !== null) {
		Renderer.renderIndexedEvent();
		return;
	}

	// List mode: render N latest events
	if (PARAM_LIST !== null) {
		Renderer.renderEventList();
		return;
	}

	// Normal alert mode (classic/stacked)
	AlertQueue.enqueue(uemEvent);
}

/* ================================
 * 4. ALERT QUEUE MANAGER
 * ================================ */

const AlertQueue = {
	queue: [],
	isShowing: false,

	/**
	 * Adds an event to the queue and triggers processing.
	 */
	enqueue(event) {
		this.queue.push(event);
		this.process();
	},

	/**
	 * Processes the queue depending on ALERT_MODE.
	 */
	process() {
		if (ALERT_MODE === "stacked") {
			const DISPLAY_TIME = 5000;
			const EXIT_TIME = 500;

			setTimeout(() => {
				el.classList.add("exit");
				setTimeout(() => el.remove(), EXIT_TIME);
			}, DISPLAY_TIME);
		}
		else if (ALERT_MODE === "classic") {
			if (this.isShowing) return;
			if (this.queue.length === 0) return;

			const next = this.queue.shift();
			this.isShowing = true;
			Renderer.showAlert(next, () => {
				this.isShowing = false;
				this.process();
			});
		} 
	}
};

/* ================================
 * 5. RENDERER
 * ================================ */

const Renderer = {
	/**
	 * Returns the main container element for alerts.
	 */
	getContainer() {
		return document.getElementById("alert-container");
	},

	/**
	 * Renders a single event in "indexed" mode (PARAM_INDEX).
	 */
	renderIndexedEvent() {
		const container = this.getContainer();
		if (!container) return;

		container.innerHTML = "";

		const filtered = filterEvents(eventBuffer);
		if (filtered.length === 0) return;

		const idx = Math.min(Math.max(0, PARAM_INDEX), filtered.length - 1);
		const alert = filtered[idx];
		if (!alert) return;

		const el = this.buildAlertElement(alert);
		el.classList.add("visible");
		container.appendChild(el);
	},

	/**
	 * Renders a list of the latest N events (PARAM_LIST).
	 */
	renderEventList() {
		const container = this.getContainer();
		if (!container) return;

		container.innerHTML = "";

		const filtered = filterEvents(eventBuffer);
		if (filtered.length === 0) return;

		const count = Math.max(1, PARAM_LIST);
		filtered.slice(0, count).forEach(alert => {
			const el = this.buildAlertElement(alert);
			el.classList.add("visible");
			container.appendChild(el);
		});
	},

	/**
	 * Shows a single alert in alert mode (classic/stacked).
	 * onComplete is called when the alert finishes its animation (classic mode).
	 */
	showAlert(alert, onComplete) {
		const container = this.getContainer();
		if (!container) return;

		const el = this.buildAlertElement(alert);

		// Apply animation + direction classes
		el.classList.add("alert-item");
		el.classList.add(`anim-${ALERT_ANIMATION}`);
		el.classList.add(`dir-${ALERT_DIRECTION}`);

		container.appendChild(el);

		// Force reflow to ensure CSS animations trigger
		void el.offsetWidth;

		el.classList.add("visible");

		// If in index/list mode → DO NOT auto-remove
		if (PARAM_INDEX !== null || PARAM_LIST !== null) {
			return;
		}

		// Classic mode: show one at a time
		if (ALERT_MODE === "classic") {
			const DISPLAY_TIME = 5000;
			const EXIT_TIME = 500;

			setTimeout(() => {
				el.classList.add("exit");
				setTimeout(() => {
					el.remove();
					if (typeof onComplete === "function") {
						onComplete();
					}
				}, EXIT_TIME);
			}, DISPLAY_TIME);

			return;
		}

		// Stacked mode: show many, each with its own timeout
		if (ALERT_MODE === "stacked") {
			const DISPLAY_TIME = 5000;
			const EXIT_TIME = 500;

			setTimeout(() => {
				el.classList.add("exit");
				setTimeout(() => el.remove(), EXIT_TIME);
			}, DISPLAY_TIME);
		}
	},

	/**
	 * Builds the DOM element for a single alert based on UEM.
	 */
	buildAlertElement(alert) {
		const el = document.createElement("div");
		el.classList.add("alert-item");
		if (PARAM_THEME_MODE === "platform") {
			el.classList.add(`platform-${alert.platform}`);
		}
		el.classList.add(`type-${alert.type}`);
		if (alert.subtype) {
			el.classList.add(`subtype-${alert.subtype}`);
		}

		// Avatar
		const avatarWrapper = document.createElement("div");
		avatarWrapper.classList.add("alert-avatar-wrapper");

		if (alert.avatar) {
			const avatarImg = document.createElement("img");
			avatarImg.classList.add("alert-avatar");
			avatarImg.src = alert.avatar;
			avatarImg.alt = `${alert.username} avatar`;
			avatarWrapper.appendChild(avatarImg);
		}

		// Text content
		const content = document.createElement("div");
		content.classList.add("alert-content");

		const usernameEl = document.createElement("div");
		usernameEl.classList.add("alert-username");
		usernameEl.innerHTML = alert.username || "";

		const descriptionEl = document.createElement("div");
		descriptionEl.classList.add("alert-description");
		descriptionEl.innerHTML = alert.description || "";

		const attributeEl = document.createElement("div");
		attributeEl.classList.add("alert-attribute");
		attributeEl.innerHTML = alert.attribute || "";

		const messageEl = document.createElement("div");
		messageEl.classList.add("alert-message");
		messageEl.innerHTML = alert.message || "";

		content.appendChild(usernameEl);
		content.appendChild(descriptionEl);
		if (alert.attribute) content.appendChild(attributeEl);
		if (alert.message) content.appendChild(messageEl);

		el.appendChild(avatarWrapper);
		el.appendChild(content);

		return el;
	}
};

/* ================================
 * 6. STREAMER.BOT CLIENT
 * ================================ */

const client = new StreamerbotClient({
	host: SB_SERVER_ADDRESS,
	port: SB_SERVER_PORT,

	onConnect: (data) => {
		console.log(`Streamer.bot successfully connected to ${SB_SERVER_ADDRESS}:${SB_SERVER_PORT}`);
		console.debug(data);
		// External function, assumed to exist
		SetConnectionStatus(true);
	},

	onDisconnect: () => {
		console.error(`Streamer.bot disconnected from ${SB_SERVER_ADDRESS}:${SB_SERVER_PORT}`);
		// External function, assumed to exist
		SetConnectionStatus(false);
	}
});

/**
 * Each event from Streamer.bot is now:
 *   raw data -> platform adapter -> UEM -> handleEvent()
 */

/* ---------- TWITCH ---------- */

client.on('Twitch.Follow', async (response) => {
	console.debug(response.data);
	const uem = await TwitchFollowAdapter(response.data);
	if (uem) handleEvent(uem);
});

client.on('Twitch.Cheer', async (response) => {
	console.debug(response.data);
	const uem = await TwitchCheerAdapter(response.data);
	if (uem) handleEvent(uem);
});

client.on('Twitch.Sub', async (response) => {
	console.debug(response.data);
	const uem = await TwitchSubAdapter(response.data);
	if (uem) handleEvent(uem);
});

client.on('Twitch.ReSub', async (response) => {
	console.debug(response.data);
	const uem = await TwitchResubAdapter(response.data);
	if (uem) handleEvent(uem);
});

client.on('Twitch.GiftSub', async (response) => {
	console.debug(response.data);
	const uem = await TwitchGiftSubAdapter(response.data);
	if (uem) handleEvent(uem);
});

client.on('Twitch.GiftBomb', async (response) => {
	console.debug(response.data);
	const uem = await TwitchGiftBombAdapter(response.data);
	if (uem) handleEvent(uem);
});

client.on('Twitch.RewardRedemption', async (response) => {
	console.debug(response.data);
	const uem = await TwitchRewardRedemptionAdapter(response.data);
	if (uem) handleEvent(uem);
});

client.on('Twitch.Raid', async (response) => {
	console.debug(response.data);
	const uem = await TwitchRaidAdapter(response.data);
	if (uem) handleEvent(uem);
});

client.on('Twitch.WatchStreak', async (response) => {
	console.debug(response.data);
	const uem = await TwitchWatchStreakAdapter(response.data);
	if (uem) handleEvent(uem);
});

/* ---------- YOUTUBE ---------- */

client.on('YouTube.SuperChat', (response) => {
	console.debug(response.data);
	const uem = YouTubeSuperChatAdapter(response.data);
	if (uem) handleEvent(uem);
});

client.on('YouTube.SuperSticker', (response) => {
	console.debug(response.data);
	const uem = YouTubeSuperStickerAdapter(response.data);
	if (uem) handleEvent(uem);
});

client.on('YouTube.NewSponsor', (response) => {
	console.debug(response.data);
	const uem = YouTubeNewSponsorAdapter(response.data);
	if (uem) handleEvent(uem);
});

client.on('YouTube.GiftMembershipReceived', (response) => {
	console.debug(response.data);
	const uem = YouTubeGiftMembershipReceivedAdapter(response.data);
	if (uem) handleEvent(uem);
});

/* ---------- STREAMLABS / STREAMELEMENTS ---------- */

client.on('Streamlabs.Donation', (response) => {
	console.debug(response.data);
	const uem = StreamlabsDonationAdapter(response.data);
	if (uem) handleEvent(uem);
});

client.on('StreamElements.Tip', (response) => {
	console.debug(response.data);
	const uem = StreamElementsTipAdapter(response.data);
	if (uem) handleEvent(uem);
});

/* ---------- PATREON ---------- */

client.on('Patreon.PledgeCreated', (response) => {
	console.debug(response.data);
	const uem = PatreonPledgeCreatedAdapter(response.data);
	if (uem) handleEvent(uem);
});

/* ---------- KOFI ---------- */

client.on('Kofi.Donation', (response) => {
	console.debug(response.data);
	const uem = KofiDonationAdapter(response.data);
	if (uem) handleEvent(uem);
});

client.on('Kofi.Subscription', (response) => {
	console.debug(response.data);
	const uem = KofiSubscriptionAdapter(response.data);
	if (uem) handleEvent(uem);
});

client.on('Kofi.Resubscription', (response) => {
	console.debug(response.data);
	const uem = KofiResubscriptionAdapter(response.data);
	if (uem) handleEvent(uem);
});

client.on('Kofi.ShopOrder', (response) => {
	console.debug(response.data);
	const uem = KofiShopOrderAdapter(response.data);
	if (uem) handleEvent(uem);
});

/* ---------- TIPEEE STREAM ---------- */

client.on('TipeeeStream.Donation', (response) => {
	console.debug(response.data);
	const uem = TipeeeStreamDonationAdapter(response.data);
	if (uem) handleEvent(uem);
});

/* ---------- FOURTHWALL ---------- */

client.on('Fourthwall.OrderPlaced', (response) => {
	console.debug(response.data);
	const uem = FourthwallOrderPlacedAdapter(response.data);
	if (uem) handleEvent(uem);
});

client.on('Fourthwall.Donation', (response) => {
	console.debug(response.data);
	const uem = FourthwallDonationAdapter(response.data);
	if (uem) handleEvent(uem);
});

client.on('Fourthwall.SubscriptionPurchased', (response) => {
	console.debug(response.data);
	const uem = FourthwallSubscriptionPurchasedAdapter(response.data);
	if (uem) handleEvent(uem);
});

client.on('Fourthwall.GiftPurchase', (response) => {
	console.debug(response.data);
	const uem = FourthwallGiftPurchaseAdapter(response.data);
	if (uem) handleEvent(uem);
});

client.on('Fourthwall.GiftDrawStarted', (response) => {
	console.debug(response.data);
	const uem = FourthwallGiftDrawStartedAdapter(response.data);
	if (uem) handleEvent(uem);
});

client.on('Fourthwall.GiftDrawEnded', (response) => {
	console.debug(response.data);
	const uem = FourthwallGiftDrawEndedAdapter(response.data);
	if (uem) handleEvent(uem);
});

/* ================================
 * 7. TIKFINITY / TIKTOK CLIENT
 * ================================ */

let tikfinityWebsocket = null;

function TikfinityConnect() {
	if (!ENABLE_TIKTOK) return;
	if (tikfinityWebsocket) return; // Already connected

	tikfinityWebsocket = new WebSocket("ws://localhost:21213/");

	tikfinityWebsocket.onopen = function () {
		console.log(`TikFinity successfully connected...`);
	};

	tikfinityWebsocket.onclose = function () {
		console.error(`TikFinity disconnected...`);
		tikfinityWebsocket = null;
		setTimeout(TikfinityConnect, 1000); // Schedule a reconnect attempt
	};

	tikfinityWebsocket.onerror = function () {
		console.error(`TikFinity failed for some reason...`);
		tikfinityWebsocket = null;
		setTimeout(TikfinityConnect, 1000); // Schedule a reconnect attempt
	};

	tikfinityWebsocket.onmessage = function (response) {
		let payload = JSON.parse(response.data);

		let event = payload.event;
		let data = payload.data;

		console.debug('Event: ' + event);

		switch (event) {
			case 'gift': {
				const uem = TikTokGiftAdapter(data);
				if (uem) handleEvent(uem);
				break;
			}
			case 'subscribe': {
				const uem = TikTokSubscribeAdapter(data);
				if (uem) handleEvent(uem);
				break;
			}
		}
	};
}

// Try connect when window is loaded
window.addEventListener('load', TikfinityConnect);

/* ================================
 * 8. PLATFORM ADAPTERS (UEM)
 * ================================ */
/**
 * Each adapter:
 *   - validates feature flag
 *   - maps raw data -> UEM
 *   - may use external helpers (GetAvatar, EscapeRegExp, etc.)
 */

/* ---------- TWITCH ADAPTERS ---------- */

async function TwitchFollowAdapter(data) {
	if (!ENABLE_TWITCH) return null;

	const username = data.user_name;
	const avatarURL = await GetAvatar(username, "twitch");

	return {
		platform: "twitch",
		type: "follow",
		subtype: "",
		tags: ["twitch", "follow"],
		username: username,
		description: "followed",
		attribute: "",
		message: "",
		avatar: avatarURL,
		raw: data
	};
}

async function TwitchCheerAdapter(data) {
	if (!ENABLE_TWITCH) return null;

	let username = data.message.displayName;
	let bits = data.bits;
	let message = data.message.message;

	const avatarURL = await GetAvatar(username, "twitch");

	// Render emotes
	for (let i in data.emotes) {
		const emoteElement = `<img src="${data.emotes[i].imageUrl}" class="emote"/>`;
		const emoteName = EscapeRegExp(data.emotes[i].name);

		let regexPattern = emoteName;

		// Word-only emotes: use word boundaries
		if (/^\w+$/.test(emoteName)) {
			regexPattern = `\\b${emoteName}\\b`;
		} else {
			// Non-word emotes: ensure proper boundaries
			regexPattern = `(?:^|[^\\w])${emoteName}(?:$|[^\\w])`;
		}

		const regex = new RegExp(regexPattern, "g");
		message = message.replace(regex, emoteElement);
	}

	// Render cheermotes
	for (let i in data.cheerEmotes) {
		const bitsValue = data.cheerEmotes[i].bits;
		const imageUrl = data.cheerEmotes[i].imageUrl;
		const name = data.cheerEmotes[i].name;
		const cheerEmoteElement = `<img src="${imageUrl}" class="emote"/>`;
		const bitsElements = `<span class="bits">${bitsValue}</span>`;
		message = message.replace(new RegExp(`\\b${name}${bitsValue}\\b`, "i"), cheerEmoteElement + bitsElements);
	}

	return {
		platform: "twitch",
		type: "cheer",
		subtype: "",
		tags: ["twitch", "cheer"],
		username: username,
		description: `cheered ${bits} bits`,
		attribute: "",
		message: message,
		avatar: avatarURL,
		raw: data
	};
}

async function TwitchSubAdapter(data) {
	if (!ENABLE_TWITCH) return null;

	const username = data.user.name;
	const subTier = data.sub_tier;
	const isPrime = data.is_prime;
	const avatarURL = await GetAvatar(username, "twitch");

	const isPrimeSub = !!isPrime;
	const subtype = isPrimeSub ? "prime" : `tier${subTier.charAt(0)}`;
	const description = isPrimeSub
		? "used their Prime Sub"
		: `subscribed with Tier ${subTier.charAt(0)}`;

	return {
		platform: "twitch",
		type: "sub",
		subtype,
		tags: ["twitch", "sub", subtype],
		username,
		description,
		attribute: "",
		message: "",
		avatar: avatarURL,
		raw: data
	};
}

async function TwitchResubAdapter(data) {
	if (!ENABLE_TWITCH) return null;

	const username = data.user.name;
	const subTier = data.subTier;
	const isPrime = data.isPrime;
	const cumulativeMonths = data.cumulativeMonths;
	const message = data.text || "";
	const avatarURL = await GetAvatar(username, "twitch");

	const isPrimeSub = !!isPrime;
	const subtype = isPrimeSub ? "prime" : `tier${subTier.charAt(0)}`;
	const description = isPrimeSub
		? "used their Prime Sub"
		: `resubscribed with Tier ${subTier.charAt(0)}`;

	return {
		platform: "twitch",
		type: "resub",
		subtype,
		tags: ["twitch", "sub", "resub", subtype],
		username,
		description,
		attribute: `${cumulativeMonths} months`,
		message,
		avatar: avatarURL,
		raw: data
	};
}

async function TwitchGiftSubAdapter(data) {
	if (!ENABLE_TWITCH) return null;

	const username = data.user.name;
	const subTier = data.subTier;
	const recipient = data.recipient.name;
	const cumulativeTotal = data.cumlativeTotal;
	const fromCommunitySubGift = data.fromCommunitySubGift;

	// Don't post alerts for gift bombs (handled separately)
	if (fromCommunitySubGift) return null;

	const avatarURL = await GetAvatar(username, "twitch");

	let messageText = "";
	if (cumulativeTotal > 0) {
		messageText = `They've gifted ${cumulativeTotal} subs in total!`;
	}

	return {
		platform: "twitch",
		type: "giftsub",
		subtype: `tier${subTier.charAt(0)}`,
		tags: ["twitch", "sub", "gift"],
		username,
		description: `gifted a Tier ${subTier.charAt(0)} subscription`,
		attribute: `to ${recipient}`,
		message: messageText,
		avatar: avatarURL,
		raw: data
	};
}

async function TwitchGiftBombAdapter(data) {
	if (!ENABLE_TWITCH) return null;

	const username = data.user.name;
	const login = data.user.login;
	const gifts = data.recipients.length;
	const totalGifts = data.cumulative_total;
	const subTier = data.sub_tier.charAt(0);

	const avatarURL = await GetAvatar(login, "twitch");

	let message = "";
	if (totalGifts > 0) {
		message = `They've gifted ${totalGifts} subs in total!`;
	}

	return {
		platform: "twitch",
		type: "giftsub",
		subtype: `tier${subTier}`,
		tags: ["twitch", "sub", "gift", "bomb"],
		username,
		description: `gifted ${gifts} Tier ${subTier} subs!`,
		attribute: "",
		message,
		avatar: avatarURL,
		raw: data
	};
}

async function TwitchRewardRedemptionAdapter(data) {
	if (!ENABLE_TWITCH) return null;

	const username = data.user_name;
	const rewardName = data.reward.title;
	const cost = data.reward.cost;
	const userInput = data.user_input;
	const channelPointIcon = `<img src="icons/badges/twitch-channel-point.png" class="platform" style="height: 1em"/>`;

	const avatarURL = await GetAvatar(data.user_login, "twitch");

	return {
		platform: "twitch",
		type: "reward",
		subtype: "",
		tags: ["twitch", "reward"],
		username: `${username} redeemed`,
		description: `${rewardName} ${channelPointIcon} ${cost}`,
		attribute: "",
		message: userInput || "",
		avatar: avatarURL,
		raw: data
	};
}

async function TwitchRaidAdapter(data) {
	if (!ENABLE_TWITCH) return null;

	const username = data.from_broadcaster_user_login;
	const viewers = data.viewers;
	const avatarURL = await GetAvatar(username, "twitch");

	return {
		platform: "twitch",
		type: "raid",
		subtype: "",
		tags: ["twitch", "raid"],
		username,
		description: `is raiding with a party of ${viewers}`,
		attribute: "",
		message: "",
		avatar: avatarURL,
		raw: data
	};
}

async function TwitchWatchStreakAdapter(data) {
	if (!ENABLE_TWITCH) return null;

	const username = data.displayName;
	const watchStreak = data.watchStreak;
	const avatarURL = await GetAvatar(data.userName, "twitch");

	return {
		platform: "twitch",
		type: "watchstreak",
		subtype: "",
		tags: ["twitch", "watchstreak"],
		username,
		description: `is currently on a ${watchStreak} stream streak!`,
		attribute: "",
		message: "",
		avatar: avatarURL,
		raw: data
	};
}

/* ---------- YOUTUBE ADAPTERS ---------- */

function YouTubeSuperChatAdapter(data) {
	if (!ENABLE_YOUTUBE) return null;

	const avatarURL = data.user.profileImageUrl;

	return {
		platform: "youtube",
		type: "superchat",
		subtype: "",
		tags: ["youtube", "superchat"],
		username: data.user.name,
		description: `sent a Super Chat (${data.amount})`,
		attribute: "",
		message: data.message || "",
		avatar: avatarURL,
		raw: data
	};
}

function YouTubeSuperStickerAdapter(data) {
	if (!ENABLE_YOUTUBE) return null;

	const avatarURL = FindFirstImageUrl(data);

	return {
		platform: "youtube",
		type: "supersticker",
		subtype: "",
		tags: ["youtube", "supersticker"],
		username: data.user.name,
		description: `sent a Super Sticker (${data.amount})`,
		attribute: "",
		message: "",
		avatar: avatarURL,
		raw: data
	};
}

function YouTubeNewSponsorAdapter(data) {
	if (!ENABLE_YOUTUBE) return null;

	const avatarURL = data.user.profileImageUrl;

	return {
		platform: "youtube",
		type: "sponsorsub",
		subtype: "",
		tags: ["youtube", "sub"],
		username: `⭐ New ${data.levelName}`,
		description: `Welcome ${data.user.name}!`,
		attribute: "",
		message: "",
		avatar: avatarURL,
		raw: data
	};
}

function YouTubeGiftMembershipReceivedAdapter(data) {
	if (!ENABLE_YOUTUBE) return null;

	const avatarURL = data.user.profileImageUrl;

	return {
		platform: "youtube",
		type: "sponsorsub",
		subtype: "gift",
		tags: ["youtube", "sub", "gift"],
		username: data.gifter.name,
		description: `gifted a membership`,
		attribute: `to ${data.user.name} (${data.tier})!`,
		message: "",
		avatar: avatarURL,
		raw: data
	};
}

/* ---------- STREAMLABS / STREAMELEMENTS ADAPTERS ---------- */

function StreamlabsDonationAdapter(data) {
	if (!ENABLE_STREAMLABS) return null;

	const donater = data.from;
	const formattedAmount = data.formattedAmount;
	const currency = data.currency;
	const message = data.message || "";

	return {
		platform: "streamlabs",
		type: "donation",
		subtype: "",
		tags: ["donation", "streamlabs"],
		username: donater,
		description: `donated ${currency}${formattedAmount}`,
		attribute: "",
		message,
		avatar: "",
		raw: data
	};
}

function StreamElementsTipAdapter(data) {
	if (!ENABLE_STREAMELEMENTS) return null;

	const donater = data.username;
	const formattedAmount = `$${data.amount}`;
	const currency = data.currency;
	const message = data.message || "";

	return {
		platform: "streamelements",
		type: "donation",
		subtype: "",
		tags: ["donation", "streamelements"],
		username: donater,
		description: `donated ${currency}${formattedAmount}`,
		attribute: "",
		message,
		avatar: "",
		raw: data
	};
}

/* ---------- PATREON ADAPTER ---------- */

function PatreonPledgeCreatedAdapter(data) {
	if (!ENABLE_PATREON) return null;

	const user = data.attributes.full_name;
	const amount = (data.attributes.will_pay_amount_cents / 100).toFixed(2);

	return {
		platform: "patreon",
		type: "sub",
		subtype: "",
		tags: ["patreon", "sub"],
		username: user,
		description: `joined Patreon ($${amount})`,
		attribute: "",
		message: "",
		avatar: "icons/platforms/patreon.png",
		raw: data
	};
}

/* ---------- KOFI ADAPTERS ---------- */

function KofiDonationAdapter(data) {
	if (!ENABLE_KOFI) return null;

	const user = data.from;
	const amount = data.amount;
	const currency = data.currency;
	const message = data.message || "";

	let description = "";
	if (currency === "USD") {
		description = `donated $${amount}`;
	} else {
		description = `donated ${currency} ${amount}`;
	}

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

function KofiSubscriptionAdapter(data) {
	if (!ENABLE_KOFI) return null;

	const user = data.from;
	const amount = data.amount;
	const currency = data.currency;
	const message = data.message || "";

	let description = "";
	if (currency === "USD") {
		description = `subscribed ($${amount})`;
	} else {
		description = `subscribed (${currency} ${amount})`;
	}

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

function KofiResubscriptionAdapter(data) {
	if (!ENABLE_KOFI) return null;

	const user = data.from;
	const tier = data.tier;
	const message = data.message || "";

	return {
		platform: "kofi",
		type: "sub",
		subtype: "resub",
		tags: ["kofi", "sub", "resub"],
		username: user,
		description: `subscribed (${tier})`,
		attribute: "",
		message,
		avatar: "icons/platforms/kofi.png",
		raw: data
	};
}

function KofiShopOrderAdapter(data) {
	if (!ENABLE_KOFI) return null;

	const user = data.from;
	const amount = data.amount;
	const currency = data.currency;
	const message = data.message || "";
	const itemTotal = data.items.length;

	let formattedAmount = "";
	if (amount === 0) {
		formattedAmount = "";
	} else if (currency === "USD") {
		formattedAmount = `$${amount}`;
	} else {
		formattedAmount = `${currency} ${amount}`;
	}

	return {
		platform: "kofi",
		type: "shoporder",
		subtype: "",
		tags: ["kofi", "shoporder"],
		username: user,
		description: `ordered ${itemTotal} item(s) on Ko-fi`,
		attribute: formattedAmount,
		message,
		avatar: "icons/platforms/kofi.png",
		raw: data
	};
}

/* ---------- TIPEEE STREAM ADAPTER ---------- */

function TipeeeStreamDonationAdapter(data) {
	if (!ENABLE_TIPPEEESTREAM) return null;

	const user = data.username;
	const amount = data.amount;
	const currency = data.currency;
	const message = data.message || "";

	let description = "";
	if (currency === "USD") {
		description = `donated $${amount}`;
	} else {
		description = `donated ${currency} ${amount}`;
	}

	return {
		platform: "tipeeeStream",
		type: "donation",
		subtype: "",
		tags: ["tipeeeStream", "donation"],
		username: user,
		description,
		attribute: "",
		message,
		avatar: "icons/platforms/tipeeeStream.png",
		raw: data
	};
}

/* ---------- FOURTHWALL ADAPTERS ---------- */

function FourthwallOrderPlacedAdapter(data) {
	if (!ENABLE_FOURTHWALL) return null;

	let user = data.username;
	const orderTotal = data.total;
	const currency = data.currency;
	const item = data.variants[0].name;
	const itemsOrdered = data.variants.length;
	const message = DecodeHTMLString(data.statmessageus);
	const itemImageUrl = data.variants[0].image;

	if (user === undefined) user = "Someone";

	let attributeText = "";

	if (itemsOrdered > 1) {
		attributeText += `and ${itemsOrdered - 1} other item(s)!`;
	}

	if (orderTotal === 0) {
		attributeText += ``;
	} else if (currency === "USD") {
		attributeText += ` ($${orderTotal})`;
	} else {
		attributeText += ` (${orderTotal} ${currency})`;
	}

	return {
		platform: "fourthwall",
		type: "shoporder",
		subtype: "",
		tags: ["fourthwall", "shoporder"],
		username: user,
		description: `ordered ${item}`,
		attribute: attributeText,
		message,
		avatar: itemImageUrl,
		raw: data
	};
}

function FourthwallDonationAdapter(data) {
	if (!ENABLE_FOURTHWALL) return null;

	let user = data.username;
	const amount = data.amount;
	const currency = data.currency;
	const message = data.message || "";

	let formattedAmount = "";
	if (currency === "USD") {
		formattedAmount = ` $${amount}`;
	} else {
		formattedAmount = ` ${currency} ${amount}`;
	}

	return {
		platform: "fourthwall",
		type: "donation",
		subtype: "",
		tags: ["fourthwall", "donation"],
		username: user,
		description: `donated${formattedAmount}`,
		attribute: "",
		message,
		avatar: "",
		raw: data
	};
}

function FourthwallSubscriptionPurchasedAdapter(data) {
	if (!ENABLE_FOURTHWALL) return null;

	let user = data.nickname;
	const amount = data.amount;
	const currency = data.currency;

	let formattedAmount = "";
	if (currency === "USD") {
		formattedAmount = ` ($${amount})`;
	} else {
		formattedAmount = ` (${currency} ${amount})`;
	}

	return {
		platform: "fourthwall",
		type: "sub",
		subtype: "",
		tags: ["fourthwall", "sub"],
		username: user,
		description: `subscribed${formattedAmount}`,
		attribute: "",
		message: "",
		avatar: "",
		raw: data
	};
}

function FourthwallGiftPurchaseAdapter(data) {
	if (!ENABLE_FOURTHWALL) return null;

	const total = data.total;
	const currency = data.currency;
	const gifts = data.gifts.length;
	const itemName = data.offer.name;
	const itemImageUrl = data.offer.imageUrl;

	let contents = "";
	let attributesText = "";

	if (gifts > 1) {
		contents += ` ${gifts} x `;
	}

	contents += ` ${itemName}`;

	if (currency === "USD") {
		attributesText = `$${total}`;
	} else {
		attributesText = `${currency}${total}`;
	}

	return {
		platform: "fourthwall",
		type: "gift",
		subtype: "",
		tags: ["fourthwall", "gift"],
		username: `An item has been gifted!`,
		description: `${contents}`,
		attribute: attributesText,
		message: "",
		avatar: itemImageUrl,
		raw: data
	};
}

function FourthwallGiftDrawStartedAdapter(data) {
	if (!ENABLE_FOURTHWALL) return null;

	const durationSeconds = data.durationSeconds;
	const itemName = data.offer.name;

	return {
		platform: "fourthwall",
		type: "gift",
		subtype: "draw-started",
		tags: ["fourthwall", "gift", "giveaway"],
		username: `<span style="font-size: 1.2em">🎁 ${itemName} Giveaway!</span>`,
		description: `Type 'join' in the next ${durationSeconds} seconds for your chance to win!`,
		attribute: "",
		message: "",
		avatar: "",
		raw: data
	};
}

function FourthwallGiftDrawEndedAdapter(data) {
	if (!ENABLE_FOURTHWALL) return null;

	return {
		platform: "fourthwall",
		type: "gift",
		subtype: "draw-ended",
		tags: ["fourthwall", "gift", "giveaway"],
		username: `<span style="font-size: 1.2em">🥳 GIVEAWAY ENDED 🥳</span>`,
		description: `Congratulations ${GetWinnersList(data.gifts)}!`,
		attribute: "",
		message: "",
		avatar: "",
		raw: data
	};
}

/* ---------- KICK ADAPTERS ---------- */

async function KickSubscriptionAdapter(data) {
	if (!ENABLE_KICK) return null;

	const username = data.username;
	const months = data.months;

	let description = "";
	if (months <= 1) {
		description = `just subscribed for the first time!`;
	} else {
		description = `resubscribed!`;
	}

	const attribute = `${months} months`;
	const avatarURL = await GetAvatar(username, "kick");

	return {
		platform: "kick",
		type: "sub",
		subtype: "",
		tags: ["kick", "sub"],
		username,
		description,
		attribute,
		message: "",
		avatar: avatarURL,
		raw: data
	};
}

async function KickGiftedSubscriptionsAdapter(data) {
	if (!ENABLE_KICK) return null;

	const gifter = data.gifter_username;
	const giftedUsers = data.gifted_usernames;

	let description = "";
	let attribute = "";

	if (giftedUsers.length <= 1) {
		description = `gifted a sub to`;
		attribute = `${giftedUsers[0]}`;
	} else {
		description = `gifted ${giftedUsers.length} subscription${giftedUsers.length === 1 ? "" : "s"} to the community!`;
	}

	const avatarURL = await GetAvatar(gifter, "kick");

	return {
		platform: "kick",
		type: "sub",
		subtype: "gift",
		tags: ["kick", "sub", "gift"],
		username: gifter,
		description,
		attribute,
		message: "",
		avatar: avatarURL,
		raw: data
	};
}

async function KickRewardRedeemedAdapter(data) {
	if (!ENABLE_KICK) return null;

	const username = data.username;
	const rewardName = data.reward_title;
	const userInput = data.user_input;
	const avatarURL = await GetAvatar(username, "kick");

	return {
		platform: "kick",
		type: "reward",
		subtype: "",
		tags: ["kick", "reward"],
		username: `${username} redeemed`,
		description: `${rewardName}`,
		attribute: "",
		message: userInput || "",
		avatar: avatarURL,
		raw: data
	};
}

async function KickStreamHostAdapter(data) {
	if (!ENABLE_KICK) return null;

	const username = data.host_username;
	const viewers = data.number_viewers;
	const avatarURL = await GetAvatar(username, "kick");

	return {
		platform: "kick",
		type: "raid",
		subtype: "",
		tags: ["kick", "raid"],
		username,
		description: `is raiding with a party of ${viewers}`,
		attribute: "",
		message: "",
		avatar: avatarURL,
		raw: data
	};
}

async function KickKicksGiftedAdapter(data) {
	if (!ENABLE_KICK) return null;

	const username = data.sender.username;
	const kickKicksIcon = `<img src="icons/badges/kick-kicks.svg" style="height: 0.8em"/>`;
	const avatarURL = `https://files.kick.com/kicks/gifts/${data.gift.gift_id.replace("_", "-")}.webp`;

	return {
		platform: "kick",
		type: "kicks",
		subtype: "",
		tags: ["kick", "kicks"],
		username,
		description: `sent ${kickKicksIcon} ${data.gift.amount}`,
		attribute: "",
		message: data.message || "",
		avatar: avatarURL,
		raw: data
	};
}

/* ---------- TIKTOK ADAPTERS ---------- */

function TikTokGiftAdapter(data) {
	if (!ENABLE_TIKTOK) return null;

	// Streak in progress => ignore (temporary)
	if (data.giftType === 1 && !data.repeatEnd) {
		console.debug(`${data.uniqueId} is sending gift ${data.giftName} x${data.repeatCount}`);
		return null;
	}

	console.debug(`${data.uniqueId} has sent gift ${data.giftName} x${data.repeatCount}`);

	const username = data.nickname;
	const giftImg = `<img src=${data.giftPictureUrl} style="height: 1em"/>`;

	return {
		platform: "tiktok",
		type: "gift",
		subtype: "",
		tags: ["tiktok", "gift"],
		username,
		description: `sent ${giftImg}x${data.repeatCount}`,
		attribute: "",
		message: "",
		avatar: "icons/platforms/tiktok.png",
		raw: data
	};
}

function TikTokSubscribeAdapter(data) {
	if (!ENABLE_TIKTOK) return null;

	const username = data.nickname;

	return {
		platform: "tiktok",
		type: "sub",
		subtype: "",
		tags: ["tiktok", "sub"],
		username,
		description: `subscribed on TikTok`,
		attribute: "",
		message: "",
		avatar: "icons/platforms/tiktok.png",
		raw: data
	};
}

/* ================================
 * 9. HELPER FUNCTIONS
 * ================================ */

/**
 * Recursively finds the first "imageUrl" property in a nested object.
 * (Yes, this was originally "Gemini code" – now cleaned up.)
 */
function FindFirstImageUrl(jsonObject) {
	if (typeof jsonObject !== "object" || jsonObject === null) {
		return null;
	}

	function iterate(obj) {
		if (Array.isArray(obj)) {
			for (const item of obj) {
				const result = iterate(item);
				if (result) return result;
			}
			return null;
		}

		for (const key in obj) {
			if (!Object.prototype.hasOwnProperty.call(obj, key)) continue;

			if (key === "imageUrl") {
				return obj[key];
			}

			if (typeof obj[key] === "object" && obj[key] !== null) {
				const result = iterate(obj[key]);
				if (result) return result;
			}
		}
		return null;
	}

	return iterate(jsonObject);
}

/**
 * Builds a human-readable winners list from Fourthwall gifts.
 */
function GetWinnersList(gifts) {
	const winners = gifts.map(gift => gift.winner);
	const numWinners = winners.length;

	if (numWinners === 0) {
		return "";
	} else if (numWinners === 1) {
		return winners[0];
	} else if (numWinners === 2) {
		return `${winners[0]} and ${winners[1]}`;
	} else {
		const lastWinner = winners.pop();
		const secondLastWinner = winners.pop();
		return `${winners.join(", ")}, ${secondLastWinner} and ${lastWinner}`;
	}
}

/**
 * NOTE:
 * - GetAvatar(username, platform)
 * - EscapeRegExp(str)
 * - DecodeHTMLString(str)
 * - SetConnectionStatus(bool)
 *
 * are assumed to be defined elsewhere in the widget framework.
 */

/****************************************************
 * DEBUG PANEL (toggle with ?debug=1)
 ****************************************************/

function initDebugPanel() {
    const params = new URLSearchParams(window.location.search);
    if (!params.has("debug")) return;

    const panel = document.createElement("div");
    panel.id = "debug-panel";
    panel.style.position = "fixed";
    panel.style.top = "10px";
    panel.style.right = "10px";
    panel.style.width = "320px";
    panel.style.maxHeight = "80vh";
    panel.style.overflow = "auto";
    panel.style.background = "rgba(0,0,0,0.65)";
    panel.style.backdropFilter = "blur(10px)";
    panel.style.border = "1px solid rgba(255,255,255,0.15)";
    panel.style.borderRadius = "12px";
    panel.style.padding = "12px";
    panel.style.color = "#fff";
    panel.style.fontFamily = "Inter, sans-serif";
    panel.style.zIndex = "99999";

    panel.innerHTML = `
        <h3 style="margin-top:0;">Widget Debug Panel</h3>
        <button id="dbg-test-alert" style="margin-bottom:8px;">Push Test Event</button>
        <button id="dbg-clear" style="margin-bottom:8px;">Clear Buffer</button>
        <pre id="dbg-buffer" style="white-space:pre-wrap;font-size:0.8em;"></pre>
    `;

    document.body.appendChild(panel);

    document.getElementById("dbg-test-alert").onclick = () => {
        WidgetAPI.pushEvent({
            platform: "twitch",
            type: "sub",
            subtype: "prime",
            tags: ["test", "debug"],
            username: "DebugUser",
            description: "used their Prime Sub",
            attribute: "12 months",
            message: "This is a debug message",
            avatar: `https://placekittens.com/${100 + Math.floor(Math.random()*50)}/${100 + Math.floor(Math.random()*50)}`,
            raw: {}
        });
        updateDebugBuffer();
    };

    document.getElementById("dbg-clear").onclick = () => {
        WidgetAPI.clearBuffer();
        updateDebugBuffer();
    };

    function updateDebugBuffer() {
        document.getElementById("dbg-buffer").textContent =
            JSON.stringify(WidgetAPI.getBuffer(), null, 2);
    }

    setInterval(updateDebugBuffer, 1000);
}

window.addEventListener("load", initDebugPanel);

/****************************************************
 * LIVE CSS INJECTION (for Test Harness)
 ****************************************************/

function applyLiveCSS(css) {
    let styleTag = document.getElementById("live-css");
    if (!styleTag) {
        styleTag = document.createElement("style");
        styleTag.id = "live-css";
        document.head.appendChild(styleTag);
    }
    styleTag.textContent = css;
}

window.addEventListener("message", (event) => {
    if (event.data.type === "liveCSS") {
        applyLiveCSS(event.data.css);
    }
});

/****************************************************
 * WIDGET API (Public Interface)
 ****************************************************/

window.WidgetAPI = {
    /** Returns the raw event buffer (unfiltered) */
    getBuffer() {
        return eventBuffer;
    },

    /** Returns filtered events based on URL params */
    getFiltered() {
        return filterEvents(eventBuffer);
    },

    /** Clears the event buffer */
    clearBuffer() {
        eventBuffer = [];
    },

    /** Pushes a UEM event manually (for testing) */
    pushEvent(event) {
        handleEvent(event);
    },

    /** Versioning for debugging */
    version: "1.0.0"
};

/****************************************************
 * END OF FILE
 ****************************************************/