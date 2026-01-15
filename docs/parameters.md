## URL Parameters – Streamer.bot Widgets Framework
────────────────────────────────────────────────

All currently supported URL parameters and their behavior.

Available Parameters
────────────────────

index       Show single event by position (0 = newest)
            ?index=0
            ?index=3

list        Show N most recent events
            ?list=6
            ?list=12

platform    Filter by streaming platform
            ?platform=twitch
            ?platform=youtube
            ?platform=kick

type        Filter by main event category
            ?type=sub
            ?type=donation
            ?type=raid
            ?type=cheer

tag         Filter by subtype / specific tag
            ?tag=gift
            ?tag=prime
            ?tag=bits
            ?tag=mystery-gift

Combined Filters – Examples
────────────────────────────

?list=5&platform=twitch&type=sub&tag=gift
?list=10&platform=youtube
?index=0&platform=twitch
?list=8&type=donation

Planned / Future Parameters (not yet implemented)
─────────────────────────────────────────────────

• tag=a,b,c           – multiple tags (OR)
• excludeTag=xyz      – exclude events with this tag
• avatar=false        – hide avatar completely
• animation=fade      – force specific entrance animation
• direction=left      – control slide direction
• theme=dark          – force light/dark/custom theme