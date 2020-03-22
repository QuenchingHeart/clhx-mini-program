const app = getApp();
const util = require("../../utils/util.js");
import { applyPost } from "../../utils/api.js";
Page({
  data:{
    formData: {
      "applyID": 0,
      "createdAt": 0,
      "createdBy": {
        "applyerID": 0,
        "isOrganization": false
      },
      "demandID": 0,
      "contactName": "甲鱼对接测试1",
      "contactPhone": "15651699022",
      "detail": "甲鱼对接测试1",
      "status": "待审核"
    },
    type:'add',
    //add del edit check
  },
  initData: function (options) {
    var that = this
    that.setData({
      'formData.createdBy.applyerID': app.globalData.userID,
      'formData.demandID': options.demandID
    })
    console.log(that.data.formData)
  },
  onLoad: function (options){
    var that = this
    that.initData(options)
  },
  formInputChange(e) {
    const { field } = e.currentTarget.dataset
    this.setData({
      [`formData.${field}`]: e.detail.value
    })
  },

  submitForm: function (){
    var that = this
    applyPost(this.data.formData).then(res=>{
      console.log(res)
      that.setData({
        formData:res
      })
    })
  },
  cancelForm: function(){
    wx.navigateBack({
      
    })
  }

})