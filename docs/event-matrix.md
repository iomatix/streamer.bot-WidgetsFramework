## Event Matrix – Streamer.bot Widgets Framework
──────────────────────────────────────────────

This document defines the complete event taxonomy used by the framework.

Every incoming event is normalized into a unified structure:

{
  platform:    "twitch",
  type:        "sub",
  subtype:     "prime",
  tags:        ["sub", "prime", "twitch"],
  username:    "cool_viewer123",
  description: "Gifted 5 subs to the community!",
  amount:      5,
  message:     "Thanks for the stream!",
  avatar:      "https://...avatar.png",
  raw:         { ... }
}

Supported Platforms & Events
----------------------------

Platform              | Event Type          | Subtype    | Tags
----------------------|---------------------|------------|-----------------------------------------
Twitch 🟣            | Follow              | —          | ["follow", "twitch"]
                      | Cheer               | —          | ["donation", "bits", "twitch"]
                      | Sub                 | paid       | ["sub", "paid", "twitch"]
                      | Sub                 | prime      | ["sub", "prime", "twitch"]
                      | Resub               | —          | ["sub", "resub", "twitch"]
                      | Gift Sub            | —          | ["sub", "gift", "twitch"]
                      | Gift Bomb           | —          | ["sub", "gift", "bomb", "twitch"]
                      | Raid                | —          | ["raid", "twitch"]
                      | Reward Redemption   | —          | ["reward", "points", "twitch"]
                      | Watch Streak        | —          | ["streak", "twitch"]
YouTube 🔴           | Super Chat          | —          | ["donation", "superchat", "youtube"]
                      | Super Sticker       | —          | ["donation", "supersticker", "youtube"]
                      | New Sponsor         | —          | ["sub", "membership", "youtube"]
                      | Gift Membership     | —          | ["sub", "gift", "youtube"]
Kick 🟢              | Subscription        | —          | ["sub", "kick"]
                      | Gifted Subs         | —          | ["sub", "gift", "kick"]
                      | Reward Redeemed     | —          | ["reward", "kick"]
                      | Host / Raid         | —          | ["raid", "kick"]
                      | Kicks Gift          | —          | ["donation", "kicks", "kick"]
Ko-fi 🔵             | Donation            | —          | ["donation", "kofi"]
                      | Subscription        | —          | ["sub", "kofi"]
                      | Resubscription      | —          | ["sub", "resub", "kofi"]
                      | Shop Order          | —          | ["purchase", "shop", "kofi"]
StreamElements 🟦    | Tip                 | —          | ["donation", "tip", "streamelements"]
Streamlabs 🟦        | Donation            | —          | ["donation", "streamlabs"]
Fourthwall 🟪        | Order               | —          | ["purchase", "merch", "fourthwall"]
                      | Donation            | —          | ["donation", "fourthwall"]
                      | Subscription        | —          | ["sub", "fourthwall"]
                      | Gift Purchase       | —          | ["gift", "purchase", "fourthwall"]
                      | Giveaway Start      | —          | ["giveaway", "start", "fourthwall"]
                      | Giveaway End        | —          | ["giveaway", "end", "fourthwall"]
TikTok (TikFinity) 🟣| Gift                | —          | ["donation", "gift", "tiktok"]
                      | Subscription        | —          | ["sub", "tiktok"]

Tag Reference
-------------

Common tags:
  sub, resub, prime, gift, giftbomb, membership,
  donation, bits, tip, superchat, supersticker, kicks,
  reward, points, raid,
  purchase, shop, merch,
  giveaway, start, end

Platform tags (always included):
  twitch, youtube, kick, kofi, streamelements, streamlabs, fourthwall, tiktok

Tags are used for filtering and grouping events in widgets and logic.


✔ Notes
-------------

Tags are additive — an event may have multiple tags.

Filtering supports ?tag=xyz (single tag).

Multi-tag filtering (?tag=a,b,c) is planned.