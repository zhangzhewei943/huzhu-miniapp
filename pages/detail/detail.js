const app = getApp();
const api = require('../../utils/api.js');

Page({
  data: {
    task: null
  },

  onLoad() {
    const task = app.globalData.currentTask;
    if (task) {
      this.setData({ task });
    }
  },

  acceptTask() {
    if (!app.globalData.userInfo) {
      wx.showToast({ title: '请先登录', icon: 'none' });
      wx.navigateTo({ url: '/pages/login/login' });
      return;
    }
    const task = this.data.task;
    if (!task) return;

    const g = app.globalData;

    // 加入接单列表（保留发布者的微信号）
    if (!g.acceptedTasks.find(t => t.id === task.id)) {
      g.acceptedTasks.unshift({ ...task });
    }

    // 从首页移除
    const idx = g.tasks.findIndex(t => t.id === task.id);
    if (idx > -1) g.tasks.splice(idx, 1);

    // 如果是我自己发布的，更新状态为已接单
    const mpIdx = g.myPosts.findIndex(t => t.id === task.id);
    if (mpIdx > -1) {
      g.myPosts[mpIdx].status = 'done';
      g.myPosts[mpIdx].pubMeta = '已有人接单';
    }

    this.setData({ task: null });

    // 同步到后端
    api.acceptOrder(task.id, app.globalData.userInfo ? app.globalData.userInfo.openid : '').catch(() => {});

    wx.showToast({ title: '接单成功', icon: 'success', duration: 1200 });
    setTimeout(() => {
      wx.switchTab({ url: '/pages/messages/messages' });
    }, 600);
  }
});
