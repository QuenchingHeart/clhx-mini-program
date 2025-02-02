
import { contactGet } from '../../../utils/api.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    contacts:[],
    type:'check',
    reload: false
  },
  getContacts:function(){
    var that = this
    contactGet({ userID:app.globalData.userID }).then( res => {
      that.setData({
        contacts: res
      })
      console.log(res)
    })
  },
  navigateToContactDatail: function (e) {
    this.data.reload = true;
    if(this.data.type=='choose'){
      if (e.currentTarget.dataset.type === "add") {
        wx.navigateTo({
          url: '/pages/contact/makeContact/makeContact?type=add'
        })
      } else {
        console.log(e.currentTarget.dataset.contactdetail)
        wx.setStorage({
          key: "contact",
          data: e.currentTarget.dataset.contactdetail
        })
        wx.navigateBack({})
      }
    }else{
      if(e.currentTarget.dataset.type=='edit'){
        wx.navigateTo({
          url: '/pages/contact/makeContact/makeContact?type=edit&id=' + e.currentTarget.dataset.id +'&contactDetail='+JSON.stringify(e.currentTarget.dataset.contactdetail)
        })
      }else if(e.currentTarget.dataset.type=='add'){
        wx.navigateTo({
          url: '/pages/contact/makeContact/makeContact?type=add'
        })
      }
    }


  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getContacts();
    this.data.reload = false;
    this.setData({
      type:options.type
    })
    console.log(options)
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
      this.getContacts();
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