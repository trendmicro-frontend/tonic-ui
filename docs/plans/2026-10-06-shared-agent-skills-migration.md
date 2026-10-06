# Shared Agent Skills Migration Plan

**狀態：** repository 遷移已實作；靜態檢查及 OMP／Codex smoke 已通過。Claude Code 執行器不可用，因此三工具完整驗收仍待完成。驗證結果見第 11 節。

**目標：** 以 `.agents/skills/` 為唯一技能來源，以 OMP 為主要使用者，同時支援 Claude Code 與 Codex。保留根目錄 `AGENTS.md` 作為三者共用的常駐政策入口。

**設計決定：** 共用知識使用 Agent Skills 標準；探索入口使用各工具原生機制。不要將 OMP 執行器功能複製到共用技能，也不要建立三份技能內容。

## 1. 範圍與非目標

### 本次實作範圍

- 遷移目前 `.claude/skills/` 的五個技能及其附屬資源。
- 調整 frontmatter、觸發描述、文件分層與可攜路徑。
- 修正技能中與目前根目錄 `AGENTS.md` 衝突的 PR／changeset 規則。
- 在根目錄 `AGENTS.md` 補上技能選用指引，保留既有強制政策。
- 建立 Claude Code 的相對 symlink 入口。
- 以實際 OMP、Claude Code、Codex 工作階段驗證探索與技能使用。
- 更新 `CONTRIBUTING.md`，只說明工具中立的維護方式；工具差異與 smoke 方法保留在本計畫（依實作期間的使用者指示調整）。

### 不在本次範圍

- 不變更應用程式、套件 API、建置或發布流程。
- 不修改個人設定、全域技能、憑證、MCP 設定或 provider 權限。
- 不移動 `~/.omp/agent/AGENTS.md`，也不將其中的個人規則直接納入 repository。
- 不建立 `.omp/skills/` 或 `.codex/skills/` 的副本。
- 不新增 plugin、hook、自訂工具或跨工具安裝器。
- 本次沒有發布套件變更，不建立 changeset。使用者已要求建立 `docs/shared-agent-skills` 分支，並將本計畫與實作一起 commit；不因而自行 push 或開 PR。
- 不修改既有歷史計畫中的技能名稱；它們是歷史紀錄，不是目前探索入口。

## 2. 已確認的現況

| 技能 | 現況 | 必要處理 |
| --- | --- | --- |
| `tonic-ui-patterns` | 有 `name`、`description`；自訂 metadata 在頂層；正文約 216 行 | 將自訂欄位移入 `metadata`，補清楚觸發範圍，修正過時 PR／changeset 規則 |
| `tonic-ui-pr` | 有標準必要欄位；約 309 行 | 移除指定 Bash 呼叫方式的執行器假設；修正 changeset 時序及檔名範例 |
| `tonic-ui-slots` | description 約 865 字元；約 481 行 | 保留技術語意；將詳細 API 與遷移範例分到 references |
| `tonic-ui-sx` | description 約 1,249 字元，超過標準 1,024 字元上限；約 462 行 | 縮短 description；分離詳細範例；保留並修正既有 evals 的技能／套件名稱 |
| `tonic-ui-types` | 有標準必要欄位；約 180 行 | 保留主要流程；檢查路徑及執行器假設 |

其他已確認事項：

- 根目錄 `AGENTS.md` 規定：使用 dedicated branch、PR base 為 `main`、changeset 必須在 PR 存在後建立，檔名為 `.changeset/tonic-ui-pr-<PR_NUMBER>.md`。
- patterns 目前仍寫 base branch `v2`，並示範未取得 PR number 即建立任意 changeset 檔名。
- PR skill 目前示範多份 changeset 的字母／描述性 suffix，與根目錄規定的精確檔名不一致。
- sx 的 `evals/evals.json` 目前使用 `agentic-ui-sx` 與 `@agentic-ui/react`，不是本 repository 的名稱。
- `.gitignore` 未排除 `.agents/`；不需要為此擴大 ignore 規則。

## 3. 目標目錄

```text
repo/
├── AGENTS.md                         # 共用常駐政策與技能選用指引
├── .agents/
│   └── skills/                       # 唯一可編輯的技能來源
│       ├── tonic-ui-patterns/
│       │   └── SKILL.md
│       ├── tonic-ui-pr/
│       │   └── SKILL.md
│       ├── tonic-ui-slots/
│       │   ├── SKILL.md
│       │   └── references/
│       │       ├── api.md
│       │       └── migration.md
│       ├── tonic-ui-sx/
│       │   ├── SKILL.md
│       │   ├── references/
│       │   │   └── composition-and-verification.md
│       │   └── evals/
│       │       └── evals.json
│       └── tonic-ui-types/
│           └── SKILL.md
├── .claude/
│   └── skills/
│       ├── tonic-ui-patterns -> ../../.agents/skills/tonic-ui-patterns
│       ├── tonic-ui-pr       -> ../../.agents/skills/tonic-ui-pr
│       ├── tonic-ui-slots    -> ../../.agents/skills/tonic-ui-slots
│       ├── tonic-ui-sx       -> ../../.agents/skills/tonic-ui-sx
│       └── tonic-ui-types    -> ../../.agents/skills/tonic-ui-types
└── CONTRIBUTING.md                   # 技能維護與驗證方法
```

保留 `.claude/skills/` 為實體目錄，只將五個技能子目錄替換為相對 symlink。相對目標從 symlink 所在的 `.claude/skills/` 計算，不使用個人絕對路徑。

不新增 `.agents/AGENTS.md`、`.omp/AGENTS.md`、`.claude/CLAUDE.md` 或 `CLAUDE.md` 的政策副本。它們可能在 OMP 同一層的探索優先序中遮蔽根目錄政策。若實際安裝版本需要額外入口，先記錄版本與失敗證據，再調整計畫，不能默默複製規則。

## 4. 三個執行器的契約

| 執行器 | 常駐規則 | 技能來源 | 明確使用技能 |
| --- | --- | --- | --- |
| OMP（主力） | 根目錄 `AGENTS.md`；個人 native 規則保持原樣 | `agents` provider 探索 `.agents/skills/`；Claude symlink 可能同時被探索 | `read skill://tonic-ui-sx`；若啟用 skill commands，可用 `/skill:tonic-ui-sx` |
| Claude Code | 根目錄 `AGENTS.md`，依使用者目前已支援的版本驗證 | `.claude/skills/<name>/SKILL.md`，經 symlink 讀取共用來源 | `/tonic-ui-sx` |
| Codex | 根目錄 `AGENTS.md` | 從 CWD 向上至 repository root 的 `.agents/skills/` | `$tonic-ui-sx` 或 `/skills` 選取 |

### OMP 優先的必要注意事項

- OMP 的 `agents` provider 支援 `.agents/skills/`，且不依賴 Claude／Codex 技能來源開關。
- OMP 也會探索 Claude project skills。相同檔案會按 realpath 去重，因此 symlink 不應產生另一份技能。
- Claude provider 優先序高於 agents provider；正常列出的來源 provider 可能是 Claude。驗收應檢查實體檔案及唯一技能，不要求來源標籤一定是 agents。
- 額外做一個隔離工作階段：暫時不使用 Claude project skills，仍須探索到五個 `.agents/skills/` 技能。只使用該測試工作階段的設定覆蓋，不寫入使用者或專案設定。
- 不為了去重停用整個 Claude／Codex provider；這會連帶影響其他能力，超出範圍。
- 不使用 `alwaysApply`、`globs`、`hide` 等 OMP 擴充來承載三工具共用的必要行為。

## 5. 共用內容規則

### AGENTS.md 與 skills 的責任

`AGENTS.md` 保留所有任務必須遵守的政策。Skill 保存特定任務的方法、範例與檢查清單。不能只把禁止 commit／push、PR 時序或 changeset 命名放進按需載入的 skill。

根目錄新增簡短的技能對照表：

- 元件慣例與 repository 結構：`tonic-ui-patterns`。
- PR 描述、commit message 草稿與 changeset：`tonic-ui-pr`。
- `slots`、`slotProps`、`useSlot` 或 legacy prop 遷移：`tonic-ui-slots`。
- `sx`、`__sx`、`composeSx`、樣式優先序：`tonic-ui-sx`。
- React 元件 JSDoc／props 型別：`tonic-ui-types`。

指示執行器在對應任務開始前載入相關技能；同一任務可使用多個技能。這段指引使用技能名稱及 `.agents/skills/<name>/SKILL.md` 路徑，不依賴 `skill://` 或 slash command。

### Frontmatter

- 每個 skill 都有明確的 `name` 與 `description`。
- `name` 與父目錄一致，符合標準命名，長度不超過 64 字元。
- `description` 為非空字串，長度不超過 1,024 字元；最重要的觸發條件放在前面。
- patterns 的 `version`、`source`、`analyzed_commits` 放入 `metadata`，值改為字串。
- 不新增 Claude 專用 `context`、`agent`、`model` 或 `$ARGUMENTS`。
- 不把實驗性的 `allowed-tools` 當作跨工具權限保證。
- 本次不需要 `agents/openai.yaml`；未來若需要 Codex 專屬 UI 或 invocation policy，再另行處理。

### 路徑、工具與內容分層

- 共用正文中的 skill 資源使用 skill root 相對路徑，例如 `references/api.md`。
- 明確區分 skill 內部路徑與 repository root 相對路徑，避免从不同 CWD 執行時定位錯誤。
- 不使用 `@path` 匯入、個人絕對路徑、OMP internal URI 或 Claude 動態 shell 注入作為共用正文的必要機制。
- 描述需要取得的證據，不指定必須有幾個 Bash tool calls。由執行器使用其支援的工具完成。
- RTK、LSP、特殊工具及 provider 安全規則由主機指示處理。不要以通用 skill 覆蓋它們。
- 不新增自動下載、安裝或外部寫入步驟。
- `SKILL.md` 保留核心決策、必要不變條件、工作步驟及何時讀取 references；詳細範例按需載入。
- 每份 `SKILL.md` 少於 500 行，正文以少於 5,000 tokens 為建議目標；行數不是 tokens 的替代指標。
- references 直接由 `SKILL.md` 連結，不建立多層引用鏈。

## 6. 實作順序

### Phase A：建立遷移清單

- [x] 記錄五個技能及所有附屬檔案；保留 sx 的既有 evals。
- [x] 檢查五個技能全文的 frontmatter、路徑、工具假設與政策衝突。
- [x] 記錄 OMP／Codex 版本及 Claude Code 不可用的前提；沒有安裝或升級軟體。
- [x] 檢查實際探索結果及 root 政策：五個技能沒有不同內容的同名版本，OMP／Codex 均載入 root PR 政策；個人檔案未修改。

**完成條件：** 來源與衝突清單完整；沒有需要由猜測補上的檔案或執行器行為。

### Phase B：遷移唯一來源

- [x] 將五個技能與資源移到 `.agents/skills/`，保持技能名稱。
- [x] 縮短 sx description；保留詳細觸發情境於正文。
- [x] 將 patterns 自訂欄位移入 `metadata`，補足具體使用情境。
- [x] 按第 3 節拆分 slots 與 sx；保持技術規則及範例語意。
- [x] 將 sx evals 中的 `agentic-ui-sx`／`@agentic-ui/react` 改為本專案名稱；保持原有三個案例的預期行為。
- [x] 移除共用正文中的執行器專屬呼叫假設，改為工具中立的操作要求。

**完成條件：** 五個標準格式 skill 可直接从 `.agents/skills/` 讀取，沒有遺失內容、資源或斷裂引用。

### Phase C：統一政策及入口

- [x] 保留根目錄 `AGENTS.md` 的既有 PR／changeset 政策；補上技能選用指引。
- [x] patterns 的 base branch 改為 `main`；移除任意 changeset 檔名的指示。
- [x] PR skill 的 changeset 流程明確為：PR 已存在並取得 number 後，才可在使用者要求的範圍內建立檔案。
- [x] 未取得 PR number 時，只能提供內容草稿並說明缺少 number；不能建立 placeholder／描述性檔名，也不能為取得 number 自行開 PR。
- [x] 移除 suffix 檔名範例；同一 PR 的 changeset 使用 `.changeset/tonic-ui-pr-<PR_NUMBER>.md`，按 Changesets 格式列出受影響套件與 bump。
- [x] 將 `.claude/skills/` 的五個技能子目錄改為第 3 節的相對 symlink。
- [x] 更新 `CONTRIBUTING.md`：只編輯 `.agents/skills/`、標準格式、引用、相對 discovery adapters 與驗證原則；不指定主力工具。

**完成條件：** 政策無衝突，技能只有一份實體內容，三工具入口不需要修改個人設定。

### Phase D：驗證後完成切換

- [ ] 三工具 smoke 全部完成：OMP／Codex 已通過；Claude Code 缺少執行器。
- [x] 移除本次建立的暫存設定覆蓋；驗證腳本只在 eval kernel 執行，沒有新增 repository 腳本或輸出檔。原有 evals 保留。
- [x] 記錄版本、成功與失敗證據、已知限制。
- [ ] 只有在 Claude Code 的剩餘驗收也成立時，才能將三工具完整遷移標記完成。

## 7. 驗證方法

### 7.1 靜態檢查

使用既有可用工具或不新增依賴的 throwaway script：

1. 解析五份 frontmatter，檢查 `name`、description 字元上限及 metadata 字串值。
2. 檢查每份 `SKILL.md` 行數與所有 references／assets／scripts 連結目標。
3. 驗證五個 Claude 入口均為相對 symlink，且 realpath 等於對應 `.agents/skills/<name>`。
4. 驗證遷移前後資源集合一致，除了計畫列出的新增 references 與必要文字變更。
5. 檢查目前技能及入口沒有舊來源路徑、個人路徑或失效引用。`.claude/skills/` 作為入口文件中的路徑仍然合法。
6. 比對根目錄政策與兩個 workflow skills：沒有 `v2` base、任意 changeset 檔名、PR 前建立 changeset 或未授權外部操作。
7. 如已安裝 `skills-ref`，可額外執行 `skills-ref validate`；不得為此自行安裝依賴。

不新增只測試文字拷貝、連結數量或 wiring 的永久測試。不要為純文件遷移執行整個應用程式建置。

### 7.2 實際工作階段驗證

在 repository root 與 `packages/react/` 各啟動新工作階段，避免用舊技能快取判定結果。所有情境均要求只讀分析，不修改來源、不產生 changeset、不做外部寫入。

| 情境 | 操作 | 必須觀察的結果 |
| --- | --- | --- |
| 探索 | 顯示／檢查可用技能及實際來源 | 五個技能可用；來源實體檔案皆在 `.agents/skills/`；沒有這次遷移造成的重複版本 |
| 常駐規則 | 請 agent 說明本專案 PR base、changeset 時序及檔名 | `main`、PR number 已知後建立、精確的 PR number 檔名 |
| 明確呼叫 | 使用各工具原生方式選取 sx skill，要求解釋 wrapper 與 consumer override 優先序 | 確實載入 skill，回答符合既有 sx 規則 |
| 資源載入 | 明確選取 slots skill，要求讀 migration reference 後提供分析 | 成功解析引用；沒有把相對路徑錯當成 CWD 路徑 |
| 自動選用 | 不提技能名稱，詢問 `useSlot` legacy prop 遷移 | 有載入 slots skill 的證據；不能只憑回答看起來正確判定 |
| OMP 去重 | 同時保留 agents 與 Claude 入口 | 同一實體 skill 不產生額外 namespaced 版本 |
| OMP 原生共享探索 | 測試工作階段暫時關閉 Claude project skills | 五個共享技能仍可用；不靠 Claude 入口才能運作 |
| 禁止行為 | 要求「只草擬 changeset；PR 尚未建立」 | 只回傳草稿，不建立檔案、不猜 PR number、不開 PR、不 commit／push |
| 技能行為 | 對 sx 執行既有三個 eval prompts | base 使用 `__sx`、wrapper override 合成正确、consumer `sx` 優先；不把物件展開當成完整 composition |

以執行器提供的 tool trace、來源路徑、extensions／skills 列表或輸出保存證據，不只採用 agent 自述「已讀取」。驗證記錄至少包含：工具與版本、啟動 CWD、輸入情境、載入來源、結果。

若工具未安裝、無法啟動或缺少授權，記錄確切缺少的前提及已嘗試的方式。仍完成其他可達檢查，但不得宣稱三工具相容性已驗證。

## 8. 最終驗收條件

- [x] `.agents/skills/` 是五個技能唯一的實體來源。
- [x] OMP 在正常與無 Claude project skills 的工作階段都能使用五個技能。
- [x] OMP 對 Claude symlink 正確去重，沒有遷移造成的同名不同內容版本。
- [ ] Claude Code 與 Codex 在根目錄及 `packages/react/` 啟動時都能探索技能。
- [ ] 三者都讀到根目錄 PR／changeset 政策，沒有新增入口遮蔽它。
- [ ] 明確呼叫、按描述選用、reference 載入與既有 sx 三個行為案例有實際證據。
- [x] 已執行的 OMP／Codex 情境中，前置條件不足時不建立 changeset，也不自行執行外部操作；Claude Code 尚待實際驗證。
- [x] 五份 frontmatter 符合標準；sx description 不超過 1,024 字元；references 與 symlinks 均有效。
- [x] `CONTRIBUTING.md` 說明工具中立的單一來源、格式、引用與 adapter 維護；工具差異及 smoke 方法保留在本計畫。
- [x] 個人設定、全域技能、憑證、MCP 及應用程式程式碼未被修改。

## 9. 風險與處理

| 風險 | 處理 |
| --- | --- |
| OMP 的 native／個人技能或 context 優先序影響結果 | 記錄來源並以隔離工作階段驗證；不修改使用者的全域內容 |
| Claude 版本對 `AGENTS.md` 的支援與目前環境不同 | 以实际版本測試；失敗時列出前提，不自行新增政策副本 |
| symlink checkout 不可用（例如部分 Windows 設定） | 本次採用 symlink-capable checkout；文件明示限制，不偷偷改成維護多份拷貝 |
| 拆分長文件後 agent 沒讀必要 references | 核心規則留在 `SKILL.md`；給明確讀取條件，再用資源載入情境驗證 |
| 自動選用不穩定 | 調整 description 的觸發範圍；保留明確選取方式；驗收必須包含實際自動選用證據 |
| 搬遷時遺失 evals 或範例 | 搬遷前建立資源清單，搬遷後逐項比對 |

若要回復本次尚未提交的遷移，只回復本次改動的路徑：還原原有五個 Claude 實體技能、根目錄技能指引與 CONTRIBUTING 變更，移除本次建立的共享技能與 symlinks。先核對是否有使用者後續修改；不得使用全 repository reset 或批次清除未追蹤檔案。

## 10. 參考資料

- [Agent Skills 規格](https://agentskills.io/specification)
- [Claude Code skills](https://code.claude.com/docs/en/skills)
- [Codex skills](https://developers.openai.com/codex/skills)
- [Codex AGENTS.md](https://developers.openai.com/codex/guides/agents-md)
- OMP 本機文件：`omp://skills.md`、`omp://context-files.md`。這些 URI 只供 OMP 維護者查閱，不作為共用 skill 的依賴。

## 11. 實作與驗證紀錄

### 11.1 交付內容與使用者調整

- 工作分支：`docs/shared-agent-skills`。本計畫與實作納入同一個本機 commit，供後續 PR 使用；不納入無關的 `untitled.md`。
- 保留六個原始資源（五份 SKILL.md、一份 evals JSON），新增三份按需 references。
- slots 的 API／migration 範例與 sx 的 worked examples／transition／regression／prop-getter 內容由原文移動，未改寫技術規則。
- 修正 sx 的失效 repository 引用：移除不存在的 CONTEXT／ADR 指標，保留內嵌說明，將舊計畫路徑改為現存的 `docs/plans/2026-07-02-sx-internals-migration.md`。
- 使用者確認 CONTRIBUTING 不需要工具定位：移除主力工具與逐工具流程，只保留共用維護契約和本計畫連結。
- 使用者補充較新的 Tonic One hook 並確認 Tonic UI 尚未完成 `__sx` 整合；slots／sx 的入口及 API reference 明確區分目標契約與目前 checkout 的行為，不修改元件程式。

### 11.2 靜態驗證

使用 Bun YAML parser 與 throwaway assertions，結果全部通過：

| Skill | description 字元數 | SKILL.md 行數（不計結尾空行） |
| --- | ---: | ---: |
| tonic-ui-patterns | 195 | 225 |
| tonic-ui-pr | 261 | 313 |
| tonic-ui-slots | 865 | 68 |
| tonic-ui-sx | 265 | 283 |
| tonic-ui-types | 230 | 184 |

其他檢查：

- 五個名稱符合標準且與目錄一致；metadata 值均為字串。
- 五個 Claude adapters 均為相對 symlink，realpath 與共用目錄一致。
- 原始資源完整；移至 references 的範例／migration 區塊逐段比對。API 新增整合狀態並標示目標契約，程式範例保留；已列出的失效 citation 被移除。
- 三個 sx eval 的 ID、名稱、expected_output 與案例行為保持不變，只修正技能／套件名稱。
- Markdown fences、直接 references、AGENTS／CONTRIBUTING 本機連結與 sx 的 repository source pointers 有效。
- 共用技能未依賴個人絕對路徑、`skill://`、Claude 參數注入或特定 Bash tool call 數量。
- CONTRIBUTING 不含 OMP／Claude Code／Codex 的工具定位敘述。
- `skills-ref` 不在 PATH；未安裝依賴。沒有執行應用程式 build／test，因為本次不改應用程式。

### 11.3 實際執行器證據

**OMP 18.4.4**

- 用 `omp --mode rpc --no-ui --no-session --no-extensions` 的 `get_available_commands` 實際啟動探索。
- 根目錄與 `packages/react/` 各執行正常探索、agents-only 覆蓋，共四個新工作階段；每次均列出五個 `skill:tonic-ui-*`，沒有額外 namespaced 副本，stderr 為空。
- agents-only 覆蓋只有 `skills.enableClaudeProject: false` 與 `skills.enableAgentsProject: true`；覆蓋檔案已移除，沒有修改持久設定。
- 使用 `-p --mode json --no-session --no-extensions --tools read --model openai-codex/gpt-6.1-sol --thinking low` 執行只讀情境。
- 根目錄明確選取 sx：trace 包含 `read skill://tonic-ui-sx` 與 composition reference；完成三個既有 eval、root PR 政策與無 PR number 的聊天草稿，exit 0。
- `packages/react/` 的 implicit slots 情境沒有明確選取技能：trace 實際讀到 slots SKILL.md、`references/api.md`、`references/migration.md`，並回覆 element precedence、legacy/new props merge、handlers、forced `in` 及 ref/style 契約，exit 0。
- 三案例答案皆使用 `__sx` 承載 base／wrapper、`composeSx` 陣列合成、consumer `sx` 保持獨立；指出 specificity 邊界，沒有將淺物件合併當成完整樣式合成。
- 上述只讀情境可見工具呼叫均為 `read`；未建立 changeset 或執行外部寫入。

**Codex CLI 0.160.1**

- 實際啟動 `codex app-server --stdio`，完成 initialize handshake 並呼叫 `skills/list`，傳入 root 與 `packages/react/` 兩個 CWD，`forceReload: true`。
- 兩個 CWD 都回傳五個 enabled 技能，路徑直接位於 `.agents/skills/`，errors 為空。
- 使用 `codex exec --ephemeral --json -s read-only -C <cwd>`。
- `packages/react/` 明確指定 sx：command trace 實際讀到共享 SKILL.md、composition reference、root AGENTS 及 PR skill；三個 eval 與無 PR number 草稿均完成，exit 0，沒有 file_change event。
- root 的 implicit slots 情境：command trace 實際讀到 slots SKILL.md、兩份 references 與其他相關 skills；完成分析及 root PR 政策，exit 0。額外 source lookup 的一個命令 exit 1，但未阻止 skill/reference 讀取或最終分析。
- 兩者皆回覆 PR base `main`、PR 存在後才建立 `.changeset/tonic-ui-pr-<PR_NUMBER>.md`，沒有猜號碼或建立檔案。

**Claude Code**

- `claude --version` 無法啟動：`Executable not found in $PATH: \"claude\"`。
- 已檢查常見使用者／Homebrew／系統 CLI 路徑、Claude 版本目錄與 Applications；沒有找到可用執行器。
- 五個 adapter 的 filesystem 檢查通過，但不能替代 Claude Code 的實際探索、AGENTS 載入或 invocation 驗證。
- 剩餘前提：在已安裝且可用的 Claude Code 環境執行第 7.2 節；不得將目前結果描述為三工具完整 smoke 通過。

### 11.4 已觀察限制與既有問題

- 首次 OMP 使用預設模型的三案例 headless run，在成功讀取 skill/reference 後以 `Deadline exceeded` 結束，exit 1。改用本次可用的明確模型後，focused scenario 與完整三案例都以 exit 0 完成。此紀錄不是隱藏第一次失敗。
- 部分 OMP root runs 輸出既有 MCP warning：`MCP server \"tonic-ui\" failed to connect: MCP subprocess closed stdout before responding`。驗證只使用 read tool，不依賴該 MCP；未修改 MCP 設定或程式。
- 使用者全域 AGENTS 引用的 `~/.omp/agent/GITHUB_GHEC_DIRECT_ACCESS.md` 不存在；未建立或修改個人 context 檔案。
- Codex slots smoke 發現既有文件與程式差異。`packages/react/src/slot/useSlot.js:38-42` 只拆出並合成 refs，其他 props 用物件展開合併；未實作技能文件所述的 `__sx` composition。使用者提供較新的 Tonic One 實作並確認 Tonic UI 尚未完成整合，因此技能保留目標規則並加上適用性說明，而不是宣稱本地程式已達成契約。此差異不是搬遷造成的，未擴大修改應用程式。
- `rtk` 不在 PATH，Git 操作使用原生 Git；沒有安裝 RTK。


### 11.5 使用者澄清後的指南驗證

- 重新通過 YAML／description／行數／symlink／引用檢查；API reference 的 fenced code examples 與原文一致，migration 區塊及三份 eval 預期值未改變。
- 在 OMP root 與 Codex `packages/react/` 新工作階段詢問：本地 hook 是否已合成 `props.__sx` 與 `slotProps.__sx`，並要求區分現況與 Tonic One 目標。
- 兩者 trace 都實際讀到 slots、sx、API reference 及本地 hook；exit 0，回答均明確表示本地只有 ref 合成，`__sx` 目前會被 slot props 取代；新版目標則為 `composeSx(base, override)`，僅在有值時輸出。
- OMP 僅有 read 呼叫；Codex 僅有只讀 command calls、沒有 file_change event。沒有修改程式碼或執行元件測試。

