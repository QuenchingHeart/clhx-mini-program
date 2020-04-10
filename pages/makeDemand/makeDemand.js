// pages/makeDemand/makeDemand.js
const formUtil = require('../../utils/formUtil.js')
import {
  demandsPost,
  demandOne,
  demandPut,
  demandDel,
  applyGet,
  organizationInGet
} from '../../utils/api.js'
import {
  getLocal,
  formatTimeTwo
} from '../../utils/util.js'
const app = getApp()
// const regeneratorRuntime = require('../../libs/regenerator-runtime/runtime')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    markers: [{
      id: 1,
      latitude: 23.099994,
      longitude: 113.324520,
    }],


    multiIndex: [0, 0],
    categories: [
      ["物资援助", "防控宣传", "精准排查", "复工咨询", "感人故事"],
      [""],
      ["志愿服务", "物资需求", "心理关怀", "文化科教", "卫键服务", "创业就业", "便民通道", "法律援助", "社工帮助"],
      ["特殊群体", '家庭困难', '组织困难', '物业扶贫'],
      ['活动策划', '项目评估', '资金链接'],
      ["关爱儿童", "社区养老"],
    ],
    categoryArray: [
      ['防疫特区', '党建宣传', '社区服务', '特殊困难', '项目策划', '为小为老'],
      ["物资援助", "防控宣传", "精准排查", "复工咨询", "感人故事"]
    ],
    demander: [
      "个人",
      "组织"
    ],
    organizations: [],
    orgsPicker: [],
    organizationsIndex:0,
    countryCodes: ["+86", "+80", "+84", "+87"],
    countryCodeIndex: 0,
    demanderIndex: 0,
    demandDetail: {
      "demandID": 0,
      "createdAt": 0,
      "pageView": 0,
      "createdBy": {
        "publishUserID": 0,
        "publishUserName": "string",
        "isOrganization": true
      },
      "contactName": "string",
      "-contactPhone": "string",
      "location": {
        "longitude": 0,
        "latitude": 0,
        "district": ""
      },
      "interval": {
        "startTime": 0,
        "endTime": 0
      },
      "category": "大类:小类",
      "title": "【XX社区】紧缺口罩",
      "detail": "本社区紧缺口罩......",
      "status": "已发布"
    },
    formData: {
      isOrganization: false,
      title: "",
      latitude: 23.099994,
      longitude: 113.324520,
      district: "广东省:揭阳市:揭西县:",
      address: '',
      detail: '',
      demandCategory: "防疫特区:物资援助",
      contactName: "",
      contactPhone: "",
      startTime: formatTimeTwo(Math.round(new Date().getTime() / 1000).toString(), 'Y-M-D'),
      endTime: formatTimeTwo((Math.round(new Date().getTime() / 1000) + 86400).toString(), 'Y-M-D'),
      status: "已发布"
    },
    rules: [{
      name: 'district',
      rules: {
        required: true,
        message: '单选列表是必选项'
      },
    }, ],
    type: 'add',
    // 页面类型 add,edit,check,delete
    disabled: false,
    applies: [],
    applied: false,
    applyID: 0,
    userID:0,
    options:{},

    returnFromApply: false

  },
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    const {
      field
    } = e.currentTarget.dataset
    this.setData({
      [`${field}`]: e.detail.value
    })

  },
  bindMultiPickerChange(e) {
    console.log('change multipicker')
    console.log(e.detail)
    var multiIndex = e.detail.value
    console.log(this.data.categoryArray[0][multiIndex[0]] + ':' + this.data.categoryArray[1][multiIndex[1]])
    this.setData({
      multiIndex: e.detail.value,
      "formData.demandCategory": this.data.categoryArray[0][multiIndex[0]] + ':' + this.data.categoryArray[1][multiIndex[1]]
    })
  },
  bindMultiPickerColumnChange(e) {
    console.log(e)
    if (e.detail.column == 0) {
      this.setData({
        'categoryArray[1]': this.data.categories[e.detail.value]
      })
    }
  },
  chooseLocation: function() {
    var that = this
    wx.chooseLocation({
      success: function(loc) {
        // console.log("****chooseLocation")
        getLocal(loc.latitude, loc.longitude).then((res) => {
          that.setData({
            "formData.latitude": res.latitude,
            "formData.longitude": res.longitude,
            "formData.district": res.province + ":" + res.city + ":" + res.district + ":" + (res.business_area == null ? '' : res.business_area),
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
  submitForm: function(e) {
    var checkRes = formUtil.checkNullForm(e);
    if(checkRes){
      console.log("调用工具结果：", checkRes)
      let that = this
      console.log(this.data.formData)
      let formData = that.data.formData;
      let orgs = that.data.organizations;
      let demanderIndex = that.data.demanderIndex;
      let organizationsIndex = that.data.organizationsIndex;
      formData.isOrganization = demanderIndex==1?true:false;
      let demandDetail = {
        "demandID": that.data.demandDetail.demandID,
        "createdBy": {
          "publishUserID": formData.isOrganization ? orgs[organizationsIndex].orgID : app.globalData.userID,
          "publishUserName": formData.isOrganization ? orgs[organizationsIndex].name : "",
          "isOrganization": formData.isOrganization
        },
        "contactName": formData.contactName,
        "contactPhone": formData.contactPhone,
        "location": {
          "longitude": formData.longitude,
          "latitude": formData.latitude,
          "district": formData.district,
          "address": formData.address
        },
        "interval": {
          "startTime": Date.parse(formData.startTime) / 1000,
          "endTime": Date.parse(formData.endTime) / 1000
          // "time": formatTimeTwo(Date.parse(formData.startTime) / 1000,'Y-M-D')
        },
        "category": formData.demandCategory,
        "title": formData.title,
        "detail": formData.detail,
      }
      that.setData({
        demandDetail: demandDetail
      })
      console.log(that.data.type, demandDetail)
      if (that.data.type == 'add') {
        demandsPost(demandDetail).then(data => {
          console.log(data)
          that.toastAndBack()
  
        })
  
      } else if (that.data.type == 'edit') {
        demandPut(demandDetail).then(data => {
          console.log(data)
          that.toastAndBack()
        })
      }
    }
   

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
  formInputChange(e) {
    const {
      field
    } = e.currentTarget.dataset
    this.setData({
      [`formData.${field}`]: e.detail.value
    })
  },

  getOnedemand(options) {
    var that = this;
    demandOne({ demandID: options.demandID }).then(demandDetail => {
      // console.log(demandDetail)
      getLocal(demandDetail.location.latitude, demandDetail.location.longitude).then(res => {
        that.setData({
          demandDetail,
          // demander: [demandDetail.createdBy.isOrganization ? demandDetail.createdBy.publishUserName : "个人"],
          demanderIndex:demandDetail.createdBy.isOrganization?1:0,
          formData: {
            isOrganization: demandDetail.createdBy.isOrganization,
            title: demandDetail.title,
            detail: demandDetail.detail,
            demandCategory: demandDetail.category,
            contactName: demandDetail.contactName,
            contactPhone: demandDetail.contactPhone,
            startTime: formatTimeTwo(demandDetail.interval.startTime, 'Y-M-D'),
            endTime: formatTimeTwo(demandDetail.interval.endTime, 'Y-M-D'),
            latitude: demandDetail.location.latitude,
            longitude: demandDetail.location.longitude,
            district: res.province + ":" + res.city + ":" + res.district + ":" + (res.business_area == null ? '' : res.business_area),
            address: demandDetail.location.address,
            status: demandDetail.status
          },
          markers: [{
            latitude: res.latitude,
            longitude: res.longitude,
            iconPath: '/image/location.png',
            width: '34px',
            height: '34px',
            id: 1
          }]
        })
        that.moveToLocation();
        console.log(demandDetail)
        if(demandDetail.createdBy.isOrganization){
          that.getOrganizations(options);
        }

        // if (options.type === "check") {
        //   that.setData({
        //     demander: [demandDetail.createdBy.publishUserName]
        //   })
        // } else if (options.type === "edit" && demandDetail) {
        //   that.getOrganizations(options);
        // }
      });
    });
  },

  getOrganizations: function (options) {
    let that = this;
    organizationInGet({ userID: app.globalData.userID }).then(orgs => {
      // let demander = ["个人"];
      // let demanderIndex = 0;
      // console.log(res)
      let orgsPicker = [];
      let organizationsIndex = 0;
      for (let i = 0; i < orgs.length; i++) {
        orgsPicker = orgsPicker.concat(orgs[i].name);
        if (options.type === "edit" && orgs[i].name === that.data.demandDetail.createdBy.publishUserName) {
          organizationsIndex =  i;
        }
      }
      that.setData({
        organizations: orgs,
        orgsPicker: orgsPicker,
        organizationsIndex: organizationsIndex
      })
    })
  },

  handleOp(options) {
    var disabled = false;
    var applied = false
    var that = this
    console.log(options)
    if (!options.type) {
      options.type = 'add'
    }
    switch (options.type) {
      case 'add':
        that.getCurrentLocation();
        that.getOrganizations(options);
        break
      case 'edit':
        this.getOnedemand(options);
        applyGet({
          demandID: options.demandID
        }).then(res => {
          that.setData({
            applies: res
          })
          console.log(res)
        })

        break;
      case 'check':
        disabled = true;
        this.getOnedemand(options);
        applyGet({
          demandID: options.demandID,
          // userID: app.globalData.userID
        }).then(res => {
          // console.log(res.length, res[0])
          if (res.length > 0) {
            applied = true
            console.log('pppp')
            that.setData({
              // applyID: res[0].applyID,
              myApplies:res
              // applies:res
            })
          }
          that.setData({
            applied: applied
          })
        }).then(res => {

        })
        break;
      case 'delete':
        demandDel({
          demandID: options.demandID
        }).then(res => {
          console.log(res)
          that.toastAndBack(1)
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

  apply: function(e) {
    console.log(e.target.dataset.demandid)
    var demandID = e.target.dataset.demandid
    this.data.returnFromApply = true;
    wx.navigateTo({
      url: '/pages/makeApply/makeApply?type=add&demandID=' + demandID,
    })
  },
  toMyapply: function(e) {
    var demandID = e.target.dataset.demandid
    var applyID = e.target.dataset.applyid
    var isorganization = e.target.dataset.isorganization
    this.data.returnFromApply = true;
    wx.navigateTo({
      url: '/pages/makeApply/makeApply?type=edit&demandID=' + demandID + '&applyID=' + applyID+'&isOrganization='+isorganization,
    })
  },
  cancelDemand: function() {
    this.handleOp({
      type:'delete',
      demandID:this.data.demandDetail.demandID
    })

  },
  cancelForm: function() {
    wx.navigateBack({

    })
  },

  navigateToApplyDatail: function(e) {
    console.log(e.currentTarget)
    this.data.returnFromApply = true;
    wx.navigateTo({
      url: '/pages/makeApply/makeApply?type=check&checkDemandsApply=True&' + 'applyID=' + e.currentTarget.dataset.applyid + '&' + 'demandID=' + e.currentTarget.dataset.demandid
    })
  },

  getCurrentLocation: function() {
    var that = this;

    wx.getLocation({
      type: "gcj02",
      success: loc => {
        console.log(loc)
        
        getLocal(loc.latitude, loc.longitude).then((res) => {
          that.setData({
            "formData.latitude": res.latitude,
            "formData.longitude": res.longitude,
            "formData.district": res.province + ":" + res.city + ":" + res.district + ":" + (res.business_area == null ? '' : res.business_area),
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

  chooseContact:function(){
    wx.navigateTo({
      url: '/pages/contact/contacts/contacts?type=choose',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      userID: app.globalData.userID,
      options: options
    })
    console.log(options)
    this.mapCtx = wx.createMapContext('myMapMakeDemad')
    this.handleOp(options)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    if (this.data.returnFromApply) {
      this.handleOp(this.data.options);
      this.data.returnFromApply = false;
    }
    var that = this
    wx.getStorage({
      key: 'contact',
      success (res) {
        let data = res.data
        if (data) {
          that.setData({
            "formData.contactName":data.contactName,
            "formData.contactPhone":data.contactPhone,
            "formData.address": data.address,
            "formData.latitude": data.latitude,
            "formData.longitude": data.longitude,
            markers: [{
              latitude: data.latitude,
              longitude: data.longitude,
              iconPath: '/image/location.png',
              width: '34px',
              height: '34px',
              id: 1
            }]
          });
          that.moveToLocation();
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})