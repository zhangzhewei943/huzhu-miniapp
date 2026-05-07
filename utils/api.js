// API 配置
const BASE_URL = 'https://jojometro.cloud';

function request(url, options = {}) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: BASE_URL + url,
      method: options.method || 'GET',
      data: options.data || {},
      header: { 'Content-Type': 'application/json', ...options.header },
      success: (res) => {
        if (res.statusCode === 200) resolve(res.data);
        else reject(res.data);
      },
      fail: reject
    });
  });
}

module.exports = {
  BASE_URL,

  // 登录
  login(code) {
    return request('/api/auth/login', { method: 'POST', data: { code } });
  },

  // 获取配置
  getConfig() {
    return request('/api/config');
  },

  // 发布订单
  publishOrder(order) {
    return request('/api/orders/publish', { method: 'POST', data: order });
  },

  // 接单
  acceptOrder(orderId, acceptorOpenid) {
    return request('/api/orders/accept', { method: 'POST', data: { orderId, acceptorOpenid } });
  },

  // 上传文件
  uploadFile(filePath) {
    return new Promise((resolve, reject) => {
      wx.uploadFile({
        url: BASE_URL + '/api/upload',
        filePath: filePath,
        name: 'file',
        success: (res) => {
          try { resolve(JSON.parse(res.data)); } catch (e) { reject(e); }
        },
        fail: reject
      });
    });
  }
};
