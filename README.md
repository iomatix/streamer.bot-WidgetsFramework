# Streamer.bot Widgets Framework

A modular, multi-platform alert and activity widget system built for Streamer.bot.

Designed for streamers, VTubers, and content creators who want full control over their overlays without relying on third‑party services like StreamElements or Streamlabs. The framework focuses on flexibility, performance, and a clean architecture that is easy to extend.

---

## ✨ Features

- Multi-platform event support  
- Unified event model across all platforms  
- Rolling event buffer (last 16 events)  
- Multiple rendering modes:
  - Alert widgets (real-time, queue-based)
  - Indexed widgets (?index=0 – single event)
  - List widgets (?list=6 – recent events)
- Powerful filtering:
  - platform (?platform=twitch)
  - event type (?type=sub)
  - semantic tags (?tag=gift)
- Modern visual style:
  - glassmorphism
  - platform-specific gradients
  - smooth animations and transitions
- Modular architecture – easy to extend with new widgets and layouts

---

## 🚀 Installation

1. Clone or download this repository  
2. Start the local widget server:

   Windows  
       start_server.bat

   Manual  
       python run_widget_server.py

3. Add a Browser Source in OBS / Streamlabs Desktop:  
       http://127.0.0.1:8181/alerts/

---

## 🔧 Basic Usage

The framework is fully controlled using URL parameters. Widgets are stateless and can be configured entirely through the browser source URL.

### Examples

    /alerts/                     → normal alert mode  
    /alerts/?index=0             → single most recent event  
    /alerts/?list=6              → last 6 events  
    /alerts/?platform=twitch     → Twitch-only events  
    /alerts/?list=5&type=sub     → last 5 subscription events  
    /alerts/?list=5&tag=gift     → last 5 gift events  

Parameters can be freely combined to create custom widgets.

---

## 📦 Unified Event Model

Every incoming event is normalized into a single structure:

    {
      platform:    "twitch",
      type:        "sub",
      subtype:     "prime",
      tags:        ["sub", "prime", "twitch"],
      username:    "ViewerName",
      description: "used their Prime Sub",
      attribute:   "12 months",
      message:     "Thanks for the stream!",
      avatar:      "https://...",
      raw:         { ... }
    }

This guarantees consistent rendering and filtering across all widgets and platforms.

---

## 🌍 Supported Platforms

- Twitch  
- YouTube  
- Kick  
- Ko-fi  
- StreamElements  
- Streamlabs  
- Fourthwall  
- TikTok (via TikFinity)  

Additional platforms can be added without modifying widget logic.

---

## 📚 Documentation

Full documentation is available in the /docs directory:

- Event Matrix – supported platforms, event types, tags  
- Architecture – internal modules and data flow  
- Widget API – widget types and rendering lifecycle  
- URL Parameters – filtering and rendering options  

Start here: /docs/README.md

---

## 🛠️ Roadmap

- Chat overlay widgets  
- Event list / activity feed widgets  
- Goal widgets (followers, subs, donations)  
- Credits roll / end screen  
- Theme system (CSS variables)  
- JSON-based configuration  
- Multi-tag filtering (?tag=a,b,c)  
- Tag exclusion (?excludeTag=xyz)  

---

## 🤝 Contributing

Pull requests and improvements are welcome.

Please keep changes:
- modular  
- platform-agnostic  
- consistent with the unified event model  

### Contributors

<a href="https://github.com/iomatix/streamer.bot-WidgetsFramework/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=iomatix/streamer.bot-WidgetsFramework" />
</a>

---

## 📄 License

MIT License  
© 2025