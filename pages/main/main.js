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
    latitude: "23.54972",
    longtitude: "116.37271",
    demands:[],
    searchText:'选择位置',
    inputInfo: '选择位置',
    position:'',
    mapCtx:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    that.mapCtx = wx.createMapContext('myMap')

   
    wx.getLocation({
      type: "gcj02",
      success: re => {
        console.log(re)

        that.setData({
          markers: [{
            latitude: re.latitude,
            longitude: re.longitude,
            iconPath: '/image/location.png'
          }]
        })
        that.setPosition(re.longitude, re.latitude)
        that.moveToLocation();
        console.log(app.globalData.position.latitude, app.globalData.position.longitude)
        util.getLocal(app.globalData.position.latitude, app.globalData.position.longitude)
      }
    });
    
    //  this.getAroundUm();

  },
  chooseLocation: function(){
    var that = this;
    wx.chooseLocation({
      success: (re) => {
        that.position = re.longitude + ',' + re.latitude
        console.log(that.position)

        this.setData({
          markers: [{
            latitude: re.latitude,
            longitude: re.longitude,
            iconPath: '/image/location.png'
          }],
          inputInfo: re.address,
        })
        that.setPosition(re.longitude , re.latitude)
        that.moveToLocation();

      }
    })
  },
  moveToLocation: function () {
    var that = this;
    that.mapCtx.moveToLocation({
      latitude: app.globalData.position.latitude,
      longitude: app.globalData.position.longitude,
      success: function (res) {
        console.log(res)
      }
    })
  },
  // getAroundUm() {
  //   wx.getLocation({
  //     type: "gcj02",
  //     success: re => {
  //       this.setData({
  //         latitude: re.latitude,
  //         longitude: re.longitude
  //       });
  //     }
  //   });
  //   wx.request({
  //     success: re => {
  //       if (re.data.ret == 200) {
  //         let marker = re.data.data;
  //         marker = marker.map(e => {
  //           e = {
  //             iconPath: "",
  //             ...e
  //           };
  //           if (e.sex == "boy") {
  //             e.iconPath = "/images/green-Umbrella.png";
  //           } else {
  //             e.iconPath = "/images/pink-Umbrella.png";
  //           }
  //           return e;
  //         });
  //         this.setData({
  //           markers: marker
  //         });
  //         console.log(this.data.markers);

  //         wx.showToast({
  //           title: "获取数据成功!请点击地图上的伞来预约",
  //           duration: 2000,
  //           icon: "none"
  //         });
  //         //引导浮层 点击伞进行叫伞
  //       } else if (re.data.ret == 201) {
  //         //绑定手机号/进一步校验学号密码
  //       } else {
  //         //error
  //       }
  //     },
  //     ...util.pApi("getAroundUm", {})
  //   });
    /*wx.getLocation({
            type: 'gcj02',
            success: re => {
                console.log(re)
                this.setData({
                    markers: [{
                        latitude: re.latitude,
                        longitude: re.longitude,
                        iconPath: '/images/location.png'
                    }],
                    latitude: re.latitude,
                    longitude: re.longitude,
                })
            }
        })*/
  // },

  setPosition: function (longitude,latitude){
    app.globalData.position = {
      latitude: latitude,
      longitude: longitude}
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {}
});

