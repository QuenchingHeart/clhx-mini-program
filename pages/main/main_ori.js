// pages/main/main.js
const app = getApp();
const util = require("../../utils/util.js");
import { damandsAll } from "../../utils/api.js";
Component({
  /**
   * 页面的初始数据
   */
  properties: {
    markers: {
      type: Array,
      value: [],
      observer: function (newVal, oldVal) { }
    },
    latitude: {
      type:Number,
      value: 23.54972,
      observer: function (newVal, oldVal) { }
    },
    longitude: {
      type: Number,
      value: 116.37271,
      observer: function (newVal, oldVal) { }
    },
    demands: Array,
    searchText: { // 属性名
      type: String, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: '选择位置', // 属性初始值（可选），如果未指定则会根据类型选择一个
      observer: function (newVal, oldVal) { } // 属性被改变时执行的函数（可选），也可以写成在methods段中定义的方法名字符串, 如：'_propertyChange'
    },
    inputInfo: { // 属性名
      type: String, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: '选择位置', // 属性初始值（可选），如果未指定则会根据类型选择一个
      observer: function (newVal, oldVal) { } // 属性被改变时执行的函数（可选），也可以写成在methods段中定义的方法名字符串, 如：'_propertyChange'
    },
    position: String,

  },
  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () { this.initData()},
    moved: function () { },
    detached: function () { },
  },

  // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
  attached: function () { }, // 此处attached的声明会被lifetimes字段中的声明覆盖
  ready: function () { },

  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function () {  },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  
  methods:{
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
              iconPath: '/image/location.png'
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
              iconPath: '/image/location.png'
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
        fail:function(res){
          console.log(res,'failed')
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
  }
  

});

