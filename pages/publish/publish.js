const app = getApp();
const api = require('../../utils/api.js');

Page({
  data: {
    types: [],
    locations: [],
    selectedType: '',
    title: '',
    reward: '',
    location: '',
    desc: '',
    showPicker: false,
    tempLocation: ''
  },

  selectType(e) {
    this.setData({ selectedType: e.currentTarget.dataset.type });
  },

  onTitleInput(e) { this.setData({ title: e.detail.value }); },
  onRewardInput(e) { this.setData({ reward: e.detail.value }); },
  onDescInput(e) { this.setData({ desc: e.detail.value }); },

  showLocationPicker() {
    this.setData({ showPicker: true, tempLocation: this.data.location });
  },

  hideLocationPicker() {
    this.setData({ showPicker: false });
  },

  noop() {},

  selectLocation(e) {
    this.setData({ tempLocation: e.currentTarget.dataset.loc });
  },

  confirmLocation() {
    this.setData({
      location: this.data.tempLocation || this.data.location,
      showPicker: false
    });
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 1 });
    }
  },

  onLoad() {
    const CONFIG = app.CONFIG;
    const types = CONFIG.categories.filter(c => c !== '全部').concat(['借还物品', '其他']);
    this.setData({
      types: types,
      locations: CONFIG.locations,
      selectedType: types[0] || '互帮互助'
    });
  },

  submitTask() {
    if (!app.globalData.userInfo) {
      wx.showToast({ title: '请先登录', icon: 'none' });
      wx.navigateTo({ url: '/pages/login/login' });
      return;
    }
    const { title, reward, desc, location, selectedType } = this.data;
    if (!title.trim()) { wx.showToast({ title: '请填写任务标题', icon: 'none' }); return; }
    if (!location) { wx.showToast({ title: '请选择地点', icon: 'none' }); return; }

    const newTask = {
      id: Date.now(),
      tag: selectedType,
      title: title.trim(),
      reward: Number(reward) || 0,
      location,
      time: '刚刚',
      user: app.globalData.userInfo.nickName || '我',
      userColor: '#4A90D9',
      wechat: app.globalData.userInfo.wxid || '',
      desc: desc.trim() || title.trim(),
      pubMeta: '刚刚发布',
      status: 'pending'
    };

    app.globalData.tasks.unshift({ ...newTask });
    app.globalData.myPosts.unshift({ ...newTask });

    // 同步到后端
    api.publishOrder({
      id: newTask.id,
      tag: newTask.tag,
      title: newTask.title,
      reward: newTask.reward,
      location: newTask.location,
      desc: newTask.desc,
      pubMeta: newTask.pubMeta,
      userName: newTask.user,
      userColor: newTask.userColor,
      userWxid: newTask.wechat,
      publisherOpenid: app.globalData.userInfo ? app.globalData.userInfo.openid : ''
    }).catch(() => {});

    this.setData({
      selectedType: '互帮互助',
      title: '',
      reward: '',
      location: '',
      desc: ''
    });

    wx.showToast({ title: '发布成功', icon: 'success', duration: 1500 });
    setTimeout(() => {
      wx.switchTab({ url: '/pages/index/index' });
    }, 1500);
  }
});
