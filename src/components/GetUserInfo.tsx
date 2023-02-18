import { useState } from "react";
import apiAccess from "../api/api";
import { GraphData, Option } from "../types/types";



const GetUserInfo = () => {

  return (
    <>
      <div className="loader">
        <div className="inner one"></div>
        <div className="inner two"></div>
        <div className="inner three"></div>
      </div>
    </>
  );
}

export default GetUserInfo;