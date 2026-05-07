Page({
  data: { url: '' },
  onLoad(options) {
    const url = decodeURIComponent(options.url || '');
    this.setData({ url });
  },
  onMessage(e) {},
  onError(e) {
    console.error('webview error', e);
  }
});
