import axios from "axios";
import { urls } from "../api/api";

export const getFollowInfo = (token:string|undefined) => {
  const payload = {
    token: token,
  }
  axios({
    method: 'get',
    url: urls.get_follow_info,
    data: payload,
    headers: { "content-type": 'application/json', }
  }).then((response:any) => {
    return response
  })
}
