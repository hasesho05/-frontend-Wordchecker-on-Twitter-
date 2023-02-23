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
  get_users: api_host + '/accounts/',
  get_post_by_id: api_host + '/userpost/',
  profile_update: api_host + '/accounts/edit_profile/',
  withdrawal: api_host + '/user/withdrawal/',
  follow: api_host + '/accounts/follow/',
  unfollow: api_host + '/accounts/unfollow/',
  get_follow_info: api_host + '/accounts/following/',
  get_follower_info: api_host + '/follow/get_followed/',
  add_post: api_host + '/userpost/',
  get_new_posts: api_host + '/userpost/get_new_posts/',
  add_like: api_host + '/userpost/add_like/',
  remove_like: api_host + '/userpost/remove_like/',
  get_comments: api_host + '/comment_post/get_comments/',
  add_comment: api_host + '/comment_post/',
  add_commentlike: api_host + '/comment_post/add_like/',
  remove_commentlike: api_host + '/comment_post/remove_like/',
  authorization: api_host + '/auth/authenticated/',
  history: api_host + '/history/',
  history_list: api_host + '/history/list/',
  check_user_id: api_host + '/userid/',
  check: api_host + '/',
  search: api_host + '/search/',
}

export const actionList = {
  SIGNUP: 'SIGNUP',
  LOGIN: 'LOGIN',
  GET_USERS: 'GET_USERS',
  GET_POST_BY_ID: 'GET_POST_BY_ID',
  PROFILE_UPDATE: 'PROFILE_UPDATE',
  WITHDRAWAL: 'WITHDRAWAL',
  FOLLOW: 'FOLLOW',
  UNFOLLOW: 'UNFOLLOW',
  GET_FOLLOW_INFO: 'GET_FOLLOW_INFO',
  GET_FOLLOWER_INFO: 'GET_FOLLOWER_INFO',
  ADD_POST: 'ADD_POST',
  GET_NEW_POSTS: 'GET_NEW_POSTS',
  ADD_LIKE: 'ADD_LIKE',
  REMOVE_LIKE: 'REMOVE_LIKE',
  GET_COMMENTS: 'GET_COMMENTS',
  ADD_COMMENT: 'ADD_COMMENT',
  ADD_COMMENTLIKE: 'ADD_COMMENTLIKE',
  REMOVE_COMMENTLIKE: 'REMOVE_COMMENTLIKE',
  HISTORY: 'HISTORY',
  HISTORY_LIST: 'HISTORY_LIST',
  AUTHORIZATION: 'AUTHORIZATION',
  CHECK_USER_ID: 'CHECK_USER_ID',
  CHECK: 'CHECK',
  SEARCH: 'SEARCH',
}

async function apiAccess(action: string, funcSuccess: Function, funcError: Function, payload: any){

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
      await axios({
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
      await axios({
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

    case actionList.GET_USERS:
      await axios.get(urls.get_users + search)
      .then((response) => {
        funcSuccess(response);
      }).catch((e) => {
        funcError(e);
      });
      break;
      
    case actionList.GET_POST_BY_ID:
      await axios.get(urls.get_post_by_id + search)
      .then((response) => {
        funcSuccess(response);
      }).catch((e) => {
        funcError(e);
      });
      break;

    case actionList.PROFILE_UPDATE:
      await axios({
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
      await axios({
        method: 'post',
        url: urls.withdrawal,
        data: payload,
        headers: { "content-type": 'application/json', }
      }).then((response) => {
        funcSuccess(response);
      }).catch((e) => {
        funcError(e);
      });
      break;
    
    case actionList.AUTHORIZATION:
      await axios({
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

    case actionList.FOLLOW:
      await axios({
        method: 'post',
        url: urls.follow,
        data: payload,
        headers: { "content-type": 'application/json', }
      }).then((response) => {
        funcSuccess(response);
      }).catch((e) => {
        funcError(e);
      });
      break;

    case actionList.UNFOLLOW:
      await axios({
        method: 'post',
        url: urls.unfollow,
        data: payload,
        headers: { "content-type": 'application/json', }
      }).then((response) => {
        funcSuccess(response);
      }).catch((e) => {
        funcError(e);
      });
      break;

    case actionList.GET_FOLLOW_INFO:
      axios.get(urls.get_follow_info + search)
      .then((response) => {
        funcSuccess(response);
      }).catch((e) => {
        funcError(e);
      });
      break;

    case actionList.GET_FOLLOWER_INFO:
      axios.get(urls.get_follower_info + search)
      .then((response) => {
        funcSuccess(response);
      }).catch((e) => {
        funcError(e);
      });
      break;
      

    case actionList.GET_COMMENTS:
      axios({
        method: 'post',
        url: urls.get_comments,
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

    case actionList.ADD_POST:
      await axios({
        method: 'post',
        url: urls.add_post,
        data: payload,
        headers: { "content-type": 'multipart/form-data'},
      }).then((response) => {
        funcSuccess(response);
      }).catch((e) => {
        funcError(e);
      });
      break;

    case actionList.ADD_LIKE:
      await axios({
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
      await axios({
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
    
    case actionList.ADD_COMMENT:
      await axios({
        method: 'post',
        url: urls.add_comment,
        data: payload,
        headers: { "content-type": 'application/json', }
      }).then((response) => {
        funcSuccess(response);
      }).catch((e) => {
        funcError(e);
      });
      break;
    
    case actionList.ADD_COMMENTLIKE:
      await axios({
        method: 'post',
        url: urls.add_commentlike,
        data: payload,
        headers: { "content-type": 'application/json', }
      }).then((response) => {
        funcSuccess(response);
      }).catch((e) => {
        funcError(e);
      });
      break;

    case actionList.REMOVE_COMMENTLIKE:
      await axios({
        method: 'post',
        url: urls.remove_commentlike,
        data: payload,
        headers: { "content-type": 'application/json', }
      }).then((response) => {
        funcSuccess(response);
      }).catch((e) => {
        funcError(e);
      });
      break;
    
    case actionList.HISTORY:
      await axios({
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
      await axios({
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
      await axios({
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
    
    case actionList.SEARCH:
      await axios.get(urls.search + search)
      .then((response) => {
        funcSuccess(response);
      }
      ).catch((e) => {
        funcError(e);
      }
      );
      break;
  }
};

export default apiAccess;
