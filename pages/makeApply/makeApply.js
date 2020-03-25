const app = getApp();
const util = require("../../utils/util.js");
import { applyPost, applyGet, applyPut, applyDel, connectApprove, connectComplete, connectDel} from "../../utils/api.js";
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
    checkDemandsApply: false,
    connectData:{
      '对接中':[{'完成对接':'complete'},{'撤销对接':'delete'}],
    }
    //切换对接状态！！！
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
    
    that.handleOp(options)
  },
  formInputChange(e) {
    const { field } = e.currentTarget.dataset
    this.setData({
      [`formData.${field}`]: e.detail.value
    })
  },

  submitForm: function (){
    var that = this
    console.log(that.data)
    if (that.data.type == 'add') {
      applyPost(this.data.formData).then(res => {
        console.log(res)
        that.setData({
          formData: res
        })
      })
    } else if (that.data.type == 'edit') {
      applyPut(this.data.formData).then(res => {
        console.log(res)
        that.setData({
          formData: res
        })
      })
    }
  },
  cancelForm: function(){
    wx.navigateBack({
      
    })
  },
  connectOp:function(e){
    var type = e.target.dataset.type
    var that = this
    var params = {
      applyID: that.data.formData.applyID,
      demandID: that.data.formData.demandID,
    }
    switch (type){
      case 'approve':
        connectApprove(params).then(res=>{
          console.log(res)
        })
        break;
      case 'complete':
        connectComplete(params).then(res=>{
          console.log(res)
        })
        break;
      case 'delete':
        connectDel(params).then(res=>{
          console.log(res)
        })
        break;
    }
  },
  handleOp(options) {
    var disabled = false;
    var applies = []
    var applied = false
    var myApplyID = 0
    var that = this
    console.log(options)
    switch (options.type) {
      case 'add':
        that.initData(options)
        break;
      case 'edit':
        // this.applyGet(options.applyID);
        var params = { applyID: options.applyID, demandID: options.demandID, userID: app.globalData.userID}
        applyGet(params).then(res => {
          that.setData({
            formData: res[0],

          })
          console.log(res[0])
        })

        break;
      case 'check':
        disabled = true;
        //判断是否是个人的！！！
        var params = { applyID: options.applyID}
        if (options.checkDemandsApply) {
          params['demandID'] = options.demandID
        }else{
          params['userID'] = app.globalData.userID
        }
        applyGet(params).then(res => {
          console.log(res.length, res[0])
          if (res.length > 0) {
            applied = true
            myApplyID = res[0].applyID
            console.log('pppp')
            that.setData({
              applied: applied,
              myApplyID: myApplyID,
              formData: res[0]
            })
          }
          if (options.checkDemandsApply){
            that.setData({
              checkDemandsApply: true
            })

          }
                   
        })
        break;
      case 'delete':
        applyDel({ applyID: options.applyID }).then(res => {
          console.log(res)
          applies = res
        })
        break;


      default:
        break;
    }
    this.setData({
      type: options.type,
      disabled: disabled,
    })
    console.log(this.data)
  },
  cancelApply: function () {                       
    wx.navigateTo({
      url: '/pages/makeApply/makeApply?type=delete&applyID=' + this.data.formData.applyID,
    })

  },
})