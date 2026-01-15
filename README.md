# Streamer.bot Widgets Framework

A modular, multi-platform alert and activity feed system built for Streamer.bot.  
Designed for VTubers, streamers, and content creators who want full control over their overlays without depending on StreamElements, Streamlabs, or similar services.

### Features

- Multi-platform alert rendering  
- Event buffer (keeps the last 16 events)  
- Indexed widgets (`?index=0`) – single event view  
- List widgets (`?list=6`) – multiple recent events  
- Filtering by:  
  - platform (`?platform=twitch`)  
  - event type (`?type=sub`)  
  - tag (`?tag=gift`)  
- Premium look & feel (glassmorphism, gradients, smooth animations)  
- Fully modular architecture – easy to add new widgets (chat, event list, goals, credits, etc.)

---

## 🚀 Installation

1. Clone or download this repository  
2. Start the local server:  
   - Windows: double-click `start_server.bat`  
   - or manually: `python run_widget_server.py`  
3. Add a **Browser Source** in OBS / Streamlabs Desktop pointing to:
    - `http://127.0.0.1:8181/alerts/`

---

## 🔧 URL Parameters

| Parameter     | Example                              | Description                                      |
|---------------|--------------------------------------|--------------------------------------------------|
| `index`       | `?index=0`                           | Show single event (0 = most recent)              |
| `list`        | `?list=6`                            | Show the last N events                           |
| `platform`    | `?platform=twitch`                   | Filter by platform                               |
| `type`        | `?type=donation`                     | Filter by main event type                        |
| `tag`         | `?tag=gift`                          | Filter by tag / subtype                          |

You can combine parameters:
    - `alerts/index.html?list=5&platform=twitch&type=sub&tag=gift`


---

## 📦 Unified Event Model

Every incoming event is normalized into this structure:

```js
{
  platform:    "twitch",
  type:        "sub",
  subtype:     "prime",
  tags:        ["sub", "prime", "twitch"],
  username:    "Mateusz",
  description: "used their Prime Sub",
  attribute:   "12 months",
  message:     "Pozdro!",
  avatar:      "https://...",
  raw:         { ... original platform payload ... }
}
```

Full event type / subtype / tag matrix → see `/docs/event-matrix.md`

Supported platforms include (but are not limited to):  
Twitch, YouTube, Kick, Ko-fi, StreamElements, Streamlabs, Fourthwall, TikTok

## 🌿 Browse Docs

- Docs README → [README.md](./docs/README.md)
- Event Matrix → [docs/event-matrix.md](./docs/event-matrix.md)
- Architecture → [docs/architecture.md](./docs/architecture.md)
- Widget API → [docs/widget-api.md](./docs/widget-api.md)
- URL Parameters → [docs/parameters.md](./docs/parameters.md)

---

## 🛠️ Roadmap

- Chat overlay  
- Event list widget  
- Goal widgets (follower/sub/donation goals)  
- Credits roll / end screen  
- Theme system  
- JSON-based configuration  
- OBS layout helpers  
- Multi-tag filtering (`?tag=sub,gift,raid`)  
- Tag exclusion (`?excludeTag=prime,lurk`)

---

## 🤝 Contributing

Pull requests are welcome!  
Please keep the code modular and respect the existing architecture.

## 📄 License

MIT License  

Copyright (c) 2025  

Full license text → `LICENSE.md`
