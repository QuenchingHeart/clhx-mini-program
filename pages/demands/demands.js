// pages/demands/demands.js
const app = getApp();
import {
  demandsAll
} from "../../utils/api.js";
Component({

  /**
   * 页面的初始数据
   */
  properties: {
    tabbar: {
      type: Object,
      value: {}
    },
    TabCur: {
      type: Number,
      value: 0
    },
    MainCur: {
      type: Number,
      value: 0
    },
    VerticalNavTop: {
      type: Number,
      value: 0
    },
    load: {
      type: Boolean,
      value: true
    },
    gridCol: {
      type: Number,
      value: 5
    },
    categories: {
      type: Array,
      value: [
        ["全部","红心说政","寻找社区英雄","党团共建"],
        ["全部","物资需求","卫健服务","创业就业","法律援助","物业纠纷处理","关爱儿童","社区养老","志愿者招募"],
        ["全部","无人机服务","社工培训","社科试验田","社区实验室","儿童编程","手绘社区","金牌家教","飞行员之家","国学讲堂","三航科普"],
        ["全部","特殊群体","家庭困难","组织困难","物业扶贫"],
        ["全部","防疫课程","防控宣传","物资援助","精准排查","复工咨询"]
      ]
    },
    categoryArray: {
      type: Array,
      value: ["党建宣传","社区服务","文化科技","特殊困难","防疫特区"]
    },
    curCategoryA: {
      type: Number,
      value: 0
    },
    categoryA: {
      type: Array,
      value: [{
          txt: "党建宣传",
          url: '../../image/demands.png',
          selected_url: '../../image/selected_demands.png',
          icon: 'upstagefill',
          color: 'red',
          badge: 120,

        },
        {
          txt: "社区服务",
          url: '../../image/demands.png',
          selected_url: '../../image/selected_demands.png',
          icon: 'camerafill',
          color: 'red',
          badge: 120,

        },
        {
          txt: "文化科技",
          url: '../../image/demands.png',
          selected_url: '../../image/selected_demands.png',
          icon: 'servicefill',
          color: 'red',
          badge: 120,

        },
        {
          txt: "特殊困难",
          url: '../../image/demands.png',
          selected_url: '../../image/selected_demands.png',
          icon: 'wefill',
          color: 'red',
          badge: 120,

        },
        {
          txt: "防疫特区",
          url: '../../image/demands.png',
          selected_url: '../../image/selected_demands.png',
          icon: 'writefill',
          color: 'red',
          badge: 120,

        },
      ]
    },
    categoryB: {
      type: Array,
      value: [
        "红心说政",
        "寻找社区英雄",
        "党团共建"
      ]
    },
    region: {
      type: Array,
      value: ['江苏省', '南京市', '江宁区']
    },
    customItem: {
      type: String,
      value: '全部'
    },
    filterHelpInfo: {
      type: Object,
      value: {
        categoryA: 0
      }
    },
    filterInfo: {
      type: Object,
      value: {
        // category:'',
        // categoryA: 0,
        // categoryB: 0,
        status: '已发布:对接中',
        keyword: '%',
        location: {
          longitude: 0,
          latitude: 0
        }
        // longitude: 0,
        // latitude: 0,
        // district:'::'
      }
    }
  },
  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function() {
      var that = this
      that.initData();
      app.editTabbar();
    },
    moved: function() {},
    detached: function() {},
  },

  // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
  attached: function() {}, // 此处attached的声明会被lifetimes字段中的声明覆盖
  ready: function() {},

  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function() {
      var that = this
      if (!that.data.load) {
        that.initData();
        app.editTabbar();
      }
    }
  },
  methods: {
    initData: function() {
      var that = this
      wx.getLocation({
        type: "gcj02",
        success: re => {
          console.log(re)
          that.setData({
            'filterInfo.location.latitude': re.latitude,
            'filterInfo.location.longitude': re.longitude,
          })
          that.getDemands()
        }
      });
      this.setData({
        categoryB: this.data.categories[this.data.filterHelpInfo.categoryA]
      })
      that.initList();
    },

    initList: function() {
      let list = [{}];
      for (let i = 0; i < this.data.categoryB.length; i++) {
        list[i] = {};
        list[i].name = this.data.categoryB[i];
        list[i].id = i;
      }
      this.setData({
        list: list,
        listCur: list[0],
        TabCur: 0
      })
    },

    bindSearchKeywordChange: function(e) {
      var that = this
      console.log(e)
      that.setData({
        'filterInfo.keyword': '%' + e.detail.value + '%'
      })
      that.getDemands();
    },

    bindRegionChange: function(e) {
      console.log('picker发送选择改变，携带值为', e.detail.value)
      var region = e.detail.value
      var regionValue = ['', '', '']
      var searchValue = ''
      console.log(region)
      regionValue[2] = region[2]
      if (region[0] == '全部') {
        searchValue = ''
      } else {
        searchValue = region[0] + ':'
        if (region[1] != '全部') {
          searchValue = searchValue + region[1] + ':'
          if (region[2] != '全部') {
            searchValue = searchValue + region[2]
          }
        }
      }
      if (region[2] == '全部') {
        region[2] = ''
        regionValue[2] = region[1]
        if (region[1] == '全部') {
          region[1] = ''
          regionValue[2] = region[0]
          if (region[0] == '全部') {
            region[0] = ''
          }
        }
      }
      console.log(region, regionValue)
      this.setData({
        'filterInfo.district': searchValue + '%',
        region: regionValue
      })
      this.getDemands()
    },

    bindCategoryAChange: function(e) {
      console.log(e.currentTarget.dataset.id)
      this.setData({
        categoryB: this.data.categories[e.currentTarget.dataset.id],
        'filterInfo.category': this.data.categoryArray[e.currentTarget.dataset.id] + ':' + '%',
        'filterHelpInfo.categoryA': e.currentTarget.dataset.id,
        'filterHelpInfo.categoryB': 0,

      })
      this.getDemands();
      this.initList();
    },

    bindCategoryBChange: function(e) {
      this.setData({
        'filterInfo.category': this.data.categoryArray[this.data.filterHelpInfo.categoryA] + ':' + (this.data.categories[this.data.filterHelpInfo.categoryA][e.currentTarget.dataset.id] == '全部' ? '%' : this.data.categories[this.data.filterHelpInfo.categoryA][e.currentTarget.dataset.id]),
        'filterHelpInfo.categoryB': e.currentTarget.dataset.id
      })
      // console.log("**", this.data.categories[this.data.filterHelpInfo.categoryA], e.currentTarget.dataset.id,e)
      this.getDemands();
      this.tabSelect(e);
    },

    getDemands: function() {
      var that = this
      // console.log(that.data.filterInfo)
      demandsAll(that.data.filterInfo).then(data => {
        // console.log(data)
        that.setData({
          demands: data
        });

        that.data.load = false;
      });
    },

    chooseLocation: function() {
      var that = this
      var location = {}
      wx.chooseLocation({
        success: function(res) {
          console.log(res)
          getLocal(res.latitude, res.longitude).then((res) => {
            location = res
            that.setData({
              "filterInfo.location.latitude": res.latitude,
              "filterInfo.location.longitude": res.longitude,
              "filterInfo.district": location.district
            })
          })
        }
      })
    },

    navigateToDemandDatail: function(e) {
      console.log(e)
      var type = 'check'
      if (e.currentTarget.dataset.publisherid == app.globalData.userID || e.currentTarget.dataset.inorg) {
        type = 'edit'
      }
      wx.navigateTo({
        url: '/pages/makeDemand/makeDemand?type=' + type + '&' + 'demandID=' + e.currentTarget.dataset.demandid
      })
    },
    tabSelect(e) {
      this.setData({
        TabCur: e.currentTarget.dataset.id,
        MainCur: e.currentTarget.dataset.id
      })
    },
    NavToMakeDemand() {
      wx.navigateTo({
        url: '/pages/makeDemand/makeDemand?type=add',
      })
    },
  }

})