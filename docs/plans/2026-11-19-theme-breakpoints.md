# Phase 1: Theme Breakpoints Implementation Plan

## Context

預設斷點為 `sm/md/lg/xl/2xl = 40/48/64/80/96rem`，公開 `gte`、`lt`、`between`、`only` 四個 helpers。採用 `createTheme({ breakpoints: { values, unit } })` 物件契約，移除舊 breakpoint array、`xs` 斷點與 `theme.breakpoints.md` 等 alias API，不提供舊 helper 名稱或雙格式相容層。元件 responsive style props 繼續支援 array／object；只有 array 的 index 0 和 object 的 `_` 是 unconditional base。
預設直接呼叫 `createTheme()` 即取得上述五個斷點；在瀏覽器初始字級為 16px 時，分別相當於 640/768/1024/1280/1536px。公開斷點名稱限定 sm/md/lg/xl/2xl，不提供 mobile/tablet/laptop/desktop 等替代名稱；設定只使用 values/unit，不提供 `step`。文件沿用現有 `/theme/breakpoints/` 頁面，參考 MUI 的分節方式，不另建重複頁面。
Phase 1 是可單獨合併的 viewport breaking change；[Phase 2: Container Queries](./2026-11-19-theme-container-queries.md) 從合併 Phase 1 後的 `main` 開始，重用這裡的 runtime 斷點。不在 Phase 1 加 container API、shorthand 或占位程式。分拆不授權 commit、push 或建立遠端 PR。

**目前狀態（PR #1249）**：Phase 1 已在 draft PR 實作並推送，尚未合併；以下 Findings 描述實作前的基線，不是目前檔案狀態。預設斷點、helper、文件與 token inventory 已更新；發布前仍須完成第 1 節的雙向套件相容性驗收。

## Findings

- 官方規格：https://next.mui.com/material-ui/customization/breakpoints/。
- MUI 實作與測試參考：[createBreakpoints](https://github.com/mui/material-ui/tree/master/packages/mui-system/src/createBreakpoints)、[createTheme](https://github.com/mui/material-ui/blob/master/packages/mui-system/src/createTheme/createTheme.ts)、[responsive resolution](https://github.com/mui/material-ui/blob/master/packages/mui-system/src/breakpoints/breakpoints.ts)。只參考數值排序與 API 組織，不採用其預設斷點；Tonic 使用 CSS range syntax 與精確上界，不加入 MUI dependency。
- 目前 theme 實作於 `packages/theme/src/v3/`。`primitive/breakpoints.js` 是舊 array；`v3/index.js` 合併 v2 array／aliases，會留下舊名稱，不能沿用。
- `packages/styled-system/src/core/parser.js` 與 `src/sx.js` 直接迭代舊 array。目前 responsive array 都是 `[base, breakpoint0, breakpoint1, ...]`，不是 MUI 的 first-value-at-first-breakpoint 規則。
- React `createTheme.js` 先 deep merge 再 `resolveTheme()`；helper functions 必須依最終 options 重建，避免 closure 指向舊 values。`resolveTheme()` 與 color-mode variants 保留 enumerable functions。
- 新 breakpoint object 必須排除於 CSS variable mapping；否則目前 mapper 會把 functions、keys、unit 等當成 design tokens。CSS media-query boundary 不能使用 CSS variables。
- `fontSizes/lineHeights` 的 `xs`／`2xl` 是字級 tokens，不應因 breakpoint 變更刪除。保留 v2 定義、Figma snapshots 與 reviewed relations；本次會同步 PR CI 強制檢查的 source-derived tokens inventory。
- 已嘗試 JavaScript LSP，環境沒有可用 server；以限定搜尋確認 callers，不安裝工具。
- docs 的 `{render('./file')}` 已確認經 `next.config.mjs` 轉成 Demo component，`components/Demo.js` 直接 render 元件，沒有 iframe；browser spec 可用 `#main` 查詢 demo testids。
- Container queries 設計參考：https://next.mui.com/material-ui/customization/container-queries/，以及 MUI `packages/mui-system/src/cssContainerQueries/cssContainerQueries.ts`／`.test.ts`。Phase 2 重用 Tonic breakpoint helpers，提供未命名與具名 container，僅替換 `@media` 前綴，保留精確邊界；不提供 `not` helper。此為 Phase 2 的設計證據，不加入 Phase 1。

## Approach

### 1. 共用 breakpoint factory 與 theme 預設值

新增 `packages/utils/src/internal/createBreakpoints.js`，由 `packages/utils/src/internal/index.js` export `createBreakpoints`，不加入 utils public barrel。repo 沒有等價 helper；放在 utils/internal 讓 theme 與 styled-system 共用，不建立兩份演算法或循環相依。

```js
createBreakpoints({ values = {}, unit = 'px' } = {})
// => { keys, values, unit, gte, lt, between, only }
```

- 定義 `Breakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl'`；values 型別為 `Partial<Record<Breakpoint, number>>`，不是任意名稱 map。複製 values 後依數值升冪排序，keys 取排序後名稱。factory 預設空 map 且 unit 為 px，保留低階 styled-system 無 theme 時不提供 responsive thresholds 的現況。設計系統的預設數字與 rem 單位由 theme 提供。
- 使用具體 JSDoc options、上述有限名稱、method signatures 與回傳形狀，不新增模糊 any typedef。values 若含五個標準名稱之外的 key（包括 `xs`），丟出 `TypeError('[Tonic UI] Unsupported breakpoint name: ' + key + '.')`，不建立替代 aliases。
- runtime methods 為 enumerable，符合現有 merge／resolution；不用 prototype、class 或 non-enumerable methods。
- options 是 object；array 或 null 丟出 `TypeError('[Tonic UI] breakpoints must be an options object.')`。`values/unit` 採文件定義的 numeric map／string 契約，不新增驗證框架或自訂 fallback。未提供 options 使用上述預設，空 values 保持空。
- `gte(key: Breakpoint | number): string`、`lt(key: Breakpoint | number): string`、`between(start: Breakpoint | number, end: Breakpoint | number): string`。number 是所選 unit 的寬度；具名 key 從 values 解析。此次不新增 raw CSS-length string 參數，例如 `gte('40em')`；em 單位透過 unit 設定。
- `only(key: Breakpoint): string` 使用排序後存在的具名 key。所有 helpers 若傳入不存在的具名 key，丟出 `RangeError('[Tonic UI] Unknown breakpoint: ' + key + '.')`，不產生 invalid CSS；空 values 沒有合法 named-key 呼叫，numeric gte/lt/between 仍可使用。
- query 使用 CSS range syntax，精確包含下界、排除上界，不使用 epsilon 或 `step`；例如預設 theme 的 `gte('md')` → `@media (width >= 48rem)`、`lt('md')` → `@media (width < 48rem)`。
- `only` 非最後 key 使用 `between(key, next)`，最後或唯一的 key 使用 `gte(key)`。空集合依前述 unknown-key 規則處理。
- 不提供 `not()` helper。區間兩側共用的樣式通常可作為 base，再用 `only()` 或 `between()` 覆寫區間內的值；若規則必須只在區間外匹配，直接使用原生 `@media not (...)`。

預設契約的精確輸出：

| 呼叫 | 輸出 |
| --- | --- |
| `gte('sm')` | `@media (width >= 40rem)` |
| `gte('md')` | `@media (width >= 48rem)` |
| `lt('md')` | `@media (width < 48rem)` |
| `lt('sm')` | `@media (width < 40rem)` |
| `between('sm', 'lg')` | `@media (40rem <= width < 64rem)` |
| `only('md')` | `@media (48rem <= width < 64rem)` |
| `only('2xl')` | `@media (width >= 96rem)` |

將 `packages/theme/src/v3/primitive/breakpoints.js` 改為純 numeric map：

```js
export const breakpoints = { sm: 40, md: 48, lg: 64, xl: 80, '2xl': 96 };
```

`packages/theme/src/v3/index.js` 用 `createBreakpoints({ values: primitiveTokens.breakpoints, unit: 'rem' })` 取代整段 breakpoint merge IIFE，刪除舊 array-copy comments／fallback。每個 theme 有獨立 values/keys；`createTheme('px')`、`createTheme('rem')` 的 breakpoint unit 都預設 rem，不隨字級單位變動。低階 `createBreakpoints()` 仍以空 values、px 為預設；覆寫 theme 的 values 而想使用 px 時，須明確設定 `unit: 'px'`。不改 v2 定義。
移除該 factory 的 JSDoc `@returns {Object}`（讓 declaration 推論 output），使用 `@param {'px'|'rem'} [unit='rem']`；`packages/theme/src/createTheme.js` 同樣保留推論回傳，不覆蓋成 opaque `Object`。公開 `breakpoints` 應推論為 `ReturnType<typeof createBreakpoints>`。

`packages/theme` 新增對 `@tonic-ui/utils` 的直接依賴；同步受影響的 manifests 與 `yarn.lock`。此處不能沿用舊 utils 的最低版本：它未匯出 `createBreakpoints`。開發時使用本地 workspace，不安裝或發布套件。
發布驗收：依實際 release plan 核對待發布 tarball 的 `package.json`，不是只看 workspace build。theme、styled-system、react 的 utils 下限須包含新 helper；react 對 theme、react-base、styled-system，以及 react-base 對 styled-system 的下限須排除舊 array 契約的組合。以各允許下限的打包產物、無 Jest mappings 或 workspace symlink 的 consumer 驗證：預設 theme 的 `gte('sm')` 回傳 `@media (width >= 40rem)`，Box 的 responsive array 在此門檻套用正確樣式（瀏覽器初始字級 16px 時為 640px）。版本號由 release plan 決定，不在此預填或發版。
反方向也是發布阻擋條件：以已發布且仍使用 array 的 React、react-base 及其相依套件 manifests 配對實際候選版本，依套件管理器的 semver 規則檢查所有能形成「舊 renderer＋新 theme」或「新 renderer＋舊 theme」的解析路徑。舊 parser 會對新物件呼叫 `.map()`；調高新 manifest 的下限不能改寫舊 manifest。若任一不相容組合仍可解析，停止發布並另選舊範圍不接受的候選版本，再重驗雙向矩陣；不靠同步發布、清 lockfile 或新增 array shim。

沿用現有 Changesets 發布流程，由 release PR 產生實際候選版本；不在功能分支預填版本。驗收涵蓋 React → react-icons → react-base → styled-system 的間接 renderer 路徑，以及最低版本 tarball 渲染 Box 與 SVGIcon 的 40rem 樣式。已發布的 `^3.0.0-alpha.1` 仍可解析後續 `3.0.0-alpha.*` 與穩定的 `3.x`；若預設流程產出的候選落在該範圍內，不得視為通過雙向相容性驗收。
Jest source mappings 的確切設定：`"^@tonic-ui/utils/internal$": "<rootDir>/../utils/src/internal/index.js"`、`"^@tonic-ui/utils$": "<rootDir>/../utils/src/index.js"`。


### 2. React theme 正規化與 CSS variables

`packages/react/src/theme/createTheme.js` 從現有 `@tonic-ui/utils/internal` 匯入 factory。其他 scales 保留現有 `merge()`；breakpoint options 獨立收集：由 `tonicTheme.breakpoints` 的 values/unit 起始，依序套用第一參數與所有後續 arguments 的 breakpoints。

- 只覆寫有提供且非 undefined 的 options。
- supplied values 整組取代前一組，不 deep-merge names；例如 `{ sm: 40, lg: 64 }` 不殘留 md/xl/2xl。空 map 不回填預設。不在實作或文件額外建立替代斷點名稱。
- unit 沿用最近提供值；theme 未覆寫時維持 rem，覆寫 values 不會自動將 unit 改成 px。
- 接受已產生的 runtime object 作為輸入，但忽略其 keys/methods，從 values/unit 重建；不可沿用舊 closure。
- 任何明確提供的 breakpoints input，在讀取／合併 options 前先套用第1節的 object-only 檢查，避免 array/null 被正規化流程悄悄忽略。
- 在 `resolveTheme(theme)` 前設 `theme.breakpoints = createBreakpoints(finalOptions)`，讓 `useTheme()` 的 light/dark variants 都有可用 helpers。
- factory 複製並凍結排序後的 `values`、`keys` 和 runtime 物件；helpers 只讀這份快照。不凍結呼叫者的 options 或整個 theme。standalone theme 的 `breakpoints` 屬性也設為 enumerable、不可替換。
- React 組裝時保留這份快照供 token references 解析。`resolveTheme()` 會重建 plain objects 並預建兩個 mode，不能假設凍結狀態會傳下去。回傳前在 resolved base、`toColorMode('light')`、`toColorMode('dark')` 上，用唯讀 enumerable 屬性掛回同一份快照，取代 resolver 的可寫副本。公開型別將 `breakpoints`、`values`、`keys`、`unit` 標為 readonly；更改設定一律建立新 theme。
- 不改通用 merge、clone 或 resolveTheme。

在 `packages/react/src/theme/utils/css-vars.js` 的 `mapThemeToCSSVariables` 排除 top-level breakpoints，其他 scales 的輸出保持不變。不產生任何 `--tonic-breakpoints-*` variables。

在 React `createTheme.js` 和 `useTheme.js` 保留現有 theme 簽名的其他部分，兩者的回傳型別均加上 `{ readonly breakpoints: ReturnType<typeof createBreakpoints> }`；以 `typeof import('@tonic-ui/utils/internal').createBreakpoints` 取得型別（不為 `useTheme` 新增 runtime import）。唯讀限制只用於回傳的 theme，不加在輸入 options 上。React `createTheme` 第一參數型別為 `CreateThemeOptions & ThemeScales & { breakpoints?: Parameters<typeof createBreakpoints>[0] }`，後續 arguments 每個為 `ThemeScales & { breakpoints?: Parameters<typeof createBreakpoints>[0] }`。不重寫全域 `ThemeScales`。輸入 options、輸出 runtime helpers、已建立的 theme 傳回 `createTheme` 三者都須型別相容。

在 `packages/react-base/src/box/index.js` 的 `sx` callbacks（含陣列項與 property callback）把 `breakpoints` 宣告為 optional，存在時型別同 factory 回傳值。Box 可以單獨使用；不能從 JSX 推論上層有 `TonicProvider`，也不為無 provider 的 callback 注入預設斷點。文件在 provider 內用 `useTheme()` 取得必有 helpers 的 theme；可獨立渲染的 callback 則先判斷 `theme.breakpoints`。`TonicProvider` 與 `ThemeProvider` 的 `theme` prop 只接受合法 raw options 或已建立的 theme，不用寬鬆的 `ThemeScales` 聯集，不改 provider runtime 分支。

### 3. Responsive renderer object-only 遷移

`packages/styled-system/src/core/parser.js` 與 `src/sx.js` 以 module-level `createBreakpoints()` 空 runtime object 當無 theme fallback。`sx.js` 移除對 breakpoint scale 的 ensureArray。Parser 在有 responsive 值的每次 parse 讀目前 `props.theme.breakpoints`，不要讓第一個 provider 決定其他 provider 的 CSS。保留單槽 `cache.breakpoints/cache.media`，只有 scale reference 相同才重用 media list；更換 reference 時重建。`disableStyledSystemCache` 為 true 時使用該次呼叫的 local media list，不讀寫 cache；無 responsive 值不建立 list。

- media list 為 `[null, ...breakpoints.keys.map(key => breakpoints.gte(key))]`。default responsive array 的位置為 `[base, sm, md, lg, xl, 2xl]`；多餘值照現有規則截斷，null/undefined 跳過。
- responsive object 的 `_` 是 unconditional base；values 中存在的 key 使用 gte(key)，以 property existence 判斷。即使 custom value 為零，也要輸出具名 media query，不能把它視為 base 或不存在。
- 未知 responsive object key 忽略，不再退化成 unconditional base，避免已移除的 xs 或拼錯 key 意外套到所有尺寸；`2xl` 是有效 key。舊 numeric object-key fixtures 改具名 keys，不保留 array-index alias。
- Parser 合併完 declarations 後，base properties 在前，已產生的 queries 按當前 runtime sorted `keys` 對應的 media list 輸出。刪除舊 `sortObject` 的 localeCompare sorting：例如 `10.125em` 必須在 `10.5em` 前，不能比較 query strings。陣列和具名物件同時出現也使用同一順序；同一 query 保留現有 per-declaration merge。其他 pseudo 與 `sx` composition 行為不變。
- 四個 helper 的 computed keys 可直接當作 sx／__sx nested media rules。不要新增 root wrapper；不要順便擴增目前 sx 尚未提供的 property-level named responsive-object API。
- `sx.js` 展開 responsive array 時，若與明確的 `[theme.breakpoints.gte('sm')]` 命中同一 query，按作者順序逐項合併，不可覆蓋整個規則，也不可修改傳入的 `sx` 物件。`sx.test.js` 用 `width: [null, '50%']` 與明確規則 `{ color: 'red' }` 測兩種順序：同一 rule 一律同時保留寬 50% 和紅色。再讓明確規則也設定 `width: '75%'`：明確規則在後時寬 75%，array 在後時寬 50%。這是 Tonic 的保證；[MUI `styleFunctionSx`](https://github.com/mui/material-ui/blob/a55ec7da097cd9123335ed97e230b39151083ae0/packages/mui-system/src/styleFunctionSx/styleFunctionSx.ts) 對明確 nested key 直接賦值，不是兩種順序的驗收依據。
- `sx({...})` 和 `sx([...])` 都將陣列實際產生的 query（含與明寫規則合併的 query）按斷點升冪排列。只替換這些 query 的位置；沒有與陣列合併的明寫規則保持原位置。不同 query 重疊時，不拆分宣告來同時維護兩種順序，也不自動提高 selector specificity。刻意需要較高優先權時，由作者用 `&&` 明示，只包要覆寫的屬性；瀏覽器初始字級為 16px 時，用 Chromium 在 639px 和 640px 驗證一般規則及覆寫的寬度與顏色。

遷移 custom test fixtures：

- `packages/styled-system/src/core/__tests__/parser.test.js`、`system.test.js`。
- `packages/styled-system/src/config/__tests__/{layout,margin,padding,outline}.test.js`。
- `packages/styled-system/src/__tests__/sx.test.js`。
- `packages/react-base/src/box/__tests__/Box.test.js`。

fixtures 使用 `createBreakpoints({ values: { sm: 40, md: 52, lg: 64 }, unit: 'em' })` 等原測試數值，不硬改成 design-system defaults。既有 small/medium direct maps 改成 sm/md 與 numeric values，加 unit，style value keys 一併改名。`parser.test.js` 改為交替送入 40/52/64、11/22/33，再回原 theme，驗證 query widths 跟隨 theme；`disableStyledSystemCache` 測試確認 opt-out 的 7/8/9 不污染後續 40/52/64。`system.test.js` 把排序案例改為含 `sm: 10.125, md: 10.5`，以逆序 named props 驗證兩個 query keys 真實升冪，原非 media declarations 不變。預期生成 query 改為 CSS range syntax；raw CSS-selector 測試明確字串不改。刪除 fixture 中舊 breakpoint CSS variables。
`packages/react-base` 直接宣告對 utils 的依賴，供測試與 Box 的型別使用。若打包後的 `.d.ts` 引用 `@tonic-ui/utils/internal`，該依賴必須隨發布產物提供，且下限包含 `createBreakpoints`。Jest 使用第 1 節的 utils source mappings；同步 workspace lockfile，不使用 fake helper 或跨 package 私有相對路徑。


有限 caller 搜尋：`rtk rg -n 'breakpoints|defaultBreakpoints|tonic-breakpoints' packages/styled-system/src packages/react-base/src packages/theme/src packages/react/src/theme`；逐一 reread 後修改，v2 歷史定義除外。

### 4. 實際消費端與文件範例

更新現有 `packages/react-docs/pages/theme/breakpoints/index.page.mdx`（URL `/theme/breakpoints/`），不建立重複頁面。`## Default breakpoints` 列五個名稱／rem 數值、16px 初始字級下的像素換算及 `createTheme()` 範例；`## CSS media queries` 展示四個 helpers；`## Customizing breakpoints` 說明標準名稱的 values 與 unit，包括覆寫 px 數值時須明確指定 `unit: 'px'`；`## API` 列各 helper 的參數型別、數字支援、精確 query 和邊界。說明範圍下界包含、上界精確排除，鄰接範圍不留 subpixel 間隙。保留 primitive tokens 與 Examples；在 `TonicProvider` 的子元件用 `const { breakpoints } = useTheme()` 與 `<Box sx={{ backgroundColor: 'red', [breakpoints.only('md')]: { backgroundColor: 'blue' } }} />`。說明需要反向條件時可直接使用 `@media not (48rem <= width < 64rem)`；也可在有具名容器時用原生 `@container sidebar not (40rem <= width < 48rem)`，不宣稱 Phase 2 helper 已可用。

- `packages/react-docs/components/ThemeTokens.js` 的 getTokenData('primitive') 改為 `breakpoints: primitiveBreakpoints`，展示純 numeric map 並在文件標示預設 unit 為 rem，不展示 runtime metadata/functions。
- 原 `pages/theme/breakpoints/breakpoints.js` 改為六段 base/sm/md/lg/xl/2xl；fontSize/lineHeight 可使用字級 tokens xs/sm/md/lg/xl/2xl，display 以 `_` 設定 base 再用相鄰斷點隱藏。六段依序標示 `<40rem`、`40–<48rem`、`48–<64rem`、`64–<80rem`、`80–<96rem`、`>=96rem`；其像素換算須說明假設瀏覽器初始字級 16px。各段加 `data-testid="breakpoint-range-base"`、`breakpoint-range-sm` 等穩定 selector。
- 新增 `pages/theme/breakpoints/media-queries.js`，並在同頁現有 Examples 區塊 render。用 Box/useTheme 展示四個 helper，具可見 query 名稱的 Box 預設 display:none，query 成立則 block。id/query 為 `gte-sm`/gte('sm')、`lt-sm`/lt('sm')、`only-md`/only('md')、`between-sm-md`/between('sm','md')；各自 `data-testid="breakpoint-${id}"`。這是可操作範例，不是隱藏測試 UI。
- `pages/styled-system/responsive-values/index.page.mdx` 改表格與 generated CSS 為新 rem thresholds，明確說明 array base-first：`[base, sm, md, lg, xl, 2xl]`。array 範例使用 `['100%', '75%', '50%', '33.333%', '25%', '20%']`，各位置由 base 開始依序對應這六個槽位；object 範例保留 `_` 作 base，改正其文字與 thresholds。
- `pages/getting-started/the-sx-prop/using-media-queries.js` 在 provider 內用 `useTheme()` 與 gte('sm')／gte('md')／gte('lg') 產生 `sx` keys，保留原字級值。不改 raw useMediaQuery hook 或其 demo。
- `pages/index.page.js` 的 maxWidth 使用 `{ md: '1024px', lg: '1280px', xl: '1680px' }`，保留三個既有 width 值。Grid templateColumns 使用 `{ _: '1fr', xl: '1fr 1fr' }`；flexDirection 以 `_`／`xl` 在 80rem 切換大版面（瀏覽器初始字級 16px 時為 1280px）。
- `pages/getting-started/usage/components/FormulaOne.js` 保留大版面字級切換：使用具名 style props `{ _: 原 base 值, lg: 原大版面值 }`，行高使用 `lineHeight`。responsive-values 文件展示先前 `[base, xs, sm, md, lg, xl]` 遷移到具名 key 的例子：原 index 4 是 `lg`，現在也以 `lg` 指定；移除無條件匹配的 `xs` 槽位並將其值移至 base。不同於 [MUI `iterateBreakpoints`](https://github.com/mui/material-ui/blob/a55ec7da097cd9123335ed97e230b39151083ae0/packages/mui-system/src/breakpoints/breakpoints.ts)，Tonic 的 index 0 仍是 unconditional base。驗收此 demo 在 1023px 顯示 base 字級，1024px 才使用大版面字級（初始字級 16px）。

修正 docs shell 使用 sm 作「所有尺寸 base」的地方：

- `pages/_app.page.js` 的 getSidebarStyleProps/getMainStyleProps：僅將每個 responsive object 的 sm base key 改 `_`，保留 lg overrides。將 DocsPage 的 useTheme 移至 useMediaQuery 前，sidebar hook query 改 `theme.breakpoints.gte('lg').replace(/^@media\s*/, '')`，保持與 64rem CSS layout 同步。
- `components/Header.js` 加 useTheme，將搜尋框的緊湊狀態命名為 `isSearchCompact`，使用 `theme.breakpoints.lt('md').replace(/^@media\s*/, '')`。現有 display／search width 的 sm base keys 改 `_`；md/lg 保留。
- `components/SearchButton.js` 的 minWidth/display，以及 `components/Sidebar.js` 的 pt/display，sm base keys 改 `_`。
- `public/styles/app.css` 的 main 區塊 media threshold 改為 `64rem`，配合新 lg；使用實際 rem 長度，不能在 media queries 使用 CSS variable。

更新現行 v2 → v3 遷移指南的 v3 欄與遷移步驟，保留 v2 數值。不修改舊發布版本的文件、v2 token 定義或不相關固定像素尺寸。`xs`／`2xl` 字級值與 breakpoint 名稱分屬不同 scales，不可混淆。

`Grid` 的 `gridGap`、`gridRowGap`、`gridColumnGap` 保留可用並發出 deprecation warning；推薦 `gap`、`rowGap`、`columnGap`。型別與文件保留舊名稱。codemod 對 deprecated props 提示人工檢查，並讓同組 modern gap props 保持 flat，以免移入 `sx` 後改變 CSS cascade；lint 提示 deprecated 而非不支援。

### 5. 消費者可觀察的回歸測試

新增 `packages/utils/src/internal/__tests__/createBreakpoints.test.js`：

- 使用完整預設 numeric map 與 unit='rem' 檢查 helper 輸出表及 numeric fractional boundaries；另確認空 `createBreakpoints()` 的 unit 是 px，numeric `gte(300)` → `@media (width >= 300px)`。
- 使用標準名稱 `{ sm:0, md:40, xl:80 }`、unit='em'：lt('md') → `@media (width < 40em)`；only('md') → `@media (40em <= width < 80em)`。這只是隔離測試 unit 的 fixture，不建立另一套產品斷點命名。
- 單一標準 key `{ lg:600 }`、unit='px' 的 `only('lg')` → `@media (width >= 600px)`；非零首項 `{ sm:600, md:900 }`、unit='px' 的 `only('sm')` → `@media (600px <= width < 900px)`。array/null options 拋出約定 TypeError。非標準名稱（含 xs）的 values key 拋出 Unsupported breakpoint name TypeError；helper 不存在的 key 拋出 Unknown breakpoint RangeError，驗證不會加入其他命名或生成 invalid CSS。

更新 theme 現有 createTheme.test.js 的兩處 breakpoint assertions，覆蓋 px/rem dimension-unit 引數、完整 values/keys、breakpoint unit='rem'，且沒有 numeric index、直接 alias 或 xs。對 standalone、React base、light、dark 的公開物件驗收：嘗試改寫 `values.md`、修改 `keys`、替換 `breakpoints` 均不能改變門檻；`values.md` 為 48，`gte('md')` 維持 48rem，mode 的 `get('breakpoints.values.md')` 維持 48。以 `createTheme(existingTheme, { breakpoints: { values: { md: 1000 }, unit: 'px' } })` 另建 theme 才會得到新的 1000px query；舊 theme 不變。改動原始輸入 map 也不得改變任一既有 theme。
`packages/theme/src/__tests__/index.test.js` 的 default-export 測試目前以整個 theme 深比較；新 factory 每次建立新的 functions，不能比較 function identity。將兩邊解構成 breakpoints 與其他 tokens，其他 tokens 仍完整 toEqual；breakpoints 比較 values/keys/unit，並比較 gte('md') 的實際輸出。不修改既有 public export 名單，因為 factory 只從 utils/internal export。


React `src/theme/__tests__/createTheme.test.js` 新增：

- default/custom config 產生正確 helpers。
- values override 整組替換且排序；用標準名稱的子集合 `{ '2xl':96, sm:40, lg:64 }`，確認不殘留 md/xl。
- `createTheme(existingTheme, { breakpoints: { values: { sm:640, lg:1000 }, unit:'px' } })` 的 lt('lg') 為 `@media (width < 1000px)`，原 theme 不變，證明重建 closure 與明確覆寫 unit。另驗證只覆寫 values 時保留 inherited rem unit。
- empty values 不回填；舊 array/null options 拒絕；cssVariables 無任何 --tonic-breakpoints 開頭 key，其他例如 --tonic-space-1x 繼續存在。
- 用現有 render helper 的 default provider，render `<Box display={['block', 'inline', 'flex', 'grid', 'inline-block', 'none']} />`，檢查 base='block'，40rem='inline'、48rem='flex'、64rem='grid'、80rem='inline-block'、96rem='none' 六個 CSS rules。另 render 文件的 `only('md')` 範例，驗證 base 為 red、48rem–<64rem media rule 為 blue。custom theme 使用明確 TonicProvider wrapper。另用無 provider 的 `renderToString` 驗證普通 Box 的文字和基礎樣式正常；有 guard 的 callback 看到 `breakpoints` 缺省，只輸出 base 樣式，不產生 media rule。

`src/theme/__tests__/useTheme.test.js` 利用現有 createWrapper(colorMode, themeOverrides)，對 light/dark 使用標準名稱 fixture `{ values: { sm:0, md:40, xl:80 }, unit:'em' }`。驗證 gte('md') 為 `@media (width >= 40em)`、lt('md') 為 `@media (width < 40em)`、only('md') 為 `@media (40em <= width < 80em)`、between('sm','xl') 為 `@media (0em <= width < 80em)`。這涵蓋 resolveTheme/color-mode 傳遞，不另加只測 function identity 的 wiring test。

styled-system 的 core parser/system 測試加入 custom sm=0 仍是 media query、object keys 亂序輸入仍正確排序、未知／xs key 不成為 base，並確認 2xl 是有效 key；sx 測試加入 array null skip、custom zero 與 custom unit 的 array 解譯，以及 helper computed nested media key。既有 named/numeric fixtures 依第3節遷移，不把 nested selector sx 測試改成尚未支援的 property-level named responsive object。

### 6. 讓 source-derived token inventory 隨新契約更新

`plugins/tonic-ui-tokens/scripts/lib/source-theme.mjs` 的 `localRequire` 現在把 `@tonic-ui/utils/internal` 硬指向 `toCSSVariable.js`。改為 source-load `packages/utils/src/internal/index.js`，使用同一 loader 解析 barrel 內的相對 imports，讓 `createBreakpoints` 和其源檔 fingerprint 可用；不得讀取 dist 或依賴 build 順序。

在該檔 `buildTokenInventory()` 投影 breakpoint runtime，讓 inventory 只收錄五個 numeric width records `breakpoints.values.{sm,md,lg,xl,2xl}`，數值依序為 40/48/64/80/96；px/rem dimension-unit variants 都是相同的 rem breakpoint scale。以獨立的 unit provenance 清楚標明這些數值的單位是 rem，不限制 provenance 的具體 metadata 形狀，也不把它當作另一個 breakpoint token。`resolveTheme()` 仍用未投影 runtime theme，確保 `theme.get('breakpoints.values.sm')` 能解析回 40。不收錄 `keys` 或 helpers，也不保留舊 `breakpoints.sm` 等 aliases；任何 breakpoint 都不產生 CSS custom property。

在 `plugins/tonic-ui-tokens/scripts/__tests__/token-inventory.test.mjs` 的「generated inventory round-trips」與「unchanged inventory preserves provenance」更新查找／stale-mutation 路徑到 `breakpoints.values.sm`，預期 numeric value 為 `40` 且 unit provenance 明確為 rem；保留其他 scales 真正 px/rem 的語意。新增斷言：breakpoint token 子集合正好是五個值，沒有 runtime metadata、aliases 或 CSS vars。其餘 token tests 不重寫。

依已授權範圍執行 `rtk node plugins/tonic-ui-tokens/scripts/generate-token-inventory.mjs`，不要手改 `assets/tokens.json`；從 Phase 1 的 base 版本只遞增 `plugins/tonic-ui-tokens/.claude-plugin/plugin.json` 的 patch，再執行 `rtk node scripts/plugins/sync-plugin-marketplace-metadata.mjs --write`。不使用 release updater、不發版、不動 Figma snapshots 或 relation ledger。CI 檢查來源路徑與 hashes；不以延後至 release 或調弱 gate 取代同步。

### 7. 驗證公開宣告

在 `packages/react/src/theme/__tests__/createTheme.test-d.tsx` 的既有使用案例上增加：`const query: string = createTheme().breakpoints.only('md')`、`.gte('2xl')`，以及 `createTheme({ breakpoints: { values: { sm: 40, md: 48 }, unit: 'em' } })` 的有效呼叫。使用 `@ts-expect-error` 確認 `createTheme({ breakpoints: { values: { tablet: 640 } } })`、`createTheme({ breakpoints: { values: { xs: 0 } } })`、`createTheme({ breakpoints: ['600px'] })`、`.gte('xs')` 與 `.only(600)` 被拒絕。在 `useTheme.test-d.tsx` 的既有 hook fixture 加正向 `.between('sm', 1000)`／`string`，並確認原來的 `.not('md')` 已被型別拒絕。不要靠 `as any` 讓正向測試通過。

在 `createTheme.test-d.tsx` 令 `theme = createTheme()`，在 `useTheme.test-d.tsx` 的 hook fixture 令 `theme = useTheme()`；兩處都用 `@ts-expect-error` 驗證 `theme.breakpoints = createTheme().breakpoints` 被拒絕。右側是合法的斷點物件，測的是整個欄位不可替換，不是值的型別不符；保留下方針對 `values.md` 的獨立測試。

在 `packages/react/src/box/__tests__/Box.test-d.tsx` 驗證 `<Box sx={({ breakpoints }) => breakpoints ? { [breakpoints.gte('sm')]: { display: 'block' } } : { display: 'block' }} />`。嚴格型別檢查應拒絕未判空的呼叫、判空後的 `.gte('mobile')` 及寫入 `createTheme().breakpoints.values.md`。兩個 provider 各自的 `.test-d.tsx` 均接受合法的 raw breakpoint options 與 `createTheme()`，並以 `@ts-expect-error` 拒絕 `{ breakpoints: ['600px'] }`。

## Verification

### 機械檢查

核准後才執行。工作目錄為 repository root；依賴與 Chromium 已安裝是前提，不自行安裝軟體。先完成所有相依變更，再做一次 shared dependency build 及以下限定測試：

```bash
rtk yarn build-public
rtk yarn workspace @tonic-ui/utils test --coverage=false --runTestsByPath src/internal/__tests__/createBreakpoints.test.js
rtk yarn workspace @tonic-ui/theme test --coverage=false --runTestsByPath src/__tests__/createTheme.test.js src/__tests__/index.test.js
rtk yarn workspace @tonic-ui/styled-system test --coverage=false --runTestsByPath src/core/__tests__/parser.test.js src/core/__tests__/system.test.js src/config/__tests__/layout.test.js src/config/__tests__/margin.test.js src/config/__tests__/padding.test.js src/config/__tests__/outline.test.js src/__tests__/sx.test.js
rtk yarn workspace @tonic-ui/react-base test --coverage=false --runTestsByPath src/box/__tests__/Box.test.js
rtk yarn workspace @tonic-ui/react test --coverage=false --runTestsByPath src/theme/__tests__/createTheme.test.js src/theme/__tests__/useTheme.test.js
rtk yarn workspace @tonic-ui/react test:types
rtk node --test plugins/tonic-ui-tokens/scripts/__tests__/token-inventory.test.mjs
# build-public 不含 private docs workspace；先從 templates 生成 MCP 所需的實體 MDX。
rtk bash -ec 'cd packages/react-docs && . ./tonic-ui.env && bash ./scripts/update-docs.sh'
PLUGIN_BASE_REF=main VALIDATION_BRANCH=main VALIDATION_MCP=1 rtk yarn validate-ai-tooling
```

限定測試對應本次回歸；CI 再執行既有全套 gate。驗證 new theme 的 cache 交替、decimal query 順序、public helper 型別與 token snapshot freshness，四者分開報告。

### 真實瀏覽器邊界與視覺證據

新增 `packages/react-docs/test/e2e/pages/theme/breakpoints.spec.mjs`，依現有 pages/index.mjs 自動成為 project `theme/breakpoints`、URL `/theme/breakpoints/`，不用新增 server/project config。測試用現有 docs 頁面與第4節 demo，不複製 fixture framework。tags 為 @docs、@media、@boundary。

在同一次 page 載入後，使用瀏覽器初始字級 16px，依序 setViewportSize（height900），用 `#main` 內的 testids 驗證下列 helper visibility；visible 用 toBeVisible，其他用 toBeHidden，不用 sleeps／mock matchMedia。像素值是 rem 門檻在此測試設定下的換算：

| Width | gte-sm | lt-sm | only-md | between-sm-md | 唯一可見 range |
| ---: | --- | --- | --- | --- | --- |
| 200 | 否 | 是 | 否 | 否 | base |
| 639 | 否 | 是 | 否 | 否 | base |
| 640 | 是 | 否 | 否 | 是 | sm |
| 767 | 是 | 否 | 否 | 是 | sm |
| 768 | 是 | 否 | 是 | 否 | md |
| 1023 | 是 | 否 | 是 | 否 | md |
| 1024 | 是 | 否 | 否 | 否 | lg |
| 1279 | 是 | 否 | 否 | 否 | lg |
| 1280 | 是 | 否 | 否 | 否 | xl |
| 1535 | 是 | 否 | 否 | 否 | xl |
| 1536 | 是 | 否 | 否 | 否 | 2xl |

在 768 與 1024 各加入一次 root `test/e2e/screenshots.mjs` 的 captureColorModes，scenario='breakpoints'，case 分別 'helpers-md-768'/'helpers-lg-1024'。prepare(colorMode) 透過實際 `[title="Toggle color mode"]` 控制切換並等待 html[data-color-scheme] 符合，設定 viewport、將 demo 捲入可見範圍並確認當前 range/helper 狀態。不得用 script 注入樣式或改 application state；不得直接 page.screenshot。

```bash
E2E_SCREENSHOTS=1 rtk yarn test:e2e docs:pages --project theme/breakpoints
```

runner 自行啟動 Next.js docs server（預設3129，衝突時設 E2E_PAGES_PORT 為空閒 port）。完成後讀取 `packages/react-docs/.e2e/screenshots/breakpoints/helpers-md-768/screenshot.light.png` 及 `helpers-lg-1024/screenshot.dark.png`，確認範例可見、窄螢幕 header/sidebar 無遮擋、文字與狀態符合測試。此為 actual surface proof，不以只測 helper 字串取代。

## Assumptions & contingencies

- 公開斷點名稱僅 sm/md/lg/xl/2xl；應用程式無須提供 values。object-only 與 values/unit 設定介面保留。預設 theme 不論 dimension-unit 引數都使用 rem；只有直接呼叫空的低階 factory 預設 px。responsive array base-first 保留現有 Tonic 語意，文件明示與 MUI array 語意不同。
- 公開 helper 僅為 gte/lt/between/only，不提供 not 或 aliases，也不複製 MUI 私有 internal_mediaKeys。
- refs 的 MUI 原始碼僅用作設計參考，不修改該 repo，不引入或安裝 MUI。
- 若現有 dependency builds 缺失，以已列 build-public 補齊；若依賴或 Chromium 本身未安裝，完成可達的 source/unit 工作並報告缺少的前提，不自行安裝。
