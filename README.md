# Stash Availability Check Tiles

在 [Stash](https://stash.ws) 面板上一键检测 AI 服务与流媒体的可用性及出口地区。合并包可用 **`global.stoverride`**（推荐）或与之一致的旧路径 **`global-ai-availability.stoverride`**；亦可改用 **AI 包** + **流媒体包** 分拆。合并包与分拆二选一即可；**勿同时安装** `global.stoverride` 与 `global-ai-availability.stoverride`（内容重复），也勿再叠装分拆包以免磁贴重复。

图标与脚本优先通过 [jsDelivr（fastly 前缀）](https://fastly.jsdelivr.net/) 拉取，便于缓存与访问。

## 支持的服务

**合并包**（`global.stoverride` 或 `global-ai-availability.stoverride`，二者磁贴一致）= 先 **AI**（顺序同下表 AI 包），后 **流媒体**（顺序同下表流媒体包）。

**AI 包**（`ai-availability.stoverride`）

| 服务 |
|------|
| ChatGPT（Web + App 合并为一块磁贴） |
| Codex |
| Claude |
| Grok |
| Gemini |
| Copilot |

**流媒体包**（`streaming.stoverride`）

| 服务 |
|------|
| YouTube |
| Netflix |
| Disney+ |
| Spotify |

## 使用方法

打开 Stash → 覆写 → 安装覆写，填入对应 URL。若此前安装过 `global-streaming.stoverride` 等已废弃文件名，请删除旧覆写后改用下方路径。

### 合并包（AI + 流媒体，先 AI 后流媒体）

```
# 主（jsDelivr）— 推荐
https://fastly.jsdelivr.net/gh/pengyanai/misc@main/collapsed-tiles/global.stoverride

# 备用：Raw GitHub
https://raw.githubusercontent.com/pengyanai/misc/main/collapsed-tiles/global.stoverride

# 备用：国内节点
https://jsd.onmicrosoft.cn/gh/pengyanai/misc@main/collapsed-tiles/global.stoverride
```

与 `global.stoverride` **内容相同**的旧路径（仍可用，勿与上一段同时安装）：

```
https://fastly.jsdelivr.net/gh/pengyanai/misc@main/collapsed-tiles/global-ai-availability.stoverride
https://raw.githubusercontent.com/pengyanai/misc/main/collapsed-tiles/global-ai-availability.stoverride
https://jsd.onmicrosoft.cn/gh/pengyanai/misc@main/collapsed-tiles/global-ai-availability.stoverride
```

### AI 包

```
# 主（jsDelivr）
https://fastly.jsdelivr.net/gh/pengyanai/misc@main/collapsed-tiles/ai-availability.stoverride

# 备用：Raw GitHub
https://raw.githubusercontent.com/pengyanai/misc/main/collapsed-tiles/ai-availability.stoverride

# 备用：国内节点
https://jsd.onmicrosoft.cn/gh/pengyanai/misc@main/collapsed-tiles/ai-availability.stoverride
```

### 流媒体包

```
# 主（jsDelivr）
https://fastly.jsdelivr.net/gh/pengyanai/misc@main/collapsed-tiles/streaming.stoverride

# 备用：Raw GitHub
https://raw.githubusercontent.com/pengyanai/misc/main/collapsed-tiles/streaming.stoverride

# 备用：国内节点
https://jsd.onmicrosoft.cn/gh/pengyanai/misc@main/collapsed-tiles/streaming.stoverride
```

安装后在首页即可看到折叠式检测磁贴，点击展开查看各服务的可用状态和出口地区码（若脚本支持）。

## 检测结果说明

| 状态 | 含义 |
|------|------|
| `Available (SG)` 等 `Available (XX)` | 可用，括号内为出口国家/地区码（部分服务） |
| `Available (Web)` / `Available (App)` / `Available (Web/App)` | **ChatGPT** 磁贴专用：分别表示仅 Web、仅 App、双端可用 |
| `Available` | 可用，但未能提取地区码 |
| `N/A` / `Not Available` | 当前出口 IP 不支持该服务 |
| `Blocked` / `ISP Block` 等 | 地区或运营商限制（以各脚本实际返回为准） |
| `Network Error` | 网络不通或超时 |

## 致谢

基于上游 [StashNetworks/misc](https://github.com/StashNetworks/misc) 开发；本仓库扩展了 Codex、Claude、Grok、Gemini、Copilot、Disney+、Spotify 等检测，提供合并包 `global.stoverride`（及同内容的 `global-ai-availability.stoverride` 旧路径）与分拆包 `ai-availability.stoverride` / `streaming.stoverride`，合并 ChatGPT Web/App 为单一磁贴，并改进了 YouTube、Spotify 等脚本的检测逻辑。
