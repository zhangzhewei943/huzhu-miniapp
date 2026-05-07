const CONFIG = require('./utils/config.js');

App({
  CONFIG: CONFIG,
  globalData: {
    userInfo: null,
    tasks: [
      { id: 1, tag: '互帮互助', title: '帮忙取一下中通快递，在菜鸟驿站3号柜', reward: 5, location: '主校区', time: '12分钟前', user: '张同学', userColor: '#3B9E7A', wechat: 'zhangtx_2024', desc: '有两个快递需要取，都在菜鸟驿站。中通一个，韵达一个。取完后送到北区 7 号楼一楼大厅就行，我到时下去拿。', pubMeta: '信息学院 · 大二 · 已发布 12 单' },
      { id: 2, tag: '二手交易', title: '出闲置 iPad Air 5，几乎全新带壳膜', reward: 30, location: '东校区', time: '28分钟前', user: '李同学', userColor: '#E07B4A', wechat: 'li_daxue', desc: 'iPad Air 5 星光色 64G，去年10月购入，基本没用过几次。带原装壳和钢化膜，充电器和线都在。东校区三食堂门口面交。', pubMeta: '经管学院 · 大三 · 已发布 8 单' },
      { id: 3, tag: '学习答疑', title: '急求帮忙看下数据结构作业，明天要交', reward: 8, location: '主校区', time: '42分钟前', user: '王同学', userColor: '#8B5CF6', wechat: 'wangcs2024', desc: '数据结构第三次作业，最后两道图的题目不会写。希望有同学能帮忙讲一下思路，图书馆一楼碰面就行。大概半小时到一小时。', pubMeta: '计算机学院 · 大二 · 已发布 5 单' },
      { id: 4, tag: '拼车出行', title: '周六上午去市中心，有一起拼车的吗', reward: 12, location: '南校区', time: '1小时前', user: '赵同学', userColor: '#06B6D4', wechat: 'zhaolawyer', desc: '周六上午9点出发，南门集合。去市中心万达附近。已经有两个人了，再找1-2个人，打车费均摊。大概每人12元左右。', pubMeta: '法学院 · 研一 · 已发布 16 单' },
      { id: 5, tag: '失物招领', title: '捡到一张校园卡，失主请联系我取回', reward: 0, location: '西校区', time: '1小时前', user: '刘同学', userColor: '#84CC16', wechat: 'liu_english', desc: '在西区教学楼二楼走廊捡到的，卡号尾号 3821。放在教学楼一楼保安室了，失主直接去拿就行。', pubMeta: '外国语学院 · 大三 · 已发布 3 单' },
      { id: 6, tag: '代办跑腿', title: '帮忙去教务处打印一份成绩单', reward: 10, location: '主校区', time: '2小时前', user: '陈同学', userColor: '#F43F5E', wechat: 'chenmath', desc: '需要去行政楼教务处打印一份正式成绩单（带公章），用来申请交换项目。带上我的学生证照片去就行，打印完送到北区图书馆。', pubMeta: '数学学院 · 大三 · 已发布 11 单' }
    ],
    acceptedTasks: [],
    myPosts: [
      { id: 101, tag: '互帮互助', title: '帮忙取一下韵达快递，在菜鸟驿站', reward: 5, location: '主校区', time: '3天前', status: 'done', desc: '韵达快递在菜鸟驿站2号柜，取件码已发。送到北区7号楼。', pubMeta: '已由 刘同学 接单并完成' },
      { id: 102, tag: '二手交易', title: '出闲置机械键盘 Cherry MX 青轴', reward: 15, location: '主校区', time: '昨天', status: 'done', desc: 'Cherry G80-3000 青轴，用了半年。北区图书馆面交。', pubMeta: '已由 王同学 接单并完成' },
      { id: 103, tag: '学习答疑', title: '求帮忙辅导一下线性代数，下周期末', reward: 20, location: '东校区', time: '2天前', status: 'pending', desc: '线性代数期末复习，主要是不太懂特征值和特征向量那部分。', pubMeta: '等待接单中' }
    ],
    profileData: {
      name: '李同学',
      studentId: '20240101001',
      department: '计算机科学与技术学院',
      grade: '大二',
      phone: '138****6789',
      wechat: 'li_tongxue_24',
      campus: '主校区'
    },
    currentTask: null,
    activeFilter: '全部',
    activeSort: 'time-desc',
    activeMsgTab: 'accepted'
  },

  checkLogin(callback) {
    if (this.globalData.userInfo) {
      callback && callback();
    } else {
      wx.navigateTo({ url: '/pages/login/login' });
    }
  }
});
