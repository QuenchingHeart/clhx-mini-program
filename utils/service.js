import { login } from "api.js"
const app = getApp()
function Login () {
  wx.login({
    success: (loginRes) => {
      if (loginRes.code) {
        wx.getUserInfo({
          success: (userInfo) => {
            let json = {
              jsonCode: loginRes.code,
              nickName: userInfo.userInfo.nickName,
              avatarUrl: userInfo.userInfo.avatarUrl
            };
            console.log(json);
            login(json).then(backEndRes => {
              app.globalData.token = backEndRes.token;
              app.globalData.userID = backEndRes.userID;
              app.globalData.nickname =  backEndRes.nickname;
              wx.getSetting({
                success: (settingRes) => {
                  wx.switchTab({
                    url: "../main/main"
                  });
                }
              })
            });
          },
        })
      }
    },
  })
}
export {
	 Login

}