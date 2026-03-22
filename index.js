export default {
  async fetch(request) {
    const headers = {
      "Content-Type": "application/javascript", // 改成JS类型，让本地能执行
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    };

    // 处理跨域预检请求
    if (request.method === "OPTIONS") {
      return new Response(null, { headers });
    }

    // 核心：返回可执行的脚本逻辑（不是纯JSON）
    const scriptCode = `
      // 从云端获取配置（也可以直接用本地JSON的data）
      const config = {
        autoPlayInterval: 3000,
        maxPlayTimes: 10
      };

      // 自动出牌核心函数
      let autoPlayTimer = null;
      function startAutoPlay() {
        if (autoPlayTimer) clearInterval(autoPlayTimer);
        script.toast("自动出牌已开启（云端配置）！");
        
        let playCount = 0;
        autoPlayTimer = setInterval(() => {
          if (playCount >= config.maxPlayTimes) {
            clearInterval(autoPlayTimer);
            autoPlayTimer = null;
            script.toast(\`出牌完成！共出\${config.maxPlayTimes}次\`);
            return;
          }
          // 替换成你的游戏出牌按钮坐标
          script.click(600, 900); 
          playCount++;
        }, config.autoPlayInterval);
      }

      // 停止出牌
      function stopAutoPlay() {
        if (autoPlayTimer) {
          clearInterval(autoPlayTimer);
          autoPlayTimer = null;
          script.toast("自动出牌已停止！");
        }
      }

      // 绑定按钮点击事件
      script.onButtonClick = function(btnName) {
        if (btnName === "自动出牌") {
          autoPlayTimer ? stopAutoPlay() : startAutoPlay();
        } else if (btnName === "复位") {
          stopAutoPlay();
          script.toast("脚本已复位！");
        } else if (btnName === "刷新脚本") {
          script.reload();
          script.toast("脚本已刷新（云端同步）！");
        }
      };

      // 脚本启动提示
      script.toast("酒馆助手（Cloudflare Workers版）加载成功！");
    `;

    // 返回可执行的JS代码给本地脚本
    return new Response(scriptCode, { headers });
  }
};
