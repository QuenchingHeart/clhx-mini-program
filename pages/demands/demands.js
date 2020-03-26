// pages/demands/demands.js
import { demandsAll } from "../../utils/api.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    categories: [["物资援助", "防控宣传", "精准排查", "复工咨询", "感人故事"], [], ["志愿服务", "物资需求", "心理关怀", "文化科教", "卫键服务", "创业就业", "便民通道", "法律援助", "社工帮助"],
    ["特殊困难帮助", '家庭困难帮助', '社会组织困难帮助', '社区组织困难帮助', '物业扶贫'],
    ['活动策划', '项目评估', '资金链接'],
    ["关爱儿童", "社区养老"],
    ],
    categoryArray: [['防疫特区', '党建宣传', '社区服务', '特殊困难', '项目策划', '为小为老'], []],
    curCategoryA:0,
    categoryA:[
      {
        txt: "防疫特区",
        url: '../../image/epidemic.png',
        selected_url: '../../image/selected_epidemic.png',

      },
      {
        txt:"党建宣传",
        url:'../../image/party.png',
        selected_url:'../../image/selected_party.png',

      },
      {
        txt: "社区服务",
        url: '../../image/community.png',
        selected_url: '../../image/selected_community.png',

      },
      {
        txt: "特殊困难",
        url: '../../image/special.png',
        selected_url: '../../image/selected_special.png',

      },
      {
        txt: "项目策划",
        url: '../../image/project.png',
        selected_url: '../../image/selected_project.png',

      },
      {
        txt: "为小为老",
        url: '../../image/oldandkid.png',
        selected_url: '../../image/selected_oldandkid.png',

      }
    ],
    categoryB:[
      "志愿服务",
      "物资需求",
      "心理关怀",
      "文化科教",
      "卫生健康",
      "创业就业",
    ],
    region: ['广东省', '广州市', '海珠区'],
    customItem: '全部',
    filterHelpInfo:{
      categoryA:0
    },
    filterInfo:{
      // category:'',
      // categoryA: 0,
      // categoryB: 0,
      status:'已发布',
      keyword:'%',
      // longitude: 0,
      // latitude: 0,
      // district:'::'
    }
  },
  initData: function() {
    var that = this
    wx.getLocation({
      type: "gcj02",
      success: re => {
        console.log(re)
        that.setData({
          'filterInfo.latitude': re.latitude,
          'filterInfo.longitude': re.longitude,
        })
      }
    });
  },
  bindSearchKeywordChange: function(e){
    var that = this
    console.log(e)
    that.setData({
      'filterInfo.keyword': '%'+e.detail.value+'%'
    })
    that.getDemands()
  },
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var region = e.detail.value
    var regionValue = ['','','']
    var searchValue = ''
    console.log(region)
    regionValue[2] = region[2]
    if(region[0]=='全部')
    {
      searchValue = ''
    }else{
      searchValue = region[0]+':'
      if(region[1]!='全部')
      {
        searchValue = searchValue + region[1] + ':'
        if (region[2] != '全部')
        {
          searchValue = searchValue + region[2]
        }
      }
    }
    if(region[2]=='全部')
    {
      region[2] = ''
      regionValue[2] = region[1]
      if(region[1]=='全部')
      {
        region[1] = ''
        regionValue[2] = region[0]
        if (region[0] == '全部')
        {
          region[0] = ''
        }
      }
    }
    console.log(region, regionValue)
    this.setData({
      'filterInfo.district': searchValue+'%',
      region: regionValue
    })
    this.getDemands()
  },
  adddetial: function () {
    wx.navigateTo({

      url: '../makeDemand/makeDemand?type=add',

      success: function (res) {
        console.log(res)

      },

      fail: function (res) { },

      complete: function (res) { },

    })

  },
  bindCategoryAChange: function (e) {
    console.log(e.target.dataset.id)
    this.setData({
      categoryB: this.data.categories[e.target.dataset.id],
      'filterInfo.category': this.data.categoryArray[e.target.dataset.id]+':'+'%',
      'filterHelpInfo.categoryA': e.target.dataset.id,
      'filterHelpInfo.categoryB': 0,

    })
    this.getDemands()
  },
  bindCategoryBChange: function(e) {
    this.setData({
      'filterInfo.category': this.data.categoryArray[this.data.filterHelpInfo.categoryA] + ':' + this.data.categories[this.data.filterHelpInfo.categoryA][e.target.dataset.id],
      'filterHelpInfo.categoryB': e.target.dataset.id
    })
    this.getDemands()
  },
  getDemands: function(){
    var that = this
    demandsAll(that.data.filterInfo).then(data => {
      console.log(data)
      that.setData({
        demands: data
      });
    });
  },
  chooseLocation: function () {
    var that = this
    var location = {}
    wx.chooseLocation({
      success: function (res) {
        console.log(res)
        getLocal(res.latitude, res.longitude).then((res) => {
          location = res
          that.setData({
            "filterInfo.latitude": res.latitude,
            "filterInfo.longitude": res.longitude,
            "filterInfo.district": location.district
          })
        }
        )
      }
    })
  },
  navigateToDemandDatail: function(e) {
    wx.navigateTo({ 
      url: '/pages/makeDemand/makeDemand?type=check&'+'demandID='+e.target.dataset.demandid
    }) 
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.initData();
    that.getDemands();
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