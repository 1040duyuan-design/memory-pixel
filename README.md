# 记忆像素 - Memory Pixel

> 把逝去的亲人做成像素小人，放在app里留个念想。他会自己做些日常小事，你想他了可以随时和他说说话。

## 功能

- ✨ **创建像素人** - 填写姓名、年龄、性格、爱好、常说的话
- 🏠 **日常自主活动** - 没人互动时，他会自己看书、看报、散步、喝茶...
- 🌤️ **场景随时间变化** - 早晨/下午/晚上/夜晚背景自动变，春夏秋冬季节对应变化
- 💬 **聊天互动** - 点击小人弹出聊天框，会说出你记录的他常说的话
- 📸 **回忆相册** - 保存共同的回忆，随时翻看

## 部署到 GitHub Pages

1. 创建一个 GitHub 仓库
2. 推送代码：
```bash
git remote add origin <你的仓库地址>
git add .
git commit -m "first commit"
git push -u origin main
```

3. 在仓库设置 → Pages → Source 选择 `Deploy from a branch` → 选择 `main` 分支 `/root` → 保存

4. 几分钟后就能在 `https://<用户名>.github.io/<仓库名>/` 访问了

5. **在手机上使用**：用 Safari/Chrome 打开网址 → 分享/菜单 → 添加到主屏幕，就能像app一样使用了

## 本地开发

```bash
npm install
npm run dev
```

## 构建

```bash
npm run build
```

构建产物在 `dist` 目录，可以直接部署。
