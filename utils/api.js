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

export { login, demandsAll, demandsPost, demandOne, demandPut, demandDel, 
        applyPost, applyGet, applyPut, applyDel};
