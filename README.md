# 多数人的历史

一个面向普通人的数字生命档案与在线家谱原型。用户可以浏览人物故事、查看人生时间线和家族关系，并生成纪念二维码。

> 当前项目为产品 Demo，人物、经历和数据均为演示内容，不会保存用户在创建流程中填写的信息。

## 功能

- 九位人物的生命档案与分章节传记
- 按姓名、地区、职业和年代浏览
- 四代家族关系展示
- 家人回忆的浏览器语音朗读
- 可扫描、复制和下载的纪念二维码
- 三步生命档案创建体验
- 响应式中文档案馆视觉设计

## 技术栈

- React 19
- TypeScript
- vinext / Vite
- Tailwind CSS 4
- Cloudflare Workers 兼容构建

## 本地运行

需要 Node.js `>=22.13.0`。

```bash
npm install
npm run dev
```

浏览器打开终端输出的本地地址。

## 常用命令

```bash
npm run dev      # 本地开发
npm run build    # 生产构建
npm run lint     # 代码检查
npm test         # 构建并运行测试
```

## 项目结构

```text
app/                    页面、布局和全局样式
public/images/
  archive/              家庭档案与历史照片
  brand/                品牌及分享预览素材
  portraits/            人物肖像
worker/                 Cloudflare Worker 入口
build/                  Sites/Vite 构建适配
db/                     预留的数据模型
docs/                   项目说明文档
tests/                  自动化测试
.openai/hosting.json    Sites 发布配置
```

更详细的目录职责见 [docs/PROJECT_STRUCTURE.md](docs/PROJECT_STRUCTURE.md)。

## 在线演示

[https://history-of-ordinary-people.verasimedazi0.chatgpt.site](https://history-of-ordinary-people.verasimedazi0.chatgpt.site)

## 素材说明

人物与故事均用于概念验证。正式产品上线前，应替换为获得授权的真实资料，并补充隐私、授权、申诉和数字遗产管理机制。

## License

当前未授予开源许可证。未经许可，不得将项目中的图片和内容用于商业用途。
