const app = getApp()
const QQMapWX = require('../libs/qqmap-wx-jssdk.js');
var qqmapsdk = new QQMapWX({
  key: 'XSEBZ-MCDLW-FSXR2-OSMZW-NIDBS-6OFVG' //这里自己的key秘钥进行填充
});
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function formatTimeTwo(number, format) {

  var formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
  var returnArr = [];

  var date = new Date(number * 1000);
  returnArr.push(date.getFullYear());
  returnArr.push(formatNumber(date.getMonth() + 1));
  returnArr.push(formatNumber(date.getDate()));

  returnArr.push(formatNumber(date.getHours()));
  returnArr.push(formatNumber(date.getMinutes()));
  returnArr.push(formatNumber(date.getSeconds()));

  for (var i in returnArr) {
    format = format.replace(formateArr[i], returnArr[i]);
  }
  return format;
}
const regFilter = (str,originStr,newStr) =>{
  console.log(str.replace(new RegExp(originStr, 'g'), newStr))
  return str.replace(new RegExp(originStr, 'g'), newStr);
}
const getLocal = (latitude, longitude) => {
  var locations = {}
  return new Promise((resolve, reject) => {
    qqmapsdk.reverseGeocoder({
      location: {
        latitude: latitude,
        longitude: longitude
      },
      success: function (res) {
        // console.log(JSON.stringify(res));
        // var re = JSON.stringify(res)
        console.log(res.result)
        let province = res.result.ad_info.province
        let city = res.result.ad_info.city
        let district = res.result.ad_info.district
        let business_area = res.result.address_reference.business_area == null ? null : res.result.address_reference.business_area.title
        let formatted_address = res.result.formatted_addresses.recommend

        locations = {
          province,
          city,
          district,
          latitude,
          longitude,
          business_area,
          formatted_address
        }
        resolve(locations)

      },
      fail: function (res) {
        console.log(res);
      },
      complete: function (res) {
        console.log(locations);
        resolve(locations)
        return locations
      }
    })
  })
}


module.exports = {
  formatTime: formatTime,
  formatTimeTwo, formatTimeTwo,
  getLocal: getLocal,
  regFilter: regFilter
}
