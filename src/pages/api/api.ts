import axios from "axios";
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"

export let api_host = '';

// Dev mode
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development'){
  api_host = 'http://localhost:8000';
}

export const urls = {
  setting: api_host + '/api/setting/',
  check: api_host + '/',
}

export const actionList = {
  SETTING: 'SETTING',
  CHECK: 'CHECK',
}

function apiAccess(action: string, funcSuccess: Function, payload: any){

  const keys = Object.keys(payload);
  let search = '?';
  for (let i=0; i<keys.length; i++){
    if (i >= 1){
      search += '&';
    }
    search += keys[i] + '=' + payload[keys[i]];
  }

  switch (action) {
    case actionList.SETTING:
      axios.get(urls.setting)
      .then((response) => {
        funcSuccess(response);
      }).catch((e) => {
        console.log(e);
      });
      break;

    case actionList.CHECK:
      axios({
        method: 'post',
        url: urls.check + search,
        data: payload,
        headers: { "Content-Type": "multipart/form-data" }
      }).then((response) => {
        funcSuccess(response);
      }).catch((e) => {
        console.log(e);
      });
      break;

  }
};

export default apiAccess;
