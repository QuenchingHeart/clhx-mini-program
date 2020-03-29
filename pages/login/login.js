//index.js
//获取应用实例
const app = getApp()
// const util = require('../../utils/util.js')
import { login } from "../../utils/api.js";
Page({
  data: {
    motto: "Hello World",
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse("button.open-type.getUserInfo")
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: "../logs/logs"
    });
  },
  onLoad: function() {
    /*
        const byid = (e) => {
            console.log(e.pop().name)
        }
        util.api('imagei.ByStuId', { stuid: '031630226' }, byid)
  */
    this.login();
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      });
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        });
      };
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo;
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          });
        }
      });
    }
    console.log(app.globalData.userInfo)
  },
  getUserInfo: function(e) {
    console.log(e);
    app.globalData.userInfo = e.detail.userInfo;
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    });
  },
  login: function() {
    var that = this;
    // return new Promise((resolve, reject) => {
      // 登录
      wx.login({
        success: res => {
          console.log(res)
          var code = {'jsoncode':res.code};
          // 发送 code，获取token。
          if (code) {
            login(code)
              .then(data => {
                console.log(code)
                app.globalData.token = data.token;
                app.globalData.userID = data.userID;
                wx.getSetting({
                  success: res => {
                    wx.navigateTo({
                      url: "../index/index"
                    })
                    console.log('jump')
                    if (res.authSetting["scope.userInfo"]) {

                      // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    //   wx.getUserInfo({
                    //     success: res => {
                    //       postAvatar(
                    //         app.globalData.token,
                    //         res.userInfo.avatarUrl,
                    //         res.userInfo.nickName
                    //       )
                    //         .then(data => {})
                    //         .catch(err => {});
                    //       // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                    //       // 所以此处加入 callback 以防止这种情况
                    //       if (this.userInfoReadyCallback) {
                    //         this.userInfoReadyCallback(res);
                    //       }
                    //     }
                    //   });
                    } else {
                      this.setData({
                        show_modal: true
                      });
                    }
                  }
                });
              })
              .catch(err => {});
          }
        }
      });
    // });
  },

  info() {
    wx.getUserInfo({
      success: e => {
        console.log(e);
      }
    });
  }
});
    //https://api.weixin.qq.com/sns/jscode2session?appid=wx4e8636effc709c13&secret=5c82503ab5784e3d6da93e4d618ea374&js_code=0234W7Dh208dtH0uGJBh2q75Dh24W7D5&grant_type=authorization_code