/**
 * 检测表单中的空内容并提示给用户端。（适用于大多数简单的表单）
 * # 仅可用于检测表单是否存在空填内容
 * 
 * 参数 e:  e = 点击提交按钮返回的参数的e.detail.value
 * 返回结果，如果通过验证，则返回true 执行后续步骤
 * 反之，若未通过验证，则返回false,并自动给出用户提示i
 * ---------------------------------------------------
 * 
 * # 调用指引 #
 * const formUtil = require(../../utils/formUtil.js) // 声明在page({})之外顶端
 * 
 * formSubmit(e){
 *    var checkRes = formUtil.checkNullForm(e);
 *    if (!checkRes ) {
 *      console.log("表单存在漏填，已给出提示，并终止表单提交操作")
 *    	return;
 *    }
 *    console.log("表单通过验证，开始执行操作")
 *    // 提交表单到服务器的业务代码
 *    // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
 * }
**/
function checkNullForm(e){
	console.log("已传入参数（如下），开始执行检测...",e)
  var formData = e.detail.value   // 声明变量，值为表单内容
  // var formData = e.detail.value   // 声明变量，值为表单内容
  console.log(formData)
	var hint = "";    // 声明提示语
	var names = {
    "demandCategory":"需求类型",
    "personorandganization":"需求方",
    "startTime":"开始时间",
    "endTime":"结束时间",
    "district":"地区",
    "title":"标题",
    "contactName":"联系人",
    "contactPhone":"手机号码",
    "detail":"详细内容",
  }

  // 循环遍历表单内容
  for(var item in formData){
		// 打桩 - 查看表单信息
		console.log(item, "：", e.detail.value[item])

		// 如下 ，根据自己表单的结构来增删提示语注意，indexOf中全部是小写
		if (e.detail.value[item] === "" | e.detail.value[item] == 'undefined') {
			// 根据提示语给出提示
			item.replace('-','')
			item.replace('_','')
      item.toLowerCase()
      hint = "请填写"+ names[item]
      break
    }
    if(item=='contactPhone'){
      if(!checkPhoneNum(e.detail.value[item])){
        hint = "手机号填写错误"
        break
      }
    }
	}
	// 判断，如果存在提示语，则提示用户端，存在漏填选项
	if (hint !== "") {
		wx.showModal({
		content: hint,
		showCancel: false,
		confirmText: '确定',
		confirmColor: '#000000',
		})
		return false; // 未通过验证,返回false
	} else {  
		// 反之，表单填写正常，返回true，执行后续操作
		return true;  // 通过验证，返回true
	}
}

 
// 手机号部分
 

function checkPhoneNum (phoneNumber) {
  if (phoneNumber.length === 11) {
    let str = /^1\d{10}$/
    if (str.test(phoneNumber)) {
      return true
    }
  }
  return false
}
   
module.exports = {
	checkNullForm: checkNullForm

}