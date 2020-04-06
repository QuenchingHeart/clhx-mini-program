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

export { 
  login,
  demandsAll, demandsLocation, demandsCount, demandsPost, demandOne, demandPut, demandDel, 
  applyPost, applyGet, applyPut, applyDel, 
  connectApprove, connectComplete, connectDel
  };
