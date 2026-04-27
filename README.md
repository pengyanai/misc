# Stash Availability Check Tiles

在 [Stash](https://stash.ws) 面板上一键检测 AI 服务和流媒体的可用性与出口地区。

## 支持的服务

| AI 服务 | 流媒体 |
|---------|--------|
| ChatGPT (Web / App) | YouTube |
| Codex | Netflix |
| Claude | Disney+ |
| Gemini | Spotify |
| Grok | |
| Copilot | |

## 使用方法

打开 Stash → 覆写 → 安装覆写，填入以下 URL：

```
# 主
https://fastly.jsdelivr.net/gh/iqiancheng/misc@main/collapsed-tiles/global-ai-availability.stoverride

# 备用1
https://raw.githubusercontent.com/pengyanai/misc/main/collapsed-tiles/global-ai-availability.stoverride

# 备用2
https://jsd.onmicrosoft.cn/gh/pengyanai/misc@main/collapsed-tiles/global-ai-availability.stoverride
```

安装后在首页即可看到折叠式检测磁贴，点击展开查看各服务的可用状态和出口地区码。

## 检测结果说明

| 状态 | 含义 |
|------|------|
| `Available (SG)` | 可用，出口地区为对应国家码 |
| `Available` | 可用，但未能提取地区码 |
| `N/A` / `Not Available` | 当前出口 IP 不支持该服务 |
| `Network Error` | 网络不通或超时 |

## 致谢

基于上游 [StashNetworks/misc](https://github.com/StashNetworks/misc) 开发，新增了 Codex、Claude、Grok、Gemini、Copilot、Disney+、Spotify 检测，并改进了 YouTube 和 Spotify 的检测逻辑。
