import React, { useEffect } from "react";
import "./index.css";
const img = require("../../assets/images/img.png");
import {_} from 'lodash'
import message from 'antd/lib/message/index'
import 'antd/es/message/style/css'

const Login = (props) => {
  message.config({
    duration: 1000,
  })
  const clickHandle = () => {
    // fetch("http://127.0.0.1:4523/mock/543891/user")
    //   .then((response) => response.json())
    //   .then((data) => console.log(data))
    //   .catch((err) => console.log(err));
    message.error('123123')
  };
  const addClick = () => {};
  const cleanClick = () => {
    console.log(12312111113);
  };
  return (
    <div className="login">
      <div>跳转的home</div>
      <button onClick={() => import('lodash')}>点击</button>
      <div>----------------------</div>
      <div>我是{}</div>
      <button onClick={addClick}>+</button> 
      <button onClick={clickHandle}>重置</button>  
    </div>
  );
};

export default Login;
