const app = getApp();
const api = require('../../utils/api.js');

Page({
  wxLogin() {
    wx.login({
      success: async (res) => {
        if (!res.code) {
          wx.showToast({ title: '登录失败', icon: 'none' });
          return;
        }
        try {
          const data = await api.login(res.code);
          if (data.ok) {
            app.globalData.userInfo = data.user;
            wx.showToast({ title: '登录成功', icon: 'success', duration: 1200 });
            setTimeout(() => {
              wx.navigateBack({ delta: 1, fail: () => wx.switchTab({ url: '/pages/index/index' }) });
            }, 1000);
          }
        } catch (e) {
          wx.showToast({ title: '登录失败，请重试', icon: 'none' });
        }
      },
      fail: () => {
        wx.showToast({ title: '登录失败，请重试', icon: 'none' });
      }
    });
  }
});
