// pages/mine/mine.js
const app = getApp();
var base64 = require("../images/base64");
Page({

  /**
   * 页面的初始数据
   */

  data:{
    userInfo:{

    },
    nickname:'',
    tabbar:{}
  },
  /**
 * 生命周期函数--监听页面加载
 */
  onLoad:function(){

  },

  // 组件所在页面的生命周期函数
  onShow: function () {
    app.editTabbar(); 
    this.setData({
      icon: base64.icon20,
      userInfo: app.globalData.userInfo,
      nickname: app.globalData.nickname
    });
  },
  toMakeUserInfo:function(){
    wx.navigateTo({
      url: '/pages/userInfo/makeUserInfo/makeUserInfo',
    })
  }
  
})