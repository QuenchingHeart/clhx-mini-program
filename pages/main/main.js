// pages/main/main.js
const app = getApp();
const util = require("../../utils/util.js");
import {
  demandsLocation,
  demandsCount
} from "../../utils/api.js";
const RADIUS = 4
const INIT_CALLOUT = {
  padding: 6,
  display: 'BYCLICK',
  fontSize: 16,
  textAlign: 'center',
  borderRadius: RADIUS,
  borderWidth: 3,
  bgColor: '#ffffff'
}

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

    reload: false,

    mpScale: 0,

    publishedDemandCount: "-",
    connectingDemandCount: "-",
    completedDemandCount: "-"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initData()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    app.editTabbar();
    if (this.data.reload) {
      this.loadDemandsLocation();
      this.loadDemandsCount();
    }
    this.data.reload = true;
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
  /**
   * 点击 marker 的回调，得到 marker id (数组中的下标)
   */
  changeRegion: function (e) {
    // console.log(e)
    var that = this
    if (e.type == "end") {
      that.mapCtxMain.getScale({
        success: res => {
          let demands = that.data.demands
          var op = 'nothing'
          // console.log(res.scale)
          // console.log(that.data.mpScale)
          // 为了避免频繁的刷新，所以设置到达阈值并且与之前的scale不同才会刷新
          if (res.scale > 12 && that.data.mpScale <= 12) {
            op = 'show'
          } else if (res.scale <= 12 && that.data.mpScale > 12) {
            op = 'hide'
          }
          if (op == "show" || op == "hide") {
            that.data.markers.forEach(marker => {
              if (marker.id >= 1) {
                var i = marker.id - 1
                var display = ''
                if (op == 'show') {
                  display = demands[i].status == '已发布' ? 'ALWAYS' : 'BYCLICK'
                } else if (op == 'hide') {
                  display = 'BYCLICK'
                }

                let callout = "markers[" + marker.id + "].callout.display";
                this.setData({
                  [callout]: display
                })
              }
            });
          }
          that.setData({
            mpScale: res.scale
          })
        }
      })
    }

  },

  tapCallout: function (e) {
    console.log(e)
    let demand = this.data.demands[e.markerId - 1];
    let type = 'check';
    this.data.reload = false;
    if (demand.createdBy.publishUserID == app.globalData.userID) {
      type = 'edit';
      this.data.reload = true;
    }
    wx.navigateTo({
      url: '/pages/makeDemand/makeDemand?type=' + type + '&' + 'demandID=' + demand.demandID
    })
  },

  tapUm: function (marker) {
    console.log(this.data.markers[marker.markerId])
    if (marker.markerId >= 1 && marker.markerId < this.data.demands.length + 1) {
      // let callout = "markers[" + marker.markerId + "].callout";
      // this.setData({
      //   [callout]: {
      //     content: '腾讯总部大楼',
      //     padding: 10,
      //     borderRadius: 2
      //   }
      // })
      console.log(this.data.demands[marker.markerId - 1])
    } else if (marker.markerId >= this.data.demands.length + 1) {
      // resource
    } else if (marker.markerId == 0) {
      // current location
    }
  },

  loadDemandsLocation() {
    demandsLocation().then(demands => {
      var that = this;
      let markers = [that.data.markers[0]];
      for (let i = 0; i < demands.length; i++) {
        let color = demands[i].status == "已发布" ? "#f37b1d" :
          demands[i].status == "对接中" ? "#1cbbb4" :
          "#aaaaaa"
        markers.push({
          latitude: demands[i].latitude,
          longitude: demands[i].longitude,
          iconPath: demands[i].status == '已发布' ? '/image/demand_published.png' :
            demands[i].status == '对接中' ? '/image/demand_connecting.png' :
            '/image/demand_completed.png',
          width: '34px',
          height: '34px',
          id: 1 + i,
          callout: {
            ...INIT_CALLOUT,
            content: demands[i].title,
            color: color,
            borderColor: color
          },
        })
      }

      that.setData({
        markers,
        demands
      })

      // that.data.reload = false;
    });
  },

  loadDemandsCount() {
    demandsCount().then(count => {
      var that = this;
      that.setData({
        publishedDemandCount: count.published,
        connectingDemandCount: count.connecting,
        completedDemandCount: count.completed
      })
    });
  },

  initData: function (options) {
    var that = this;
    that.mapCtxMain = wx.createMapContext('myMap')

    wx.getLocation({
      type: "gcj02",
      success: re => {
        // console.log(re)

        // Draw current location.
        that.setData({
          latitude: re.latitude,
          longitude: re.longitude,
          markers: [{
            latitude: re.latitude,
            longitude: re.longitude,
            iconPath: '/image/location.png',
            width: '34px',
            height: '34px',
            id: 0
          }]
        })

        that.setPosition(re.longitude, re.latitude)
        that.moveToLocation();

        util.getLocal(re.latitude, re.longitude).then((res) => {
          that.setData({
            inputInfo: res.formatted_address
          })
        })

        // Show demands count.
        that.loadDemandsCount();

        // Draw all demands.
        that.loadDemandsLocation();

        // Draw all resources.
      }
    });

    //  this.getAroundUm();
  },

  chooseLocation: function () {
    var that = this;
    wx.chooseLocation({
      success: (re) => {
        that.position = re.longitude + ',' + re.latitude
        // console.log(that.position)

        that.setData({
          latitude: re.latitude,
          longitude: re.longitude,
          'markers[0].longitude': re.longitude,
          'markers[0].latitude': re.latitude
        })
        // that.setPosition(re.longitude, re.latitude)
        // console.log('setPosition', re.longitude, re.latitude)

        util.getLocal(re.latitude, re.longitude).then((res) => {
          that.setData({
            inputInfo: res.formatted_address
          });
          that.moveToLocation();
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