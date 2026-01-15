# Event Matrix – Streamer.bot Widgets Framework

This document defines the **complete event taxonomy** used by the Streamer.bot Widgets Framework.

Every incoming event—regardless of platform—is normalized into a **single unified structure**, allowing widgets and renderers to operate independently of the event source.

---

## Unified Event Model

All events are normalized into the following structure:

```js
{
  platform,      // source platform (twitch, youtube, kofi, ...)
  type,          // high-level event type (sub, follow, donation, raid, ...)
  subtype,       // optional specialization (prime, tier1, gift, ...)
  tags,          // array of semantic tags
  username,      // display name of the user
  description,   // human-readable description
  attribute,     // numeric or contextual value (amount, months, count)
  message,       // optional message or chat text
  avatar,        // avatar URL or fallback
  raw            // original payload for debugging / extensions
}
```

This model guarantees:
- consistent rendering
- predictable filtering
- simple extensibility

---

## Supported Platforms Overview

| Platform | Color | Tag |
|--------|-------|-----|
| 🟣 **Twitch** | Purple | `twitch` |
| 🔴 **YouTube** | Red | `youtube` |
| 🟢 **Kick** | Green | `kick` |
| 🔵 **Ko-fi** | Blue | `kofi` |
| 🟦 **StreamElements** | Blue | `streamelements` |
| 🟦 **Streamlabs** | Blue | `streamlabs` |
| 🟪 **Fourthwall** | Purple | `fourthwall` |
| ⚫ **TikTok (TikFinity)** | Black | `tiktok` |

Colored icons are used throughout widgets to make platform origin immediately recognizable.

---

## Supported Platforms & Events

### 🟣 Twitch

| Event Type | Subtype | Common Tags |
|-----------|---------|-------------|
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

### 🔴 YouTube

| Event Type | Subtype | Common Tags |
|-----------|---------|-------------|
| Super Chat | — | `donation`, `superchat`, `youtube` |
| Super Sticker | — | `donation`, `supersticker`, `youtube` |
| New Sponsor | — | `sub`, `membership`, `youtube` |
| Gift Membership | — | `sub`, `gift`, `youtube` |

---

### 🟢 Kick

| Event Type | Subtype | Common Tags |
|-----------|---------|-------------|
| Subscription | — | `sub`, `kick` |
| Gifted Subs | — | `sub`, `gift`, `kick` |
| Reward Redeemed | — | `reward`, `kick` |
| Host / Raid | — | `raid`, `kick` |
| Kicks Gift | — | `donation`, `kicks`, `kick` |

---

### 🔵 Ko-fi

| Event Type | Subtype | Common Tags |
|-----------|---------|-------------|
| Donation | — | `donation`, `kofi` |
| Subscription | — | `sub`, `kofi` |
| Resubscription | — | `sub`, `resub`, `kofi` |
| Shop Order | — | `purchase`, `shop`, `kofi` |

---

### 🟦 StreamElements

| Event Type | Subtype | Common Tags |
|-----------|---------|-------------|
| Tip | — | `donation`, `tip`, `streamelements` |

---

### 🟦 Streamlabs

| Event Type | Subtype | Common Tags |
|-----------|---------|-------------|
| Donation | — | `donation`, `streamlabs` |

---

### 🟪 Fourthwall

| Event Type | Subtype | Common Tags |
|-----------|---------|-------------|
| Order | — | `purchase`, `merch`, `fourthwall` |
| Donation | — | `donation`, `fourthwall` |
| Subscription | — | `sub`, `fourthwall` |
| Gift Purchase | — | `gift`, `purchase`, `fourthwall` |
| Giveaway Start | — | `giveaway`, `start`, `fourthwall` |
| Giveaway End | — | `giveaway`, `end`, `fourthwall` |

---

### ⚫ TikTok (TikFinity)

| Event Type | Subtype | Common Tags |
|-----------|---------|-------------|
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

---

## Notes

- Tags are **additive** — a single event may contain multiple semantic tags
- Filtering supports single-tag queries: `?tag=donation`
- Multi-tag filtering (`?tag=a,b,c`) is **planned**

The event matrix is designed to grow without breaking existing widgets or filters.
