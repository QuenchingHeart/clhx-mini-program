// pages/userInfo/makeUserinfo/makeUserInfo.js
const formUtil = require('../../../utils/formUtil.js')
import {nicknameUpdate} from '../../../utils/api'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    formData:{
      nickname:'erestu',
      userID:52
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.setData({
      "formData.nickname":app.globalData.nickname,
      "formData.userID":app.globalData.userID
    })
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
  submitForm: function (e){
    var checkRes = formUtil.checkNullForm(e);
    console.log('click')
    if(checkRes){
      var that = this
      console.log(that.data)
      nicknameUpdate(that.data.formData).then(res=>{
        console.log(res)
        app.globalData.nickname = res.nickname
        that.toastAndBack()
      })
    }
  },
  formInputChange(e) {
    const { field } = e.currentTarget.dataset
    this.setData({
      [`formData.${field}`]: e.detail.value
    })
  },
  toastAndBack: function(page=1) {
    console.log(page)
    wx.showToast({
      title: '成功',
      icon: 'success',
      duration: 5000,
      complete: function() {
        wx.navigateBack({
          delta: page
        })
      }
    })
  },
  cancelForm: function() {
    wx.navigateBack({

    })
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