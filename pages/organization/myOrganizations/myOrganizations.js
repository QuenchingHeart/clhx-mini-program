// pages/myApply/myApply.js
import { organizationInGet, organizationApplyGet } from '../../../utils/api.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    organizations: [],
    reload: false
  },
  getOrganizations: function () {
    var that = this
    organizationInGet({ userID: app.globalData.userID }).then(res => {
      that.setData({
        organizations: res
      })
      console.log(res)
    })
  },
  navigateToOrgDatail: function (e) {
    this.data.reload = true;
    if (e.currentTarget.dataset.type == 'check') {
      wx.navigateTo({
        url: '/pages/organization/makeOrganization/makeOrganization?type=check&organizationID=' + e.currentTarget.dataset.organizationid
      })
    } else if (e.currentTarget.dataset.type == 'edit') {
      wx.navigateTo({
        url: '/pages/organization/organization/organization?type=edit&organizationID=' + e.currentTarget.dataset.organizationid
      })
    } else {
      wx.navigateTo({
        url: '/pages/organization/organizations/organizations'
      })
    }


  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getOrganizations();
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
      this.getOrganizations();
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