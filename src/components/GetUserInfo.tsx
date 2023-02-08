import { useState } from "react";
import apiAccess from "../pages/api/api";
import { GraphData, Option } from "../types/types";



const GetUserInfo = () => {
  const [textUserID, setTextUserID] = useState<string>('');
  const [tweetList, setTweetList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [wordData, setWordData] = useState([]);
  const [graphData, setGraphData] = useState<GraphData>();
  const [options, setOptions] = useState<Option>();

  const handleTextUserID = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.preventDefault();
    setTextUserID(e.target.value)
  }

  const onSubmitUserID = () => {
    setWordData([])
    setLoading(true)
    setTweetList([])
    const payload = {
      id: textUserID
    };

    const funcSuccess = (response: any) => {
      setTweetList(response.data.tweetList)
      setWordData(response.data.counter)
      setLoading(false)
    }
    const funcError = (response: any) => {
      console.log(response)
      setLoading(false)
    }
    apiAccess('CHECK_USER_ID', funcSuccess, funcError, payload);
  }
  return (
    <div>
      Enter
    </div>
  );
}

export default GetUserInfo;