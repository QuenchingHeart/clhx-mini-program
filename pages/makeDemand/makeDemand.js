// pages/makeDemand/makeDemand.js
import { demandsPost,demandOne,demandPut,demandDel ,applyGet} from '../../utils/api.js'
import { getLocal, formatTimeTwo, regFilter } from '../../utils/util.js'
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
    categories: [["物资援助","防控宣传","精准排查","复工咨询","感人故事"],[],[ "志愿服务", "物资需求", "心理关怀","文化科教","卫键服务","创业就业","便民通道","法律援助","社工帮助"],
      ["特殊困难帮助",'家庭困难帮助', '社会组织困难帮助', '社区组织困难帮助', '物业扶贫'],
      ['活动策划','项目评估','资金链接'],
      [ "关爱儿童", "社区养老"],
                  ],
    categoryArray: [['防疫特区', '党建宣传', '社区服务', '特殊困难', '项目策划', '为小为老'], ["物资援助", "防控宣传", "精准排查", "复工咨询", "感人故事"]],
    personorandganization: [
      '个人',
      '组织'
    ],
    countryCodes: ["+86", "+80", "+84", "+87"],
    countryCodeIndex: 0,
    personorandganizationIndex:0,
    demandDetail:{
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
        "district":""
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
    formData:{
      district:"广东省:揭阳市:揭西县",
      isOrganization:false,
      title:"",
      latitude: 23.099994,
      longitude: 113.324520,
      detail:'内容',
      demandCategory: "防疫特区:物资援助",
      contactName: "甲鱼",
      contactPhone: "15651699027",
      startTime:"2020-09-27",
      endTime:"2020-09-30"

    },
    rules:
      [{
        name: 'district',
        rules: { required: true, message: '单选列表是必选项' },
      },
      ],
    type:'add',
    // 页面类型 add,edit,check,delete
    disabled:false,
    applies:[],
    applied:false,
    myApplyID:0
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      personorandganizationIndex: e.detail.value,
      "formData.isOrganization": e.detail.value
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
    if (e.detail.column==0){
      this.setData({
        'categoryArray[1]': this.data.categories[e.detail.value]
      })
    }
  },
  chooseLocation:function(){
    var that = this
    var location = {}
    wx.chooseLocation({
      success: function(res) {
        console.log(res)
        getLocal(res.latitude,res.longitude).then((res)=>
          {
            location = res
            that.setData({
              "formData.latitude": res.latitude,
              "formData.longitude": res.longitude,
              "formData.district": location.province + ":" + location.city + ":" + location.district + ":" + (location.business_area == null ? '' : location.business_area),
              markers: [{
                latitude: res.latitude,
                longitude: res.longitude,
                iconPath: '/image/location.png',
                id: 1
              }]
            })
          that.moveToLocation();
          }
        )
      }
    })
  },
  submitForm:function () {
    var that = this
    console.log(this.data.formData)
    var formData = that.data.formData
    var demandDetail = {
      "demandID" : that.data.demandDetail.demandID,
      "createdBy": {
        "publishUserID": 14,
        "publishUserName": "userName",
        "isOrganization": formData.isOrganization
      },
      "contactName": formData.contactName,
      "contactPhone": formData.contactPhone,
      "location": {
        "longitude": formData.longitude,
        "latitude": formData.latitude,
        "district": formData.district
      },
      "interval": {
        "startTime": Date.parse(formData.startTime)/1000,
        "endTime": Date.parse(formData.endTime)/1000
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
    if(that.data.type=='add'){
      demandsPost(demandDetail).then(data=>{
        console.log(data)
        that.toastAndBack()
     
      })
     
    }else if(that.data.type=='edit'){
       demandPut(demandDetail).then(data=>{
        console.log(data)
         that.toastAndBack()
      })
    }

  },
  toastAndBack:function(){
    wx.showToast({
      title: '成功',
      icon: 'success',
      duration: 5000,
      complete: function () {
        wx.navigateBack({

        })
      }
    })
  },
  formInputChange(e) {
    const { field } = e.currentTarget.dataset
    this.setData({
      [`formData.${field}`]: e.detail.value
    })
  },
  getOnedemand(demandID) {
      demandOne({demandID:demandID}).then(res=>{
        console.log(res)
        var demandDetail = res
          var formData = {
        district:demandDetail.location.district,
        isOrganization:demandDetail.createdBy.isOrganization,
        longitude: demandDetail.location.longitude,
        latitude: demandDetail.location.latitude,
        title:demandDetail.title,
        detail: demandDetail.detail,
        demandCategory: demandDetail.category,
        contactName: demandDetail.contactName,
        contactPhone: demandDetail.contactPhone,
        startTime:formatTimeTwo(demandDetail.interval.startTime,'Y-M-D'),
        endTime:formatTimeTwo(demandDetail.interval.endTime,'Y-M-D')
      };
      console.log(formData)
      this.setData({
        formData:formData,
        demandDetail:demandDetail
      })
      })
  },
  handleOp(options) {
    var disabled = false;
    var applies = []
    var applied = false
    var myApplyID = 0
    var that = this
    console.log(options)
    if(!options.type){
      options.type='add'
    }
    switch (options.type) {
      case 'add':

      break;
      case 'edit':
        this.getOnedemand(options.demandID);
        applyGet({demandID:options.demandID}).then(res=>{
          that.setData({
            applies: res,

          })
          console.log(res)
        })

        break;
      case 'check':
        disabled = true;
        this.getOnedemand(options.demandID);
        applyGet({ demandID: options.demandID,userID:app.globalData.userID }).then(res => {
          console.log(res.length,res[0])
          if(res.length>0){
            applied = true
            myApplyID = res[0].applyID
            console.log('pppp')
            that.setData({
              applied: applied,
              myApplyID: myApplyID
            })
          }


        }).then(res=>{

        })
        break;
      case 'delete':
        demandDel({demandID:options.demandID}).then(res=>{
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
  apply:function(e){
    console.log(e.target.dataset.demandid)
    var demandID = e.target.dataset.demandid
    wx.navigateTo({
      url: '/pages/makeApply/makeApply?type=add&demandID=' + demandID,
    })
  },
  toMyapply:function(e){
    var demandID = e.target.dataset.demandid
    var myapplyID = e.target.dataset.myapplyid
    console.log('/pages/makeApply/makeApply?type=edit&demandID=' + demandID + '&myapplyID=' + myapplyID)
    wx.navigateTo({
      url: '/pages/makeApply/makeApply?type=edit&demandID=' + demandID + '&myapplyID=' + myapplyID,
    })
  },
  cancelDemand: function () {
    wx.navigateTo({
      url: '/pages/makeDemand/makeDemand?type=delete&demandID=' + this.data.demandDetail.demandID,
    })

  },
  cancelForm: function () {
    wx.navigateBack({

    })
  },
  navigateToApplyDatail: function (e) {
    console.log(e.currentTarget)
    wx.navigateTo({
      url: '/pages/makeApply/makeApply?type=check&checkDemandsApply=True&' + 'applyID=' + e.currentTarget.dataset.applyid + '&' + 'demandID=' + e.currentTarget.dataset.demandid
    })
  },
  initData: function(){
    var that = this;

    wx.getLocation({
      type: "gcj02",
      success: re => {
        console.log(re)

        that.setData({
          "formData.latitude": re.latitude,
          "formData.longitude": re.longitude,
          markers: [{
            latitude: re.latitude,
            longitude: re.longitude,
            iconPath: '/image/location.png',
            id:1
          }]
        })

      }
    });

  },
  moveToLocation: function () {
    var that = this;
    console.log('setPosition2', that.data.formData.longitude, that.data.formData.latitude, that.mapCtx)
    that.mapCtx.moveToLocation({
      latitude: that.data.formData.latitude,
      longitude: that.data.formData.longitude,
      success: function (res) {
        console.log(res)
      },
      fail: function (res) {
        console.log(res, 'failed')
      },
      complete: function (res) {
        console.log(res, 'failed')
      }
    })
    console.log('setPosition2', that.data.formData.longitude, that.data.formData.latitude, that.mapCtx)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.initData()
    this.mapCtx = wx.createMapContext('myMapMakeDemad')
    // this.initData()
    this.handleOp(options)

    // this.moveToLocation();


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
    this.initData()
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