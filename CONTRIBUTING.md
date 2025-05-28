# 贡献指南

非常感谢您对 My UI 组件库的贡献兴趣！这个文档会指导您如何为项目做出贡献。

## 开发环境设置

### 前置条件

- Node.js (>= 14.0.0)
- npm (>= 7.0.0) 或 yarn (>= 1.22.0) 或 pnpm (>= 6.0.0)
- Git

### 初始设置

1. Fork 仓库
2. 克隆您的 fork 到本地:
   ```bash
   git clone https://github.com/YOUR_USERNAME/component-ui.git
   cd component-ui/vue
   ```
3. 安装依赖:
   ```bash
   npm install
   ```
4. 创建一个新分支:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## 开发流程

### 组件开发规范

每个组件都应遵循以下目录结构:

```
src/components/component-name/
├── index.ts               # 导出组件
├── README.md              # 简要文档
├── src/
│   ├── component-name.ts  # 类型定义
│   └── component-name.vue # 组件实现
└── __tests__/             # 测试目录
    └── component-name.test.ts
```

### 组件命名约定

- 组件文件名使用 kebab-case (如 `button.vue`)
- 组件在导出时使用 PascalCase 并添加 `My` 前缀 (如 `MyButton`)
- 组件 props 类型定义以组件名结尾加 `Props` (如 `ButtonProps`)

### 代码风格

- 使用 TypeScript 强类型
- 使用 Composition API 和 `<script setup>` 语法
- 遵循项目的 ESLint 和 Prettier 规则
- 注释应该清晰解释代码的意图，特别是复杂逻辑部分
- CSS 类名使用 BEM 命名约定

### 提交消息规范

请使用[约定式提交](https://www.conventionalcommits.org/)规范:

```
<类型>[可选 作用域]: <描述>

[可选 正文]

[可选 脚注]
```

类型包括:
- `feat`: 新功能
- `fix`: Bug修复
- `docs`: 文档更新
- `style`: 代码风格修改 (不影响功能)
- `refactor`: 重构代码 (不是bug修复或添加功能)
- `perf`: 性能优化
- `test`: 添加或修改测试
- `build`: 构建系统或外部依赖修改
- `ci`: CI配置文件和脚本修改
- `chore`: 其他修改

示例:
```
feat(button): 添加大尺寸按钮样式

添加了新的large属性，用于显示更大尺寸的按钮。

BREAKING CHANGE: 按钮默认大小现在是medium而非small
```

## 测试

### 运行测试

```bash
npm run test
```

### 测试覆盖率

```bash
npm run test:coverage
```

确保您的代码有适当的测试覆盖率，至少需要覆盖组件的以下方面:
- 基本渲染
- Props 响应
- 事件触发
- 主要交互功能
- 边界情况处理

## 文档

为您开发的组件编写详细文档，包括:

1. 在组件目录下创建 `README.md` 简要说明
2. 在 `docs/components/` 目录下创建完整文档，包含:
   - 基本用法
   - 所有支持的Props
   - 所有事件
   - 使用示例
   - 最佳实践

## Pull Request 流程

1. 确保您的代码通过所有测试
2. 更新文档以反映任何变更
3. 提交 Pull Request 到 `main` 分支
4. 在PR描述中详细说明您的修改内容
5. 等待代码审查并根据反馈进行调整

## 发布流程

项目维护者会定期发布新版本，遵循语义版本控制:
- `major`: 不兼容的API变更
- `minor`: 向后兼容的功能性新增
- `patch`: 向后兼容的问题修复

## 行为准则

请保持友善和尊重。我们致力于为每个参与者提供一个没有骚扰的体验，无论其经验水平、性别、性别认同和表达、性取向、残疾、个人外表、体型、种族、民族、年龄、宗教或国籍。

## 许可

通过贡献代码，您同意您的贡献将在项目的MIT许可下发布。 