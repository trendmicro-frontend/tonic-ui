# Theme design token routes

> 已實作並以 Chromium 驗證：9 項 docs E2E 通過；`/v3/` production export 的 12 個舊網址在停用 JavaScript 時仍可轉址，啟用時保留 query 與 hash。

## Context
Theme 下的兩篇指南使用 `/theme/breakpoints/` 與 `/theme/container-queries/`，分別解說 viewport 和 container 的 API 與應用。DESIGN TOKENS 的全部 13 頁統一使用 `/theme/design-tokens/<slug>/`，側欄名稱、大小寫和組內順序不變。網址不加 `viewport-`，不新增分類首頁，不變更套件 API。

## Approach
以下路徑相對於 `packages/react-docs/`，文件維持英文。

1. **建立 token 分類。** 將 `pages/theme/` 中 `borders`、`colors`、`fonts`、`fontSizes`、`fontWeights`、`lineHeights`、`outlines`、`radii`、`shadows`、`sizes`、`space`、`zIndices` 這 12 個目錄整個移到 `pages/theme/design-tokens/` 下，包含同目錄範例，保留 slug 大小寫和正文。`borders` 與 `outlines` 同層互連不改。
2. **就地拆分 breakpoints。** `pages/theme/breakpoints/index.page.mdx` 改為 `# Breakpoints`，保留 provider 用法、兩個互動範例、CSS media queries、客製化及 API；原有範例檔與 `#css-media-queries` 錨點不動。移除 `ThemeTokens` import、token 區塊與手寫寬度對照表，以連結 `../design-tokens/breakpoints` 引導查值。保留 Container queries 指南及兩篇指南間的連結。
3. 新增 `pages/theme/design-tokens/breakpoints/index.page.mdx`。照 `fonts`、`radii`、`zIndices` 的 token 版型：`# breakpoints` → `## Design tokens` → `### Primitive tokens (v3)` → 從原頁搬入的 `ThemeTokens`（`type="primitive"`、只選 `breakpoints`、預設展開）。表下用一句話連至 `../../breakpoints`；不放 API、demo 或重複的預設值表。`components/ThemeTokens.js` 的 legacy 資料未註冊 breakpoints，不新增空 v2 小節。
4. **導覽與索引。** `config/sidebar-routes.js` 在 `Container queries` 前插入 `{ title: 'Breakpoints', path: 'theme/breakpoints' }`；將 DESIGN TOKENS 的 13 個 `path` 改成 `theme/design-tokens/<slug>`。`pages/theme/index.page.mdx` 的 References 先列兩篇指南，再列 13 個 token 連結。`pages/llms.txt` 中各 token 條目改指新位置，分列兩個用途不同的 Breakpoints 條目。搜尋全 repo 現行文件、原始碼與測試對 `theme/<slug>` 的引用，將 12 個移動頁的站內連結（含 fragment）直接指向新頁；歷史 changelog、計畫、舊版快照不改。對 breakpoints 依用途更新：`pages/styled-system/responsive-values/index.page.mdx` 開頭查尺度指向 token 頁，CSS media queries 錨點、遷移指南與 Container queries 的設定連結仍指原 API 網址。
   - 已查到的跨頁引用：`pages/components/{badge,color-style,tag}/index.page.mdx` 和 `pages/migrations/migrating-color-tokens-from-v2-to-v3/index.page.mdx` 改連新 `colors` 頁，保留 `#semantic-tokens`；`pages/migrations/migrating-from-v0-to-v1/index.page.mdx` 改連新 `shadows` 頁。`borders` 與 `outlines` 互連因為仍在同層，不改相對路徑。
   - 也更新 `scripts/update-style-props.mjs`：`hasThemePage` 檢查 `../pages/theme/design-tokens/${scale}/index.page.mdx`，Theme Key 欄位產生 `../../theme/design-tokens/${x.scale}`。保留 scale 的大小寫和不存在頁面時的空白欄位，不手改 `scripts/update-docs.sh` 產生的 Style props 頁面。
5. **保留 12 個舊書籤。** `next.config.mjs` 的 production 模式採靜態 export，不用伺服器 redirects。新增 `pages/theme/[legacyToken].page.js`：以 `getStaticPaths` 枚舉步驟 1 的 12 個精確 slug、`fallback: false`，`getStaticProps` 傳入 slug；不含 `breakpoints` 或任意其它 slug。以 `next/head` 輸出 `noindex`、無 JavaScript 時可用的 meta refresh，正文保留目的頁連結。目的地以已設定的 `TONIC_UI_REACT_DOCS_BASE_PATH`（未設定時空字串）接 `/theme/design-tokens/<slug>/`；啟用 JS 時使用 `location.replace` 加上原 `search` 和 `hash`，將 meta refresh 限於無 JS 情況，避免提前丟失 fragment。相容頁不列入導覽或搜尋結果。
   - `_app.page.js` 對 `/theme/[legacyToken]` 直接渲染 `NextApp`，不等待 client 初始化色彩模式，確保靜態 HTML 含 meta refresh 與備用連結。一般文件頁行為不變。
6. **測試維持在對應路徑。** `test/e2e/pages/theme/breakpoints.spec.mjs` 留下 viewport 邊界、docs shell 和雙色模式範例測試。只將既有 token 表測試搬至 `test/e2e/pages/theme/design-tokens/breakpoints.spec.mjs`。舊書籤的版本前綴由下方 production export 瀏覽器驗證涵蓋；`docs:pages` 使用開發伺服器，不能代替該檢查。

## Verification
- 在已安裝 workspace 依賴與 Playwright 瀏覽器的 repo 根目錄執行 `rtk yarn test:e2e docs:pages --project=theme/breakpoints --project=theme/design-tokens/breakpoints --project=theme/container-queries`。token 表顯示 `sm` 至 `2xl` 的五個 rem 值；API 頁在 767px → 768px 切換 `sm` → `md`；Container queries 範例維持原行為。
- 搬移後重搜現行文件、導覽與產生器，不應留下指向 12 個舊 token URL 的站內連結；舊書籤驗證和相容路由除外。在瀏覽器從 Color style 點 `semantic tokens`，確認抵達新 `colors/#semantic-tokens`；從 Style props 的 Theme Key 點 `fontSizes`，確認抵達新路徑且大小寫不變。這兩項必須直接連到新址，不能只靠舊址轉址成功。
- 在桌面瀏覽器展開 Theme。確認 `Getting started → Breakpoints → Container queries → DESIGN TOKENS`；下方 `breakpoints` 仍在 `borders` 和 `colors` 之間。逐一開啟 13 個 token 項目，確認 pathname、標題及表格；點兩個 Breakpoints 頁面的互連，確認用途分離且側欄只標示當前頁。
- 從 repo 根目錄用 `TONIC_UI_REACT_DOCS_BASE_PATH=/v3 rtk yarn workspace @tonic-ui/react-docs build` 建立 production export。以本機靜態伺服器將 `packages/react-docs/dist` 掛在 `/v3/`（例如在 `$TMPDIR` 建立獨立伺服根目錄，放入指向該 `dist` 的 `v3` symlink，再用 `python3 -m http.server 8123 --bind 127.0.0.1 --directory <server-root>` 提供檔案）。在瀏覽器開啟 `http://127.0.0.1:8123/v3/theme/colors/?from=bookmark#design-tokens`，以完整字串核對最終 URL 為 `http://127.0.0.1:8123/v3/theme/design-tokens/colors/?from=bookmark#design-tokens`，並確認頁面顯示 `colors` token 表而不是 404。檢查其餘 11 個舊網址都有 HTML 且導向各自的新頁；停用 JS 重開 `/v3/theme/colors/`，應抵達 `/v3/theme/design-tokens/colors/`。原 `/v3/theme/breakpoints/#css-media-queries` 應直接開指南對應小節，不導轉。

## Breakpoint documentation synchronization

The Breakpoints and Container queries guides and the Responsive values reference derive default thresholds from `createTheme()`. The explicit pixel examples share `pixel-breakpoints.mjs`; `formatBreakpoint(breakpoints, key, unit)` formats either configuration. The `useMediaQuery` example uses the same generated query for matching and display. Historical migration values and intentionally fixed teaching examples remain independent.

The three Theme docs E2E projects passed 10 tests, including executing the Rule composition snippets and comparing Chromium styles to the result tables. The four affected pages had identical rendered body text before and after the change. In a temporary docs-only variation, changing the default reference `md` to `50rem` updated the default-derived guide text and tables while the explicit pixel example stayed at `768px`.
