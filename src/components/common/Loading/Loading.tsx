import React from 'react';
import Style from './Loading.module.css';

const Loading = () => {
  return (
    <div style={{position:"absolute",display:"flex", left:"50%", top:"50%", transform:"translate(-50%,-50%)"}}>
    <div style={{position:"relative", width:"200px", height:"200px", margin:"0 auto"}}>
      <div className={Style.loading}>
        <div className={`${Style.inner} ${Style.one}`}></div>
        <div className={`${Style.inner} ${Style.two}`}></div>
        <div className={`${Style.inner} ${Style.three}`}></div>
      </div>
    </div>
    </div>
  );
}

export default Loading;