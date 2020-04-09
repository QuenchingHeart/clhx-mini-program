// pages/myApply/myApply.js
import { organizationGet,organizationApplyGet } from '../../../utils/api.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    organizations:[],
    reload: false
  },
  getOrganizations:function(){
    var that = this
    organizationGet({ userID:app.globalData.userID }).then( res => {
      that.setData({
        organizations: res
      })
      console.log(res)
    })
  },
  navigateToContactDatail: function (e) {
    this.data.reload = true;
    console.log(e)
    if(e.currentTarget.dataset.type=='edit'){
      wx.navigateTo({
        url: '/pages/organization/makeOrganization/makeOrganization?type=edit&id=' + e.currentTarget.dataset.id +'&organizationDetail='+JSON.stringify(e.currentTarget.dataset.organizationdetail)
      })
    }else if(e.currentTarget.dataset.type=='add'){
      wx.navigateTo({
        url: '/pages/organization/makeOrganization/makeOrganization?type=add'
      })
    }else if(e.currentTarget.dataset.type=='check'){
      wx.navigateTo({
        url: '/pages/organization/makeOrganization/makeOrganization?type=check&id='+ e.currentTarget.dataset.id
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