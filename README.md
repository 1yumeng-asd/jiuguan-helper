# 酒馆AI小手机互动脚本
## 功能说明
- 渲染自定义样式的手机外框（固定在页面右下角）；
- 支持「删最后一层DOM」「复位手机」「刷新页面」「Home键点击」等基础功能；
- 基于Git + Cloudflare Pages实现热更新。

## 部署说明
1. 本仓库关联Cloudflare Pages，部署目录为`src`；
2. 修改`src/index.js`并推送到Git后，Cloudflare会自动重新部署；
3. 酒馆AI导入`config/phone-script.json`，替换其中的Cloudflare域名即可使用。
