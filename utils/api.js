import http from 'http.js'
const app = getApp();
//登录
function login(data) {
  return http({
    url: '/login',
    method: 'POST',
    data: data
  })
}
function demandsAll(data) {
  return http({
    url: '/demands',
    method: 'GET',
    data: data
  })
}

function demandsLocation(data) {
  return http({
    url: '/demands/location',
    method: 'GET',
    data
  })
}

function demandsCount() {
  return http({
    url: "/demands/count",
    method: "GET"
  });
}

function demandsPost(data) {
  return http({
    url: '/demand',
    method: 'POST',
    data: data
  })
}

function demandOne(data) {
  return http({
    url: '/demand',
    method: 'GET',
    data: data
  })
}

function demandPut(data) {
  return http({
    url: '/demand',
    method: 'PUT',
    data: data
  })
}

function demandDel(data) {
  return http({
    url: '/demand?demandID='+data.demandID,
    method: 'DELETE',

  })
}

function applyPost(data) {
  return http({
    url: '/apply',
    method: 'POST',
    data: data
  })
}

function applyGet(data) {
  return http({
    url: '/apply',
    method: 'GET',
    data: data
  })
}
function applyPut(data) {
  return http({
    url: '/apply',
    method: 'PUT',
    data: data
  })
}
function applyDel(data) {
  return http({
    url: '/apply?applyID='+data.applyID,
    method: 'DELETE',
    data: data
  })
}

function connectApprove(data) {
  return http({
    url: '/connect/approve?applyID=' + data.applyID + '&demandID=' + data.demandID,
    method: 'PUT',
    data: data,
  })
}

function connectComplete(data) {
  return http({
    url: '/connect/complete?applyID=' + data.applyID + '&demandID=' + data.demandID,
    method: 'PUT',
    data: data
  })
}

function connectDel(data) {
  return http({
    url: '/connect/cancel?applyID=' + data.applyID +'&demandID=' + data.demandID,
    method: 'DELETE',
    data: data
  })
}

//  contact 联系人

function contactPost(data) {
  return http({
    url: '/contact',
    method: 'POST',
    data: data
  })
}

function contactGet(data) {
  return http({
    url: '/contact',
    method: 'GET',
    data: data
  })
}
function contactPut(data) {
  return http({
    url: '/contact',
    method: 'PUT',
    data: data
  })
}
function contactDel(data) {
  return http({
    url: '/contact?id='+data.id+'&userID='+data.userID,
    method: 'DELETE',
    data: data
  })
}

function organizationPost(data) {
  return http({
    url: '/organization',
    method: 'POST',
    data: data
  })
}

function organizationGet(data) {
  return http({
    url: '/organization',
    method: 'GET',
    data: data
  })
}
// function organizationPut(data) {
//   return http({
//     url: '/organization',
//     method: 'PUT',
//     data: data
//   })
// }
function organizationDel(data) {
  return http({
    url: '/organization?organizationID='+data.organizationID +'&userID='+data.userID,
    method: 'DELETE',
    data: data
  })
}

function organizationApplyPost(data) {
  return http({
    url: '/organization/apply',
    method: 'POST',
    data: data
  })
}

function organizationApplyGet(data) {
  return http({
    url: '/organization/apply',
    method: 'GET',
    data: data
  })
}

function organizationAuditGet(data) {
  return http({
    url: '/organization/audit',
    method: 'GET',
    data: data
  })
}

function organizationMemberGet(data) {
  return http({
    url: '/organization/member',
    method: 'GET',
    data: data
  })
}

function organizationAuditPut(data) {
  return http({
    url: '/organization/audit',
    method: 'PUT',
    data: data
  })
}
function organizationQuitDel(data) {
  return http({
    url: '/organization/quit?organizationID ='+data.organizationID +'&userID='+data.userID,
    method: 'DELETE',
    data: data
  })
}

function organizationInGet(data) {
  return http({
    url: '/organization/in',
    method: 'GET',
    data: data
  })
}
function nicknameUpdate(data) {
  return http({
    url: '/user/nickname?nickname='+data.nickname+'&userID='+data.userID,
    method: 'PUT',
    data: data
  })
}
export { 
  login,
  demandsAll, demandsLocation, demandsCount, demandsPost, demandOne, demandPut, demandDel, 
  applyPost, applyGet, applyPut, applyDel, 
  connectApprove, connectComplete, connectDel,
  contactPost, contactGet, contactPut, contactDel, 
  organizationPost, organizationGet, organizationDel, 
  organizationInGet,organizationMemberGet,
  organizationApplyPost, organizationApplyGet, organizationAuditGet, organizationAuditPut, organizationQuitDel,
  nicknameUpdate
  };
