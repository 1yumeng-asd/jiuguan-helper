// 酒馆助手核心逻辑（零基础版）
// 读取本地JSON的配置参数
const autoPlayInterval = script.data.autoPlayInterval || 3000; // 出牌间隔3秒
const maxPlayTimes = script.data.maxPlayTimes || 10; // 最多出10次

// 自动出牌函数
let timer = null;
function autoPlay() {
  // 防止重复点击
  if (timer) clearInterval(timer);
  // 手机弹窗提示
  script.toast("自动出牌开始啦！");
  
  let count = 0;
  // 每隔3秒点一次出牌按钮
  timer = setInterval(() => {
    if (count >= maxPlayTimes) {
      clearInterval(timer);
      timer = null;
      script.toast(`出牌完成！共出了${maxPlayTimes}次`);
      return;
    }
    // 点击出牌按钮（坐标后面用手机校准）
    script.click(550, 880);
    count++;
  }, autoPlayInterval);
}

// 停止出牌函数
function stopPlay() {
  if (timer) {
    clearInterval(timer);
    timer = null;
    script.toast("自动出牌已停止！");
  }
}

// 绑定按钮点击事件（和本地JSON按钮对应）
script.onButtonClick = function(btnName) {
  if (btnName === "自动出牌") {
    timer ? stopPlay() : autoPlay();
  } else if (btnName === "复位") {
    stopPlay();
    script.toast("脚本已复位！");
  } else if (btnName === "刷新脚本") {
    script.reload();
    script.toast("脚本已刷新！");
  }
};

// 脚本启动提示
script.toast("酒馆助手加载成功（云端版）！");
