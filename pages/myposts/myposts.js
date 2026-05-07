const app = getApp();

Page({
  data: {
    myPosts: []
  },

  onShow() {
    this.setData({ myPosts: app.globalData.myPosts });
  },

  deletePost(e) {
    const id = e.currentTarget.dataset.id;
    wx.showModal({
      title: '确认删除',
      content: '删除后无法恢复',
      success: (res) => {
        if (res.confirm) {
          const idx = app.globalData.myPosts.findIndex(t => t.id === id);
          if (idx > -1) {
            app.globalData.myPosts.splice(idx, 1);
            this.setData({ myPosts: app.globalData.myPosts });
            wx.showToast({ title: '已删除', icon: 'none' });
          }
        }
      }
    });
  }
});
