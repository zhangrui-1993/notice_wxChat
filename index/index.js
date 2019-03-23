const app = getApp()

Page({
  data: {
    // notice_content:'公告字幕滚动播放（文字跑马灯效果）,使用动画和定时器完成，代码片段是一种迷你、可分享的小程序或小游戏项目，可用于分享小程序和小游戏的开发经验',
    notice_content: '公告字幕滚动播放（文字跑马灯效果）,,,,,,,,使用动画和定时器完成，代码片段是一种迷你、',
    animationData: {}, //公告动画
  },
  onLoad: function () {
    let that = this;
    let reg = /[\u4e00-\u9fa5]/g;
    let text_con = that.data.notice_content;
    let textLen = text_con.length,
        textStrLen = text_con.match(reg).length;
        //计算有多少个,加一是为了避免内容没有全部离开显示框
    let hasStrLen = textStrLen + Math.ceil((textLen - textStrLen)/2)+1

    console.log(hasStrLen)
    let timeT = hasStrLen * 200
    console.log(timeT)
    //创建动画实例
    var animation = wx.createAnimation({
      //此处以公告最长内容来设置动画持续时间（duration：决定整个动画播放的速度）
      duration: timeT,
      timingFunction: 'linear'
    });
    // //偏移距离为公告内容的长度*字体大小（若字体大小使用rpx需要换算成px）
    animation.translate(-Number(hasStrLen * 13), 0).step();
    // animation.translate(-300, 0).step();
    that.setData({
      animationData: animation.export()
    });
    // 循环播放动画关键步骤（使用两个定时器）
    // 第一个定时器：将字幕恢复到字幕开始点（为屏幕左边）,时间比初始值小，重新给animation赋值，刷新文字
    that.t1 = setInterval(function () {
      animation = wx.createAnimation({
        //此处以公告最长内容来设置动画持续时间（duration：决定整个动画播放的速度）
        duration: timeT,
        timingFunction: 'linear'
      });
      animation.translate(0, 0).step({ duration: 0 });
      that.setData({
        animationData: animation.export()
      });
    }.bind(that), timeT -1);
    // 第二个定时器：重新开始移动动画,重置文本的位置
    that.t2 = setInterval(function () {
      animation.translate(-Number(hasStrLen * 13), 0).step();
      that.setData({
        animationData: animation.export()
      });
    }.bind(this), (timeT + 10) / 10);
  },
})
