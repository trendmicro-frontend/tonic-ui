# Phase 1: Theme Breakpoints Implementation Plan

## Context

將 theme 的預設斷點改為 MUI 的 `xs/sm/md/lg/xl = 0/600/900/1200/1536`，並新增 `up`、`down`、`only`、`not`、`between`。採用 MUI 物件契約 `createTheme({ breakpoints: { values, unit, step } })`，移除舊 breakpoint array 與 `theme.breakpoints.md` 等 alias API，不提供雙格式相容層。元件 responsive style props 繼續支援 array／object；array 保留 Tonic 現有 base-first 順序。
預設直接呼叫 `createTheme()` 即取得上述五個標準斷點，不要求應用程式另傳 values。公開斷點名稱限定 xs/sm/md/lg/xl，不提供 mobile/tablet/laptop/desktop 等替代名稱；values/unit/step 設定介面保留。文件沿用現有 `/theme/breakpoints/` 頁面，參考 MUI 的預設值、CSS helpers、設定與 API 分節方式，不另建重複頁面。
Phase 1 是可單獨合併的 viewport breaking change；[Phase 2: Container Queries](./2026-11-19-theme-container-queries.md) 從合併 Phase 1 後的 `main` 開始，重用這裡的 runtime 斷點。不在 Phase 1 加 container API、shorthand 或占位程式。分拆不授權 commit、push 或建立遠端 PR。

## Findings

- 官方規格：https://next.mui.com/material-ui/customization/breakpoints/。
- MUI 實作與測試參考：[createBreakpoints](https://github.com/mui/material-ui/tree/master/packages/mui-system/src/createBreakpoints)、[createTheme](https://github.com/mui/material-ui/blob/master/packages/mui-system/src/createTheme/createTheme.ts)、[responsive resolution](https://github.com/mui/material-ui/blob/master/packages/mui-system/src/breakpoints/breakpoints.ts)。沿用數值排序、query 格式與區間語意，不加入 MUI dependency。
- 目前 theme 實作於 `packages/theme/src/v3/`。`primitive/breakpoints.js` 是舊 array；`v3/index.js` 合併 v2 array／aliases，會留下舊名稱，不能沿用。
- `packages/styled-system/src/core/parser.js` 與 `src/sx.js` 直接迭代舊 array。目前 responsive array 都是 `[base, breakpoint0, breakpoint1, ...]`，不是 MUI 的 first-value-at-first-breakpoint 規則。
- React `createTheme.js` 先 deep merge 再 `resolveTheme()`；helper functions 必須依最終 options 重建，避免 closure 指向舊 values。`resolveTheme()` 與 color-mode variants 保留 enumerable functions。
- 新 breakpoint object 必須排除於 CSS variable mapping；否則目前 mapper 會把 functions、keys、unit 等當成 design tokens。CSS media-query boundary 不能使用 CSS variables。
- `fontSizes/lineHeights` 的 `2xl` 不是 breakpoint。保留 v2 定義、歷史 migration 表格、Figma snapshots 與 reviewed relations；本次會同步 PR CI 強制檢查的 source-derived tokens inventory。
- 已嘗試 JavaScript LSP，環境沒有可用 server；以限定搜尋確認 callers，不安裝工具。
- docs 的 `{render('./file')}` 已確認經 `next.config.mjs` 轉成 Demo component，`components/Demo.js` 直接 render 元件，沒有 iframe；browser spec 可用 `#main` 查詢 demo testids。
- Container queries 設計參考已讀：https://next.mui.com/material-ui/customization/container-queries/，以及本機 MUI `packages/mui-system/src/cssContainerQueries/cssContainerQueries.ts`／`.test.ts`。MUI 重用 breakpoint helpers，提供未命名與具名 container；中間區間的 not 必須轉為 `(width<...) or (width>...)`，不能只把 @media 換成 @container。此為 PR 2 的設計證據，不加入 PR 1。

## Approach

### 1. 共用 breakpoint factory 與 theme 預設值

新增 `packages/utils/src/internal/createBreakpoints.js`，由 `packages/utils/src/internal/index.js` export `createBreakpoints`，不加入 utils public barrel。repo 沒有等價 helper；放在 utils/internal 讓 theme 與 styled-system 共用，不建立兩份演算法或循環相依。

```js
createBreakpoints({ values = {}, unit = 'px', step = 5 } = {})
// => { keys, values, unit, step, up, down, between, only, not }
```

- 定義 `Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl'`；values 型別為 `Partial<Record<Breakpoint, number>>`，不是任意名稱 map。複製 values 後依數值升冪排序，keys 取排序後名稱。factory 預設空 map，保留低階 styled-system 無 theme 時不提供 responsive thresholds 的現況。設計系統的預設數字只定義於 theme primitive。
- 使用具體 JSDoc options、上述有限名稱、method signatures 與回傳形狀，不新增模糊 any typedef。values 若含五個標準名稱之外的 key，丟出 `TypeError('[Tonic UI] Unsupported breakpoint name: ' + key + '.')`，不建立替代 aliases。
- runtime methods 為 enumerable，符合現有 merge／resolution；不用 prototype、class 或 non-enumerable methods。
- options 是 object；array 或 null 丟出 `TypeError('[Tonic UI] breakpoints must be an options object.')`。`values/unit/step` 採文件定義的 numeric map／string／number 契約，不新增驗證框架或自訂 fallback。未提供 options 使用上述預設，空 values 保持空。
- `up(key: Breakpoint | number): string`、`down(key: Breakpoint | number): string`、`between(start: Breakpoint | number, end: Breakpoint | number): string`。number 是所選 unit 的寬度；具名 key 從 values 解析。此次不新增 raw CSS-length string 參數，例如 `up('40em')`；em 單位透過 unit 設定。
- `only(key: Breakpoint): string`、`not(key: Breakpoint): string` 使用排序後存在的具名 keys。所有 helpers 若傳入不存在的具名 key，丟出 `RangeError('[Tonic UI] Unknown breakpoint: ' + key + '.')`，不產生 invalid CSS；空 values 沒有合法 named-key 呼叫，numeric up/down/between 仍可使用。
- query 格式與 MUI 相同，不含 `screen` 或冒號後空格。上界差值固定由設定計算為 `step / 100`，不能把 step 預設寫成 0.05。
- `only` 非最後 key 使用 `between(key, next)`，最後 key 使用 `up(key)`。有兩個以上的 key 時，`not` 沿用 [MUI 的分支](https://github.com/mui/material-ui/blob/a55ec7da097cd9123335ed97e230b39151083ae0/packages/mui-system/src/createBreakpoints/createBreakpoints.ts#L112-L126)：第一個用 `up(next)`，不看起點是否為 0；最後一個用 `down(key)`；中間才對 `between(key, next)` 加上 `@media not all and`。因此 `not(first)` 不是任意自訂 scale 下 `only(first)` 的嚴格補集。
- 單一 key 沒有 next：Tonic 已支援子集合，明定 `only(key) = up(key)`、`not(key) = down(key)`，不呼叫 `up(undefined)`。空集合依前述 unknown-key 規則處理。

預設契約的精確輸出：

| 呼叫 | 輸出 |
| --- | --- |
| `up('xs')` | `@media (min-width:0px)` |
| `up('md')` | `@media (min-width:900px)` |
| `down('md')` | `@media (max-width:899.95px)` |
| `down('xs')` | `@media (max-width:-0.05px)` |
| `between('sm', 'lg')` | `@media (min-width:600px) and (max-width:1199.95px)` |
| `only('md')` | `@media (min-width:900px) and (max-width:1199.95px)` |
| `only('xl')` | `@media (min-width:1536px)` |
| `not('md')` | `@media not all and (min-width:900px) and (max-width:1199.95px)` |
| `not('xs')` | `@media (min-width:600px)` |
| `not('xl')` | `@media (max-width:1535.95px)` |

將 `packages/theme/src/v3/primitive/breakpoints.js` 改為純 numeric map：

```js
export const breakpoints = { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536 };
```

`packages/theme/src/v3/index.js` 用 `createBreakpoints({ values: primitiveTokens.breakpoints })` 取代整段 breakpoint merge IIFE，刪除舊 array-copy comments／fallback。每個 theme 有獨立 values/keys；`createTheme('px')`、`createTheme('rem')` 的 breakpoint unit 都預設 px，不隨字級單位變動。不改 v2 定義。
移除該 factory 的 JSDoc `@returns {Object}`（讓 declaration 推論 output），使用 `@param {'px'|'rem'} [unit='rem']`；`packages/theme/src/createTheme.js` 同樣保留推論回傳，不覆蓋成 opaque `Object`。公開 `breakpoints` 應推論為 `ReturnType<typeof createBreakpoints>`。

`packages/theme` 新增對 `@tonic-ui/utils` 的直接依賴；同步受影響的 manifests 與 `yarn.lock`。此處不能沿用舊 utils 的最低版本：它未匯出 `createBreakpoints`。開發時使用本地 workspace，不安裝或發布套件。
發布驗收：依實際 release plan 核對待發布 tarball 的 `package.json`，不是只看 workspace build。theme、styled-system、react 的 utils 下限須包含新 helper；react 對 theme、react-base、styled-system，以及 react-base 對 styled-system 的下限須排除舊 array 契約的組合。以各允許下限的打包產物、無 Jest mappings 或 workspace symlink 的 consumer 驗證：預設 theme 的 `up('sm')` 回傳 600px query，Box 的 responsive array 在此門檻套用正確樣式。版本號由 release plan 決定，不在此預填或發版。
反方向也是發布阻擋條件：以已發布且仍使用 array 的 React、react-base 及其相依套件 manifests 配對實際候選版本，依套件管理器的 semver 規則檢查所有能形成「舊 renderer＋新 theme」或「新 renderer＋舊 theme」的解析路徑。舊 parser 會對新物件呼叫 `.map()`；調高新 manifest 的下限不能改寫舊 manifest。若任一不相容組合仍可解析，停止發布並另選舊範圍不接受的候選版本，再重驗雙向矩陣；不靠同步發布、清 lockfile 或新增 array shim。

沿用現有 Changesets 發布流程，由 release PR 產生實際候選版本；不在功能分支預填版本。驗收涵蓋 React → react-icons → react-base → styled-system 的間接 renderer 路徑，以及最低版本 tarball 渲染 Box 與 SVGIcon 的 600px 樣式。已發布的 `^3.0.0-alpha.1` 仍可解析後續 `3.0.0-alpha.*` 與穩定的 `3.x`；若預設流程產出的候選落在該範圍內，不得視為通過雙向相容性驗收。
Jest source mappings 的確切設定：`"^@tonic-ui/utils/internal$": "<rootDir>/../utils/src/internal/index.js"`、`"^@tonic-ui/utils$": "<rootDir>/../utils/src/index.js"`。


### 2. React theme 正規化與 CSS variables

`packages/react/src/theme/createTheme.js` 從現有 `@tonic-ui/utils/internal` 匯入 factory。其他 scales 保留現有 `merge()`；breakpoint options 獨立收集：由 `tonicTheme.breakpoints` 的 values/unit/step 起始，依序套用第一參數與所有後續 arguments 的 breakpoints。

- 只覆寫有提供且非 undefined 的 options。
- supplied values 整組取代前一組，不 deep-merge names；例如 `{ xs: 0, md: 1000 }` 不殘留 sm/lg/xl。空 map 不回填預設。不在實作或文件額外建立替代斷點名稱。
- unit、step 沿用最近提供值；未覆寫維持 px／5。
- 接受已產生的 runtime object 作為輸入，但忽略其 keys/methods，從 values/unit/step 重建；不可沿用舊 closure。
- 任何明確提供的 breakpoints input，在讀取／合併 options 前先套用第1節的 object-only 檢查，避免 array/null 被正規化流程悄悄忽略。
- 在 `resolveTheme(theme)` 前設 `theme.breakpoints = createBreakpoints(finalOptions)`，讓 `useTheme()` 的 light/dark variants 都有可用 helpers。
- factory 複製並凍結排序後的 `values`、`keys` 和 runtime 物件；helpers 只讀這份快照。不凍結呼叫者的 options 或整個 theme。standalone theme 的 `breakpoints` 屬性也設為 enumerable、不可替換。
- React 組裝時保留這份快照供 token references 解析。`resolveTheme()` 會重建 plain objects 並預建兩個 mode，不能假設凍結狀態會傳下去。回傳前在 resolved base、`toColorMode('light')`、`toColorMode('dark')` 上，用唯讀 enumerable 屬性掛回同一份快照，取代 resolver 的可寫副本。公開型別將 `breakpoints`、`values`、`keys`、`unit`、`step` 標為 readonly；更改設定一律建立新 theme。
- 不改通用 merge、clone 或 resolveTheme。

在 `packages/react/src/theme/utils/css-vars.js` 的 `mapThemeToCSSVariables` 排除 top-level breakpoints，其他 scales 的輸出保持不變。不產生任何 `--tonic-breakpoints-*` variables。

在 React `createTheme.js` 和 `useTheme.js` 保留現有 theme 簽名的其他部分，兩者的回傳型別均加上 `{ readonly breakpoints: ReturnType<typeof createBreakpoints> }`；以 `typeof import('@tonic-ui/utils/internal').createBreakpoints` 取得型別（不為 `useTheme` 新增 runtime import）。唯讀限制只用於回傳的 theme，不加在輸入 options 上。React `createTheme` 第一參數型別為 `CreateThemeOptions & ThemeScales & { breakpoints?: Parameters<typeof createBreakpoints>[0] }`，後續 arguments 每個為 `ThemeScales & { breakpoints?: Parameters<typeof createBreakpoints>[0] }`。不重寫全域 `ThemeScales`。輸入 options、輸出 runtime helpers、已建立的 theme 傳回 `createTheme` 三者都須型別相容。

在 `packages/react-base/src/box/index.js` 的 `sx` callbacks（含陣列項與 property callback）把 `breakpoints` 宣告為 optional，存在時型別同 factory 回傳值。Box 可以單獨使用；不能從 JSX 推論上層有 `TonicProvider`，也不為無 provider 的 callback 注入預設斷點。文件在 provider 內用 `useTheme()` 取得必有 helpers 的 theme；可獨立渲染的 callback 則先判斷 `theme.breakpoints`。`TonicProvider` 與 `ThemeProvider` 的 `theme` prop 只接受合法 raw options 或已建立的 theme，不用寬鬆的 `ThemeScales` 聯集，不改 provider runtime 分支。

### 3. Responsive renderer object-only 遷移

`packages/styled-system/src/core/parser.js` 與 `src/sx.js` 以 module-level `createBreakpoints()` 空 runtime object 當無 theme fallback。`sx.js` 移除對 breakpoint scale 的 ensureArray。Parser 在有 responsive 值的每次 parse 讀目前 `props.theme.breakpoints`，不要讓第一個 provider 決定其他 provider 的 CSS。保留單槽 `cache.breakpoints/cache.media`，只有 scale reference 相同才重用 media list；更換 reference 時重建。`disableStyledSystemCache` 為 true 時使用該次呼叫的 local media list，不讀寫 cache；無 responsive 值不建立 list。

- media list 為 `[null, ...breakpoints.keys.map(key => breakpoints.up(key))]`。default responsive array 的位置為 `[base, xs, sm, md, lg, xl]`；多餘值照現有規則截斷，null/undefined 跳過。
- responsive object 的 `_` 是 unconditional base；values 中存在的 key 使用 up(key)，以 property existence 判斷，不能因 xs=0 而當作不存在。
- 未知 responsive object key 忽略，不再退化成 unconditional base，避免已移除 2xl 或拼錯 key 意外套到所有尺寸。舊 numeric object-key fixtures 改具名 keys，不保留 array-index alias。
- Parser 合併完 declarations 後，base properties 在前，已產生的 queries 按當前 runtime sorted `keys` 對應的 media list 輸出。刪除舊 `sortObject` 的 localeCompare sorting：例如 `10.125em` 必須在 `10.5em` 前，不能比較 query strings。陣列和具名物件同時出現也使用同一順序；同一 query 保留現有 per-declaration merge。其他 pseudo 與 `sx` composition 行為不變。
- 五個 helper 的 computed keys 可直接當作 sx／__sx nested media rules。不要新增 root wrapper；不要順便擴增目前 sx 尚未提供的 property-level named responsive-object API。
- `sx.js` 展開 responsive array 時，若與明確的 `[theme.breakpoints.up('sm')]` 命中同一 query，按作者順序逐項合併，不可覆蓋整個規則，也不可修改傳入的 `sx` 物件。`sx.test.js` 用 `width: [null, null, '50%']` 與明確規則 `{ color: 'red' }` 測兩種順序：同一 rule 一律同時保留寬 50% 和紅色。再讓明確規則也設定 `width: '75%'`：明確規則在後時寬 75%，array 在後時寬 50%。這是 Tonic 的保證；[MUI `styleFunctionSx`](https://github.com/mui/material-ui/blob/a55ec7da097cd9123335ed97e230b39151083ae0/packages/mui-system/src/styleFunctionSx/styleFunctionSx.ts) 對明確 nested key 直接賦值，不是兩種順序的驗收依據。
- `sx({...})` 和 `sx([...])` 都將陣列實際產生的 query（含與明寫規則合併的 query）按斷點升冪排列。只替換這些 query 的位置；沒有與陣列合併的明寫規則保持原位置。不同 query 重疊時，不拆分宣告來同時維護兩種順序，也不自動提高 selector specificity。刻意需要較高優先權時，由作者用 `&&` 明示，只包要覆寫的屬性；用 Chromium 在 599px 和 600px 驗證一般規則及覆寫的寬度與顏色。

遷移 custom test fixtures：

- `packages/styled-system/src/core/__tests__/parser.test.js`、`system.test.js`。
- `packages/styled-system/src/config/__tests__/{layout,margin,padding,outline}.test.js`。
- `packages/styled-system/src/__tests__/sx.test.js`。
- `packages/react-base/src/box/__tests__/Box.test.js`。

fixtures 使用 `createBreakpoints({ values: { sm: 40, md: 52, lg: 64 }, unit: 'em' })` 等原測試數值，不硬改成 design-system defaults。既有 small/medium direct maps 改成 sm/md 與 numeric values，加 unit，style value keys 一併改名。`parser.test.js` 改為交替送入 40/52/64、11/22/33，再回原 theme，驗證 query widths 跟隨 theme；`disableStyledSystemCache` 測試確認 opt-out 的 7/8/9 不污染後續 40/52/64。`system.test.js` 把排序案例改為含 `sm: 10.125, md: 10.5`，以逆序 named props 驗證兩個 query keys 真實升冪，原非 media declarations 不變。預期生成 query 改為 MUI 格式；raw CSS-selector 測試明確字串不改。刪除 fixture 中舊 breakpoint CSS variables。
`packages/react-base` 直接宣告對 utils 的依賴，供測試與 Box 的型別使用。若打包後的 `.d.ts` 引用 `@tonic-ui/utils/internal`，該依賴必須隨發布產物提供，且下限包含 `createBreakpoints`。Jest 使用第 1 節的 utils source mappings；同步 workspace lockfile，不使用 fake helper 或跨 package 私有相對路徑。


有限 caller 搜尋：`rtk rg -n 'breakpoints|defaultBreakpoints|tonic-breakpoints' packages/styled-system/src packages/react-base/src packages/theme/src packages/react/src/theme`；逐一 reread 後修改，v2 歷史定義除外。

### 4. 實際消費端與文件範例

更新現有 `packages/react-docs/pages/theme/breakpoints/index.page.mdx`（URL `/theme/breakpoints/`），不建立重複頁面。`## Default breakpoints` 列五個名稱／數值及 `createTheme()` 範例；`## CSS media queries` 展示五個 helpers；`## Customizing breakpoints` 說明標準名稱的 values 與 unit/step；`## API` 按五個 `### theme.breakpoints.<method>` 列參數型別、數字支援、精確 query、邊界及首／末／單一 key 的行為。說明 `step/100` 是 MUI 近似排他上界的慣例，不是 CSS 要求，可能留下 subpixel 間隙。保留 primitive tokens 與 Examples；在 `TonicProvider` 的子元件用 `const { breakpoints } = useTheme()` 與 `<Box sx={{ backgroundColor: 'blue', [breakpoints.not('md')]: { backgroundColor: 'red' } }} />`，不加 root 樣式層、不重傳預設 values，不在 Phase 1 文件宣稱 containerQueries 已可用。

- `packages/react-docs/components/ThemeTokens.js` 的 getTokenData('primitive') 改為 `breakpoints: primitiveBreakpoints`，展示純 numeric map，不展示 runtime metadata/functions。
- 原 `pages/theme/breakpoints/breakpoints.js` 改為五段 xs/sm/md/lg/xl；fontSize/lineHeight 使用對應 xs～xl tokens；display 以 `_` 設定 base 再用相鄰斷點隱藏。五段文字依序為 `Extra small text`、`Small text`、`Medium text`、`Large text`、`Extra large text`，標示 0/600/900/1200/1536px。各段加 `data-testid="breakpoint-range-xs"` 等穩定 selector。
- 新增 `pages/theme/breakpoints/media-queries.js`，並在同頁現有 Examples 區塊 render。用 Box/useTheme 展示五個 helper，五個具可見 query 名稱的 Box 預設 display:none，query 成立則 block。id/query 依序為 `up-sm`/up('sm')、`down-sm`/down('sm')、`only-md`/only('md')、`not-md`/not('md')、`between-sm-md`/between('sm','md')；各自 `data-testid="breakpoint-${id}"`。這是可操作範例，不是隱藏測試 UI。
- `pages/styled-system/responsive-values/index.page.mdx` 改表格與 generated CSS 為新 thresholds，明確說明 array base-first（含 xs=0）。array 範例使用 `[null, '25%', '50%', '75%', '100%', '100%']`，對應 xs/sm/md/lg/xl，避免 index0 的值在0px立刻被覆寫而誤導讀者；object 範例保留 `_` 作 base，改正其文字與 thresholds。
- `pages/getting-started/the-sx-prop/using-media-queries.js` 在 provider 內用 `useTheme()` 與 up('sm')／up('md')／up('lg') 產生 `sx` keys，保留原字級值。不改 raw useMediaQuery hook 或其 demo。
- `pages/index.page.js` 的 maxWidth 改 `{ md: '1024px', lg: '1280px', xl: '1680px' }`，保留三個既有 width 值並移除2xl key。Grid templateColumns 改 `{ _: '1fr', xl: '1fr 1fr' }`；flexDirection 保留 `_`/xl，更新註解為1536px。
- `pages/getting-started/usage/components/FormulaOne.js` 保留大版面字級切換：把原本 index 3 的 responsive typography 改成具名 style props `{ _: 原 base 值, lg: 原大版面值 }`，行高使用 `lineHeight`。在 responsive-values 文件附上遷移例：原本 index 3 代表 `lg`，現在代表 `md`；維持 `lg` 語意應改用具名 key。不同於 [MUI `iterateBreakpoints`](https://github.com/mui/material-ui/blob/a55ec7da097cd9123335ed97e230b39151083ae0/packages/mui-system/src/breakpoints/breakpoints.ts)，Tonic 的 index 0 仍是 unconditional base。驗收此 demo 在 1199px 顯示 base 字級，1200px 才使用大版面字級。

修正 docs shell 使用 sm 作「所有尺寸 base」的地方：

- `pages/_app.page.js` 的 getSidebarStyleProps/getMainStyleProps：僅將每個 responsive object 的 sm base key 改 `_`，保留 lg overrides。將 DocsPage 的 useTheme 移至 useMediaQuery 前，sidebar hook query 改 `theme.breakpoints.up('lg').replace(/^@media\s*/, '')`，保持與1200px CSS layout同步。
- `components/Header.js` 加 useTheme，isSmallScreen 改 `theme.breakpoints.down('md').replace(/^@media\s*/, '')`。現有 display／search width 的 sm base keys 改 `_`；md/lg 保留。
- `components/SearchButton.js` 的 minWidth/display，以及 `components/Sidebar.js` 的 pt/display，sm base keys 改 `_`。
- `public/styles/app.css` 的 main 區塊 min-width1440改1200，配合新 lg。這個靜態 CSS 使用實際數字，不引入無法在 media queries 使用的 CSS variable。

不修改歷史 migration 表格、v2 token 定義、不相關固定像素尺寸。不要將字級值 `2xl` 當成 breakpoint key 刪除。

### 5. 消費者可觀察的回歸測試

新增 `packages/utils/src/internal/__tests__/createBreakpoints.test.js`：

- 使用完整預設 numeric map 檢查本計畫精確輸出表；含 numeric `down(500)` →499.95px、`between(600,800)` →600..799.95px，以及標準 key 的 values sorting。
- 使用標準名稱 `{ xs:0, sm:40, lg:80 }`、unit='em'、step=10：down('sm') → `@media (max-width:39.9em)`；only('sm') 上界79.9em。這只是隔離測試 unit/step 的 fixture，不建立另一套產品斷點命名。
- 單一標準 key `{ lg:600 }` 的 not('lg') →599.95px；array/null options 拋出約定 TypeError。非標準名稱的 values key 拋出 Unsupported breakpoint name TypeError；helper 不存在的 key 拋出 Unknown breakpoint RangeError，驗證不會加入其他命名或生成 invalid CSS。
- 非零首項 `{ sm:600, md:900 }`：`not('sm')` 必須等於 `up('md')`，精確輸出 `@media (min-width:900px)`；500px 不匹配，900px 匹配。

更新 theme 現有 createTheme.test.js 的兩處 breakpoint assertions，覆蓋 px/rem、完整 values/keys、unit='px'/step=5，且沒有 numeric index、直接 alias 或 2xl。對 standalone、React base、light、dark 的公開物件驗收：嘗試改寫 `values.md`、修改 `keys`、替換 `breakpoints` 均不能改變門檻；`values.md` 與 `up('md')` 維持 900px 對應，mode 的 `get('breakpoints.values.md')` 維持 900。以 `createTheme(existingTheme, overrides)` 另建 1000px theme 才會得到新的 query；舊 theme 不變。改動原始輸入 map 也不得改變任一既有 theme。
`packages/theme/src/__tests__/index.test.js` 的 default-export 測試目前以整個 theme 深比較；新 factory 每次建立新的 functions，不能比較 function identity。將兩邊解構成 breakpoints 與其他 tokens，其他 tokens 仍完整 toEqual；breakpoints 比較 values/keys/unit/step，並比較 up('md') 的實際輸出。不修改既有 public export 名單，因為 factory 只從 utils/internal export。


React `src/theme/__tests__/createTheme.test.js` 新增：

- default/custom config 產生正確 helpers。
- values override 整組替換且排序；用標準名稱的子集合 `{ lg:1280, xs:0, sm:640 }`，確認不殘留 md/xl。
- `createTheme(existingTheme, { breakpoints: { values: { xs:0, lg:1000 }, step:10 } })` 的 down('lg') 為999.9px，原 theme 不變，證明重建 closure 與保留 unit/step。
- empty values 不回填；舊 array/null options 拒絕；cssVariables 無任何 --tonic-breakpoints 開頭 key，其他例如 --tonic-space-1x 繼續存在。
- 用現有 render helper 的 default provider，render `<Box display={['block', 'inline', 'flex', 'grid', 'inline-block', 'none']} />`，檢查 base='block'，0px='inline'、600px='flex'、900px='grid'、1200px='inline-block'、1536px='none' 六個 CSS rules。另 render 文件的 blue/red `not('md')` 範例，驗證 base 為 blue、not-md media rule 為 red。custom theme 使用明確 TonicProvider wrapper。另用無 provider 的 `renderToString` 驗證普通 Box 的文字和基礎樣式正常；有 guard 的 callback 看到 `breakpoints` 缺省，只輸出 base 樣式，不產生 media rule。

`src/theme/__tests__/useTheme.test.js` 利用現有 createWrapper(colorMode, themeOverrides)，對 light/dark 使用標準名稱 fixture `{ values: { xs:0, sm:40, lg:80 }, unit:'em', step:10 }`。驗證 up('sm')=40em、down('sm')=39.9em、only('sm')=40..79.9em、not('sm')=該 only query 的 `not all and` 形式、between('xs','lg')=0..79.9em。這涵蓋 resolveTheme/color-mode 傳遞，不另加只測 function identity 的 wiring test。

styled-system 的 core parser/system 測試加入 xs=0 是 media query、object keys 亂序輸入仍正確排序、未知／2xl key 不成為 base；sx 測試加入 array null skip、0px 與 custom unit 的 array 解譯，以及 helper computed nested media key。既有 named/numeric fixtures 依第3節遷移，不把 nested selector sx 測試改成尚未支援的 property-level named responsive object。

### 6. 讓 source-derived token inventory 隨新契約更新

`plugins/tonic-ui-tokens/scripts/lib/source-theme.mjs` 的 `localRequire` 現在把 `@tonic-ui/utils/internal` 硬指向 `toCSSVariable.js`。改為 source-load `packages/utils/src/internal/index.js`，使用同一 loader 解析 barrel 內的相對 imports，讓 `createBreakpoints` 和其源檔 fingerprint 可用；不得讀取 dist 或依賴 build 順序。

在該檔 `buildTokenInventory()` 將 `collectTokens()` 的輸入投影成只包括 breakpoint numeric values：px/rem runtime 的 `breakpoints` 分別替換為 `{ values: theme.breakpoints.values }`，primitive token input 的 `breakpoints` 替換為 `{ values: primitive.breakpoints }`；其他 scales 不變。`resolveTheme()` 仍用未投影 runtime theme，確保 `theme.get('breakpoints.values.sm')` 能解析回 600。Inventory 只包含五個 `breakpoints.values.{xs,sm,md,lg,xl}` 路徑，kind=`primitive`、numeric value、cssVariable=`null`。不收錄 `keys`、`unit`、`step` 或 helpers，也不保留舊 `breakpoints.sm` 等 aliases。

在 `plugins/tonic-ui-tokens/scripts/__tests__/token-inventory.test.mjs` 的「generated inventory round-trips」與「unchanged inventory preserves provenance」更新查找／stale-mutation 路徑到 `breakpoints.values.sm`，預期為 `600`；保留查到真正 px/rem 的語意。新增斷言：「breakpoints.」子集合正好是五個值，沒有 runtime metadata、aliases 或 CSS vars。其餘 token tests 不重寫。

依已授權範圍執行 `rtk node plugins/tonic-ui-tokens/scripts/generate-token-inventory.mjs`，不要手改 `assets/tokens.json`；從 Phase 1 的 base 版本只遞增 `plugins/tonic-ui-tokens/.claude-plugin/plugin.json` 的 patch，再執行 `rtk node scripts/plugins/sync-plugin-marketplace-metadata.mjs --write`。不使用 release updater、不發版、不動 Figma snapshots 或 relation ledger。CI 檢查來源路徑與 hashes；不以延後至 release 或調弱 gate 取代同步。

### 7. 驗證公開宣告

在 `packages/react/src/theme/__tests__/createTheme.test-d.tsx` 的既有使用案例上增加：`const query: string = createTheme().breakpoints.only('md')`，以及 `createTheme({ breakpoints: { values: { xs: 0, sm: 40 }, unit: 'em', step: 10 } })` 的有效呼叫。使用 `@ts-expect-error` 確認 `createTheme({ breakpoints: { values: { tablet: 640 } } })`、`createTheme({ breakpoints: ['600px'] })`、`.up('2xl')` 與 `.only(600)` 被拒絕。在 `useTheme.test-d.tsx` 的既有 hook fixture 加正向 `.between('sm', 1000)`／`string` 及負向 `.not('mobile')`。不要靠 `as any` 讓正向測試通過。

在 `createTheme.test-d.tsx` 令 `theme = createTheme()`，在 `useTheme.test-d.tsx` 的 hook fixture 令 `theme = useTheme()`；兩處都用 `@ts-expect-error` 驗證 `theme.breakpoints = createTheme().breakpoints` 被拒絕。右側是合法的斷點物件，測的是整個欄位不可替換，不是值的型別不符；保留下方針對 `values.md` 的獨立測試。

在 `packages/react/src/box/__tests__/Box.test-d.tsx` 驗證 `<Box sx={({ breakpoints }) => breakpoints ? { [breakpoints.up('sm')]: { display: 'block' } } : { display: 'block' }} />`。嚴格型別檢查應拒絕未判空的呼叫、判空後的 `.up('mobile')` 及寫入 `createTheme().breakpoints.values.md`。兩個 provider 各自的 `.test-d.tsx` 均接受合法的 raw breakpoint options 與 `createTheme()`，並以 `@ts-expect-error` 拒絕 `{ breakpoints: ['600px'] }`。

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

在同一次 page 載入後，依序 setViewportSize（height900），用 `#main` 內的 testids 驗證下列 helper visibility；visible 用 toBeVisible，其他用 toBeHidden，不用 sleeps／mock matchMedia：

| Width | up-sm | down-sm | only-md | not-md | between-sm-md | 唯一可見 range |
| ---: | --- | --- | --- | --- | --- | --- |
| 200 | 否 | 是 | 否 | 是 | 否 | xs |
| 599 | 否 | 是 | 否 | 是 | 否 | xs |
| 600 | 是 | 否 | 否 | 是 | 是 | sm |
| 899 | 是 | 否 | 否 | 是 | 是 | sm |
| 900 | 是 | 否 | 是 | 否 | 否 | md |
| 1199 | 是 | 否 | 是 | 否 | 否 | md |
| 1200 | 是 | 否 | 否 | 是 | 否 | lg |
| 1535 | 是 | 否 | 否 | 是 | 否 | lg |
| 1536 | 是 | 否 | 否 | 是 | 否 | xl |

在900與1200各加入一次 root `test/e2e/screenshots.mjs` 的 captureColorModes，scenario='breakpoints'，case 分別 'helpers-900'/'helpers-1200'。prepare(colorMode) 透過實際 `[title="Toggle color mode"]` 控制切換並等待 html[data-color-scheme] 符合，設定 viewport、將 demo 捲入可見範圍並確認當前 range/helper 狀態。不得用 script 注入樣式或改 application state；不得直接 page.screenshot。

```bash
E2E_SCREENSHOTS=1 rtk yarn test:e2e docs:pages --project theme/breakpoints
```

runner 自行啟動 Next.js docs server（預設3129，衝突時設 E2E_PAGES_PORT 為空閒 port）。完成後讀取 `packages/react-docs/.e2e/screenshots/breakpoints/helpers-900/screenshot.light.png` 及 `helpers-1200/screenshot.dark.png`，確認範例可見、窄螢幕 header/sidebar 無遮擋、文字與狀態符合測試。此為 actual surface proof，不以只測 helper 字串取代。

## Assumptions & contingencies

- 公開斷點名稱僅 xs/sm/md/lg/xl；應用程式無須提供 values。object-only 與 values/unit/step 設定介面保留。responsive array base-first 保留現有 Tonic 語意，文件明示與 MUI array 語意不同。
- runtime 公開 step，以便再次 createTheme 保留設定；不複製 MUI 私有 internal_mediaKeys。
- refs 的 MUI 原始碼僅用作設計參考，不修改該 repo，不引入或安裝 MUI。
- 若現有 dependency builds 缺失，以已列 build-public 補齊；若依賴或 Chromium 本身未安裝，完成可達的 source/unit 工作並報告缺少的前提，不自行安裝。
