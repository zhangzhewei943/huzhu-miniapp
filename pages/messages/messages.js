const app = getApp();

Page({
  data: {
    tabs: [
      { key: 'accepted', label: '接单' },
      { key: 'published', label: '发布' }
    ],
    activeTab: 'accepted',
    acceptedList: [],
    publishedList: []
  },

  onLoad() {
    this.setData({ activeTab: app.globalData.activeMsgTab });
    this.render();
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 2 });
    }
    this.render();
  },

  render() {
    this.setData({
      acceptedList: app.globalData.acceptedTasks,
      publishedList: app.globalData.myPosts
    });
  },

  switchTab(e) {
    const key = e.currentTarget.dataset.key;
    app.globalData.activeMsgTab = key;
    this.setData({ activeTab: key });
  },

  copyWechat(e) {
    const id = e.currentTarget.dataset.id;
    const item = [...this.data.acceptedList, ...this.data.publishedList].find(t => t.id === id);
    const wechat = item ? item.wechat : '';
    wx.setClipboardData({
      data: wechat || '暂无微信号',
      success: () => { wx.showToast({ title: '已复制微信号', icon: 'success' }); }
    });
  },

  deletePost(e) {
    const id = e.currentTarget.dataset.id;
    const idx = app.globalData.myPosts.findIndex(t => t.id === id);
    if (idx > -1) {
      app.globalData.myPosts.splice(idx, 1);
      this.render();
      wx.showToast({ title: '已删除', icon: 'none' });
    }
  }
});
