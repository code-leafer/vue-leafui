# 贡献指南

首先感谢您考虑为 My UI 贡献代码！我们欢迎并鼓励社区贡献，无论是修复错误、改进文档，还是添加新功能，每一份贡献都对项目有价值。

## 开发前的准备

在开始贡献代码之前，请确保您已经了解以下内容：

### 行为准则

My UI 遵循 [Contributor Covenant](https://www.contributor-covenant.org/) 行为准则。参与贡献即表示您同意遵守此准则。

### 开发环境

确保您的开发环境满足以下要求：

- [Node.js](https://nodejs.org/) >= 16.0.0
- [npm](https://www.npmjs.com/) >= 7.0.0 或者 [pnpm](https://pnpm.io/) >= 7.0.0
- [Git](https://git-scm.com/)

### 分支管理

- `main`：稳定版本分支，用于发布
- `dev`：开发分支，所有的开发工作都在此分支进行
- `feat/*`：特性分支，用于开发新功能
- `fix/*`：修复分支，用于修复 bug
- `docs/*`：文档分支，用于更新文档

## 开发流程

### 1. Fork 仓库

首先，[Fork](https://github.com/my-ui/my-ui/fork) 我们的仓库到您的 GitHub 账号下。

### 2. 克隆仓库

```bash
git clone https://github.com/YOUR_USERNAME/my-ui.git
cd my-ui
```

### 3. 安装依赖

```bash
# 推荐使用 pnpm
pnpm install

# 如果使用 npm
npm install
```

### 4. 创建并切换到新分支

```bash
git checkout -b feat/your-feature
# 或
git checkout -b fix/your-bug-fix
```

### 5. 开发

启动开发环境：

```bash
# 启动组件库开发环境
pnpm dev

# 启动文档站点
pnpm docs:dev
```

### 6. 测试

在提交代码前请确保通过所有测试：

```bash
# 运行所有测试
pnpm test

# 运行特定组件的测试
pnpm test -- button
```

### 7. 提交代码

我们使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范来格式化提交消息。

```bash
git add .
git commit -m "feat(component): add new feature"
```

提交类型包括：

- `feat`：新功能
- `fix`：修复 bug
- `docs`：文档更新
- `style`：代码样式调整
- `refactor`：代码重构
- `perf`：性能优化
- `test`：测试相关
- `build`：构建系统或外部依赖项相关
- `ci`：CI 配置相关
- `chore`：其他更改

### 8. 推送分支

```bash
git push origin feat/your-feature
```

### 9. 创建 Pull Request

前往 GitHub 上的 My UI 仓库，创建一个 Pull Request。

## 代码规范

### JavaScript/TypeScript

我们使用 [ESLint](https://eslint.org/) 和 [Prettier](https://prettier.io/) 来检查和格式化代码。在提交前请确保代码通过了 lint 检查。

```bash
# 运行 lint 检查
pnpm lint

# 修复可自动修复的问题
pnpm lint:fix
```

### CSS/SCSS

- 使用 SCSS 编写样式
- 使用 BEM 命名规范
- 组件样式应该使用前缀 `my-`

### 组件开发规范

1. **目录结构**

   ```
   src/components/button/
   ├── __tests__/       # 测试文件
   ├── src/
   │   ├── button.vue   # 组件实现
   │   └── types.ts     # 类型定义
   ├── style/
   │   └── index.scss   # 组件样式
   └── index.ts         # 组件导出
   ```

2. **组件命名**

   - 组件名应使用 PascalCase
   - 文件名应使用 kebab-case

3. **Props 定义**

   - 使用 TypeScript 类型定义
   - 为每个 prop 提供默认值和类型
   - 使用 JSDoc 注释说明 prop 的用途

4. **事件命名**

   - 使用 kebab-case 命名事件
   - 提供明确的事件名称，避免使用缩写

## 文档规范

在添加新组件或更新现有组件时，请确保添加或更新相应的文档：

1. **组件文档**

   - 组件概述
   - 基本用法
   - API 说明（props、events、slots）
   - 示例代码

2. **示例**

   - 提供简单易懂的示例
   - 为每个示例添加适当的说明
   - 确保示例在桌面端和移动端都能正常工作

## 发布流程

1. **版本管理**

   我们使用 [Semantic Versioning](https://semver.org/) 来管理版本号。

   - 主版本号（x.0.0）：不兼容的 API 更改
   - 次版本号（0.x.0）：向后兼容的功能添加
   - 修订版本号（0.0.x）：向后兼容的 bug 修复

2. **更新日志**

   每次发布前，请更新 `CHANGELOG.md` 文件，说明本次发布的主要变更。

## 最后

再次感谢您对 My UI 的贡献！如果您有任何问题，可以通过以下方式联系我们：

- [GitHub Issues](https://github.com/my-ui/my-ui/issues)
- [Discord 社区](https://discord.gg/my-ui)
- [邮件联系](mailto:support@my-ui.dev) 