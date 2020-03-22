//app.js
App({
  onLaunch: function() {
    // 展示本地存储能力
    var logs = wx.getStorageSync("logs") || [];
    logs.unshift(Date.now());
    wx.setStorageSync("logs", logs);

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    });
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting["scope.userInfo"]) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo;

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res);
              }
            }
          });
        }
      }
    });
  },
  globalData: {
    userInfo: null,
    token:'',
    // token:'eyJhbGciOiJSUzI1NiJ9.eyJleHAiOjE1ODQ5MjAyMzgsInVzZXIiOjE0fQ.ZAQNCx8aGubz6sw_CdiAerSDxuxJ72BfTt1NOxdbzck-b4qrOwkRCJ1-pdC00Ggb0E5UgamT81BuBKV04rgujExxvryuc3Evu0txJagjdY9v0E0YSGF7Iql2gyAYCfjR_eNM6aiaVW37r3-6VYAgmIFoKbi7VnA1XJxg-uMpcV5WOpdXsp3bBYr2DFjBEQVtJbgBwAEA9QrXb-H1Du-1XiIbrFnECKSvr_cTV8rWnucq9-vnJDsLxfkzLoxpK7hXW53iWxTeOlx2rZ74s2JjPzDJTz-U2Ghh1Cuap1EakSqnY7aD9tvDfoPPYV0PNn5vY6JZuHBVBQDQDjbgMoEHUA',
  userID:'14',
    baseUrl: 'https://api.smartcommunity.mrdrivingduck.cn:8081'
  }
});