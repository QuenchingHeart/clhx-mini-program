// pages/mine/mine.js
const app = getApp();
var base64 = require("../images/base64");
Component({

  /**
   * 页面的初始数据
   */
  Properties: {
    tabbar: {
      type:Object,
      value:{}
    },
  },
  data:{
    userInfo:{

    }
  },
  /**
 * 生命周期函数--监听页面加载
 */
  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () {
      this.setData({
        userInfo: app.globalData.userInfo
      })
    },
    moved: function () { },
    detached: function () { },
  },

  // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
  attached: function () { }, // 此处attached的声明会被lifetimes字段中的声明覆盖
  ready: function () {
   },

  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function () {
      app.editTabbar(); 
      this.setData({
        icon: base64.icon20
      });
    }
  },
})