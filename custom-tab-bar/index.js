Component({
  data: {
    selected: 0,
    list: [
      { pagePath: '/pages/index/index', text: '首页', iconPath: '/images/home.png', selectedIconPath: '/images/home-active.png' },
      { pagePath: '/pages/publish/publish', text: '发布', iconPath: '/images/publish.png', selectedIconPath: '/images/publish-active.png' },
      { pagePath: '/pages/messages/messages', text: '消息', iconPath: '/images/msg.png', selectedIconPath: '/images/msg-active.png' },
      { pagePath: '/pages/profile/profile', text: '我的', iconPath: '/images/profile.png', selectedIconPath: '/images/profile-active.png' }
    ]
  },
  methods: {
    switchTab(e) {
      const { index, path } = e.currentTarget.dataset;
      wx.switchTab({ url: path });
    }
  }
});
