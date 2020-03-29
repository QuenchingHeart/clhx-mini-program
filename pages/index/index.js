Page({
  data: {
    PageCur: 'main'
  },
  NavChange(e) {
    this.setData({
      PageCur: e.currentTarget.dataset.cur
    })
  },
  onShareAppMessage() {
    return {
      title: 'ColorUI-高颜值的小程序UI组件库',
      imageUrl: '/images/share.jpg',
      path: '/pages/main/main'
    }
  },
  NavToMakeDemand(){
    wx.navigateTo({
      url: '/pages/makeDemand/makeDemand?type=add',
    })
  }
})