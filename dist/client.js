window.__ModuleLoader__.load({id:"dsh-codsh-theme",factory:(require)=>{
const THEME_CSS="html[data-codsh-theme] {\r\n  --codsh-tone-ff9393:#ff9393;\r\n  --codsh-tone-aaa:#aaa;\r\n  --codsh-tone-707070:#707070;\r\n  --codsh-tone-454545:#454545;\r\n  --codsh-tone-2a2b31:#2a2b31;\r\n  --codsh-tone-ddd:#ddd;\r\n  --codsh-tone-929292:#929292;\r\n  --codsh-tone-666:#666;\r\n  --codsh-tone-494949:#494949;\r\n  --codsh-tone-1b1b1b:#1b1b1b;\r\n  --codsh-tone-404040:#404040;\r\n  --codsh-tone-e5e5e5:#e5e5e5;\r\n  --codsh-tone-363636:#363636;\r\n  --codsh-tone-353535:#353535;\r\n  --codsh-tone-252525:#252525;\r\n  --codsh-tone-383838:#383838;\r\n  --codsh-tone-bdbdbd:#bdbdbd;\r\n  --codsh-tone-2d2d2d:#2d2d2d;\r\n  --codsh-tone-a5a5a5:#a5a5a5;\r\n  --codsh-tone-737373:#737373;\r\n  --codsh-tone-323232:#323232;\r\n  --codsh-tone-202127:#202127;\r\n  --codsh-tone-3b3b3b:#3b3b3b;\r\n  --codsh-tone-f5f7fb:#f5f7fb;\r\n  --codsh-tone-242424:#242424;\r\n  --codsh-tone-eee:#eee;\r\n  --codsh-tone-34353c:#34353c;\r\n  --codsh-tone-f28b82:#f28b82;\r\n  --codsh-tone-181818:#181818;\r\n  --codsh-tone-3a3a3a:#3a3a3a;\r\n  --codsh-tone-dedede:#dedede;\r\n  --codsh-tone-b0b0b0:#b0b0b0;\r\n  --codsh-tone-1c4475:#1c4475;\r\n  --codsh-tone-a678fa:#a678fa;\r\n  --codsh-tone-303030:#303030;\r\n  --codsh-tone-262626:#262626;\r\n  --codsh-tone-ececec:#ececec;\r\n  --codsh-tone-505050:#505050;\r\n}\r\n/* Beauty-OpenCode design translated to Harness's semantic module locals.\r\n   Build normalizes local selectors for multi-class nodes. No release hashes. */\r\nhtml[data-codsh-theme] {\r\n  /* The host theme presenter owns color-scheme. */\r\n  --codsh-base:var(--codsh-tone-181818); --codsh-sidebar:var(--codsh-tone-1b1b1b); --codsh-rail:var(--codsh-tone-202127);\r\n  --codsh-raised:var(--codsh-tone-252525); --codsh-input:var(--codsh-tone-303030); --codsh-hover:var(--codsh-tone-2d2d2d);\r\n  --codsh-text:var(--codsh-tone-dedede); --codsh-muted:var(--codsh-tone-929292); --codsh-border:var(--codsh-tone-323232);\r\n  --codsh-accent:#3478cf; --codsh-fast:150ms; --codsh-motion:240ms;\r\n  --codsh-ease:cubic-bezier(.22,1,.36,1);\r\n  --dsw-font-family:\"Segoe UI\",\"Microsoft YaHei UI\",system-ui,sans-serif;\r\n  --ds-font-family:var(--dsw-font-family); --ds-font-family-code:\"Cascadia Code\",Consolas,monospace;\r\n  --dsw-radius-sm:8px; --dsw-radius-md:9px; --dsw-radius-lg:14px; --dsw-radius-xl:20px; --dsw-radius-panel:22px;\r\n  --ds-transition-duration:180ms; --ds-transition-duration-slow:240ms;\r\n  --ds-ease-in-out:var(--codsh-ease);\r\n}\r\nhtml[data-codsh-theme] body {background:var(--codsh-base);font-family:var(--dsw-font-family);}\r\nhtml[data-codsh-theme] button {transition:background-color var(--codsh-fast) ease,color var(--codsh-fast) ease,box-shadow var(--codsh-fast) ease;}\r\nhtml[data-codsh-theme] button[data-codsh-full-access=\"true\"],html[data-codsh-theme] button[data-codsh-full-access=\"true\"] :is([class$=\"_triggerIcon\"],[class*=\"_triggerIcon \"]),html[data-codsh-theme] button[data-codsh-full-access=\"true\"] :is([class$=\"_triggerLabel\"],[class*=\"_triggerLabel \"]) {color:#ff823d!important;}\r\nhtml[data-codsh-theme] [data-codsh-full-access-option=\"true\"],html[data-codsh-theme] [data-codsh-full-access-option=\"true\"] :is(:is([class$=\"_itemIcon\"],[class*=\"_itemIcon \"]),:is([class$=\"_itemLabel\"],[class*=\"_itemLabel \"]),:is([class$=\"_optionLabelText\"],[class*=\"_optionLabelText \"]),:is([class$=\"_check\"],[class*=\"_check \"])) {color:#ff823d!important;}\r\nhtml[data-codsh-theme] button:focus-visible,html[data-codsh-theme] input:focus-visible {outline:2px solid #75aaff;outline-offset:-2px;}\n/* Search fields use a neutral focus treatment, including native wrappers. */\nhtml[data-codsh-theme] :is(input[type=\"search\"],input[placeholder*=\"搜索\"],input[placeholder*=\"Search\"],input[placeholder*=\"search\"],:is([class$=\"_search\"],[class*=\"_search \"]),:is([class$=\"_searchInput\"],[class*=\"_searchInput \"]),:is([class$=\"_searchExpanded\"],[class*=\"_searchExpanded \"])):is(:focus,:focus-visible,:focus-within) {outline:none!important;box-shadow:none!important;border-color:var(--codsh-border)!important;}\nhtml[data-codsh-theme] :is(:is([class$=\"_searchRow\"],[class*=\"_searchRow \"]),:is([class$=\"_searchSlot\"],[class*=\"_searchSlot \"]),:is([class$=\"_searchBox\"],[class*=\"_searchBox \"]),:is([class$=\"_searchField\"],[class*=\"_searchField \"])):focus-within {outline:none!important;box-shadow:none!important;border-color:var(--codsh-border)!important;}\nhtml[data-codsh-theme] ::selection {background:#34659b80;}\r\n/* Composer command panel: compact labels and rows, with native navigation. */\r\nhtml[data-codsh-theme] [data-trigger-menu] {padding:4px;font-size:12px;line-height:18px;}\r\nhtml[data-codsh-theme] [data-trigger-menu] [role=\"option\"] {box-sizing:border-box;min-height:28px;padding:4px 8px;gap:6px;font-size:12px;line-height:18px;}\r\nhtml[data-codsh-theme] [data-trigger-menu] :is(:is([class$=\"_itemAlias\"],[class*=\"_itemAlias \"]),:is([class$=\"_itemDescription\"],[class*=\"_itemDescription \"])) {font-size:11px;line-height:16px;}\r\nhtml[data-codsh-theme] [data-trigger-menu] :is(:is([class$=\"_sectionTitle\"],[class*=\"_sectionTitle \"]),:is([class$=\"_groupTitle\"],[class*=\"_groupTitle \"])) {box-sizing:border-box;min-height:20px;margin-top:2px;padding:3px 8px 1px;font-size:10px;line-height:15px;}\r\nhtml[data-codsh-theme] [data-trigger-menu] :is([class$=\"_itemIcon\"],[class*=\"_itemIcon \"]),html[data-codsh-theme] [data-trigger-menu] :is([class$=\"_itemIcon\"],[class*=\"_itemIcon \"]) svg {width:13px;height:13px;}\r\nhtml[data-codsh-theme] ::-webkit-scrollbar {width:7px;height:7px;}\r\nhtml[data-codsh-theme] ::-webkit-scrollbar-thumb {background:var(--codsh-tone-505050);border:2px solid transparent;background-clip:padding-box;border-radius:7px;}\r\nhtml[data-codsh-theme] ::-webkit-scrollbar-track {background:transparent;}\r\nhtml[data-codsh-theme] :is([class$=\"_centerCol\"],[class*=\"_centerCol \"]) {border-radius:0!important;border-left:1px solid var(--codsh-tone-303030);}\r\nhtml[data-codsh-theme] :is([class$=\"_frame\"],[class*=\"_frame \"]) {transition:grid-template-columns var(--codsh-motion) var(--codsh-ease);}\r\nhtml[data-codsh-theme] :is([class$=\"_frame\"],[class*=\"_frame \"])[data-dragging] {transition:none;}\r\nhtml[data-codsh-theme] :is([class$=\"_frame\"],[class*=\"_frame \"]):is([data-codsh-resizing],[data-rightbar-instant],[data-rightbar-fullscreen]) {transition:none;}\r\n.codsh-sidebar-exit {position:fixed;z-index:40;overflow:hidden;pointer-events:none;contain:paint;}\r\n/* Native caption buttons sample this same token through Desktop's preload. */\r\nhtml[data-codsh-theme][data-windows-titlebar] :is([class$=\"_frame\"],[class*=\"_frame \"])::before {background:var(--dsw-specific-sidebar-fill);}\r\nhtml[data-codsh-theme] :is([class$=\"_body\"],[class*=\"_body \"]):has([data-composer-seat]) {\r\n  --dsh-chat-content-width:var(--dsh-chat-user-width,680px);\r\n  --dsh-composer-card-max-width:720px; --dsh-composer-side-clearance:20px;\r\n}\r\n/* 52px icon rail; compact project navigation and 26px session rows. */\r\n[data-codsh-sidebar] {position:relative;box-sizing:border-box;width:100%!important;padding:6px 10px 8px 62px!important;background:var(--codsh-sidebar);}\r\n[data-codsh-sidebar]::before {content:\"\";position:absolute;inset:0 auto 0 0;width:52px;background:var(--codsh-rail);border-right:1px solid var(--codsh-tone-2a2b31);pointer-events:none;}\r\n.codsh-rail-tools {position:absolute;left:7px;top:8px;display:flex;flex-direction:column;gap:9px;width:36px;}\r\n.codsh-home {width:36px;height:36px;display:grid;place-items:center;border:0;border-radius:9px;color:var(--codsh-tone-b0b0b0);background:transparent;cursor:pointer;}\r\n.codsh-home svg {width:18px;height:18px;}\r\n.codsh-rail-button {width:36px;height:36px;padding:8px;display:grid;place-items:center;border:0;border-radius:9px;background:transparent;color:var(--codsh-tone-b0b0b0);cursor:pointer;}\r\n.codsh-rail-button svg {width:18px;height:18px;}\r\n.codsh-rail-button:hover {background:var(--codsh-tone-34353c);color:var(--codsh-tone-eee);}\r\n.codsh-rail-tools button[aria-pressed=\"true\"] {background:var(--codsh-tone-34353c);color:var(--codsh-tone-eee);}\r\n[data-codsh-sidebar][data-codsh-view=\"recent\"] [data-codsh-workspaces]>:is([class$=\"_sectionHeader\"],[class*=\"_sectionHeader \"]),\r\n[data-codsh-sidebar][data-codsh-view=\"recent\"] [data-codsh-workspaces]>:is([class$=\"_listArea\"],[class*=\"_listArea \"]),\r\n[data-codsh-sidebar][data-codsh-view=\"projects\"] .codsh-recent {display:none!important;}\r\n[data-codsh-sidebar] :is([class$=\"_footArea\"],[class*=\"_footArea \"]) {position:absolute;bottom:8px;left:7px;width:36px;margin:0;padding:0;z-index:4;}\r\n[data-codsh-sidebar] :is([class$=\"_footArea\"],[class*=\"_footArea \"]) button:is([class$=\"_trigger\"],[class*=\"_trigger \"]) {box-sizing:border-box;width:36px;height:36px;justify-content:center;padding:6px;gap:0;}\r\n[data-codsh-sidebar] :is([class$=\"_footArea\"],[class*=\"_footArea \"]) :is([class$=\"_label\"],[class*=\"_label \"]) {display:none;}\r\n[data-codsh-sidebar] :is([class$=\"_panelList\"],[class*=\"_panelList \"]) {position:absolute;top:143px;left:7px;width:36px;gap:9px;margin:0;}\r\n[data-codsh-sidebar] :is([class$=\"_panelRow\"],[class*=\"_panelRow \"]) {width:36px;height:36px;margin:0;padding:8px;justify-content:center;color:var(--codsh-tone-b0b0b0);border-radius:9px;}\r\n[data-codsh-sidebar] :is([class$=\"_panelTitle\"],[class*=\"_panelTitle \"]) {display:none!important;}\r\n[data-codsh-sidebar] :is([class$=\"_logoRow\"],[class*=\"_logoRow \"]) {height:42px!important;margin:0 0 4px!important;padding-left:9px!important;}\r\n[data-codsh-sidebar] :is([class$=\"_brandIdentity\"],[class*=\"_brandIdentity \"]) {gap:0;}\r\n[data-codsh-sidebar] :is([class$=\"_brandMark\"],[class*=\"_brandMark \"]),[data-codsh-sidebar] :is([class$=\"_brandName\"],[class*=\"_brandName \"]) {display:none;}\r\n[data-codsh-sidebar] :is([class$=\"_brandIdentity\"],[class*=\"_brandIdentity \"])::after {content:\"DeepSeek\";font:600 19px/26px var(--dsw-font-family);color:var(--codsh-tone-ececec);}\r\n[data-codsh-sidebar]:not([class*=\"_collapsed\"]) :is([class$=\"_newSession\"],[class*=\"_newSession \"]) {width:100%;height:34px;min-height:34px;justify-content:flex-start;margin:0 0 5px!important;padding:5px 10px!important;border:0!important;border-radius:9px;background:transparent!important;}\r\n[data-codsh-sidebar] :is([class$=\"_newSessionContent\"],[class*=\"_newSessionContent \"]) {justify-content:flex-start;gap:10px;}\r\n[data-codsh-sidebar] :is([class$=\"_newSession\"],[class*=\"_newSession \"]):hover {background:var(--codsh-hover)!important;}\r\n[data-codsh-sidebar] :is([class$=\"_regionArea\"],[class*=\"_regionArea \"]) {padding-top:2px;}\r\n[data-codsh-sidebar] [aria-selected=\"true\"],[data-codsh-sidebar] :is([class$=\"_selected\"],[class*=\"_selected \"]) {background:var(--codsh-hover);border-radius:9px;}\r\n[data-codsh-sidebar] :is([class$=\"_projectRow\"],[class*=\"_projectRow \"]) {box-sizing:border-box;height:28px;min-height:28px;padding-block:0;border-radius:7px;font-size:13px;line-height:18px;}\r\n[data-codsh-sidebar] :is([class$=\"_sessionRow\"],[class*=\"_sessionRow \"]) {box-sizing:border-box;height:26px;min-height:26px;padding-block:0;border-radius:7px;font-size:12px;line-height:18px;}\r\n/* Native titles set their own typography rather than inheriting the row. */\r\n[data-codsh-sidebar] :is([class$=\"_sessionRow\"],[class*=\"_sessionRow \"]) :is([class$=\"_title\"],[class*=\"_title \"]),.codsh-session span {font-family:var(--dsw-font-family);font-size:12px;line-height:18px;font-weight:400;}\r\n[data-codsh-sidebar] :is([class$=\"_groupSection\"],[class*=\"_groupSection \"])>:is([class$=\"_sessionRow\"],[class*=\"_sessionRow \"]) {margin-top:1px;}\r\n[data-codsh-sidebar] :is([class$=\"_rowActions\"],[class*=\"_rowActions \"]) {transition:opacity var(--codsh-fast) ease;}\r\n[data-codsh-workspaces] {overflow-y:auto;scrollbar-width:thin;}\r\n/* The combined project/recent list scrolls as one surface; native tree fades\r\n   otherwise leave a tinted strip between the two sections. */\r\n[data-codsh-workspaces] :is([class$=\"_fade\"],[class*=\"_fade \"]) {display:none!important;}\r\n[data-codsh-workspaces][data-codsh-no-projects=\"true\"] [data-row-key=\"empty\"] {display:none!important;}\r\n[data-codsh-projects] {display:none!important;}\r\n[data-codsh-workspaces] :is([class$=\"_sectionHeader\"],[class*=\"_sectionHeader \"]) {min-height:26px;height:26px;margin-bottom:2px;}\r\n[data-codsh-workspaces] :is([class$=\"_listArea\"],[class*=\"_listArea \"]) {flex:0 0 auto;height:auto;interpolate-size:allow-keywords;transition:height var(--codsh-motion) var(--codsh-ease),opacity 180ms ease;}\r\n[data-codsh-workspaces][data-codsh-projects-collapsed=\"true\"] :is([class$=\"_listArea\"],[class*=\"_listArea \"]) {height:0;overflow:hidden;opacity:0;pointer-events:none;}\r\n[data-codsh-workspaces] :is([class$=\"_groupSection\"],[class*=\"_groupSection \"]):has([data-row-key=\"workspace:\"]) {display:none;}\r\n.codsh-section-toggle {display:flex;align-items:center;gap:5px;padding:0;border:0;border-radius:5px;background:transparent;color:var(--codsh-muted);font:600 12px/18px var(--dsw-font-family);text-align:left;cursor:pointer;}\r\n.codsh-projects-toggle {margin-right:auto;}\r\n.codsh-section-toggle svg {width:14px;height:14px;transition:transform 180ms ease;}\r\n.codsh-section-toggle[aria-expanded=\"true\"] svg {transform:rotate(90deg);}\r\n.codsh-recent {margin-top:6px;flex:none;}\r\n.codsh-recent h2 {margin:0;padding:2px 4px 3px;font-size:12px;}\r\n.codsh-recent-list {display:grid;grid-template-rows:1fr;opacity:1;transition:grid-template-rows var(--codsh-motion) var(--codsh-ease),opacity 180ms ease;}\r\n.codsh-recent-inner {min-height:0;overflow:hidden;}\r\n.codsh-section-collapsed {grid-template-rows:0fr;opacity:0;pointer-events:none;}\r\n.codsh-session {box-sizing:border-box;display:flex;align-items:center;width:100%;height:26px;min-height:26px;margin:1px 0;padding:0 8px;border:0;border-radius:7px;background:transparent;color:var(--codsh-tone-bdbdbd);font:12px/18px var(--dsw-font-family);text-align:left;cursor:pointer;}\r\n.codsh-session span {overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}\r\n.codsh-session:hover,.codsh-session:focus-visible {background:var(--codsh-hover);color:var(--codsh-tone-eee);}\r\n.codsh-empty {margin:0 0 12px;padding:5px 9px;color:var(--codsh-tone-737373);font-size:13px;}\r\n.codsh-session-container,[data-codsh-sidebar] :is([class$=\"_projectRow\"],[class*=\"_projectRow \"]),[data-codsh-sidebar] :is([class$=\"_sessionRow\"],[class*=\"_sessionRow \"]) {position:relative;}\r\n.codsh-session-container .codsh-session {padding-right:28px;}\r\n.codsh-row-menu {position:absolute;right:3px;top:2px;width:25px;height:25px;padding:0;border:0;border-radius:6px;background:transparent;color:var(--codsh-tone-aaa);opacity:0;cursor:pointer;}\r\n[data-codsh-native-more] {display:none!important;}\r\n[data-codsh-native-view-options] {display:none!important;}\r\n.codsh-archive-toggle {height:24px;padding:0 7px;border:0;border-radius:6px;background:transparent;color:var(--codsh-muted);font:12px/18px var(--dsw-font-family);cursor:pointer;}\r\n.codsh-archive-toggle:hover,.codsh-archive-toggle[aria-pressed=\"true\"] {background:var(--codsh-hover);color:var(--codsh-text);}\r\n[data-codsh-actions][data-row-key^=\"session:\"] :is([class$=\"_pinIndicator\"],[class*=\"_pinIndicator \"]) {display:none!important;}\r\n[data-codsh-actions] :is([class$=\"_rowActions\"],[class*=\"_rowActions \"]) {margin-right:54px;}\r\n.codsh-session-container .codsh-session {padding-right:56px;}\r\n.codsh-row-pin {position:absolute;right:29px;top:2px;width:25px;height:25px;display:grid;place-items:center;padding:4px;border:0;border-radius:6px;background:transparent;color:var(--codsh-tone-aaa);opacity:0;cursor:pointer;}\r\n.codsh-row-pin svg,.codsh-actions-menu svg {width:17px;height:17px;flex:none;}\r\n:is(.codsh-session-container,[data-codsh-actions]):is(:hover,:focus-within)>.codsh-row-pin,.codsh-row-pin[aria-pressed=\"true\"] {opacity:1;}\r\n.codsh-row-pin[aria-pressed=\"true\"] {color:var(--codsh-tone-eee);}\r\n.codsh-row-pin:hover,.codsh-row-menu:hover {background:transparent;color:var(--codsh-text);}\r\n:is(.codsh-session-container,[data-codsh-sidebar] :is([class$=\"_projectRow\"],[class*=\"_projectRow \"]),[data-codsh-sidebar] :is([class$=\"_sessionRow\"],[class*=\"_sessionRow \"])):is(:hover,:focus-within)>.codsh-row-menu {opacity:1;}\r\n.codsh-actions-menu {position:fixed;z-index:11000;width:224px;padding:5px;border:1px solid var(--codsh-tone-383838);border-radius:12px;background:var(--codsh-tone-252525);box-shadow:0 12px 40px #0007;}\r\n.codsh-actions-menu button {display:flex;align-items:center;gap:10px;width:100%;padding:8px 10px;border:0;border-radius:7px;background:transparent;color:var(--codsh-tone-ddd);text-align:left;cursor:pointer;}\r\n.codsh-actions-menu button:hover {background:var(--codsh-tone-383838);}\r\n.codsh-action-mask {position:fixed;inset:0;z-index:11001;display:grid;place-items:center;background:#0008;}\r\n.codsh-action-dialog {width:min(380px,calc(100vw - 48px));padding:24px;border:1px solid var(--codsh-tone-383838);border-radius:20px;background:var(--codsh-tone-252525);color:var(--codsh-tone-ddd);}\r\n.codsh-action-dialog h2 {margin:0;font-size:19px;}.codsh-action-dialog p {font-size:14px;line-height:1.6;}\r\n.codsh-action-dialog input {box-sizing:border-box;width:100%;padding:10px;border:1px solid var(--codsh-tone-454545);border-radius:9px;background:var(--codsh-tone-181818);color:var(--codsh-tone-eee);}\r\n.codsh-action-dialog>div {display:flex;justify-content:flex-end;gap:8px;}.codsh-action-dialog button {padding:8px 14px;border:0;border-radius:8px;background:var(--codsh-tone-383838);color:var(--codsh-tone-ddd);cursor:pointer;}\r\n.codsh-action-dialog button[type=\"submit\"] {background:#3478cf;color:white;}.codsh-action-error {color:var(--codsh-tone-ff9393);}\r\n.codsh-session[data-codsh-pinned]::before,[data-codsh-project-pinned=\"true\"]:is([class$=\"_projectRow\"],[class*=\"_projectRow \"])::before {content:\"◆\";margin-right:5px;font-size:8px;color:var(--codsh-tone-929292);}\r\n[data-codsh-workspaces] :is([class$=\"_list\"],[class*=\"_list \"]):has(>:is([class$=\"_groupSection\"],[class*=\"_groupSection \"])) {display:flex;flex-direction:column;}\r\n[data-codsh-project-pinned=\"true\"]:is([class$=\"_groupSection\"],[class*=\"_groupSection \"]) {order:-1;}\r\n[data-codsh-sidebar][class*=\"_collapsed\"] {padding:0!important;}\r\n[data-codsh-sidebar][class*=\"_collapsed\"]::before,[data-codsh-sidebar][class*=\"_collapsed\"] .codsh-rail-tools,[data-codsh-sidebar][class*=\"_collapsed\"] .codsh-recent {display:none;}\r\n/* Stationary welcome chrome; the editor remains in the native composer seat. */\r\n[data-codsh-hero] {padding:0 20px!important;}\r\n[data-codsh-hero] :is([class$=\"_headline\"],[class*=\"_headline \"]) {flex-direction:column;gap:26px;font:400 28px/1.45 var(--dsw-font-family);}\r\n[data-codsh-hero] :is([class$=\"_fish\"],[class*=\"_fish \"]) {width:52px;height:44px;color:var(--codsh-tone-666)!important;}\r\n[data-codsh-hero] :is([class$=\"_fishHitbox\"],[class*=\"_fishHitbox \"]) {pointer-events:auto;cursor:pointer;transform-origin:50% 65%;}\r\n[data-codsh-hero] :is([class$=\"_titleGroup\"],[class*=\"_titleGroup \"])>span {display:none;}\r\n.codsh-hero-title {text-align:center;overflow-wrap:anywhere;}\r\n.codsh-project-folder {pointer-events:auto;font:inherit;color:inherit;background:none;border:0;padding:0;cursor:pointer;text-decoration-line:underline;text-decoration-style:dashed;text-decoration-color:transparent;text-decoration-thickness:1px;text-underline-offset:6px;transition:text-decoration-color 220ms var(--codsh-ease);}\r\n.codsh-project-folder:enabled:hover,.codsh-project-folder:enabled:focus-visible {text-decoration-color:var(--codsh-tone-707070);}\r\n.codsh-project-folder:disabled {cursor:default;opacity:1;}\r\n.codsh-folder-error {display:block;font-size:13px;color:var(--codsh-tone-f28b82);}\r\n.codsh-folder-error:empty {display:none;}\r\nhtml[data-codsh-theme] [data-phase=\"hero\"] :is([class$=\"_scrollBody\"],[class*=\"_scrollBody \"]),html[data-codsh-theme] [data-content-phase=\"hero\"] :is([class$=\"_scrollBody\"],[class*=\"_scrollBody \"]) {justify-content:flex-end!important;}\r\nhtml[data-codsh-theme] [class*=\"_composerHero\"] {position:relative;width:min(760px,100%)!important;margin-top:auto;padding-bottom:24px!important;gap:0!important;}\r\nhtml[data-codsh-theme] [class*=\"_composerHero\"] [data-codsh-hero] {position:absolute;bottom:calc(100% + clamp(100px,27vh,360px));left:0;right:0;height:auto;pointer-events:none;}\r\nhtml[data-codsh-theme] [class*=\"_composerHero\"] :is([class$=\"_heroWorkspaceRow\"],[class*=\"_heroWorkspaceRow \"]) {box-sizing:border-box;width:calc(100% - 68px);align-self:center;margin:0 34px -13px;padding:7px 14px 18px;min-height:42px;border-radius:16px 16px 0 0;background:var(--codsh-tone-262626);z-index:0;}\r\nhtml[data-codsh-theme] [data-composer-card],html[data-codsh-theme] :is([class$=\"_card\"],[class*=\"_card \"]):has([contenteditable]),html[data-codsh-theme] :is([class$=\"_cardWorkspaceTrigger\"],[class*=\"_cardWorkspaceTrigger \"]) {position:relative;background:var(--codsh-input);border:1px solid var(--codsh-tone-3a3a3a);border-radius:22px;box-shadow:0 8px 32px #00000018;padding-top:10px;}\r\nhtml[data-codsh-theme] :is([class$=\"_cardWorkspaceTrigger\"],[class*=\"_cardWorkspaceTrigger \"])::after {border:0;}\r\nhtml[data-codsh-theme] [data-composer-card] {padding-top:6px;gap:8px;font-size:13px;line-height:1.65;}\r\nhtml[data-codsh-theme] [data-composer-card] [contenteditable] {min-height:28px;}\r\nhtml[data-codsh-theme] [class*=\"_composerHero\"] [data-composer-card] [contenteditable] {min-height:36px;}\r\nhtml[data-codsh-theme] [contenteditable] {font-size:13px;line-height:1.65;caret-color:var(--codsh-tone-e5e5e5);}\r\nhtml[data-codsh-theme] [data-composer-card] :is([class$=\"_primary\"],[class*=\"_primary \"]) {width:28px;height:28px;min-width:28px;padding:6px;border:0;border-radius:50%;background:var(--codsh-accent);color:white;box-shadow:none;}\r\nhtml[data-codsh-theme] [data-composer-card] :is([class$=\"_primary\"],[class*=\"_primary \"]) svg {width:16px;height:16px;}\r\nhtml[data-codsh-theme] [data-composer-card] :is([class$=\"_primary\"],[class*=\"_primary \"]):disabled {background:var(--codsh-tone-494949);opacity:1;color:white;}\r\n/* Keep native usage figures in flow at narrow widths and high display scaling. */\r\nhtml[data-codsh-theme] [data-composer-seat] :is([class$=\"_dock\"],[class*=\"_dock \"]):has([data-composer-stats]) {box-sizing:border-box;flex:none;flex-wrap:wrap;max-width:100%;min-width:0;height:auto;gap:4px 10px;padding:4px 0 2px;overflow:visible;}\r\nhtml[data-codsh-theme] [data-composer-stats] {flex:0 1 auto;flex-wrap:wrap;justify-content:center;max-width:100%;min-width:0;height:auto;gap:4px 8px;overflow:visible;color:var(--codsh-muted);font-size:12px;line-height:20px;}\r\nhtml[data-codsh-theme] [data-composer-stats] :is([class$=\"_anchor\"],[class*=\"_anchor \"]) {max-width:100%;min-width:0;flex:0 1 auto;}\r\nhtml[data-codsh-theme] [data-composer-stats] :is([class$=\"_pill\"],[class*=\"_pill \"]) {max-width:100%;min-width:0;height:auto;white-space:normal;text-align:left;color:var(--codsh-muted);}\r\nhtml[data-codsh-theme] [data-composer-stats] :is([class$=\"_label\"],[class*=\"_label \"]) {white-space:normal;overflow:visible;text-overflow:clip;overflow-wrap:anywhere;}\r\n/* Native model catalog; separate reasoning control and discrete effort slider. */\r\n[data-codsh-model-trigger] {height:28px;max-width:220px;padding:4px 8px;gap:5px;border:0;border-radius:18px;background:transparent;color:var(--codsh-tone-dedede);font:13px/20px var(--dsw-font-family);}\r\n[data-codsh-model-trigger][data-codsh-split-model] :is([class$=\"_triggerEffort\"],[class*=\"_triggerEffort \"]) {display:none;}\r\n[data-codsh-model-trigger]:hover:not(:disabled),[data-codsh-model-trigger][aria-expanded=\"true\"] {background:var(--codsh-tone-3b3b3b);}\r\n[data-codsh-model-trigger] :is([class$=\"_chevron\"],[class*=\"_chevron \"]) {width:12px;height:12px;color:var(--codsh-tone-929292);}\r\n[data-codsh-model-trigger]:disabled {color:var(--codsh-tone-737373);}\r\n[data-codsh-model-trigger]:not([data-codsh-split-model]) :is([class$=\"_triggerEffort\"],[class*=\"_triggerEffort \"]) {color:var(--codsh-tone-929292);}\r\n[data-codsh-model-trigger] + .codsh-reasoning-trigger {margin-left:2px;}\r\n:has(>[data-codsh-model-trigger]) {display:flex;align-items:center;min-width:0;}\r\n.codsh-reasoning-trigger {display:flex;align-items:center;gap:5px;white-space:nowrap;height:28px;padding:4px 8px;border:0;border-radius:18px;background:transparent;color:var(--codsh-tone-929292);font:12px/20px var(--dsw-font-family);cursor:pointer;}\r\n.codsh-reasoning-trigger svg {width:12px;height:12px;transform:rotate(90deg);}\r\n.codsh-reasoning-trigger:hover,.codsh-reasoning-trigger[aria-expanded=\"true\"] {background:var(--codsh-tone-3b3b3b);color:var(--codsh-tone-dedede);}\r\n.codsh-reasoning-trigger:disabled {opacity:.45;cursor:default;}\r\n[data-codsh-model-menu] {box-sizing:border-box;padding:6px!important;border:1px solid var(--codsh-tone-363636)!important;border-radius:20px!important;background:var(--codsh-raised)!important;box-shadow:0 12px 40px #0005!important;min-width:min(260px,calc(100vw - 32px));max-width:min(420px,calc(100vw - 32px));font:13px/20px var(--dsw-font-family);animation:codsh-popup 180ms var(--codsh-ease);}\r\n[data-codsh-model-menu] :is([class$=\"_cell\"],[class*=\"_cell \"]),[data-codsh-model-menu] :is([class$=\"_option\"],[class*=\"_option \"]) {box-sizing:border-box;min-height:28px;padding:4px 8px;border-radius:7px;color:var(--codsh-tone-dedede);background:transparent;font-size:12px;line-height:18px;}\r\n[data-codsh-model-menu] button:is(:hover,:focus-visible,[data-highlighted],[aria-checked=\"true\"]):not(:disabled) {background:var(--codsh-tone-353535)!important;}\r\n[data-codsh-model-menu] button:disabled {color:var(--codsh-tone-737373);cursor:default;}\r\n[data-codsh-model-menu] :is([class$=\"_cellValue\"],[class*=\"_cellValue \"]) {color:var(--codsh-tone-a5a5a5);}\r\n[data-codsh-model-menu] :is([class$=\"_searchRow\"],[class*=\"_searchRow \"]) {margin:2px 2px 6px;}\r\n[data-codsh-model-menu] :is([class$=\"_search\"],[class*=\"_search \"]) {background:var(--codsh-tone-303030)!important;padding:7px 9px!important;border-radius:10px;}\r\n[data-codsh-model-menu] input:not([type=\"range\"]) {color:var(--codsh-tone-eee);font-size:13px;}\r\n[data-codsh-effort-menu] {width:min(280px,calc(100vw - 32px));border-radius:18px!important;padding:12px 14px!important;}\r\n[data-codsh-effort-menu]>button[role=\"menuitemradio\"] {position:absolute;width:1px;min-width:0;height:1px;min-height:0;padding:0;overflow:hidden;clip-path:inset(50%);}\r\n[data-codsh-effort-bridge] {opacity:0!important;pointer-events:none!important;}\r\n.codsh-effort-control {position:fixed;z-index:10000;box-sizing:border-box;width:280px;max-width:calc(100vw - 16px);padding:12px 14px;border:1px solid var(--codsh-tone-363636);border-radius:18px;background:var(--codsh-raised);box-shadow:0 12px 40px #0005;text-align:center;animation:codsh-popup 180ms var(--codsh-ease);}\r\n.codsh-effort-title {display:block;margin-bottom:8px;color:var(--codsh-accent);font:600 14px/24px var(--dsw-font-family);}\r\n.codsh-effort-track {position:relative;height:24px;overflow:visible;border-radius:20px;background:var(--codsh-tone-383838);--progress:0%;}\r\n.codsh-effort-fill {position:absolute;inset:2px auto 2px 2px;width:calc(14px + (100% - 32px)*var(--ratio,0));background:var(--codsh-accent);border-radius:20px;overflow:hidden;transition:width 180ms var(--codsh-ease);pointer-events:none;}\r\n.codsh-effort-fill::before {display:none;}\r\nhtml[data-codsh-theme] .codsh-effort-control .codsh-effort-thumb {box-sizing:border-box!important;min-width:32px!important;max-width:32px!important;min-height:32px!important;max-height:32px!important;aspect-ratio:1!important;clip-path:circle(50%)!important;border-radius:50%!important;position:absolute;top:-4px;left:calc((100% - 32px)*var(--ratio,0));width:32px;height:32px;border-radius:50%;background:white;box-shadow:0 1px 5px #0003;pointer-events:none;transition:left 180ms var(--codsh-ease);z-index:2;}\r\n.codsh-effort-track input {appearance:none;position:absolute;inset:-4px 0;margin:0;width:100%;height:32px;background:transparent;cursor:pointer;}\r\n.codsh-effort-track input::-webkit-slider-thumb {appearance:none;width:32px;height:32px;border-radius:50%;background:transparent;}\r\n.codsh-effort-track input::-moz-range-thumb {width:32px;height:32px;border:0;border-radius:50%;background:transparent;}\r\n.codsh-effort-track:focus-within {outline:none;}\r\nhtml[data-codsh-theme] .codsh-effort-track input:focus-visible {outline:none;box-shadow:none;}\r\n[data-codsh-model-root] {opacity:0!important;pointer-events:none!important;}\r\n.codsh-effort-ticks {display:flex;justify-content:space-between;gap:4px;margin-top:9px;}\r\n.codsh-effort-ticks button {min-width:0;padding:0;border:0;background:transparent;color:var(--codsh-tone-929292);font:10px/1.4 var(--dsw-font-family);cursor:pointer;}\r\n.codsh-effort-max .codsh-effort-track {box-shadow:0 0 14px #9663ff30;}\r\n.codsh-effort-max .codsh-effort-fill {background:linear-gradient(110deg,#8960da,var(--codsh-tone-a678fa) 55%,#5533a2);}\r\n.codsh-effort-max .codsh-effort-title {color:var(--codsh-tone-a678fa);}\r\n.codsh-effort-ultra .codsh-effort-fill::before {display:none;}\r\n.codsh-effort-sparks {display:block;position:absolute;inset:0;container-type:inline-size;pointer-events:none;}\r\n.codsh-effort-ultra .codsh-effort-sparks {display:block;}\r\n.codsh-effort-sparks i {position:absolute;left:0;top:50%;width:var(--dot-size,3px);height:var(--dot-size,3px);border-radius:50%;background:#ffffffbb;opacity:0;will-change:transform;}\r\n/* Shared surfaces: menus, dialogs, tooltips; settings fills the main area. */\r\n[data-codsh-surface=\"menu\"] {background:var(--codsh-raised)!important;border:1px solid var(--codsh-tone-363636)!important;border-radius:14px!important;box-shadow:0 12px 40px #0005!important;animation:codsh-popup 180ms var(--codsh-ease);}\r\n[data-codsh-surface=\"menu\"] [role=\"menuitem\"],[data-codsh-surface=\"menu\"] [role=\"menuitemradio\"] {box-sizing:border-box;border-radius:7px;min-height:26px;padding-block:4px;font-size:12px;line-height:18px;}\r\n[data-codsh-surface=\"dialog\"] {border-radius:24px!important;background:var(--codsh-raised);box-shadow:0 20px 70px #0008;animation:codsh-dialog 180ms var(--codsh-ease);}\r\n[data-codsh-surface=\"dialog\"] input:not([type=\"range\"]):not([type=\"checkbox\"]) {border-radius:14px;background:var(--codsh-base);border-color:var(--codsh-tone-404040);}\r\n[data-codsh-surface=\"tooltip\"] {border-radius:7px!important;background:var(--codsh-tone-353535)!important;color:var(--codsh-tone-eee);}\r\nhtml[data-codsh-theme] [data-shortcut-modal=\"settings\"] {position:fixed;inset:var(--dsh-frame-chrome-top,42px) 0 0 52px;width:auto;height:auto;max-width:none;border:0;border-radius:0!important;background:var(--codsh-base);box-shadow:none;}\r\nhtml[data-codsh-theme] [data-shortcut-modal=\"settings\"] :is([class$=\"_nav\"],[class*=\"_nav \"]) {width:260px;padding:18px 10px 12px;background:var(--codsh-sidebar);border-right:1px solid var(--codsh-tone-303030);}\r\nhtml[data-codsh-theme] [data-shortcut-modal=\"settings\"] :is([class$=\"_navTitle\"],[class*=\"_navTitle \"]) {font-size:18px;font-weight:600;}\r\nhtml[data-codsh-theme] [data-shortcut-modal=\"settings\"] :is([class$=\"_navCell\"],[class*=\"_navCell \"]) {height:30px;min-height:30px;padding:5px 9px;border-radius:7px;font-size:13px;line-height:20px;}\r\nhtml[data-codsh-theme] [data-shortcut-modal=\"settings\"] :is([class$=\"_options\"],[class*=\"_options \"]) {padding:34px 30px 60px;scrollbar-width:thin;}\r\n/* Slot hosts can wrap the section; keep the width override through those hosts. */\r\nhtml[data-codsh-theme] [data-shortcut-modal=\"settings\"] :is([class$=\"_options\"],[class*=\"_options \"]) :is([class$=\"_section\"],[class*=\"_section \"]) {box-sizing:border-box;width:100%;min-width:0;max-width:none!important;margin-inline:0;}\r\nhtml[data-codsh-theme] [data-shortcut-modal=\"settings\"] .codsh-settings-search {box-sizing:border-box;width:100%;min-width:0;height:38px;padding:8px 14px 8px 36px;border:0!important;border-radius:999px!important;background-color:var(--codsh-hover);background-image:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23929292' stroke-width='1.7' stroke-linecap='round'%3E%3Ccircle cx='10.5' cy='10.5' r='6.5'/%3E%3Cpath d='m16 16 5 5'/%3E%3C/svg%3E\");background-repeat:no-repeat;background-position:12px center;background-size:16px 16px;color:var(--codsh-text);font:13px/20px var(--dsw-font-family);}\n.codsh-settings-search::placeholder {color:var(--codsh-muted);opacity:1;}\n.codsh-settings-back {margin-top:auto;width:100%;padding:10px 12px;border:0;border-radius:9px;background:var(--codsh-tone-2d2d2d);color:var(--codsh-tone-dedede);font:14px/20px var(--dsw-font-family);text-align:left;cursor:pointer;}\r\n[data-codsh-settings-filtered] {display:none!important;}\r\nhtml[data-codsh-theme] [data-shortcut-modal=\"settings\"] :is([class$=\"_section\"],[class*=\"_section \"]):has([data-slot=\"settings.general.item\"]) {box-sizing:border-box;width:100%;margin:0;padding:16px;background:var(--codsh-tone-242424);border:1px solid var(--codsh-tone-323232);border-radius:18px;}\r\n/* Chat surfaces and native review/navigation chrome. */\r\n/* The control and its tab strip are the same element, and this rule's own 2px\r\n   padding replaces the skeleton's 8px inset. Pull the box back by that padding\r\n   so its left edge meets the title text, which the header pads 20px to. */\r\nhtml[data-codsh-theme] [data-conversation-tabs][data-conversation-tabs] {position:relative;box-sizing:border-box;align-self:start;justify-self:start;display:flex;gap:3px!important;grid-column:2;margin:4px 0;padding-inline-start:2px;padding:2px!important;background:var(--codsh-hover);border:1px solid var(--codsh-border);border-radius:8px;isolation:isolate;}\r\nhtml[data-codsh-theme] [data-conversation-tabs][data-conversation-tabs]::before {content:\"\";position:absolute;z-index:-1;left:2px;top:2px;bottom:2px;width:48px;border-radius:6px;background:var(--codsh-raised);box-shadow:0 1px 3px #0001;transform:translateX(0);transition:transform 220ms var(--codsh-ease);}\r\nhtml[data-codsh-theme] [data-conversation-tabs][data-conversation-tabs]:has(>button:nth-of-type(2)[aria-selected=\"true\"])::before {transform:translateX(51px);}\r\nhtml[data-codsh-theme] [data-conversation-tabs][data-conversation-tabs]>button {box-sizing:border-box;flex:none;width:48px;height:22px;padding:2px 6px;border-radius:6px;color:var(--codsh-muted);font:500 11px/16px var(--dsw-font-family);transition:color 180ms ease;}\r\nhtml[data-codsh-theme] [data-conversation-tabs][data-conversation-tabs]>button[aria-selected=\"true\"] {color:var(--codsh-text);}\r\nhtml[data-codsh-theme] [data-conversation-tabs][data-conversation-tabs]>button::after {display:none;}\r\n/* Dock tabs use data attributes because the frontend uses a different CSS-module naming scheme. */\r\nhtml[data-codsh-theme] [data-dockkit-strip] {box-sizing:border-box;height:32px;min-height:32px;padding-top:6px;gap:3px;}\r\nhtml[data-codsh-theme] [data-dockkit-strip-chrome] {height:26px;gap:5px;}\r\nhtml[data-codsh-theme] [data-dockkit-tab] {box-sizing:border-box;height:26px;min-height:0;padding:0 8px;font-size:12px;line-height:18px;}\r\nhtml[data-codsh-theme] [data-dockkit-tab-close] {top:3px;width:20px;height:20px;}\r\nhtml[data-codsh-theme] :is([data-dockkit-add-tab],[data-dockkit-split-button]) {box-sizing:border-box;width:24px;height:24px;min-height:0;padding:4px;}\r\nhtml[data-codsh-theme] :is([class$=\"_tabs\"],[class*=\"_tabs \"]) {gap:20px;}\r\nhtml[data-codsh-theme] :is([class$=\"_tab\"],[class*=\"_tab \"]) {font-size:12px;line-height:18px;padding-block:4px 6px;}\r\nhtml[data-codsh-theme] :is([class$=\"_sourceTabs\"],[class*=\"_sourceTabs \"]),html[data-codsh-theme] :is([class$=\"_detailTabs\"],[class*=\"_detailTabs \"]) {height:28px;min-height:28px;gap:16px;}\r\nhtml[data-codsh-theme] :is([class$=\"_detailTabsBar\"],[class*=\"_detailTabsBar \"]) {height:32px!important;min-height:32px!important;gap:12px;}\r\nhtml[data-codsh-theme] :is([class$=\"_sourceTab\"],[class*=\"_sourceTab \"]),html[data-codsh-theme] :is([class$=\"_detailTab\"],[class*=\"_detailTab \"]) {font-size:12px;line-height:18px;padding-block:4px 6px!important;}\r\nhtml[data-codsh-theme] :is([class$=\"_filterTabs\"],[class*=\"_filterTabs \"]) {gap:6px 8px;}\r\nhtml[data-codsh-theme] :is([class$=\"_filterTab\"],[class*=\"_filterTab \"]) {height:26px;padding:0 8px;font-size:12px;line-height:18px;}\r\nhtml[data-codsh-theme] :is([class$=\"_userRow\"],[class*=\"_userRow \"]) :is([class$=\"_bubble\"],[class*=\"_bubble \"]) {border-radius:20px;background:var(--codsh-tone-1c4475);color:var(--codsh-tone-f5f7fb);border:0;}\r\nhtml[data-codsh-theme] :is([class$=\"_userRow\"],[class*=\"_userRow \"]) :is([class$=\"_bubble\"],[class*=\"_bubble \"]) * {color:inherit;}\r\nhtml[data-codsh-theme] :is([class$=\"_mark\"],[class*=\"_mark \"])::before {transition:width 180ms var(--codsh-ease),opacity 180ms ease,transform 180ms var(--codsh-ease);}\r\nhtml[data-codsh-theme] :is([class$=\"_preview\"],[class*=\"_preview \"]):has(:is([class$=\"_previewPrompt\"],[class*=\"_previewPrompt \"])) {border:1px solid var(--codsh-tone-323232);border-radius:16px;background:var(--codsh-raised);box-shadow:0 8px 30px #0005;}\r\nhtml[data-codsh-theme] [data-sidebar-right-panel] :is([data-dockkit-host=\"dock\"],[data-dockkit-empty],[data-dockkit-divider]) {transition:transform var(--codsh-motion) var(--codsh-ease),visibility 0s linear var(--codsh-motion);}\r\nhtml[data-codsh-theme] [data-sidebar-right-open] :is([data-dockkit-host=\"dock\"],[data-dockkit-empty],[data-dockkit-divider]) {transition:transform var(--codsh-motion) var(--codsh-ease);}\r\n@keyframes codsh-popup {from{opacity:0;translate:0 4px;}to{opacity:1;translate:0 0;}}\r\n@keyframes codsh-dialog {from{opacity:0;scale:.985;}to{opacity:1;scale:1;}}\r\n@keyframes codsh-spark {from{translate:-3px 2px;opacity:.35;}to{translate:5px -3px;opacity:.8;}}\r\n@keyframes codsh-flow {from{background-position:92px 0;}to{background-position:0 0;}}\r\n@media(max-width:720px) {\r\n  [data-codsh-hero] :is([class$=\"_headline\"],[class*=\"_headline \"]) {font-size:21px;}\r\n  html[data-codsh-theme] [data-shortcut-modal=\"settings\"] {left:0;}\r\n  html[data-codsh-theme] [data-shortcut-modal=\"settings\"] :is([class$=\"_nav\"],[class*=\"_nav \"]) {width:180px;}\r\n  html[data-codsh-theme] [data-shortcut-modal=\"settings\"] :is([class$=\"_options\"],[class*=\"_options \"]) {padding:24px 16px;}\r\n}\r\n@media(max-height:650px) {html[data-codsh-theme] [class*=\"_composerHero\"] [data-codsh-hero] {bottom:calc(100% + 60px);} [data-codsh-hero] :is([class$=\"_headline\"],[class*=\"_headline \"]) {gap:14px;font-size:24px;}}\r\n@media(max-height:420px) {html[data-codsh-theme] [class*=\"_composerHero\"] [data-codsh-hero] {position:static;margin-bottom:20px;}}\r\n@media(prefers-reduced-motion:reduce) {\r\n  html[data-codsh-theme] *,html[data-codsh-theme] *::before,html[data-codsh-theme] *::after {animation:none!important;transition:none!important;scroll-behavior:auto!important;}\r\n  .codsh-effort-sparks {display:none;}\r\n}\r\n\r\n\r\nhtml[data-codsh-theme] body:not([data-ds-dark-theme]) {\r\n  --codsh-tone-ff9393:#b42318;\r\n  --codsh-tone-aaa:#62656c;\r\n  --codsh-tone-707070:#62656c;\r\n  --codsh-tone-454545:#c7c9cf;\r\n  --codsh-tone-2a2b31:#dcdde1;\r\n  --codsh-tone-ddd:#202124;\r\n  --codsh-tone-929292:#62656c;\r\n  --codsh-tone-666:#70737a;\r\n  --codsh-tone-494949:#b6b9c1;\r\n  --codsh-tone-1b1b1b:#f7f7f8;\r\n  --codsh-tone-404040:#c7c9cf;\r\n  --codsh-tone-e5e5e5:#202124;\r\n  --codsh-tone-363636:#dcdde1;\r\n  --codsh-tone-353535:#ececef;\r\n  --codsh-tone-252525:#ffffff;\r\n  --codsh-tone-383838:#dedfe4;\r\n  --codsh-tone-bdbdbd:#45474d;\r\n  --codsh-tone-2d2d2d:#e9eaed;\r\n  --codsh-tone-a5a5a5:#62656c;\r\n  --codsh-tone-737373:#858890;\r\n  --codsh-tone-323232:#dcdde1;\r\n  --codsh-tone-202127:#eceef2;\r\n  --codsh-tone-3b3b3b:#e2e3e7;\r\n  --codsh-tone-f5f7fb:#202124;\r\n  --codsh-tone-242424:#f7f7f8;\r\n  --codsh-tone-eee:#202124;\r\n  --codsh-tone-34353c:#dcdfe6;\r\n  --codsh-tone-f28b82:#b42318;\r\n  --codsh-tone-181818:#ffffff;\r\n  --codsh-tone-3a3a3a:#dcdde1;\r\n  --codsh-tone-dedede:#202124;\r\n  --codsh-tone-b0b0b0:#62656c;\r\n  --codsh-tone-1c4475:#e3efff;\r\n  --codsh-tone-a678fa:#7040b0;\r\n  --codsh-tone-303030:#f0f0f2;\r\n  --codsh-tone-262626:#f7f7f8;\r\n  --codsh-tone-ececec:#202124;\r\n  --codsh-tone-505050:#b6b9c1;\r\n  --codsh-base:#ffffff; --codsh-sidebar:#f7f7f8; --codsh-rail:#eceef2;\r\n  --codsh-raised:#ffffff; --codsh-input:#f0f0f2; --codsh-hover:#e9eaed;\r\n  --codsh-text:#202124; --codsh-muted:#62656c; --codsh-border:#dcdde1;\r\n}\r\n\r\n\r\n.codsh-search-button {margin-left:auto;width:30px;height:30px;padding:6px;border:0;border-radius:8px;background:transparent;color:var(--codsh-muted);cursor:pointer;}\r\n.codsh-search-button:hover {background:var(--codsh-hover);color:var(--codsh-text);}\r\n.codsh-search-button svg {width:18px;height:18px;fill:none;stroke:currentColor;stroke-width:1.6;stroke-linecap:round;}\r\n.codsh-search-mask {position:fixed;inset:0;z-index:12000;display:flex;justify-content:center;align-items:flex-start;padding:12vh 16px 16px;background:#0005;}\r\n.codsh-search-card {box-sizing:border-box;width:min(620px,100%);padding:10px 6px;border:1px solid var(--codsh-border);border-radius:24px!important;background:var(--codsh-input)!important;color:var(--codsh-text);box-shadow:0 20px 70px #0004;}\r\n.codsh-search-card input {box-sizing:border-box;width:100%;padding:9px 10px;border:0;border-bottom:1px solid var(--codsh-border);border-radius:0!important;background:transparent!important;color:var(--codsh-text);font:13px/20px var(--dsw-font-family);outline:none;}\r\nhtml[data-codsh-theme] .codsh-search-card input:focus-visible {outline:none;box-shadow:none;}\r\n.codsh-search-results {max-height:55vh;overflow-y:auto;padding-top:4px;}\r\n.codsh-search-results h2 {margin:7px 0 2px;padding:0 10px;color:var(--codsh-muted);font:500 11px/18px var(--dsw-font-family);}\r\n.codsh-search-results button {box-sizing:border-box;display:flex;align-items:center;gap:7px;width:100%;min-height:30px;padding:5px 10px;border:0;border-radius:8px;background:transparent;color:var(--codsh-text);font:13px/20px var(--dsw-font-family);text-align:left;cursor:pointer;}\r\n.codsh-search-results button>svg {flex:none;width:16px;height:16px;fill:none;stroke:var(--codsh-muted);stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round;}\r\n.codsh-search-results kbd {flex:none;padding:1px 5px;border-radius:5px;background:var(--codsh-hover);color:var(--codsh-muted);font:11px/16px var(--dsw-font-family);}\r\n.codsh-search-results button:hover,.codsh-search-results .codsh-search-selected {background:var(--codsh-hover);}\r\n.codsh-search-results button span {flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}\r\n.codsh-search-results small {max-width:35%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:var(--codsh-muted);font-size:12px;}\r\n.codsh-search-results p {padding:12px;color:var(--codsh-muted);font-size:13px;}\r\n/* Collapse only the project/session column; the 52px navigation rail stays. */\r\nhtml[data-codsh-theme] :is([class$=\"_frame\"],[class*=\"_frame \"])[data-sidebar-collapsed] {grid-template-columns:var(--codsh-collapsed-columns,52px minmax(0,1fr) 0px)!important;}\r\nhtml[data-codsh-theme] :is([class$=\"_frame\"],[class*=\"_frame \"])[data-sidebar-collapsed] [data-codsh-sidebar] {width:52px!important;min-width:52px!important;padding:6px 0 8px!important;opacity:1!important;}\r\nhtml[data-codsh-theme] :is([class$=\"_frame\"],[class*=\"_frame \"])[data-sidebar-collapsed] [data-codsh-sidebar]>:is(:is([class$=\"_logoRow\"],[class*=\"_logoRow \"]),:is([class$=\"_newSession\"],[class*=\"_newSession \"]),:is([class$=\"_regionArea\"],[class*=\"_regionArea \"])) {display:none!important;}\r\nhtml[data-codsh-theme] :is([class$=\"_frame\"],[class*=\"_frame \"])[data-sidebar-collapsed] [data-codsh-sidebar]>:is(.codsh-rail-tools,:is([class$=\"_panelList\"],[class*=\"_panelList \"]),:is([class$=\"_footArea\"],[class*=\"_footArea \"])) {display:flex!important;opacity:1!important;visibility:visible!important;animation:none!important;}\r\nhtml[data-codsh-theme] :is([class$=\"_frame\"],[class*=\"_frame \"])[data-sidebar-collapsed] [data-codsh-sidebar] :is([class$=\"_panelList\"],[class*=\"_panelList \"]) {flex-direction:column;}\r\nhtml[data-codsh-theme] :is([class$=\"_frame\"],[class*=\"_frame \"])[data-sidebar-collapsed] [data-codsh-sidebar] :is([class$=\"_footArea\"],[class*=\"_footArea \"]) {flex-direction:column;}\r\n.codsh-sidebar-exit {clip-path:inset(0 0 0 52px);}\r\n/* Preview a collapsed navigation view without resizing the conversation. */\r\nhtml[data-codsh-theme] :is([class$=\"_frame\"],[class*=\"_frame \"])[data-sidebar-collapsed] [data-codsh-sidebar][data-codsh-temporary-sidebar] {position:fixed;left:0;top:var(--dsh-frame-chrome-top,42px);bottom:0;z-index:45;width:300px!important;min-width:300px!important;padding:6px 10px 8px 62px!important;box-shadow:12px 0 28px #0002;}\r\nhtml[data-codsh-theme] :is([class$=\"_frame\"],[class*=\"_frame \"])[data-sidebar-collapsed] [data-codsh-sidebar][data-codsh-temporary-sidebar]>:is([class$=\"_regionArea\"],[class*=\"_regionArea \"]) {display:flex!important;flex:1;min-height:0;}\r\nhtml[data-codsh-theme] [data-codsh-sidebar][data-codsh-temporary-sidebar]::before {display:block;}\r\nhtml[data-codsh-theme] [data-codsh-sidebar][data-codsh-temporary-sidebar] .codsh-recent {display:block;}\r\n/* Keep Windows caption controls stationary when only the content panel closes. */\r\nhtml[data-codsh-theme][data-windows-titlebar] {--dsh-windows-menu-start:48px!important;}\r\nhtml[data-codsh-theme][data-windows-titlebar] :is([class$=\"_frame\"],[class*=\"_frame \"])[data-sidebar-collapsed] [data-codsh-sidebar]>:is([class$=\"_logoRow\"],[class*=\"_logoRow \"]) {display:flex!important;height:0!important;min-height:0!important;margin:0!important;padding:0!important;}\r\nhtml[data-codsh-theme][data-windows-titlebar] :is([class$=\"_frame\"],[class*=\"_frame \"])[data-sidebar-collapsed] [data-codsh-sidebar] :is([class$=\"_logoRow\"],[class*=\"_logoRow \"])>:not(:is([class$=\"_toggle\"],[class*=\"_toggle \"])):not([class*=\"_toggle \"]) {display:none!important;}\r\nhtml[data-codsh-theme][data-windows-titlebar] [data-codsh-sidebar] :is([class$=\"_toggle\"],[class*=\"_toggle \"]) {position:fixed!important;left:12px!important;top:calc((var(--dsh-windows-titlebar-height) - 28px) / 2)!important;width:28px!important;height:28px!important;border-radius:6px!important;opacity:1!important;visibility:visible!important;animation:none!important;}\r\nhtml[data-codsh-theme][data-windows-titlebar] [data-codsh-sidebar] :is([class$=\"_toggle\"],[class*=\"_toggle \"]) :is([class$=\"_panelIcon\"],[class*=\"_panelIcon \"]) {display:inline!important;}\r\nhtml[data-codsh-theme][data-windows-titlebar] [data-codsh-sidebar] :is([class$=\"_toggle\"],[class*=\"_toggle \"]) :is([class$=\"_railMark\"],[class*=\"_railMark \"]) {display:none!important;}\r\n/* Selected rail icons carry a stronger silhouette in every theme. */\r\n.codsh-rail-tools button[aria-pressed=\"true\"] svg path {stroke-width:2.5;}\r\n[data-codsh-sidebar] [aria-current=\"page\"] {background:var(--codsh-hover);color:var(--codsh-text);}\r\n[data-codsh-sidebar] [aria-current=\"page\"] :is([class$=\"_panelGlyph\"],[class*=\"_panelGlyph \"]) svg {color:var(--codsh-text);filter:drop-shadow(.35px 0 currentColor) drop-shadow(-.35px 0 currentColor);}\r\n\r\n/* Keep outlined folder states visible, including while hovering the project. */\r\n[data-codsh-sidebar] :is([class$=\"_projectRow\"],[class*=\"_projectRow \"]) :is([class$=\"_folder\"],[class*=\"_folder \"]) {display:inline-flex!important;width:18px;height:20px;flex:none;color:var(--codsh-tone-ddd);}\r\n[data-codsh-sidebar] :is([class$=\"_projectRow\"],[class*=\"_projectRow \"]) :is([class$=\"_folder\"],[class*=\"_folder \"])>svg {display:none;}\r\n[data-codsh-sidebar] :is([class$=\"_projectRow\"],[class*=\"_projectRow \"]) :is([class$=\"_folder\"],[class*=\"_folder \"])::before {content:\"\";display:block;width:18px;height:18px;background:currentColor;mask:url(\"data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22white%22%20stroke-width%3D%221.65%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22M3%208V6a2%202%200%200%201%202-2h5l3%203h6a2%202%200%200%201%202%202v10a2%202%200%200%201-2%202H5a2%202%200%200%201-2-2V8Z%20M3%2010h18%22%2F%3E%3C%2Fsvg%3E\") center/contain no-repeat;}\r\n[data-codsh-sidebar] :is([class$=\"_projectRow\"],[class*=\"_projectRow \"])[aria-expanded=\"true\"] :is([class$=\"_folder\"],[class*=\"_folder \"])::before {mask-image:url(\"data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22white%22%20stroke-width%3D%221.65%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22M3%2010V6a2%202%200%200%201%202-2h5l3%203h5a2%202%200%200%201%202%202v2%20M3%2011h18a1%201%200%200%201%20.9%201.4l-3.1%207.2a2%202%200%200%201-1.8%201.2H5a2%202%200%200%201-2-1.7L2%2012.2A1%201%200%200%201%203%2011Z%22%2F%3E%3C%2Fsvg%3E\");}\r\n[data-codsh-sidebar] :is([class$=\"_projectRow\"],[class*=\"_projectRow \"]) :is([class$=\"_chevron\"],[class*=\"_chevron \"]) {display:none!important;}\r\n[data-codsh-workspaces] button:is([class$=\"_searchButton\"],[class*=\"_searchButton \"]),[data-codsh-workspaces] button[class*=\"_searchButton \"] {display:none!important;}\r\n.codsh-search-card input {border-bottom:0;font-size:13px;padding:7px 10px 9px;}\r\n[data-codsh-workspaces] :is([class$=\"_searchSlot\"],[class*=\"_searchSlot \"]),[data-codsh-workspaces] [class*=\"_searchSlot \"] {display:none!important;}\r\n/* The native panel and conversation navigation share one selection. */\r\n[data-codsh-sidebar] :is([class$=\"_panelRow\"],[class*=\"_panelRow \"])[aria-current=\"page\"] {background:var(--codsh-tone-34353c);color:var(--codsh-tone-eee);}\r\n/* Frosted navigation surfaces, with readable light/dark fallback tints. */\r\nhtml[data-codsh-theme] body {--codsh-glass-tint:rgba(32,33,39,.88);--codsh-glass-highlight:rgba(255,255,255,.045);--codsh-glass-edge:rgba(255,255,255,.07);}\r\nhtml[data-codsh-theme] body:not([data-ds-dark-theme]) {--codsh-glass-tint:rgba(236,238,242,.88);--codsh-glass-highlight:rgba(255,255,255,.32);--codsh-glass-edge:rgba(105,115,135,.12);}\r\nhtml[data-codsh-theme] [data-codsh-sidebar]::before {background:linear-gradient(145deg,var(--codsh-glass-highlight),transparent 65%),var(--codsh-glass-tint);backdrop-filter:blur(20px) saturate(125%);border-right:1px solid var(--codsh-glass-edge);}\r\nhtml[data-codsh-theme][data-windows-titlebar] :is([class$=\"_frame\"],[class*=\"_frame \"])::before {background:var(--dsw-specific-sidebar-fill);backdrop-filter:blur(20px) saturate(125%);box-shadow:inset 0 -1px var(--codsh-glass-edge);}\r\n@media(prefers-reduced-transparency:reduce) {\r\n  html[data-codsh-theme] [data-codsh-sidebar]::before {background:var(--codsh-rail);backdrop-filter:none;}\r\n  html[data-codsh-theme][data-windows-titlebar] :is([class$=\"_frame\"],[class*=\"_frame \"])::before {backdrop-filter:none;}\r\n}\r\nhtml[data-codsh-theme] [data-codsh-sidebar][data-codsh-temporary-sidebar]>:is([class$=\"_regionArea\"],[class*=\"_regionArea \"]) {flex-direction:column;}\r\n.codsh-temporary-brand {display:none;}\r\nhtml[data-codsh-theme][data-windows-titlebar] :is([class$=\"_frame\"],[class*=\"_frame \"])[data-sidebar-collapsed] [data-codsh-sidebar][data-codsh-temporary-sidebar]>:is([class$=\"_logoRow\"],[class*=\"_logoRow \"]) {height:42px!important;min-height:42px!important;margin:0 0 4px!important;padding-left:9px!important;}\r\nhtml[data-codsh-theme][data-windows-titlebar] :is([class$=\"_frame\"],[class*=\"_frame \"])[data-sidebar-collapsed] [data-codsh-sidebar][data-codsh-temporary-sidebar] :is([class$=\"_logoRow\"],[class*=\"_logoRow \"])>.codsh-search-button {display:block!important;}\r\nhtml[data-codsh-theme][data-windows-titlebar] :is([class$=\"_frame\"],[class*=\"_frame \"])[data-sidebar-collapsed] [data-codsh-sidebar][data-codsh-temporary-sidebar] :is([class$=\"_logoRow\"],[class*=\"_logoRow \"])>.codsh-temporary-brand {display:block!important;font:600 19px/26px var(--dsw-font-family);color:var(--codsh-text);}\r\nhtml[data-codsh-theme] :is([class$=\"_frame\"],[class*=\"_frame \"])[data-sidebar-collapsed] [data-codsh-sidebar][data-codsh-temporary-sidebar]>:is([class$=\"_newSession\"],[class*=\"_newSession \"]) {display:flex!important;position:static!important;width:100%;height:34px;min-height:34px;justify-content:flex-start;margin:0 0 5px!important;padding:5px 10px!important;border:0!important;border-radius:9px;background:transparent!important;}\r\nhtml[data-codsh-theme] [data-codsh-temporary-sidebar] :is([class$=\"_newSession\"],[class*=\"_newSession \"])::after {content:\"新会话\";font:13px/20px var(--dsw-font-family);margin-left:6px;}\r\n/* Slightly tighter assistant reply typography, preserving font-size settings. */\r\nhtml[data-codsh-theme] :is([class$=\"_body\"],[class*=\"_body \"])>:is([class$=\"_markdown\"],[class*=\"_markdown \"]) {line-height:1.5;}\r\nhtml[data-codsh-theme] :is([class$=\"_body\"],[class*=\"_body \"])>:is([class$=\"_markdown\"],[class*=\"_markdown \"]) p {margin-block:10px;}\r\nhtml[data-codsh-theme] :is([class$=\"_body\"],[class*=\"_body \"])>:is([class$=\"_markdown\"],[class*=\"_markdown \"]) :is(ul,ol) {margin-block:10px;}\r\nhtml[data-codsh-theme] :is([class$=\"_body\"],[class*=\"_body \"])>:is([class$=\"_markdown\"],[class*=\"_markdown \"]) li {margin-block:4px;line-height:1.5;}\r\n/* Match the expanded column geometry rather than inheriting native rail sizing. */\r\nhtml[data-codsh-theme] :is([class$=\"_frame\"],[class*=\"_frame \"])[data-sidebar-collapsed] [data-codsh-sidebar][data-codsh-temporary-sidebar] {width:var(--codsh-expanded-sidebar-width,300px)!important;min-width:var(--codsh-expanded-sidebar-width,300px)!important;}\r\nhtml[data-codsh-theme] [data-codsh-sidebar] :is([class$=\"_newSessionContent\"],[class*=\"_newSessionContent \"]) {width:auto!important;justify-content:flex-start!important;}\r\nhtml[data-codsh-theme] [data-codsh-sidebar][data-codsh-temporary-sidebar] :is([class$=\"_newSessionLabelMask\"],[class*=\"_newSessionLabelMask \"]) {flex:0 0 auto!important;width:auto!important;}\r\nhtml[data-codsh-theme] [data-codsh-sidebar][data-codsh-temporary-sidebar] :is([class$=\"_newSession\"],[class*=\"_newSession \"])::after {margin-left:6px;}\r\nhtml[data-codsh-theme] [data-codsh-sidebar][data-codsh-temporary-sidebar] [data-codsh-workspaces]>:is([class$=\"_search\"],[class*=\"_search \"]) {display:none!important;}\r\nhtml[data-codsh-theme] [data-codsh-sidebar][data-codsh-temporary-sidebar] [data-codsh-workspaces]>:is([class$=\"_sectionHeader\"],[class*=\"_sectionHeader \"]) {gap:6px;margin-bottom:4px;padding-left:0;}\r\nhtml[data-codsh-theme] [data-codsh-sidebar][data-codsh-temporary-sidebar]>:is([class$=\"_regionArea\"],[class*=\"_regionArea \"]) {margin-left:-4px;margin-right:calc(-1 * var(--dsh-sidebar-inline-padding));padding-left:4px;gap:0;}\r\nhtml[data-codsh-theme] [data-codsh-sidebar][data-codsh-temporary-sidebar] [data-codsh-workspaces] :is([class$=\"_listArea\"],[class*=\"_listArea \"]) {flex:0 0 auto!important;min-height:0!important;}\r\n/* Temporary sidebar uses the actual expanded React tree, only its placement differs. */\r\nhtml[data-codsh-theme] :is([class$=\"_frame\"],[class*=\"_frame \"])[data-codsh-sidebar-overlay] {grid-template-columns:var(--codsh-collapsed-columns,52px minmax(0,1fr) 0px)!important;transition:none!important;}\r\nhtml[data-codsh-theme] :is([class$=\"_frame\"],[class*=\"_frame \"])[data-codsh-sidebar-overlay] [data-codsh-sidebar][data-codsh-temporary-sidebar] {position:fixed;left:0;top:var(--dsh-frame-chrome-top,42px);bottom:0;z-index:45;width:var(--codsh-expanded-sidebar-width,300px)!important;min-width:var(--codsh-expanded-sidebar-width,300px)!important;padding:6px 10px 8px 62px!important;box-shadow:12px 0 28px #0002;}\r\nhtml[data-codsh-theme] :is([class$=\"_frame\"],[class*=\"_frame \"])[data-codsh-sidebar-overlay]:not([data-sidebar-collapsed]) [data-codsh-sidebar] :is([class$=\"_newSession\"],[class*=\"_newSession \"])::after {content:none;}\r\nhtml[data-codsh-theme] :is([class$=\"_frame\"],[class*=\"_frame \"])[data-codsh-sidebar-overlay]:not([data-sidebar-collapsed]) [data-codsh-sidebar] .codsh-temporary-brand {display:none!important;}\r\nhtml[data-codsh-theme] :is([class$=\"_frame\"],[class*=\"_frame \"])[data-codsh-sidebar-overlay]:not([data-sidebar-collapsed]) [data-codsh-sidebar]>:is([class$=\"_regionArea\"],[class*=\"_regionArea \"]) {margin-left:-4px;margin-right:calc(-1 * var(--dsh-sidebar-inline-padding));padding-left:4px;}\r\n\n/* Travel has exactly two endpoints: its easing never restarts mid-flight. */\n@property --jet-progress {syntax:\"<number>\";inherits:false;initial-value:0;}\n/* Fill ends at the thumb center; subtract its 16px radius for the nozzle.\n   One continuous phase moves every dot from that nozzle to the fill origin. */\n@keyframes codsh-water-dot {from {--jet-progress:0;} to {--jet-progress:1;}}\n@keyframes codsh-water-fade {0% {opacity:0;scale:.5;} 15% {opacity:.85;} 60% {opacity:.65;scale:1;} 100% {opacity:0;scale:.5;}}\n";
const requestCodec={mode:'strict',typeSymbol:'CodshDeleteSessionRequest',create:()=>({parse(value){
  if(!value||typeof value!=='object'||Array.isArray(value)||typeof value.sessionId!=='string'||!value.sessionId.trim()||value.confirm!==true||Object.keys(value).some(key=>!['sessionId','confirm'].includes(key)))throw Error('永久删除请求必须包含 sessionId 和 confirm: true');
  return {sessionId:value.sessionId,confirm:true};
}})};
const resultCodec={mode:'strict',typeSymbol:'CodshDeleteSessionResult',create:()=>({parse(value){
  if(!value||value.deleted!==true||typeof value.sessionId!=='string'||!value.sessionId)throw Error('删除接口返回了无效结果');
  return {deleted:true,sessionId:value.sessionId};
}})};
const contribution={package:'dsh-codsh-theme',descriptors:[{
  id:'dsh-codsh-theme#deleteSession',service:'codshActions',namespace:'codshActions',method:'deleteSession',
  invocation:{kind:'direct'},parameters:[{name:'request',wire:'request',source:'json',codec:requestCodec}],result:resultCodec,
},{
  id:'dsh-codsh-theme#deleteProject',service:'codshActions',namespace:'codshActions',method:'deleteProject',invocation:{kind:'direct'},
  parameters:[{name:'request',wire:'request',source:'json',codec:{mode:'strict',typeSymbol:'CodshDeleteProjectRequest',create:()=>({parse(value){
    if(!value||typeof value.workspaceId!=='string'||!value.workspaceId.trim()||value.confirm!==true||Object.keys(value).some(key=>!['workspaceId','confirm'].includes(key)))throw Error('需要 workspaceId 和 confirm: true');return {workspaceId:value.workspaceId,confirm:true};
  }})}}],result:{mode:'strict',typeSymbol:'CodshDeleteProjectResult',create:()=>({parse(value){if(!value||value.deleted!==true||typeof value.workspaceId!=='string')throw Error('项目删除结果无效');return {deleted:true,workspaceId:value.workspaceId};}})},
}]};

// Host mutations use public RPC/services; project pins are appearance preferences.
function createSidebarActions(ctx,mark,onChange,deleteSession,deleteProject) {
  const buttons=new Map();let menu,dialog;
  let projectPins=[];
  try{projectPins=JSON.parse(localStorage.getItem('codsh.project-pins')||'[]').filter(id=>typeof id==='string');}catch{}
  const icon=name=>{
    const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.setAttribute('viewBox','0 0 24 24');svg.setAttribute('aria-hidden','true');
    const path=document.createElementNS(svg.namespaceURI,'path');path.setAttribute('d',({pin:'m15 3 6 6-4 1-3 5-5-5 5-3z M9 15l-6 6',rename:'m4 16 12-12 4 4L8 20H4z M13 7l4 4',folder:'M3 6h6l2 2h10v12H3z',delete:'M4 7h16 M9 7V4h6v3 M6 7l1 14h10l1-14 M10 11v6 M14 11v6'})[name]);
    if(name==='archive')path.setAttribute('d','M3 4h18v4H3z M5 8v12h14V8 M9 12h6');
    path.setAttribute('fill','none');path.setAttribute('stroke','currentColor');path.setAttribute('stroke-width','1.5');path.setAttribute('stroke-linecap','round');path.setAttribute('stroke-linejoin','round');svg.append(path);return svg;
  };
  async function togglePin(row){
    const workspace=row.dataset.rowKey?.startsWith('workspace:');const id=workspace?row.dataset.rowKey.slice(10):row.dataset.sessionId||row.dataset.rowKey?.slice(8);
    const pinned=workspace?projectPins.includes(id):(ctx.workspaces.list.getSnapshot().pinnedSessionIds||[]).includes(id);
    if(workspace){const next=projectPins.filter(key=>key!==id);if(!pinned)next.unshift(id);localStorage.setItem('codsh.project-pins',JSON.stringify(next));projectPins=next;}
    else await (pinned?ctx.workspaces.unpinSession(id):ctx.workspaces.pinSession(id));
    onChange();
  }
  const closeMenu=()=>{menu?.remove();menu=undefined;};
  const outside=event=>{if(menu&&!menu.contains(event.target))closeMenu();};
  const keyboard=event=>{if(event.key==='Escape'){closeMenu();dialog?.remove();dialog=undefined;}};
  document.addEventListener('pointerdown',outside);document.addEventListener('keydown',keyboard);
  const checked=async result=>{const value=await result;if(value?.ok===false)throw Error(value.error?.message||'操作失败');return value;};
  function form(title,value,description,submit,confirmLabel='保存') {
    dialog?.remove();dialog=document.createElement('div');dialog.className='codsh-action-mask';
    const card=document.createElement('form');card.className='codsh-action-dialog';card.setAttribute('role','dialog');card.setAttribute('aria-modal','true');card.setAttribute('aria-label',title);
    const heading=document.createElement('h2');heading.textContent=title;
    const detail=document.createElement('p');detail.textContent=description;
    const input=document.createElement('input');input.value=value||'';input.setAttribute('aria-label','名称');input.required=true;
    const error=document.createElement('p');error.className='codsh-action-error';error.setAttribute('role','alert');
    const footer=document.createElement('div');const cancel=document.createElement('button');cancel.type='button';cancel.textContent='取消';
    const save=document.createElement('button');save.type='submit';save.textContent=confirmLabel;
    const owner=dialog;cancel.onclick=()=>{owner.remove();if(dialog===owner)dialog=undefined;};
    footer.append(cancel,save);card.append(heading,detail);if(value!==null)card.append(input);card.append(error,footer);owner.append(card);document.body.append(owner);
    if(value===null)save.focus();else{input.focus();input.select();}
    card.addEventListener('submit',async event=>{
      event.preventDefault();const name=input.value.trim();if(value!==null&&!name){error.textContent='名称不能为空';return;}
      save.disabled=true;cancel.disabled=true;
      try{await submit(name);owner.remove();if(dialog===owner)dialog=undefined;onChange();}
      catch(reason){error.textContent=reason.message||String(reason);save.disabled=false;cancel.disabled=false;}
    });
  }
  function open(row,event) {
    event?.preventDefault();event?.stopPropagation();closeMenu();
    const workspace=row.dataset.rowKey?.startsWith('workspace:');
    const id=workspace?row.dataset.rowKey.slice(10):row.dataset.sessionId||row.dataset.rowKey?.slice(8);
    if(!id)return;
    const snapshot=ctx.workspaces.list.getSnapshot();
    const project=(snapshot.items||[]).find(item=>item.workspaceId===id);
    const session=ctx.sessions.list.getSnapshot().byId[id];
    if(workspace&&!project||!workspace&&!session)return;
    const title=workspace?project.title:session.title||session.displayTitle||'未命名会话';
    const pinned=workspace?projectPins.includes(id):(snapshot.pinnedSessionIds||[]).includes(id);
    menu=document.createElement('div');menu.className='codsh-actions-menu';menu.setAttribute('role','menu');
    const actions=[
      ['重命名',()=>form(workspace?'重命名项目':'重命名会话',title,'',name=>workspace?ctx.workspaces.rename(id,name):checked(ctx.remote.session.rename({sessionId:id,title:name})))],
      [pinned?'取消置顶':'置顶',()=>togglePin(row)],
    ];
    if(workspace){
      actions.push(['永久删除项目',()=>form('永久删除项目及全部会话',null,`确定永久删除项目“${title}”及其全部会话（包括归档和子会话）？此操作无法恢复，正在执行的任务会停止。项目文件夹和代码文件会保留。`,async()=>{await deleteProject(id);projectPins=projectPins.filter(key=>key!==id);localStorage.setItem('codsh.project-pins',JSON.stringify(projectPins));},'停止并永久删除')]);
      actions.push(['在资源管理器中打开',()=>project.path?checked(ctx.remote.session.openWorkspacePath({path:project.path})):Promise.reject(Error('此项目没有文件夹路径'))]);
    }else{
      const archived=(snapshot.archivedSessionIds||[]).includes(id);
      actions.push([archived?'取消归档':'归档会话',()=>archived?ctx.uiWorkspace.unarchiveSession(id):ctx.uiWorkspace.archiveSession(id,{stopActivity:true})]);
      actions.push(['永久删除会话',()=>form('永久删除会话',null,`永久删除“${title}”的会话记录，无法恢复。正在执行的任务会停止，不会删除项目文件。`,()=>deleteSession(id),'停止并永久删除')]);
    }
    for(const [label,action] of actions){const button=document.createElement('button');button.type='button';button.setAttribute('role','menuitem');button.append(icon(label.includes('置顶')?'pin':label==='重命名'?'rename':label.includes('归档')?'archive':label.includes('资源管理器')?'folder':'delete'),document.createTextNode(label));
      button.onclick=async()=>{closeMenu();try{await action();}catch(reason){form('操作失败',null,reason.message||String(reason),async()=>{},'关闭');}};menu.append(button);}
    const rect=row.getBoundingClientRect();menu.style.left=`${Math.max(8,Math.min(event?.clientX||rect.right,window.innerWidth-240))}px`;menu.style.top=`${Math.max(8,Math.min(event?.clientY||rect.bottom,window.innerHeight-actions.length*36-16))}px`;
    document.body.append(menu);menu.firstElementChild.focus();
  }
  const context=event=>{const row=event.target.closest?.('.codsh-session,[data-row-key^="session:"],[data-row-key^="workspace:"]');if(row?.closest('[data-codsh-sidebar]')&&!row.closest('.codsh-sidebar-exit'))open(row,event);};
  document.addEventListener('contextmenu',context,true);
  function refresh() {
    for(const [row,controls] of buttons)if(!row.isConnected){controls.button.remove();controls.pin.remove();buttons.delete(row);}
    document.querySelectorAll('[data-codsh-sidebar] [data-row-key^="workspace:"],[data-codsh-sidebar] [data-row-key^="session:"],[data-codsh-sidebar] .codsh-session').forEach(row=>{
      if(row.closest('.codsh-sidebar-exit')||row.dataset.rowKey==='workspace:')return;
      mark(row,'data-codsh-actions');
      row.querySelectorAll('button').forEach(native=>{
        if(native.className.startsWith('codsh-'))return;
        if(native.getAttribute('aria-haspopup')==='menu'||/^(工作区|会话).*的操作$|^(Workspace|Session) actions for /.test(native.getAttribute('aria-label')||''))mark(native,'data-codsh-native-more');
        if(row.dataset.rowKey?.startsWith('session:')&&/^(取消)?(置顶|归档)(会话|对话)?$|^(Unpin|Pin|Unarchive|Archive)( session)?$/i.test(native.getAttribute('aria-label')||''))mark(native,'data-codsh-native-more');
      });
      if(!buttons.has(row)){
        const button=document.createElement('button');button.type='button';button.className='codsh-row-menu';button.textContent='⋯';button.setAttribute('aria-label','更多操作');button.setAttribute('aria-haspopup','menu');
        button.addEventListener('click',event=>open(row,event));button.addEventListener('pointerdown',event=>event.stopPropagation());
        const pin=document.createElement('button');pin.type='button';pin.className='codsh-row-pin';pin.append(icon('pin'));
        pin.addEventListener('pointerdown',event=>event.stopPropagation());
        pin.addEventListener('click',async event=>{event.preventDefault();event.stopPropagation();pin.disabled=true;try{await togglePin(row);}catch(reason){form('操作失败',null,reason.message||String(reason),async()=>{},'关闭');}finally{pin.disabled=false;}});
        const parent=row.classList.contains('codsh-session')?row.parentElement:row;parent.append(pin,button);buttons.set(row,{button,pin});
      }
      const pinned=row.dataset.rowKey?.startsWith('workspace:')?projectPins.includes(row.dataset.rowKey.slice(10)):(ctx.workspaces.list.getSnapshot().pinnedSessionIds||[]).includes(row.dataset.sessionId||row.dataset.rowKey?.slice(8));
      const pin=buttons.get(row).pin;pin.setAttribute('aria-label',pinned?'取消置顶':'置顶');pin.setAttribute('aria-pressed',String(pinned));pin.title=pinned?'取消置顶':'置顶';
      if(row.dataset.rowKey?.startsWith('workspace:')){
        const pinned=projectPins.includes(row.dataset.rowKey.slice(10));mark(row,'data-codsh-project-pinned',String(pinned));
        const group=row.closest(local('groupSection'));if(group)mark(group,'data-codsh-project-pinned',String(pinned));
      }
    });
  }
  return {refresh,dispose(){closeMenu();dialog?.remove();for(const controls of buttons.values()){controls.button.remove();controls.pin.remove();}buttons.clear();document.removeEventListener('pointerdown',outside);document.removeEventListener('keydown',keyboard);document.removeEventListener('contextmenu',context,true);}};
}

function createProjectSearch(ctx) {
  const buttons=new Map();let mask,input,list,owner,active=0,results=[];
  const close=()=>{mask?.remove();mask=undefined;owner?.focus();};
  const choose=async row=>{
    try{if(row.action){close();row.action();}else if(row.kind==='project'){await ctx.uiWorkspace.openWorkspace(row.id);close();}else{ctx.uiWorkspace.openSession(row.id);close();}}
    catch(error){list.textContent=error.message||'无法打开';}
  };
  const highlight=()=>{Array.from(list?.querySelectorAll('button')||[]).forEach((button,index)=>button.classList.toggle('codsh-search-selected',index===active));list?.querySelector('.codsh-search-selected')?.scrollIntoView?.({block:'nearest'});};
  const render=()=>{
    if(!mask)return;
    const projects=ctx.workspaces.list.getSnapshot(),sessions=ctx.sessions.list.getSnapshot();
    const query=input.value.trim().toLocaleLowerCase(),archived=new Set(projects.archivedSessionIds||[]);
    results=[...(projects.items||[]).map(project=>({kind:'project',id:project.workspaceId,title:project.title,detail:'项目'})),
      ...(sessions.ids||[]).map(id=>sessions.byId[id]).filter(row=>row&&!row.blank&&!row.parentId&&row.origin!=='subagent'&&!archived.has(row.id)).sort((a,b)=>b.updatedAt-a.updatedAt).map(row=>({kind:'session',id:row.id,title:row.title||row.displayTitle||'未命名会话',detail:(projects.items||[]).find(project=>project.sessionIds?.includes(row.id))?.title||'会话'}))
    ].filter(row=>row.title.toLocaleLowerCase().includes(query));
    active=0;list.replaceChildren();
    const matches=results.length;
    const actions=[{kind:'action',title:'新聊天',detail:'',action:()=>ctx.uiWorkspace.startSession()},{kind:'action',title:'打开文件夹',detail:'',action:()=>owner?.closest('[data-codsh-sidebar]')?.querySelector('button[aria-label="添加工作区"],button[aria-label="Add workspace"]')?.click()}].filter(row=>!query||row.title.includes(query));
    results.push(...actions);
    let group;
    for(const [index,row] of results.entries()){
      const heading=row.kind==='project'?'项目':row.kind==='session'?'聊天':'快捷操作';
      if(group!==heading){const label=document.createElement('h2');label.textContent=heading;list.append(label);group=heading;}
      const button=document.createElement('button');button.type='button';const title=document.createElement('span');title.textContent=row.title;const detail=document.createElement('small');detail.textContent=row.detail;
      const icon=document.createElementNS('http://www.w3.org/2000/svg','svg');icon.setAttribute('aria-hidden','true');icon.setAttribute('viewBox','0 0 24 24');
      const path=document.createElementNS(icon.namespaceURI,'path');
      path.setAttribute('d',row.kind==='session'?'M5 4h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H9l-6 4V6a2 2 0 0 1 2-2Z':row.kind==='action'&&row.title==='新聊天'?'M12 5v14M5 12h14':'M3 7V5a2 2 0 0 1 2-2h5l3 3h6a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Zm0 1h18');icon.append(path);
      button.append(icon,title,detail);
      if(index<9){row.shortcut=index+1;const key=document.createElement('kbd');key.textContent=`Alt+${index+1}`;button.append(key);}
      button.onclick=()=>choose(row);list.append(button);
    }
    if(!matches&&query){const empty=document.createElement('p');empty.textContent='没有匹配的项目或会话';list.prepend(empty);}
    highlight();
  };
  const show=button=>{
    close();owner=button;mask=document.createElement('div');mask.className='codsh-search-mask';
    const card=document.createElement('section');card.className='codsh-search-card';card.setAttribute('role','dialog');card.setAttribute('aria-modal','true');card.setAttribute('aria-label','搜索项目或会话');
    input=document.createElement('input');input.type='search';input.placeholder='搜索项目或会话';input.setAttribute('aria-label','搜索项目或会话');
    list=document.createElement('div');list.className='codsh-search-results';card.append(input,list);mask.append(card);document.body.append(mask);
    input.oninput=render;mask.onmousedown=event=>{if(event.target===mask)close();};
    card.onkeydown=event=>{
      if(event.key==='Escape'){event.preventDefault();event.stopPropagation();close();}
      else if(event.altKey&&/^[1-9]$/.test(event.key)&&results[Number(event.key)-1]){event.preventDefault();choose(results[Number(event.key)-1]);}
      else if(event.key==='ArrowDown'||event.key==='ArrowUp'){event.preventDefault();active=results.length?(active+(event.key==='ArrowDown'?1:-1)+results.length)%results.length:0;highlight();}
      else if(event.key==='Enter'&&event.target===input&&results[active]){event.preventDefault();choose(results[active]);}
      else if(event.key==='Tab'){const controls=[input,...list.querySelectorAll('button')];const index=controls.indexOf(document.activeElement);if(event.shiftKey&&index===0){event.preventDefault();controls.at(-1).focus();}else if(!event.shiftKey&&index===controls.length-1){event.preventDefault();input.focus();}}
    };render();input.focus();
  };
  return {attach(row){let button=buttons.get(row);if(!button){button=document.createElement('button');button.type='button';button.className='codsh-search-button';button.title='搜索项目或会话';button.setAttribute('aria-label','搜索项目或会话');button.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/></svg>';button.onclick=()=>show(button);buttons.set(row,button);}if(button.parentElement!==row)row.append(button);},refresh(){for(const [row,button] of buttons)if(!row.isConnected){button.remove();buttons.delete(row);}render();},dispose(){close();for(const button of buttons.values())button.remove();buttons.clear();}};
}

// Add presentation controls while delegating every data mutation to Harness.
function createRefinements(mark) {
  const effortLabel = label => ({off:'关闭',low:'低',high:'高',max:'最高'}[String(label).toLowerCase()] || label);
  const modelViews = new Map();
  const effortViews = new Map();
  const settingsViews = new Map();
  const conversationTabs = new Map();
  const layoutExits=new Set();
  let resizeTimer;
  function alignConversationTabs(){
    document.querySelectorAll('[data-conversation-tabs]').forEach(tabs=>{
      const root=tabs.closest(local('root'))||tabs.parentElement;
      const title=root?.querySelector(local('crumb'))||root?.querySelector(local('crumbCurrent'))||root?.querySelector(local('crumbs'))||root?.querySelector(local('titleRow'));
      if(!title)return;
      const titleRect=title.getBoundingClientRect(),tabRect=tabs.getBoundingClientRect();
      if(!titleRect.width||!tabRect.width)return;
      const titleStyle=getComputedStyle(title);
      const textLeft=titleRect.left+(parseFloat(titleStyle.paddingLeft)||0)+(parseFloat(titleStyle.borderLeftWidth)||0);
      const delta=textLeft-tabRect.left;if(Math.abs(delta)<.5)return;
      const style=document.createElement('div').style;style.cssText=tabs.getAttribute('style')||'';
      style.setProperty('margin-left',((parseFloat(getComputedStyle(tabs).marginLeft)||0)+delta)+'px','important');
      mark(tabs,'style',style.cssText);
    });
  }
  const resizing=()=>{
    document.querySelectorAll(local('frame')).forEach(frame=>mark(frame,'data-codsh-resizing'));
    alignConversationTabs();
    clearTimeout(resizeTimer);
    resizeTimer=setTimeout(()=>document.querySelectorAll('[data-codsh-resizing]').forEach(frame=>frame.removeAttribute('data-codsh-resizing')),180);
  };
  const sidebarToggle=event=>{
    const toggle=event.target.closest?.(local('toggle'));
    const frame=toggle?.closest(local('frame'));
    if(frame?.hasAttribute('data-codsh-sidebar-overlay'))return;
    const sidebar=frame?.querySelector('[data-codsh-sidebar]');
    if(!sidebar||frame.hasAttribute('data-sidebar-collapsed')||window.matchMedia?.('(prefers-reduced-motion: reduce)').matches)return;
    for(const entry of layoutExits){entry.animation?.cancel();entry.node.remove();}layoutExits.clear();
    const rect=sidebar.getBoundingClientRect();if(!rect.width||!rect.height)return;
    // React removes the expanded contents immediately. Keep a noninteractive
    // visual snapshot until the narrowing grid has finished clipping them.
    const node=document.createElement('div');node.className='codsh-sidebar-exit';node.inert=true;node.setAttribute('aria-hidden','true');
    Object.assign(node.style,{left:`${rect.left}px`,top:`${rect.top}px`,width:`${rect.width}px`,height:`${rect.height}px`});
    const copy=sidebar.cloneNode(true);copy.style.height='100%';copy.style.minWidth=`${rect.width}px`;
    // Fixed controls acquire the snapshot's paint containment as their new
    // containing block. Do not clone the titlebar toggle or stationary rail.
    copy.querySelectorAll(`${local('toggle')},.codsh-rail-tools,${local('panelList')},${local('footArea')}`).forEach(control=>control.remove());
    copy.querySelectorAll('[id]').forEach(element=>element.removeAttribute('id'));copy.removeAttribute('id');
    node.append(copy);document.body.append(node);
    const entry={node};layoutExits.add(entry);
    if(node.animate){
      entry.animation=node.animate([{clipPath:'inset(0 0 0 52px)',opacity:1},{clipPath:'inset(0 calc(100% - 52px) 0 52px)',opacity:0}],{duration:240,easing:'cubic-bezier(.22,1,.36,1)'});
      entry.animation.onfinish=()=>{node.remove();layoutExits.delete(entry);};
    }else{node.remove();layoutExits.delete(entry);}
  };
  window.addEventListener('resize',resizing);
  document.addEventListener('click',sidebarToggle,true);
  const closeEffort = (view,closeNative=true) => {
    view.open=false;view.closed=true;view.pending=false;view.commitIndex=undefined;
    view.control?.panel.remove();view.control=undefined;
    if(view.menu?.isConnected)view.menu.removeAttribute('data-codsh-effort-bridge');
    view.menu=undefined;
    view.button.setAttribute('aria-expanded','false');
    if(closeNative&&view.trigger?.isConnected&&view.trigger.getAttribute('aria-expanded')==='true')view.trigger.click();
  };
  const outside = event => {
    for(const view of modelViews.values())if(view.open&&!view.button.contains(event.target)&&!view.control?.panel.contains(event.target))closeEffort(view);
  };
  const escape = event => {if(event.key==='Escape')for(const view of modelViews.values())if(view.open){closeEffort(view);view.button.focus();}};
  document.addEventListener('pointerdown',outside);
  document.addEventListener('keydown',escape);
  const text = (node,value) => { if (node.textContent !== value) node.textContent = value; };
  const chevron = () => {
    const icon = document.createElementNS('http://www.w3.org/2000/svg','svg');
    icon.setAttribute('viewBox','0 0 16 16'); icon.setAttribute('aria-hidden','true');
    const path = document.createElementNS(icon.namespaceURI,'path');
    path.setAttribute('d','m6 4 4 4-4 4'); path.setAttribute('fill','none');
    path.setAttribute('stroke','currentColor'); path.setAttribute('stroke-width','1.5');
    icon.append(path); return icon;
  };
  function refresh() {
    document.querySelectorAll(local('tabs')).forEach(tabs=>{
      const labels=Array.from(tabs.querySelectorAll('button')).map(button=>button.textContent.trim());
      if(labels.some(label=>/^(对话|Chat|Conversation)$/i.test(label))&&labels.some(label=>/^(轨迹|Trajectory)$/i.test(label)))mark(tabs,'data-conversation-tabs');
    });
    for(const [tabs,state] of conversationTabs)if(!tabs.isConnected){state.animation?.cancel();conversationTabs.delete(tabs);}
    alignConversationTabs();
    document.querySelectorAll('[data-conversation-tabs]').forEach(tabs=>{
      const buttons=Array.from(tabs.querySelectorAll(':scope>button'));
      const index=buttons.findIndex(button=>button.getAttribute('aria-selected')==='true');
      const previous=conversationTabs.get(tabs);
      if(previous?.index===index)return;
      previous?.animation?.cancel();
      const state={index};conversationTabs.set(tabs,state);
      const area=tabs.closest(local('root'))?.querySelector(local('viewArea'));
      if(previous&&index>=0&&area?.animate&&!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches){
        state.animation=area.animate([{opacity:.6,transform:`translateX(${index>previous.index?6:-6}px)`},{opacity:1,transform:'translateX(0)'}],{duration:220,easing:'cubic-bezier(.22,1,.36,1)'});
      }
    });
    // Do not retain React nodes from closed menus or previous sessions.
    for (const [trigger,view] of modelViews) if (!trigger.isConnected) { closeEffort(view);view.button.remove(); modelViews.delete(trigger); }
    for (const [menu] of effortViews) if (!menu.isConnected) effortViews.delete(menu);
    for (const [panel,view] of settingsViews) if (!panel.isConnected) {view.search.remove();view.back.remove();settingsViews.delete(panel);}
    document.querySelectorAll('[data-shortcut-modal="settings"]').forEach(panel=>{
      const nav=panel.querySelector(local('nav'));if(!nav)return;
      let view=settingsViews.get(panel);
      if(!view) {
        const search=document.createElement('input');search.type='search';search.className='codsh-settings-search';
        search.placeholder='搜索';search.setAttribute('aria-label','搜索设置导航和当前页面');
        const back=document.createElement('button');back.type='button';back.className='codsh-settings-back';back.textContent='‹ 返回聊天';
        back.addEventListener('click',()=>panel.querySelector(local('close'))?.click());
        const title=nav.querySelector(local('navTitle'));title?.after(search);nav.append(back);
        view={search,back};settingsViews.set(panel,view);
        search.addEventListener('input',refresh);
      }
      if(view.search.parentElement!==nav)nav.querySelector(local('navTitle'))?.after(view.search);
      if(view.back.parentElement!==nav)nav.append(view.back);
      const query=view.search.value.trim().toLocaleLowerCase();
      panel.querySelectorAll(`${local('navCell')},[data-slot="settings.general.item"]`).forEach(row=>{
        if(query&&!row.textContent.toLocaleLowerCase().includes(query))mark(row,'data-codsh-settings-filtered');
        else row.removeAttribute('data-codsh-settings-filtered');
      });
    });
    document.querySelectorAll('[data-codsh-model-trigger]').forEach(trigger => {
      const effort = trigger.querySelector(local('triggerEffort'));
      let view = modelViews.get(trigger);
      if (!effort) { if (view) { view.button.remove();modelViews.delete(trigger); } return; }
      if (!view) {
        const button = document.createElement('button'); button.type = 'button';
        button.className = 'codsh-reasoning-trigger'; button.setAttribute('aria-haspopup','menu');
        const caption = document.createElement('span');button.append(caption,chevron());
        view = {button,caption,trigger,pending:false,open:false};
        button.addEventListener('click',() => {
          if(view.open){closeEffort(view);return;}
          view.open=true;view.closed=false;
          view.pending = true;
          if (trigger.getAttribute('aria-expanded') !== 'true') trigger.click();
          refresh();
        });
        trigger.parentElement.append(button); modelViews.set(trigger,view);
      }
      mark(trigger,'data-codsh-split-model');
      const targetOption=view.control?.targetIndex!==undefined?view.options?.[view.control.targetIndex]:null;
      const targetLabel=targetOption?(targetOption.querySelector(local('modelName'))?.textContent.trim()||targetOption.textContent.trim()):null;
      text(view.caption,effortLabel(targetLabel||effort.textContent.trim()));
      if(view.button.disabled !== trigger.disabled)view.button.disabled = trigger.disabled;
      view.button.setAttribute('aria-label',`调整思考强度：${effortLabel(effort.textContent.trim())}`);
      const id = trigger.getAttribute('aria-controls');
      const menu = id ? document.getElementById(id) : null;
      const existing=view.control;
      if(existing?.targetIndex!==undefined){
        if(trigger.disabled)existing.sawPending=true;
        if(!menu&&effort.textContent.trim()===targetLabel&&!trigger.disabled){
          const actual=(view.options||[]).findIndex(option=>(option.querySelector(local('modelName'))?.textContent.trim()||option.textContent.trim())===effort.textContent.trim());
          existing.targetIndex=undefined;existing.sawPending=false;
          if(actual>=0){existing.range.value=String(actual);existing.preview();}
        }
      }
      // Hide every bridge pane before drilling, including the intermediate
      // Model/Effort root recreated by native selection completion.
      if(menu&&view.open)mark(menu,'data-codsh-effort-bridge');
      if(!menu&&view.control&&view.control.range.disabled!==trigger.disabled)view.control.range.disabled=trigger.disabled;
      const nativeOptions = menu ? Array.from(menu.querySelectorAll('button[role="menuitemradio"]')) : [];
      // Models live under a groups container. Effort rows are direct children.
      const isEffort = nativeOptions.length > 0 && nativeOptions.every(option => option.parentElement === menu);
      const expanded = view.open;
      if (view.button.getAttribute('aria-expanded') !== String(expanded)) view.button.setAttribute('aria-expanded',String(expanded));
      if (menu && view.pending) {
        const cells = menu.querySelectorAll(local('cell'));
        if (cells.length > 1) { view.pending = false; cells[1].click();return; }
        if (isEffort) view.pending = false;
      }
      if(menu&&!view.open){
        const cells=menu.querySelectorAll(local('cell'));
        if(cells.length){mark(menu,'data-codsh-model-root');cells[0].click();return;}
      }
      if(menu&&!menu.querySelector(local('cell')))menu.removeAttribute('data-codsh-model-root');
      if (!isEffort || view.closed) return;
      mark(menu,'data-codsh-effort-menu');
      // Keep our control in the native trigger root. Native selections may
      // close their portal; this persistent panel survives that lifecycle.
      if(!view.open)view.open=true;
      view.menu=menu;view.options=nativeOptions;
      mark(menu,'data-codsh-effort-bridge');
      let control = view.control;
      if (!control) {
        const panel = document.createElement('div');panel.className = 'codsh-effort-control';
        const title = document.createElement('strong');title.className = 'codsh-effort-title';
        const track = document.createElement('div');track.className = 'codsh-effort-track';
        const fill = document.createElement('div');fill.className = 'codsh-effort-fill';
        const sparks = document.createElement('div');sparks.className = 'codsh-effort-sparks';sparks.setAttribute('aria-hidden','true');
        for(let i=0;i<28;i++) { const spark=document.createElement('i');spark.style.setProperty('--i',String(i));spark.style.setProperty('--arc',((i%2?1:-1)*(4+(i%5)*2))+'px');spark.style.setProperty('--duration',(1.25+(i%4)*.18)+'s');spark.style.setProperty('--dot-size',(2+(i%3)*.6)+'px');sparks.append(spark); }
        const thumb=document.createElement('div');thumb.className='codsh-effort-thumb';
        const range = document.createElement('input');range.type = 'range';range.min = '0';range.step = '0.01';
        range.setAttribute('aria-label','思考强度');
        const ticks = document.createElement('div');ticks.className = 'codsh-effort-ticks';
        fill.append(sparks);track.append(fill,thumb,range);panel.append(title,track,ticks);
        panel.setAttribute('role','dialog');panel.setAttribute('aria-label','调整思考强度');
        const rect=view.button.getBoundingClientRect();
        panel.style.left=`${Math.max(8,Math.min(rect.right-280,window.innerWidth-288))}px`;
        panel.style.bottom=`${Math.max(8,window.innerHeight-rect.top+8)}px`;
        trigger.parentElement.append(panel);
        if(typeof window.requestAnimationFrame==='function'&&!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches){
          let epoch;
          const particles=Array.from(sparks.children);
          const paintJet=time=>{
            if(!panel.isConnected)return;
            epoch??=time;
            const fillBox=fill.getBoundingClientRect(),thumbBox=thumb.getBoundingClientRect();
            particles.forEach((dot,i)=>{
              const duration=1050+(i%5)*90;
              const phase=((time-epoch)/duration+i/particles.length)%1;
              const travel=phase*phase;
              const radius=(thumbBox.width||32)/2;
              const originY=Math.sin(i*2.399963)*Math.min(radius-2,fillBox.height*.4);
              const nozzle=Math.max(0,thumbBox.left-fillBox.left+radius-Math.sqrt(radius*radius-originY*originY)-2);
              const arc=(i%2?1:-1)*(3+(i%6)*1.4);
              dot.style.top=(fillBox.height/2+originY+arc*travel)+'px';
              dot.style.transform='translate('+((1-travel)*nozzle)+'px,-50%)';
              dot.style.opacity=String(phase<.8?.9:.9*(1-phase)/.2);
            });
            window.requestAnimationFrame(paintJet);
          };
          window.requestAnimationFrame(paintJet);
        }
        control = {panel,title,track,range,ticks,signature:null};view.control=control;effortViews.set(menu,control);
        const commit=index=>{
          const option=view.options?.[index];if(!option||trigger.disabled||(option.isConnected&&option.disabled))return;
          range.value=String(index);preview();
          control.targetIndex=index;
          if(option.isConnected){option.click();}
          else {view.commitIndex=index;view.pending=true;if(trigger.getAttribute('aria-expanded')!=='true')trigger.click();refresh();}
        };
        // Pointer dragging previews locally. Commit once on release or keyboard
        // change, rather than sending a request on every pixel of travel.
        const preview = () => {
          const options=view.options || [];
          const position=Number(range.value),index=Math.round(position),option=options[index];if(!option)return;
          const label=option.querySelector(local('modelName'))?.textContent.trim() || option.textContent.trim();
          text(title,effortLabel(label));range.setAttribute('aria-valuetext',effortLabel(label));
          const ratio=options.length>1?position/(options.length-1):0;
          track.style.setProperty('--progress',`${ratio*100}%`);
          track.style.setProperty('--ratio',String(ratio));
          panel.classList.toggle('codsh-effort-max',/\b(max|ultra)\b/i.test(label));
          panel.classList.toggle('codsh-effort-ultra',/\bultra\b/i.test(label));
        };
        control.preview=preview;
        range.addEventListener('input',preview);
        range.addEventListener('keydown',event => {
          if(event.key==='Escape')return;
          event.stopPropagation();
          const keys={ArrowRight:1,ArrowUp:1,ArrowLeft:-1,ArrowDown:-1};
          if(event.key in keys||event.key==='Home'||event.key==='End'){
            event.preventDefault();
            const last=(view.options?.length||1)-1;
            const index=event.key==='Home'?0:event.key==='End'?last:Math.max(0,Math.min(last,Math.round(Number(range.value))+keys[event.key]));
            commit(index);
          }
        });
        range.addEventListener('change',() => {
          commit(Math.round(Number(range.value)));
        });
        control.commit=commit;
        range.focus();
      }
      const labels=nativeOptions.map(option => option.querySelector(local('modelName'))?.textContent.trim() || option.textContent.trim());
      const selected=Math.max(0,nativeOptions.findIndex(option=>option.getAttribute('aria-checked')==='true'));
      control.range.max=String(labels.length-1);
      const locked=nativeOptions.some(option=>option.disabled);
      if(locked&&control.targetIndex!==undefined)control.sawPending=true;
      if(control.range.disabled!==locked)control.range.disabled=locked;
      const signature=JSON.stringify(labels);
      if(control.signature!==signature) {
        control.signature=signature;
        control.ticks.replaceChildren(...labels.map((label,index)=>{
          const button=document.createElement('button');button.type='button';button.textContent=effortLabel(label);
          button.addEventListener('click',()=>control.commit(index));
          return button;
        }));
      }
      const confirmed=labels.indexOf(effort.textContent.trim());
      if(control.targetIndex===confirmed&&!locked)control.targetIndex=undefined;
      if(!control.initialized || (control.targetIndex===undefined&&document.activeElement!==control.range)) {
        const display=control.initialized&&confirmed>=0?confirmed:selected;
        control.initialized=true;
        control.range.value=String(display);text(control.title,effortLabel(labels[display]));
        control.range.setAttribute('aria-valuetext',effortLabel(labels[display]));
        control.track.style.setProperty('--progress',`${labels.length>1?display/(labels.length-1)*100:0}%`);
        control.track.style.setProperty('--ratio',String(labels.length>1?display/(labels.length-1):0));
        control.panel.classList.toggle('codsh-effort-max',/\b(max|ultra)\b/i.test(labels[display]));
        control.panel.classList.toggle('codsh-effort-ultra',/\bultra\b/i.test(labels[display]));
      }
      if(view.commitIndex!==undefined&&!locked){const index=view.commitIndex;view.commitIndex=undefined;nativeOptions[index]?.click();}
    });
  }
  return {refresh,chevron,dispose(){
    for(const state of conversationTabs.values())state.animation?.cancel();conversationTabs.clear();
    clearTimeout(resizeTimer);window.removeEventListener('resize',resizing);document.removeEventListener('click',sidebarToggle,true);
    for(const entry of layoutExits){entry.animation?.cancel();entry.node.remove();}layoutExits.clear();
    document.removeEventListener('pointerdown',outside);document.removeEventListener('keydown',escape);
    for(const view of modelViews.values()){closeEffort(view,false);view.button.remove();}
    for(const view of effortViews.values())view.panel.remove();
    for(const view of settingsViews.values()){view.search.remove();view.back.remove();}
    modelViews.clear();effortViews.clear();settingsViews.clear();
  }};
}

const SOURCE = 'dsh-codsh-theme';
const lightPalette = {
  '--dsw-alias-bg-base':'#ffffff', '--dsw-alias-bg-layer-1':'#f7f7f8',
  '--dsw-alias-bg-layer-2':'#f0f0f2', '--dsw-alias-bg-overlay':'#ececef',
  '--dsw-specific-sidebar-fill':'rgba(236,238,242,0.94)', '--dsw-specific-input-major':'#f0f0f2',
  '--dsw-specific-menu':'#ffffff', '--dsw-specific-tip':'#ececef', '--dsw-specific-bubble':'#e3efff',
  '--dsw-alias-brand-primary':'#202124', '--dsw-alias-label-primary':'#202124',
  '--dsw-alias-label-secondary':'#45474d', '--dsw-alias-label-tertiary':'#62656c',
  '--dsw-alias-label-caption':'#70737a', '--dsw-alias-label-dimmed':'#858890',
  '--dsw-alias-label-primary-bluish':'#202124', '--dsw-alias-border-l1':'#e2e3e6',
  '--dsw-alias-border-l2':'#dcdde1', '--dsw-alias-border-l3':'#e8e8eb', '--dsw-alias-border-l4':'#c7c9cf',
  '--dsw-alias-interactive-bg-hover':'#e9eaed', '--dsw-alias-interactive-bg-active':'#dedfe4',
  '--dsw-alias-state-business-primary':'#3478cf', '--dsw-alias-state-business-secondary':'#2867b8',
  '--dsw-alias-state-business-tertiary':'#e3efff', '--dsw-alias-markdown-code-block':'#f5f5f7',
  '--dsw-alias-markdown-code-inline':'#ededf0', '--dsw-alias-button-info-fill':'#3478cf',
  '--dsw-alias-button-info-hover':'#2867b8', '--dsw-alias-tooltip-bg':'#ececef', '--dsw-alias-bg-mask-1':'#00000040',
};
const palette = {
  '--dsw-alias-bg-base':'#181818',
  '--dsw-alias-bg-layer-1':'#242424',
  '--dsw-alias-bg-layer-2':'#303030',
  '--dsw-alias-bg-overlay':'#282828',
  '--dsw-specific-sidebar-fill':'rgba(32,33,39,0.94)',
  '--dsw-specific-input-major':'#303030',
  '--dsw-specific-menu':'#252525',
  '--dsw-specific-tip':'#353535',
  '--dsw-specific-bubble':'#1c4475',
  '--dsw-alias-brand-primary':'#eeeeee',
  '--dsw-alias-label-primary':'#dedede',
  '--dsw-alias-label-secondary':'#cccccc',
  '--dsw-alias-label-tertiary':'#a0a0a0',
  '--dsw-alias-label-caption':'#858585',
  '--dsw-alias-label-dimmed':'#737373',
  '--dsw-alias-label-primary-bluish':'#eeeeee',
  '--dsw-alias-border-l1':'#383838',
  '--dsw-alias-border-l2':'#3c3c3c',
  '--dsw-alias-border-l3':'#302d2e',
  '--dsw-alias-border-l4':'#454545',
  '--dsw-alias-interactive-bg-hover':'#2d2d2d',
  '--dsw-alias-interactive-bg-active':'#383838',
  '--dsw-alias-state-business-primary':'#3478cf',
  '--dsw-alias-state-business-secondary':'#75aaff',
  '--dsw-alias-state-business-tertiary':'#1c4475',
  '--dsw-alias-markdown-code-block':'#222222',
  '--dsw-alias-markdown-code-inline':'#303030',
  '--dsw-alias-button-info-fill':'#3478cf',
  '--dsw-alias-button-info-hover':'#4389df',
  '--dsw-alias-tooltip-bg':'#353535',
  '--dsw-alias-bg-mask-1':'#00000099',
};

// Match semantic CSS-module local names, never release-specific hashes.
const local = name => `[class$="_${name}"], [class*="_${name} "]`;
// Package-level dsh.client.inject fetches the provider bundle; Cordis also
// needs this runtime service declaration before ctx.theme can be accessed.
const inject = ['theme', 'sessions', 'workspaces', 'uiWorkspace','remote','remote.session'];
function apply(ctx) {
  ctx.effect(() => {
    const releaseTokens = ctx.theme.overrideTokens(SOURCE,
      Object.fromEntries(Object.entries(palette).map(([key,value]) => [key,{light:lightPalette[key],dark:value}])));
    const style = document.createElement('style');
    style.dataset.codshStyle = '';
    style.textContent = THEME_CSS;
    document.head.append(style);
    const tracked = new Map();
    const owned = new Map();
    const recentViews = new Map();
    let showArchived = false;
    ctx.uiWorkspace.view?.setArchivedFilter?.('default');
    const groupMotion = new Map();
    const heroTitles = new Map();
    const temporaryTitles=new Map();
    const whaleAnimations = new Map();
    const railFrames=new Map();
    let temporarySidebar,temporaryCloseTimer,temporaryAnimation,temporaryClosing=false;
    const closeTemporarySidebar=(immediate=false)=>{
      clearTimeout(temporaryCloseTimer);temporaryCloseTimer=undefined;
      const root=temporarySidebar;if(!root)return;
      if(!immediate&&temporaryAnimation){if(!temporaryClosing){temporaryClosing=true;temporaryAnimation.reverse();}return;}
      temporaryAnimation?.cancel();temporaryAnimation=undefined;temporaryClosing=false;
      const frame=root.closest(local('frame'));
      if(frame?.hasAttribute('data-codsh-sidebar-overlay')){
        if(!frame.hasAttribute('data-sidebar-collapsed'))root.querySelector(local('toggle'))?.click();
        frame.removeAttribute('data-codsh-sidebar-overlay');
      }
      root.removeAttribute('data-codsh-temporary-sidebar');if(temporarySidebar===root)temporarySidebar=undefined;
    };
    const temporaryNavigation=event=>{
      const button=event.target.closest?.('.codsh-rail-button,.codsh-home');
      const root=button?.closest('[data-codsh-sidebar]');
      if(!root?.closest('[data-sidebar-collapsed],[data-codsh-sidebar-overlay]'))return;
      if(temporarySidebar===root){clearTimeout(temporaryCloseTimer);temporaryCloseTimer=undefined;if(temporaryClosing){temporaryClosing=false;temporaryAnimation?.reverse();}return;}
      closeTemporarySidebar(true);temporarySidebar=root;temporaryClosing=false;
      mark(root,'data-codsh-temporary-sidebar');
      const frame=root.closest(local('frame')),toggle=root.querySelector(local('toggle'));
      if(frame&&toggle){mark(frame,'data-codsh-sidebar-overlay');toggle.click();}
      if(root.animate&&!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches){
        temporaryAnimation=root.animate([{clipPath:'inset(0 calc(100% - 52px) 0 0)'},{clipPath:'inset(0 0 0 0)'}],{duration:240,easing:'cubic-bezier(.22,1,.36,1)',fill:'both'});
        temporaryAnimation.onfinish=()=>{if(temporaryClosing)closeTemporarySidebar(true);};
      }
    };
    const temporaryPointer=event=>{
      if(!temporarySidebar)return;
      if(!temporarySidebar.closest('[data-sidebar-collapsed],[data-codsh-sidebar-overlay]')){closeTemporarySidebar();return;}
      if(temporarySidebar.contains(event.target)||event.target.closest?.('.codsh-actions-menu,[role="menu"],.codsh-confirm-mask')){
        if(temporaryClosing){temporaryClosing=false;temporaryAnimation?.reverse();}
        clearTimeout(temporaryCloseTimer);temporaryCloseTimer=undefined;return;
      }
      if(!temporaryCloseTimer&&!temporaryClosing)temporaryCloseTimer=setTimeout(closeTemporarySidebar,160);
    };
    const temporaryEscape=event=>{if(event.key==='Escape')closeTemporarySidebar(true);};
    document.addEventListener('click',temporaryNavigation,true);
    document.addEventListener('pointermove',temporaryPointer);
    document.addEventListener('keydown',temporaryEscape);
    const shakeWhale = event => {
      const whale=event.target.closest?.(local('fishHitbox'));
      if(!whale?.closest('[data-codsh-hero]')||window.matchMedia?.('(prefers-reduced-motion: reduce)').matches||!whale.animate)return;
      whaleAnimations.get(whale)?.cancel();
      const animation=whale.animate([
        {transform:'translateX(0) rotate(0deg)'},
        {transform:'translateX(-2px) rotate(-7deg)'},
        {transform:'translateX(2px) rotate(7deg)'},
        {transform:'translateX(-1px) rotate(-4deg)'},
        {transform:'translateX(1px) rotate(4deg)'},
        {transform:'translateX(0) rotate(0deg)'},
      ],{duration:520,easing:'ease-in-out'});
      whaleAnimations.set(whale,animation);
      animation.onfinish=()=>{if(whaleAnimations.get(whale)===animation)whaleAnimations.delete(whale);};
    };
    document.addEventListener('click',shakeWhale);
    let sidebarMode = 'all';
    const selectSidebar = (mode) => {
      sidebarMode = mode;
      document.querySelectorAll('[data-codsh-sidebar]').forEach(root => {
        mark(root,'data-codsh-view',mode);
        root.querySelectorAll('[data-codsh-navigation]').forEach(button => button.setAttribute('aria-pressed',String(button.dataset.codshNavigation===mode)));
      });
    };
    const revealConversation = () => ctx.inject(['layout'],child=>child.layout?.selectPanel(null));
    const mark = (node, key, value = '') => {
      if (!node || node.getAttribute(key) === value) return;
      if (!tracked.has(node)) tracked.set(node, new Map());
      const attributes = tracked.get(node);
      if (!attributes.has(key)) attributes.set(key, node.getAttribute(key));
      node.setAttribute(key, value);
    };
    mark(document.documentElement,'data-codsh-theme');
    const refinements = createRefinements(mark);
    const projectSearch=createProjectSearch(ctx);
    let remoteDisposer,actionsDisposed=false;
    const deleteRemote=ctx.remote.$mount(contribution).then(dispose=>{
      remoteDisposer=dispose;if(actionsDisposed){dispose();throw Error('插件已停用');}
      return new Promise(resolve=>ctx.inject(['remote.codshActions'],child=>resolve(child.remote.codshActions)));
    });
    deleteRemote.catch(()=>{});
    const sidebarActions=createSidebarActions(ctx,mark,()=>refresh(),async id=>{
      const current=ctx.sessions.list.getSnapshot().byId[id]?.retainedBy?.mainView>0;
      const result=await (await deleteRemote).deleteSession({sessionId:id,confirm:true});
      if(!result.ok)throw Error(result.error?.message||'删除失败');
      if(current)ctx.uiWorkspace.startSession();
    },async id=>{
      const result=await (await deleteRemote).deleteProject({workspaceId:id,confirm:true});
      if(!result.ok)throw Error(result.error?.message||'项目删除失败');
      ctx.uiWorkspace.startSession();
    });
    const refresh = () => {
      document.querySelectorAll('[data-codsh-sidebar]').forEach(root=>{
        const panelActive=Array.from(root.querySelectorAll(local('panelRow'))).some(button=>button.getAttribute('aria-current')==='page');
        root.querySelectorAll('[data-codsh-navigation]').forEach(button=>mark(button,'aria-pressed',String(!panelActive&&button.dataset.codshNavigation===sidebarMode)));
      });
      document.querySelectorAll(local('frame')).forEach(frame=>{
        const columns=frame.style.gridTemplateColumns;
        if(!columns)return;
        const expandedWidth=parseFloat(columns);
        if(!frame.hasAttribute('data-sidebar-collapsed')&&expandedWidth>52&&frame.style.getPropertyValue('--codsh-expanded-sidebar-width')!==`${expandedWidth}px`)frame.style.setProperty('--codsh-expanded-sidebar-width',`${expandedWidth}px`);
        if(!railFrames.has(frame))railFrames.set(frame,frame.style.getPropertyValue('--codsh-collapsed-columns'));
        const collapsed=columns.replace(/^\S+\s+/, '52px ');
        if(frame.style.getPropertyValue('--codsh-collapsed-columns')!==collapsed)frame.style.setProperty('--codsh-collapsed-columns',collapsed);
      });
      mark(document.documentElement,'data-codsh-theme');
      // Host theme/module sheets can be mounted again after an appearance change.
      if(!style.isConnected||Array.from(document.head.querySelectorAll('style,link[rel="stylesheet"]')).at(-1)!==style)document.head.append(style);
      for(const [whale,animation] of whaleAnimations)if(!whale.isConnected){animation.cancel();whaleAnimations.delete(whale);}
      for(const [group,title] of heroTitles)if(!group.isConnected){title.remove();heroTitles.delete(group);}
      for(const node of tracked.keys())if(!node.isConnected)tracked.delete(node);
      for(const [root,view] of recentViews)if(!root.isConnected){view.section.remove();view.projectsToggle.remove();view.archiveToggle.remove();recentViews.delete(root);}
      for(const [root,node] of owned)if(!root.isConnected){node.remove();owned.delete(root);}
      for(const [root,node] of owned)if(node.parentElement!==root)root.append(node);
      document.querySelectorAll(local('triggerLabel')).forEach(label => {
        const permissionButton=label.closest('button');
        if(permissionButton&&permissionButton.querySelector(local('triggerIcon'))&&!permissionButton.querySelector(local('triggerEffort'))){
          mark(permissionButton,'data-codsh-full-access',String(/^(完全权限|完全访问|Full access)$/i.test(label.textContent.trim())));
        }
        const trigger = label.closest('button[aria-haspopup="menu"]');
        if (!trigger?.querySelector(local('triggerIcon'))) return;
        mark(trigger,'data-codsh-model-trigger');
        const menuId = trigger.getAttribute('aria-controls');
        if (menuId) mark(document.getElementById(menuId),'data-codsh-model-menu');
      });
      refinements.refresh();
      document.querySelectorAll('[role="menu"] button[role="menuitem"]').forEach(button=>{
        const label=button.querySelector(local('optionLabelText'))||button.querySelector(local('itemLabel'));
        if(label)mark(button,'data-codsh-full-access-option',String(/^(完全权限|完全访问|Full access)$/i.test(label.textContent.trim())));
      });
      document.querySelectorAll('[role="menu"],[role="dialog"],[role="tooltip"]').forEach(node => {
        if (node.closest('[data-codsh-model-menu]')) return;
        mark(node,'data-codsh-surface',node.getAttribute('role'));
      });
      document.querySelectorAll(local('logoRow')).forEach(row => {
        if(row.closest('.codsh-sidebar-exit'))return;
        const root = row.parentElement;
        if (root?.querySelector(local('newSession'))) {
          mark(root,'data-codsh-sidebar');
          if(!temporaryTitles.has(row)){const title=document.createElement('span');title.className='codsh-temporary-brand';title.textContent='DeepSeek';row.prepend(title);temporaryTitles.set(row,title);}
          else if(temporaryTitles.get(row).parentElement!==row)row.prepend(temporaryTitles.get(row));
          projectSearch.attach(row);
          if (!owned.has(root)) {
            const home = document.createElement('button');
            home.type = 'button';
            home.className = 'codsh-home';
            home.title = '新会话';
            home.setAttribute('aria-label','新会话');
            const svg = document.createElementNS('http://www.w3.org/2000/svg','svg');
            svg.setAttribute('viewBox','0 0 24 24');
            svg.setAttribute('aria-hidden','true');
            const path = document.createElementNS('http://www.w3.org/2000/svg','path');
            path.setAttribute('d','M4 10.2 10.8 4.5a1.9 1.9 0 0 1 2.4 0l6.8 5.7a2 2 0 0 1 .7 1.5v7.1a1.7 1.7 0 0 1-1.7 1.7h-3.1a.9.9 0 0 1-.9-.9v-4.8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v4.8a.9.9 0 0 1-.9.9H5a1.7 1.7 0 0 1-1.7-1.7v-7.1a2 2 0 0 1 .7-1.5Z');
            path.setAttribute('fill','none');path.setAttribute('stroke','currentColor');path.setAttribute('stroke-width','1.5');path.setAttribute('stroke-linecap','round');path.setAttribute('stroke-linejoin','round');
            svg.append(path);
            home.append(svg);
            home.dataset.codshNavigation='all';
            home.addEventListener('click', () => {revealConversation();selectSidebar('all');root.querySelector(local('newSession'))?.click();});
            const tools=document.createElement('div');tools.className='codsh-rail-tools';
            tools.append(home);
            for(const [label,path,action] of [
              ['最近会话','M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18Z M12 7v5l3 2',()=>{
                revealConversation();selectSidebar('recent');
                const toggle=root.querySelector('.codsh-recent .codsh-section-toggle');if(toggle?.getAttribute('aria-expanded')==='false')toggle.click();
                root.querySelector('.codsh-recent')?.scrollIntoView?.({block:'nearest',behavior:window.matchMedia?.('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
              }],
              ['项目','M3 6h6l2 2h10v12H3z',()=>{
                revealConversation();selectSidebar('projects');
                const toggle=root.querySelector('.codsh-projects-toggle');if(toggle?.getAttribute('aria-expanded')==='false')toggle.click();toggle?.focus();
              }],
            ]) {
              const button=document.createElement('button');button.type='button';button.className='codsh-rail-button';button.title=label;button.setAttribute('aria-label',label);
              if(label==='最近会话'||label==='项目')button.dataset.codshNavigation=label==='项目'?'projects':'recent';
              const icon=document.createElementNS('http://www.w3.org/2000/svg','svg');icon.setAttribute('viewBox','0 0 24 24');icon.setAttribute('aria-hidden','true');
              const stroke=document.createElementNS(icon.namespaceURI,'path');stroke.setAttribute('d',path);stroke.setAttribute('fill','none');stroke.setAttribute('stroke','currentColor');stroke.setAttribute('stroke-width','1.5');stroke.setAttribute('stroke-linecap','round');stroke.setAttribute('stroke-linejoin','round');
              icon.append(stroke);button.append(icon);button.addEventListener('click',action);tools.append(button);
            }
            root.append(tools);
            owned.set(root,tools);
            selectSidebar(sidebarMode);
          }
        }
      });
      document.querySelectorAll('[data-codsh-sidebar]').forEach(sidebar => {
        if(sidebar.closest('.codsh-sidebar-exit'))return;
        sidebar.querySelectorAll(local('footArea')).forEach(footer=>{
          footer.querySelectorAll('button').forEach(button=>{
            const label=button.querySelector(local('label'))?.textContent.trim();
            if(label){mark(button,'title',label);mark(button,'aria-label',label);}
          });
        });
        sidebar.querySelectorAll(local('groupSection')).forEach(group=>{
          const previous=groupMotion.get(group);
          const signature=Array.from(group.querySelectorAll('[data-row-key]'),node=>node.dataset.rowKey).join('|');
          if(previous?.signature===signature)return;
          previous?.animation?.cancel();
          const height=group.getBoundingClientRect().height;
          if(previous&&height!==previous.height&&group.animate&&!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches){
            const animation=group.animate([{height:`${previous.height}px`,overflow:'hidden'},{height:`${height}px`,overflow:'hidden'}],{duration:240,easing:'cubic-bezier(.22,1,.36,1)'});
            groupMotion.set(group,{height,animation,signature});
          }else groupMotion.set(group,{height,signature});
        });
        for(const [group,state] of groupMotion)if(!group.isConnected){state.animation?.cancel();groupMotion.delete(group);}
        const header = sidebar.querySelector(local('sectionHeader'));
        const workspaceRoot = header?.parentElement;
        if (!workspaceRoot) return;
        mark(workspaceRoot,'data-codsh-workspaces');
        mark(workspaceRoot,'data-codsh-no-projects',String((ctx.workspaces.list.getSnapshot().items||[]).length===0));
        mark(header.querySelector(local('sectionLabel')),'data-codsh-projects');
        header.querySelectorAll('button[aria-label="视图选项"],button[aria-label="View options"]').forEach(button=>mark(button,'data-codsh-native-view-options'));
        let view = recentViews.get(workspaceRoot);
        if(view){if(view.projectsToggle.parentElement!==header)header.prepend(view.projectsToggle);if(view.archiveToggle.parentElement!==header)header.append(view.archiveToggle);if(view.section.parentElement!==workspaceRoot)workspaceRoot.append(view.section);}
        if (!view) {
          const section = document.createElement('section');
          section.className = 'codsh-recent';
          section.setAttribute('aria-label','最近会话');
          const heading = document.createElement('h2');
          const toggle = document.createElement('button');toggle.type='button';toggle.className='codsh-section-toggle';
          toggle.append(refinements.chevron(),document.createTextNode('最近会话'));toggle.setAttribute('aria-expanded','true');
          heading.append(toggle);
          const list = document.createElement('div');
          list.className = 'codsh-recent-list';
          const inner = document.createElement('div');inner.className='codsh-recent-inner';list.append(inner);
          toggle.addEventListener('click',()=>{
            const expanded=toggle.getAttribute('aria-expanded')!=='true';
            toggle.setAttribute('aria-expanded',String(expanded));list.classList.toggle('codsh-section-collapsed',!expanded);
            inner.inert=!expanded;
          });
          const projectsToggle=document.createElement('button');projectsToggle.type='button';projectsToggle.className='codsh-section-toggle codsh-projects-toggle';
          projectsToggle.append(refinements.chevron(),document.createTextNode('项目'));projectsToggle.setAttribute('aria-expanded','true');
          header.prepend(projectsToggle);
          projectsToggle.addEventListener('click',()=>{
            const expanded=projectsToggle.getAttribute('aria-expanded')!=='true';projectsToggle.setAttribute('aria-expanded',String(expanded));
            mark(workspaceRoot,'data-codsh-projects-collapsed',String(!expanded));
            const projectList=workspaceRoot.querySelector(local('listArea'));if(projectList)projectList.inert=!expanded;
          });
          section.append(heading,list);
          workspaceRoot.append(section);
          const archiveToggle=document.createElement('button');archiveToggle.type='button';archiveToggle.className='codsh-archive-toggle';
          archiveToggle.textContent='归档';archiveToggle.setAttribute('aria-label','显示归档内容');archiveToggle.setAttribute('aria-pressed',String(showArchived));archiveToggle.title='显示全部项目和会话（含归档）';
          archiveToggle.addEventListener('click',()=>{
            showArchived=!showArchived;
            ctx.uiWorkspace.view?.setArchivedFilter?.(showArchived?'show':'default');
            for(const item of recentViews.values()){
              item.archiveToggle.setAttribute('aria-pressed',String(showArchived));
              item.archiveToggle.title=showArchived?'隐藏归档内容':'显示全部项目和会话（含归档）';
              item.signature=null;
            }
            refresh();
          });header.append(archiveToggle);
          view = {section,list,inner,projectsToggle,archiveToggle,signature:null};
          recentViews.set(workspaceRoot,view);
        }
        const sessions = ctx.sessions.list.getSnapshot();
        const workspaces = ctx.workspaces.list.getSnapshot();
        const archived = new Set(workspaces.archivedSessionIds || []);
        const pinned=workspaces.pinnedSessionIds||[];
        const rows = (sessions.ids || []).map(id => sessions.byId[id])
          .filter(row => row && !row.blank && !row.parentId && row.origin !== 'subagent' && (showArchived || !archived.has(row.id)))
          .sort((a,b) => (pinned.includes(a.id)?pinned.indexOf(a.id):Infinity)-(pinned.includes(b.id)?pinned.indexOf(b.id):Infinity) || b.updatedAt-a.updatedAt || a.id.localeCompare(b.id));
        const signature = JSON.stringify([sessions.phase,pinned, rows.map(row => [row.id,row.title,row.displayTitle,row.updatedAt])]);
        if (view.signature === signature) return;
        view.signature = signature;
        const children = rows.map(row => {
          const button = document.createElement('button');
          button.type = 'button';
          button.className = 'codsh-session';
          button.dataset.sessionId = row.id;
          const label = document.createElement('span');
          label.textContent = row.title || row.displayTitle || '未命名会话';
          button.title = label.textContent;
          button.append(label);
          if(pinned.includes(row.id))button.dataset.codshPinned='true';
          button.addEventListener('click', () => ctx.uiWorkspace.openSession(row.id));
          const container=document.createElement('div');container.className='codsh-session-container';container.append(button);return container;
        });
        if (!children.length) {
          const empty = document.createElement('p');
          empty.className = 'codsh-empty';
          empty.textContent = sessions.phase === 'ready' ? '暂无会话' : '正在加载…';
          children.push(empty);
        }
        const focusedId=view.inner.contains(document.activeElement)?document.activeElement?.dataset.sessionId:undefined;
        view.inner.replaceChildren(...children);
        if(focusedId)Array.from(view.inner.querySelectorAll('button')).find(button=>button.dataset.sessionId===focusedId)?.focus();
      });
      sidebarActions.refresh();
      document.querySelectorAll(local('titleGroup')).forEach(group => {
        const headline = group.parentElement;
        if (!headline?.querySelector(local('fishHitbox'))) return;
        const hero = headline.closest(local('root'));
        mark(hero,'data-codsh-hero');
        const seat = hero?.closest('[data-composer-seat]') || hero?.closest(local('composerHero'));
        const label = seat?.querySelector(local('workspaceLabel'))?.textContent?.trim();
        const isPlaceholder = !label || /^(选择工作区|Choose workspace|Select workspace)$/i.test(label);
        mark(group,'data-codsh-title', isPlaceholder ? '我们应该做些什么？' : `我们应该在 ${label} 中做些什么？`);
        let title=heroTitles.get(group);
        if(title&&title.parentElement!==group)group.append(title);
        if(!title){title=document.createElement('div');title.className='codsh-hero-title';group.append(title);heroTitles.set(group,title);}
        const matches=(ctx.workspaces.list.getSnapshot().items||[]).filter(item=>item.title===label);
        const path=!isPlaceholder&&matches.length===1?matches[0].path:undefined;
        const signature=JSON.stringify([label,path,isPlaceholder]);
        if(title.dataset.signature===signature)return;
        title.dataset.signature=signature;
        if(isPlaceholder){title.textContent='我们应该做些什么？';return;}
        const button=document.createElement('button');button.type='button';button.className='codsh-project-folder';
        button.textContent=label;button.disabled=!path;
        button.title=path?`在资源管理器中打开 ${path}`:'项目文件夹暂不可用';
        button.setAttribute('aria-label',`在资源管理器中打开 ${label} 的文件夹`);
        const error=document.createElement('span');error.className='codsh-folder-error';error.setAttribute('role','alert');
        button.addEventListener('click',async()=>{
          button.disabled=true;error.textContent='';
          try{const result=await ctx.remote.session.openWorkspacePath({path});if(result?.ok===false)throw Error(result.error?.message||'无法打开项目文件夹');}
          catch(reason){error.textContent=reason.message||'无法打开项目文件夹';}
          finally{button.disabled=false;}
        });
        title.replaceChildren(document.createTextNode('我们应该在 '),button,document.createTextNode(' 中做些什么？'),error);
      });
    };
    refresh();
    // React retains ownership of every control. Only reversible attributes
    // are added; workspace/session changes trigger one coalesced refresh.
    let queued = false;
    let disposed = false;
    const observer = new MutationObserver(() => {
      if (queued || disposed) return;
      queued = true;
      queueMicrotask(() => { queued = false; if (!disposed) refresh(); });
    });
    observer.observe(document.documentElement,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['style','data-sidebar-collapsed','class','data-phase','data-content-phase','data-ds-dark-theme','data-dsh-theme-source','data-codsh-theme','aria-controls','aria-current','aria-expanded','aria-checked','disabled']});
    const updateStores=()=>{refresh();projectSearch.refresh();};
    const unsubscribeSessions = ctx.sessions.list.subscribe(updateStores);
    const unsubscribeWorkspaces = ctx.workspaces.list.subscribe(updateStores);
    return () => {
      disposed = true;
      observer.disconnect();
      for(const [frame,value] of railFrames){if(value)frame.style.setProperty('--codsh-collapsed-columns',value);else frame.style.removeProperty('--codsh-collapsed-columns');}railFrames.clear();
      document.removeEventListener('click',shakeWhale);
      closeTemporarySidebar(true);
      document.removeEventListener('click',temporaryNavigation,true);
      document.removeEventListener('pointermove',temporaryPointer);
      document.removeEventListener('keydown',temporaryEscape);
      for(const animation of whaleAnimations.values())animation.cancel();whaleAnimations.clear();
      unsubscribeSessions();
      unsubscribeWorkspaces();
      refinements.dispose();
      projectSearch.dispose();
      for(const title of temporaryTitles.values())title.remove();temporaryTitles.clear();
      for(const title of heroTitles.values())title.remove();heroTitles.clear();
      sidebarActions.dispose();actionsDisposed=true;remoteDisposer?.();
      for(const state of groupMotion.values())state.animation?.cancel();groupMotion.clear();
      ctx.uiWorkspace.view?.setArchivedFilter?.('default');
      for (const [root,view] of recentViews) {const list=root.querySelector(local('listArea'));if(list)list.inert=false;view.section.remove();view.projectsToggle.remove();view.archiveToggle.remove();}
      recentViews.clear();
      for (const node of owned.values()) node.remove();
      owned.clear();
      style.remove();
      releaseTokens();
      for (const [node, attributes] of tracked) for (const [key,value] of attributes) {
        if (value === null) node.removeAttribute(key); else node.setAttribute(key,value);
      }
      tracked.clear();
    };
  });
}


return {inject,apply};
}});
