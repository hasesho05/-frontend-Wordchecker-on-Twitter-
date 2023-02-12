import axios from "axios";
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"

export let api_host = '';

// Dev mode
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development'){
  api_host = 'http://localhost:8000';
}

export const urls = {
  signup: api_host + '/user/signup',
  signin: api_host + '/user/signin',
  authorization: api_host + '/user/authorization',
  history: api_host + '/history',
  history_list: api_host + '/history/list',
  check_user_id: api_host + '/userid',
  check: api_host + '/',
}

export const actionList = {
  SIGNUP: 'SIGNUP',
  SIGNIN: 'SIGNIN',
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

    case actionList.SIGNIN:
      axios({
        method: 'put',
        url: urls.signin,
        data: payload,
        headers: { "content-type": 'application/json', }
      }).then((response) => {
        funcSuccess(response);
      }).catch((e) => {
        funcError(e);
      });
      break;
    
    case actionList.AUTHORIZATION:
      axios({
        method: 'put',
        url: urls.authorization,
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
