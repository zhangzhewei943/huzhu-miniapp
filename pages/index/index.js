const app = getApp();
const api = require('../../utils/api.js');

Page({
  data: {
    banners: [],
    filters: ['全部'],
    activeFilter: '全部',
    activeSort: 'time-desc',
    sortLabel: '最新发布',
    sortOptions: [
      { key: 'time-desc', label: '最新发布' },
      { key: 'reward-desc', label: '报酬最高' }
    ],
    feedList: [],
    showSort: false
  },

  onLoad() {
    this.loadConfig();
    this.renderFeed();
  },

  async loadConfig() {
    const defaultBanners = [
      { image: '', url: '', order: 1, bg: 'linear-gradient(135deg, #4A90D9, #3060B0)', tag: '新学期', title: '校园互助', sub: '发布任务或接单，轻松解决校园生活难题' },
      { image: '', url: '', order: 2, bg: 'linear-gradient(135deg, #06B6D4, #0891B2)', tag: '限时活动', title: '首单免手续费', sub: '新用户首次发布或接单，平台不收取任何费用' },
      { image: '', url: '', order: 3, bg: 'linear-gradient(135deg, #8B5CF6, #6D28D9)', tag: '安全须知', title: '实名认证已上线', sub: '所有用户需完成学籍认证后才能发布和接单' }
    ];
    try {
      const cfg = await api.getConfig();
      if (cfg.banners && cfg.banners.length > 0) {
        const banners = cfg.banners.filter(b => b.image).length > 0
          ? cfg.banners.filter(b => b.image)
          : defaultBanners;
        this.setData({ banners, filters: cfg.categories || ['全部'] });
      }
    } catch (e) {
      this.setData({
        banners: defaultBanners,
        filters: app.CONFIG.categories || ['全部']
      });
    }
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 0 });
    }
    this.setData({ activeFilter: app.globalData.activeFilter });
    this.renderFeed();
  },

  renderFeed() {
    let list = [...app.globalData.tasks];
    const activeFilter = this.data.activeFilter;
    const activeSort = this.data.activeSort;

    if (activeFilter !== '全部') {
      list = list.filter(t => t.tag === activeFilter);
    }

    if (activeSort === 'reward-desc') {
      list.sort((a, b) => b.reward - a.reward);
    } else if (activeSort === 'reward-asc') {
      list.sort((a, b) => a.reward - b.reward);
    }

    this.setData({ feedList: list });
  },

  onFilterTap(e) {
    const filter = e.currentTarget.dataset.filter;
    app.globalData.activeFilter = filter;
    this.setData({ activeFilter: filter });
    this.renderFeed();
  },

  showSortSheet() {
    this.setData({ showSort: true });
  },

  hideSortSheet() {
    this.setData({ showSort: false });
  },

  noop() {},

  selectSort(e) {
    const key = e.currentTarget.dataset.key;
    const option = this.data.sortOptions.find(o => o.key === key);
    this.setData({
      activeSort: key,
      sortLabel: option ? option.label : '最新发布'
    });
    this.renderFeed();
    setTimeout(() => this.hideSortSheet(), 200);
  },

  onBannerTap(e) {
    const url = e.currentTarget.dataset.url;
    if (url) {
      wx.navigateTo({ url: '/pages/webview/webview?url=' + encodeURIComponent(url) });
    }
  },

  openDetail(e) {
    const id = e.currentTarget.dataset.id;
    const task = app.globalData.tasks.find(t => t.id === id);
    if (task) {
      app.globalData.currentTask = task;
      wx.navigateTo({ url: '/pages/detail/detail' });
    }
  }
});
