# Codsh · DeepSeek Harness 外观插件

开发者：[炽阳001](https://github.com/Chiyang001?tab=repositories) · [Bilibili](https://space.bilibili.com/404891612)

参考 Codex 和 Beauty-OpenCode 的样式、交互实现，为 DeepSeek Harness 提供统一的颜色、间距、圆角与动画。使用官方 `theme.overrideTokens` 和客户端模块加载接口，不修改 Harness 安装文件。

- 深灰主面板、52px 冷灰图标栏、紧凑侧栏；插件入口仅显示图标，DeepSeek 标题不带下拉标识。
- 欢迎区保留 Harness 自带的 DeepSeek 鲸鱼图标，改为图标在上、问题在下。
- 显示“我们应该在工作区名称中做些什么？”，未选择工作区时显示“我们应该做些什么？”。
- 欢迎页输入区靠底部，工作区选择条和输入框形成两层圆角卡片。
- 参考 Beauty-OpenCode，将侧栏分为项目树和最近会话。最近会话按更新时间倒序，排除空白、归档及子智能体会话，点击调用 Harness 原生导航。
- 模型与思考强度分开显示。模型按钮直接进入原生模型列表，保留搜索、选择菜单；思考强度使用离散滑杆，档位读取原生选项，拖动预览、释放提交，Max 和 Ultra 档使用紫色填充，只有 Ultra 档带粒子效果，粒子限制在填充区域；其他档位显示从右向左的水流动画，选择后面板保持打开。
- 图标栏的项目、最近会话按钮切换独立视图并高亮；账户头像入口位于最左侧底部，悬停显示登录说明。项目内与最近会话行统一为 26px，项目与最近会话可折叠，使用 240ms 展开及收起动画；菜单、按钮与面板统一过渡，并遵循系统减少动态效果设置。
- 列表文字调整为 12–13px，项目行 28px、会话行 26px；菜单、设置导航及 Tab 栏统一缩小间距，右侧面板 Tab 栏总高 32px。
- 蓝色发送按钮和用户消息气泡，统一滚动条、提示、弹窗、工具卡片与焦点样式；设置页改为整页布局，增加导航及当前页面搜索和返回聊天入口。
- 会话、发送、插件导航和模型选择仍使用 Harness 原有控件。新增首页按钮调用原生新会话按钮。
- 项目与会话支持右键菜单和行尾“⋯”：重命名、置顶/取消置顶。项目置顶保存在本机外观设置，会话置顶使用原生注册表。
- 仅项目提供“在资源管理器中打开”入口，会话菜单不显示此操作。会话可永久删除记录，删除需要界面确认；已打开或运行中的会话会先停止活动、等待写入结束并释放占用后强制删除；仍有子会话的记录需要先删除子会话。删除仅针对本机 JSONL 会话存储，不删除项目文件。
- 禁用时释放主题令牌、观察器、样式及新增按钮，恢复原始界面。

这是 Codex 风格的外观适配，不包含 Codex 独有功能或无法在 Harness 中对应的按钮。Windows 系统菜单及任务栏由操作系统管理。当前样式针对本机 2026-09-29 桌面安装包中的界面结构；未来 Harness 更新可能需要调整选择器。插件配色跟随浅色、深色及系统外观设置，切换时保留自定义布局。

## 安装（粘贴仓库链接）

1. 在 DeepSeek Harness 中打开 **插件 → 添加插件**。
2. 将下面的 GitHub 仓库链接粘贴到“插件包名、GitHub 仓库地址或本地目录路径”输入框：

```text
https://github.com/Chiyang001/dsh-codsh-theme
```

3. 点击 **安装**，安装完成后完全退出并重新打开 Harness。

仓库已包含构建好的 `dist/client.js` 和 `dsh.bundle.patch`，普通用户无需手动构建或修改 Harness 安装文件。安装过程需要能访问 GitHub；切换 npm 镜像不会代理 GitHub。

### 命令行安装

Windows 桌面版 PowerShell：

```powershell
& "$env:LOCALAPPDATA\Programs\DeepSeek Harness\resources\runtime\cli\bin\dsh.cmd" plugin --profile desktop add "https://github.com/Chiyang001/dsh-codsh-theme"
```

Web 版：

```shell
npx @deepseek-ai/dsh plugin --profile web add https://github.com/Chiyang001/dsh-codsh-theme
npx @deepseek-ai/dsh web
```

### 更新

Harness 当前不会自动更新此插件。需要升级时，在插件管理页卸载后，重新粘贴相同仓库链接安装并重启。永久删除操作仍需要用户在界面确认；归档位于会话的三个点菜单，快捷置顶按钮仅保留一个。

## 卸载

```powershell
& "$env:LOCALAPPDATA\Programs\DeepSeek Harness\resources\runtime\cli\bin\dsh.cmd" plugin --profile desktop remove dsh-codsh-theme
```

重启 Harness 恢复。也可在插件管理页面停用 `codsh-theme` 条目。

## 开发与验证

```powershell
npm install
npm run build
npm test
npm pack
```

`src/theme.css` 管理布局与样式；`src/client.js` 管理主题层、工作区标题同步及清理；构建生成 Harness 模块工厂格式的 `dist/client.js`。运行时没有额外 npm 依赖；通过 Harness 原生 RPC 提交操作。永久删除由 index.js 提供后端扩展接口。

测试覆盖模块加载、欢迎标题更新、React 节点重建、原生按钮代理、折叠、滑杆提交及卸载恢复。`scripts/verify-desktop.ps1` 还使用本机 Desktop 自带的 Electron 和 Cordis 验证依赖等待、插件激活与清理。`dsh.client.inject` 声明加载的包，客户端导出的 `inject` 声明 theme、sessions、workspaces、uiWorkspace 服务，两者都不可省略。0.1.1 修复 0.1.0 遗漏运行时服务声明导致的启动失败。已根据本机安装包检查语义类名；DOM 和运行时测试不等于实机视觉验证，尚未完成实机截图比对。

官方接口参考：[DeepSeek Harness 源码](https://github.com/deepseek-ai/deepseek-harness/tree/main/packages/client/ui-theme)、[客户端构建格式](https://github.com/deepseek-ai/deepseek-harness/blob/main/packages/client/tsdown.client.ts)。




