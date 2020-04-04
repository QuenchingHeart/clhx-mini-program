//app.js
App({
  onLaunch: function() {
    // 展示本地存储能力
    var logs = wx.getStorageSync("logs") || [];
    logs.unshift(Date.now());
    wx.setStorageSync("logs", logs);
    this.getSystemInfo()
    

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

  getSystemInfo: function() {
    let t = this;
    wx.getSystemInfo({
      success: function(res) {
        t.globalData.systemInfo = res;
        console.log(res)
      }
    });
  },
  editTabbar: function () {
    let tabbar = this.globalData.tabBar;
    let currentPages = getCurrentPages();
    let _this = currentPages[currentPages.length - 1];
    let pagePath = _this.route;
    (pagePath.indexOf('/') != 0) && (pagePath = '/' + pagePath);
    for (let i in tabbar.list) {
      tabbar.list[i].selected = false;
      (tabbar.list[i].pagePath == pagePath) && (tabbar.list[i].selected = true);
    }
    if (typeof _this.getTabBar === 'function' &&
    _this.getTabBar()) {
      _this.getTabBar().setData({
        tabbar: tabbar
    })
  }
  },
  
  globalData: {
    "tabBar": {
      "custom": true,
      "color": "#7A7E83",
      "selectedColor": "#3cc51f",
      "borderStyle": "black",
      "backgroundColor": "#ffffff",
      "list": [
        {
          "pagePath": "/pages/main/main",
          "iconPath": "../pages/images/helpicon/RectangleCopy_6.png",
          "selectedIconPath": "../pages/images/helpicon/RectangleCopy_6.png",
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
        {
          "pagePath":"/pages/makeDemand/makeDemand?type=add",
          "iconPath": "../pages/images/helpicon/RectangleCopy_4.png",
          "selectedIconPath": "../pages/images/helpicon/RectangleCopy_4.png",
          "text": "发布",
          "isSpecial": true
        },
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
    userInfo: null,
    token:'',
    // token:'eyJhbGciOiJSUzI1NiJ9.eyJleHAiOjE1ODU1NzkyMzcsInVzZXIiOjE0fQ.cAKSDLiwuktVShjilZTnEifLEdTw1lIK57BoovveFBbuCy8GqtDnlzAjO4Iur04Rv9FXiWzyUbC_0DVDI1Q9bAvEga-PBUikTPFfbPISyQz-KUqWQaUdNHPTP0uuaOV2RZi3DcfOxhPkgHEWcvQSkYkxVh2vpBCPpOeJ6I5QHu11OOmUveA0_mjxrQYKeRwllfI6Q4nMX7JDL80CuNZhhtfnG9cObEj5oIRKaaT7DLi6kVW8RSkTUZd7upppT59gLgD1TRKrcEPBkfKEYkDb8hkcoYNl_GQRhTTOOrVRhud6_R9hJNEJzdsVO5sxRFP51_xKBXx3gVCdxWYYQ66cJQ',
    userID:'',
    baseUrl: 'https://api.smartcommunity.mrdrivingduck.cn:8081'
  }
});