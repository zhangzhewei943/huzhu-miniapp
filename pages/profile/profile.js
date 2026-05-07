const app = getApp();

Page({
  data: {
    profileData: {},
    myPosts: [],
    acceptedCount: 0,
    editing: false,
    editName: '',
    editData: {},
    fields: [
      { key: 'department', label: '学院', type: 'text' },
      { key: 'grade', label: '年级', type: 'select', options: ['大一', '大二', '大三', '大四', '研一', '研二', '研三'] },
      { key: 'phone', label: '手机号', type: 'text' },
      { key: 'wechat', label: '微信号', type: 'text' },
      { key: 'campus', label: '所在校区', type: 'select', options: ['主校区', '东校区', '西校区', '南校区'] }
    ]
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 3 });
    }
    const pd = app.globalData.profileData;
    this.setData({
      profileData: pd,
      myPosts: app.globalData.myPosts,
      acceptedCount: app.globalData.acceptedTasks.length,
      editing: false,
      editName: pd.name,
      editData: {}
    });
  },

  startEdit() {
    const pd = app.globalData.profileData;
    this.setData({
      editing: true,
      editName: pd.name,
      editData: {}
    });
  },

  cancelEdit() {
    this.setData({ editing: false, editData: {} });
  },

  saveProfile() {
    const pd = app.globalData.profileData;
    pd.name = this.data.editName || pd.name;

    Object.keys(this.data.editData).forEach(k => {
      if (this.data.editData[k]) {
        pd[k] = this.data.editData[k];
      }
    });

    this.setData({ editing: false, editData: {}, profileData: pd });
    wx.showToast({ title: '资料已保存', icon: 'success' });
  },

  onNameInput(e) { this.setData({ editName: e.detail.value }); },

  onFieldInput(e) {
    const key = e.currentTarget.dataset.key;
    const value = e.detail.value;
    this.setData({ ['editData.' + key]: value });
  },

  onFieldChange(e) {
    const key = e.currentTarget.dataset.key;
    const field = this.data.fields.find(f => f.key === key);
    const value = field.options[e.detail.value];
    this.setData({ ['editData.' + key]: value });
  },

  goMyPosts() {
    wx.navigateTo({ url: '/pages/myposts/myposts' });
  }
});
