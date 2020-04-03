// pages/myApply/myApply.js
import { applyGet } from '../../utils/api.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    applies:[],
    reload: false
  },
  getMyapplies:function(){
    var that = this
    applyGet({ userID:app.globalData.userID }).then( res => {
      res.forEach((item) => {
        item.detail = item.detail.length > 10 ? item.detail.substring(0, 10) : item.detail
      })
      that.setData({
        applies: res
      })
      console.log(res)
    })
  },
  navigateToApplyDatail: function (e) {
    console.log(e.currentTarget.dataset.applyid)
    this.data.reload = true;
    wx.navigateTo({
      url: '/pages/makeApply/makeApply?type=edit&applyID=' + e.currentTarget.dataset.applyid + '&demandID=' + e.currentTarget.dataset.demandid
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMyapplies();
    this.data.reload = false;
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
    if (this.data.reload) {
      this.getMyapplies();
    }
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