const app = getApp();
import {  getLocal } from "../../../utils/util.js"
const formUtil = require('../../../utils/formUtil.js')
import { organizationApplyPost,organizationApplyGet, organizationGet, organizationDel,organizationAuditPut } from "../../../utils/api.js";
Page({
  data:{
    formData: {
      reason:'',
    },
    formAuditData:{
      "userID": 0,
      "applyID": 0,
      "agree": true,
      "reason": ""
    },
    type:'add',
    //add del edit check

  },
  initData: function (options) {
    var that = this
    wx.getLocation({
      type: "gcj02",
      success: loc => {
        getLocal(loc.latitude, loc.longitude).then((res) => {
          that.setData({
            'formData.userID': app.globalData.userID,
            'formData.organizationID': parseInt(options.organizationID),
            'formAuditData.userID': app.globalData.userID,
            "formData.latitude": res.latitude,
            "formData.longitude": res.longitude,
            "formData.address": res.formatted_address,
            markers: [{
              latitude: res.latitude,
              longitude: res.longitude,
              iconPath: '/image/location.png',
              width: '34px',
              height: '34px',
              id: 1
            }]
          });
        })
      }
    });
  },
  onLoad: function (options){
    var that = this
    this.mapCtx = wx.createMapContext('myMapMakeOrganization')
    that.handleOp(options)
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      personorandganizationIndex: e.detail.value,
      "formData.isOrganization": e.detail.value
    })
  },
  formInputChange(e) {
    const { field } = e.currentTarget.dataset
    console.log(field,e.detail.value,e)
    if(this.data.type!='audit'){
      this.setData({
        [`formData.${field}`]: e.detail.value
      })
    }else{
      this.setData({
        [`formAuditData.${field}`]: e.detail.value
      })
    }

  },
  chooseLocation: function() {
    var that = this
    var location = {}
    wx.chooseLocation({
      success: function(loc) {
        // console.log("****chooseLocation")
        getLocal(loc.latitude, loc.longitude).then((res) => {
          that.setData({
            "formData.latitude": res.latitude,
            "formData.longitude": res.longitude,
            // "formData.district": res.province + ":" + res.city + ":" + res.district + ":" + (res.business_area == null ? '' : res.business_area),
            "formData.address": loc.name,
            markers: [{
              latitude: res.latitude,
              longitude: res.longitude,
              iconPath: '/image/location.png',
              width: '34px',
              height: '34px',
              id: 1
            }]
          })
        });
        that.moveToLocation();
      }
    })
  },
  moveToLocation: function() {
    var that = this;
    console.log('setPosition1', that.data.formData.longitude, that.data.formData.latitude, that.mapCtx)
    that.mapCtx.moveToLocation({
      latitude: that.data.formData.latitude,
      longitude: that.data.formData.longitude,
      // latitude,
      // longitude,
      success: function(res) {
        console.log(res)
      },
      fail: function(res) {
        console.log(res, 'failed')
      },
      complete: function(res) {
        console.log(res, 'failed')
      }
    })
    console.log('setPosition2', that.data.formData.longitude, that.data.formData.latitude, that.mapCtx)
  },
  submitForm: function (e){
    var checkRes = formUtil.checkNullForm(e);
    if(checkRes){
      var that = this
      console.log(that.data)
      if (that.data.type == 'add') {
        organizationApplyPost(this.data.formData).then(res => {
          console.log(res)
          that.setData({
            formData: res
          })
          that.toastAndBack(2)
        })
      } else if (that.data.type == 'edit') {
        // organizationPut(this.data.formData).then(res => {
        //   console.log(res)
        //   that.setData({
        //     formData: res
        //   })
        //   that.toastAndBack()
        // })
      }else if(that.data.type=='audit') {
        organizationAuditPut(this.data.formAuditData).then(res => {
          console.log(res)
          that.toastAndBack()
        })
      }
    }
    
  },
  cancelForm: function(){
    wx.navigateBack({
      
    })
  },

  handleOp(options) {
    var disabled = false;
    var applies = []
    var applied = false
    var myid = 0
    var that = this
    console.log(options)
    switch (options.type) {
      case 'add':
        that.initData(options)
        break;
      case 'edit':
        organizationGet({keyword:options.keyword}).then(res=>{
          console.log(res)
          that.setData({
            formData: res[0],
          })
        })

        break;
        case 'check':
          organizationGet({keyword:options.keyword}).then(res=>{
            console.log(res)
            that.setData({
              formData: res[0],
            })
          })
  
          break;
      case 'audit':
        this.setData({
          formData:JSON.parse(options.applyDetail),
          "formAuditData.userID":app.globalData.userID,
          "formAuditData.applyID":JSON.parse(options.applyDetail).applyID
        })
        break;
      case 'delete':
        organizationDel({ organizationID : options.orgID,userID:app.globalData.userID }).then(res => {
          console.log(res)
          that.toastAndBack()
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
  cancelOrganization: function () {   
    this.handleOp({
      type:'delete',
      orgID:this.data.formData.orgID
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
})