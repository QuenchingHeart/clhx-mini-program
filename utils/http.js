// http.js
const app = getApp()

export default function({
  url,
  data = {},
  method = 'GET'
}) {
  return new Promise((resolve, reject) => {
    wx.showLoading({
      title: '加载中...',
    })
    Utils.http_request1(url, data, method, resolve, reject)
  })
}
var Utils = {
  http_request1(url, params, method, resolve, reject) {
    // let data = {
    //   // service: 'App.Ddumbrella.' + apiName,
    //   token: app.globalData.token,
    //   ...params
    // };
    wx.request({
      url: app.globalData.baseUrl + url,
      method: method,
      data: params,
      header: {
        "content-type": "application/json",
        "Authorization": "Bearer " + app.globalData.token
      },
      success: res => {
        console.log(res);
        if (res.statusCode == 200 || res.statusCode == 201 || res.statusCode == 204) {
          wx.hideLoading();
          resolve(res.data);
        }
        // //token过期
        // else if (res.data.status == 10009) {
        //   wx.login({
        //     success: res => {
        //       var code = res.code
        //       // 发送 code，获取token。
        //       if (code) {
        //         wx.request({
        //           url: app.globalData.baseUrl + 'wx/user/login?code=' + code,
        //           success(res) {
        //             console.log(res)
        //             if (res.data.status == 0) {
        //               app.globalData.token = res.data.data.token
        //               Utils.http_request1(url, data, method, resolve, reject)
        //             }
        //           }
        //         })
        //       }
        //     }
        //   })
        // }
        else {
          wx.hideLoading();
          wx.showToast({
            title: res.data.msg,
            icon: "none",
            duration: 1500
          });
          reject(res.data);
        }
      },
      complete: () => {}
    });
  },
  http_request2(url, data, method, resolve, reject) {
    if (!app.globalData.token) {
      app.login().then(res => {
        if (res.data.code == 0 && res.data.data.status == 1) {
          app.globalData.token = res.data.data.token
          Utils.http_request1(url, data, method, resolve, reject)
        }
      }).catch(err => {

      })
    } else
      Utils.http_request1(url, data, method, resolve, reject)
  }
}