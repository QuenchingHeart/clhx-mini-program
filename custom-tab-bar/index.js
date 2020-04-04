// custom-tab-bar/index.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabbar: {
      type: Object,
      value: {
        "backgroundColor": "#ffffff",
        "color": "#979795",
        "selectedColor": "#3cc51f",
        "list": [
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
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isIphoneX: app.globalData.systemInfo.model.includes('iPhone X'),
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
