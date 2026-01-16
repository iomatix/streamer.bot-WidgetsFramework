export const ThemeManager = {
    init() {
        const params = new URLSearchParams(window.location.search);

        const preset = params.get("themePreset") || "default";
        const mode = params.get("themeMode") || "platform"; // platform | neutral | custom
        
        const transparent = params.get("transparent") === "1";

        const bgColor = params.get("bgColor");
        const textColor = params.get("textColor");

        // 1. preset
        document.body.classList.add(`theme-preset-${preset}`);

        // 2. mode
        document.body.classList.add(`theme-mode-${mode}`);

        // 3. transparent background
        if (transparent) {
            document.body.classList.add("theme-transparent");
        }

        // 4. custom colors → CSS variables
        const root = document.documentElement;

        if (bgColor) {
            root.style.setProperty("--alert-bg-override", bgColor);
        }

        if (textColor) {
            root.style.setProperty("--alert-text-override", textColor);
        }
    }
};