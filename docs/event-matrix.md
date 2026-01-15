# Event Matrix – Streamer.bot Widgets Framework

This document defines the **complete event taxonomy** used by the Streamer.bot Widgets Framework.

Every incoming event—regardless of platform—is normalized into a **single unified structure**, allowing widgets and renderers to operate independently of the event source.

---

## Unified Event Model

All events are normalized into the following structure:

```js
{
  platform:    "twitch",          // source platform
  type:        "sub",             // high-level event type
  subtype:     "prime",           // optional specialization
  tags:        ["sub", "prime", "twitch"],
  username:    "cool_viewer123",
  description: "Gifted 5 subs to the community!",
  amount:      5,                  // numeric value (if applicable)
  message:     "Thanks for the stream!",
  avatar:      "https://...avatar.png",
  raw:         { ... }              // original payload
}
```

This model guarantees:
- consistent rendering
- predictable filtering
- simple extensibility

---

## Supported Platforms & Events

### Twitch 🟣

| Event Type | Subtype | Tags |
|-----------|---------|------|
| Follow | — | `follow`, `twitch` |
| Cheer | — | `donation`, `bits`, `twitch` |
| Sub | paid | `sub`, `paid`, `twitch` |
| Sub | prime | `sub`, `prime`, `twitch` |
| Resub | — | `sub`, `resub`, `twitch` |
| Gift Sub | — | `sub`, `gift`, `twitch` |
| Gift Bomb | — | `sub`, `gift`, `bomb`, `twitch` |
| Raid | — | `raid`, `twitch` |
| Reward Redemption | — | `reward`, `points`, `twitch` |
| Watch Streak | — | `streak`, `twitch` |

---

### YouTube 🔴

| Event Type | Subtype | Tags |
|-----------|---------|------|
| Super Chat | — | `donation`, `superchat`, `youtube` |
| Super Sticker | — | `donation`, `supersticker`, `youtube` |
| New Sponsor | — | `sub`, `membership`, `youtube` |
| Gift Membership | — | `sub`, `gift`, `youtube` |

---

### Kick 🟢

| Event Type | Subtype | Tags |
|-----------|---------|------|
| Subscription | — | `sub`, `kick` |
| Gifted Subs | — | `sub`, `gift`, `kick` |
| Reward Redeemed | — | `reward`, `kick` |
| Host / Raid | — | `raid`, `kick` |
| Kicks Gift | — | `donation`, `kicks`, `kick` |

---

### Ko-fi 🔵

| Event Type | Subtype | Tags |
|-----------|---------|------|
| Donation | — | `donation`, `kofi` |
| Subscription | — | `sub`, `kofi` |
| Resubscription | — | `sub`, `resub`, `kofi` |
| Shop Order | — | `purchase`, `shop`, `kofi` |

---

### StreamElements 🟦

| Event Type | Subtype | Tags |
|-----------|---------|------|
| Tip | — | `donation`, `tip`, `streamelements` |

---

### Streamlabs 🟦

| Event Type | Subtype | Tags |
|-----------|---------|------|
| Donation | — | `donation`, `streamlabs` |

---

### Fourthwall 🟪

| Event Type | Subtype | Tags |
|-----------|---------|------|
| Order | — | `purchase`, `merch`, `fourthwall` |
| Donation | — | `donation`, `fourthwall` |
| Subscription | — | `sub`, `fourthwall` |
| Gift Purchase | — | `gift`, `purchase`, `fourthwall` |
| Giveaway Start | — | `giveaway`, `start`, `fourthwall` |
| Giveaway End | — | `giveaway`, `end`, `fourthwall` |

---

### TikTok (TikFinity) 🟣

| Event Type | Subtype | Tags |
|-----------|---------|------|
| Gift | — | `donation`, `gift`, `tiktok` |
| Subscription | — | `sub`, `tiktok` |

---

## Tag Reference

### Common Tags

```
sub, resub, prime, paid, gift, bomb, membership,
donation, bits, tip, superchat, supersticker, kicks,
reward, points, raid,
purchase, shop, merch,
giveaway, start, end, streak
```

### Platform Tags (always included)

```
twitch, youtube, kick, kofi,
streamelements, streamlabs,
fourthwall, tiktok
```

Tags are used for filtering, grouping, styling, and conditional logic across all widgets.

---

## Notes

- Tags are **additive** — a single event can contain multiple semantic tags
- Filtering supports single-tag queries: `?tag=donation`
- Multi-tag filtering (`?tag=a,b,c`) is **planned**

The event matrix is designed to grow without breaking existing widgets or filters.
