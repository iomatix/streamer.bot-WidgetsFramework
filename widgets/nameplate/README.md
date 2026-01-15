# Nameplate Widget – Loop Branding Flip Card

The **Nameplate Widget** is a standalone branding component designed for stream overlays.  
It is not an alert widget and does not react to follow/sub/cheer events.  
Instead, it provides a **continuous looping flip animation** that showcases your platform branding and your streamer identity.

This widget is ideal for:
- VTuber / streamer identity branding
- Always‑visible overlay elements
- Sponsor / partner cards
- Rotating identity cards
- Platform‑themed nameplates

---

## ✨ Features

- Looping flip animation (reverse → front → reverse)
- Slide‑in / slide‑out entrance and exit animations
- Platform‑colored glow and styling
- Reverse side: **platform logo**
- Front side: **streamer avatar + username**
- Glassmorphism background
- Configurable via URL parameters
- Works independently of the Alerts widget
- Can run with or without Streamer.bot

---

## 🎨 Visual Structure

### Reverse (Back Side)
- Large platform logo centered on the card
- Used as the “revers” of the flip animation

### Front (Face Side)
- Streamer avatar (small)
- Streamer username
- Platform‑colored glow

### Animation Flow
1. Slide‑in from chosen direction  
2. Flip to reveal front  
3. Hold for duration  
4. Flip back  
5. Slide‑out  
6. Wait delay  
7. Repeat (if loop enabled)

---

## 🔧 URL Parameters

The widget is fully configurable using URL parameters.

### Variant
Controls what the card displays.

    ?variant=platform   (default)
    Reverse = platform logo
    Front = avatar + username

### Direction
Controls slide‑in / slide‑out direction.

    ?direction=left
    ?direction=right
    ?direction=top
    ?direction=bottom

### Flip Axis
Controls flip animation axis.

    ?flip=Y   (default)
    ?flip=X

### Timing
Controls animation timing.

    ?duration=3000   (ms card stays visible)
    ?delay=2000      (ms between cycles)

### Loop Mode

    ?loop=true       (default)
    ?loop=false      (show once)

### Identity Parameters

    ?username=CoolUser
    ?avatarUrl=https://example.com/avatar.png

If avatarUrl is not provided, the widget may use a fallback or attempt to fetch an avatar (depending on future implementation).

### Platform Override

    ?platform=twitch
    ?platform=kick
    ?platform=youtube

Controls:
- reverse logo
- glow color
- default styling

---

## 🧱 File Structure

    widgets/
      nameplate/
        index.html
        style.css
        script.js
        README.md   ← this file

The widget uses shared utilities from:

    shared/
      helpers.js
      sb-client.js
      uem.js
      platforms.js
      theme.css

---

## 🚀 Usage in OBS

Add a Browser Source:

    http://127.0.0.1:8181/widgets/nameplate/?username=CoolUser&platform=twitch&loop=true

Recommended size: **400×200**  
Recommended FPS: **60**

---

## 🛠️ Example Configurations

### Twitch Identity Card

    ?username=CoolUser&platform=twitch&direction=left&flip=Y&loop=true

### Kick Identity Card

    ?username=CoolUser&platform=kick&direction=bottom&flip=X

### Static Branding (no loop)

    ?username=Streamer&loop=false

---

## 🔮 Future Extensions

- Custom logo mode (`?variant=custom`)
- Auto‑avatar fetching
- Multi‑platform rotation mode
- Sponsor rotation mode
- Theme presets
- Idle glow animations

---

## 📄 License

MIT License  
© 2025