// pages/myDemands/myDemands.js
import { demandsAll } from '../../utils/api.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    demands:[]

  },
  getMyDemands: function() {
    var that = this
    demandsAll({userID:app.globalData.userID}).then(res=>{
      that.setData({
        demands:res
      })
      console.log(res)
    })
  },
  navigateToDemandDatail: function (e) {
    console.log(e)
    wx.navigateTo({
      url: '/pages/makeDemand/makeDemand?type=edit&' + 'demandID=' + e.currentTarget.dataset.demandid
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMyDemands()
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

  }
})