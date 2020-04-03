// pages/main/main.js
const app = getApp();
const util = require("../../utils/util.js");
import { damandsAll } from "../../utils/api.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    markers: [],
    latitude: 23.54972,
    longitude: 116.37271,
     
    demands: [],
    searchText: '选择位置',
    inputInfo: '选择位置',
    position: '',
    tabbar: {},

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initData() 
    app.editTabbar();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.onLoad()

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },





    initData: function (options) {
      var that = this;
      that.mapCtxMain = wx.createMapContext('myMap')


      wx.getLocation({
        type: "gcj02",
        success: re => {
          console.log(re)

          that.setData({
            latitude: re.latitude,
            longitude: re.longitude,
            markers: [{
              latitude: re.latitude,
              longitude: re.longitude,
              iconPath: '/image/location.png',
              width: '34px',
              height: '34px'
            }]
          })
          that.setPosition(re.longitude, re.latitude)
          that.moveToLocation();

          util.getLocal(re.latitude, re.longitude).then((res) => {
            that.setData({
              inputInfo: res.formatted_address
            })
          })
        }
      });

      //  this.getAroundUm();

    },
    chooseLocation: function () {
      var that = this;
      wx.chooseLocation({
        success: (re) => {
          that.position = re.longitude + ',' + re.latitude
          console.log(that.position)

          that.setData({
            latitude: re.latitude,
            longitude: re.longitude,
            markers: [{
              latitude: re.latitude,
              longitude: re.longitude,
              iconPath: '/image/location.png',
              width: '34px',
              height: '34px'
            }]
          })
          // that.setPosition(re.longitude, re.latitude)
          console.log('setPosition', re.longitude, re.latitude)
          that.moveToLocation();

          util.getLocal(re.latitude, re.longitude).then((res) => {
            that.setData({
              inputInfo: res.formatted_address
            })
          })
        }
      })
    },
    moveToLocation: function () {
      var that = this;
      console.log('setPosition1', that.data.longitude, that.data.latitude, that.mapCtxMain)
      that.mapCtxMain.moveToLocation({
        latitude: that.data.latitude,
        longitude: that.data.longitude,
        success: function (res) {
          console.log(res)
        },
        fail: function (res) {
          console.log(res, 'failed')
        },
        complete: function (res) {
          console.log(res, 'complete')
        }
      })
      console.log('setPosition2', that.data.longitude, that.data.latitude, that.mapCtxMain)
    },
    NavToMakeDemand() {
      wx.navigateTo({
        url: '/pages/makeDemand/makeDemand',
      })
    },
    setPosition: function (longitude, latitude) {
      app.globalData.position = {
        latitude: latitude,
        longitude: longitude
      }
    }
  


});

