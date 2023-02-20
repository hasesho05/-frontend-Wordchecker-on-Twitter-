import axios from "axios";
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"

export let api_host = '';

// Dev mode
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development'){
  api_host = 'http://localhost:8000/api';
}

export const urls = {
  signup: api_host + '/auth/signup/',
  login: api_host + '/auth/login/',
  profile_update: api_host + '/user/profile_update/',
  withdrawal: api_host + '/user/withdrawal/',
  get_new_posts: api_host + '/userpost/get_new_posts/',
  add_like: api_host + '/userpost/add_like/',
  remove_like: api_host + '/userpost/remove_like/',
  authorization: api_host + '/auth/authenticated/',
  history: api_host + '/history/',
  history_list: api_host + '/history/list/',
  check_user_id: api_host + '/userid/',
  check: api_host + '/',
}

export const actionList = {
  SIGNUP: 'SIGNUP',
  LOGIN: 'LOGIN',
  PROFILE_UPDATE: 'PROFILE_UPDATE',
  WITHDRAWAL: 'WITHDRAWAL',
  GET_NEW_POSTS: 'GET_NEW_POSTS',
  ADD_LIKE: 'ADD_LIKE',
  REMOVE_LIKE: 'REMOVE_LIKE',
  HISTORY: 'HISTORY',
  HISTORY_LIST: 'HISTORY_LIST',
  AUTHORIZATION: 'AUTHORIZATION',
  CHECK_USER_ID: 'CHECK_USER_ID',
  CHECK: 'CHECK',
}

function apiAccess(action: string, funcSuccess: Function, funcError: Function, payload: any){

  const keys = Object.keys(payload);
  let search = '?';
  for (let i=0; i<keys.length; i++){
    if (i >= 1){
      search += '&';
    }
    search += keys[i] + '=' + payload[keys[i]];
  }

  switch (action) {
    case actionList.SIGNUP:
      axios({
        method: 'post',
        url: urls.signup,
        data: payload,
        headers: { "content-type": 'application/json', }
      }).then((response) => {
        funcSuccess(response);
      }).catch((e) => {
        funcError(e);
      });
      break;

    case actionList.LOGIN:
      axios({
        method: 'post',
        url: urls.login,
        data: payload,
        headers: { "content-type": 'application/json', }
      }).then((response) => {
        funcSuccess(response);
      }).catch((e) => {
        funcError(e);
      });
      break;
    
    case actionList.PROFILE_UPDATE:
      axios({
        method: 'put',
        url: urls.profile_update,
        data: payload,
        headers: { "content-type": 'multipart/form-data'},
      }).then((response) => {
        funcSuccess(response);
      }).catch((e) => {
        funcError(e);
      });
      break;

    case actionList.WITHDRAWAL:
      axios({
        method: 'post',
        url: urls.withdrawal,
        data: payload,
        headers: { "content-type": 'application/json', }
      }).then((response) => {
        funcSuccess(response);
      }).catch((e) => {
        funcError(e);
      });
    
    case actionList.AUTHORIZATION:
      axios({
        method: 'post',
        url: urls.authorization,
        data: payload,
        headers: { "content-type": 'application/json', }
      }).then((response) => {
        funcSuccess(response);
      }).catch((e) => {
        funcError(e);
      });
      break;

    case actionList.GET_NEW_POSTS:
      axios.get(urls.get_new_posts + search)
      .then((response) => {
        funcSuccess(response);
      }).catch((e) => {
        funcError(e);
      });
      break;

    case actionList.ADD_LIKE:
      axios({
        method: 'post',
        url: urls.add_like,
        data: payload,
        headers: { "content-type": 'application/json', }
      }).then((response) => {
        funcSuccess(response);
      }).catch((e) => {
        funcError(e);
      });
      break;
    
    case actionList.REMOVE_LIKE:
      axios({
        method: 'post',
        url: urls.remove_like + search,
        data: payload,
        headers: { "content-type": 'application/json', }
      }).then((response) => {
        funcSuccess(response);
      }).catch((e) => {
        funcError(e);
      });
      break;
    
    case actionList.HISTORY:
      axios({
        method: 'post',
        url: urls.history,
        data: payload,
        headers: { "content-type": 'application/json', }
      }).then((response) => {
        funcSuccess(response);
      }).catch((e) => {
        funcError(e);
      });
      break;

    case actionList.HISTORY_LIST:
      axios.get(urls.history_list + search)
      .then((response) => {
        funcSuccess(response);
      }).catch((e) => {
        funcError(e);
      });
      break;

    case actionList.CHECK_USER_ID:
      axios({
        method: 'post',
        url: urls.check_user_id + search,
        data: payload,
        headers: { "content-type": 'application/json', }
      }).then((response) => {
        funcSuccess(response);
      }).catch((e) => {
        funcError(e);
      });
      break;

    case actionList.CHECK:
      axios({
        method: 'post',
        url: urls.check + search,
        data: payload,
        headers: { "content-type": 'application/json', }
      }).then((response) => {
        funcSuccess(response);
      }).catch((e) => {
        funcError(e);
      });
      break;
  }
};

export default apiAccess;
