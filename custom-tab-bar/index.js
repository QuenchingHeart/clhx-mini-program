// const app = getApp();
// Page({
//   data: {
//     PageCur: 'main'
//   },
//   onLoad: function () {
//     console.log('load',app.globalData.cur)
//     that.setData({
//       PageCur:app.globalData.cur
//     })
//   },
//   NavChange(e) {
//     var cur = e.currentTarget.dataset.cur
//     console.log(cur)
//     app.globalData.cur = cur
//     console.log(app.globalData.cur)
//     var url= '/pages/' + cur + '/' + cur
//     wx.switchTab({ url })
    
//   },
//   onShareAppMessage() {
//     return {
//       title: 'ColorUI-高颜值的小程序UI组件库',
//       imageUrl: '/images/share.jpg',
//       path: '/pages/main/main'
//     }
//   },
//   NavToMakeDemand(){
//     wx.navigateTo({
//       url: '/pages/makeDemand/makeDemand?type=add',
//     })
//   }
// })

Component({
  data: {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#3cc51f",

    list: [
      {
        "pagePath": "/pages/main/main",
        "iconPath": "../pages/images/tabbar/basics.png",
        "selectedIconPath": "../pages/images/tabbar/basics_cur.png",
        "text": "首页",
        "isSpecial": false
      },
      {
        "pagePath": "/pages/demands/demands",
        "iconPath": "../pages/images/tabbar/component.png",
        "selectedIconPath": "../pages/images/tabbar/component_cur.png",
        "text": "需求",
        "isSpecial": false
      },
      // {
      //   "iconPath": "../pages/images/tabbar/add_cur.png",
      //   "selectedIconPath": "../pages/images/tabbar/add_cur.png",
      //   "text": "发布",
      //   "isSpecial": true
      // },
       {
        "pagePath": "/pages/source/source",
        "iconPath": "../pages/images/tabbar/plugin.png",
        "selectedIconPath": "../pages/images/tabbar/plugin_cur.png",
        "text": "资源",
        "isSpecial": false
      },
      {
        "pagePath": "/pages/mine/mine",
        "iconPath": "../pages/images/tabbar/about.png",
        "selectedIconPath": "../pages/images/tabbar/about_cur.png",
        "text": "我的",
        "isSpecial": false
      }
    ]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      // if(data.index==2){
      //   this.NavToMakeDemand()
      // }else{
        const url = data.path
        wx.switchTab({ url })

      // }
      this.setData({
        selected: data.index
      })
    },
  
    NavToMakeDemand(){
    wx.navigateTo({
      url: '/pages/makeDemand/makeDemand?type=add',
    })
  }
  },
})