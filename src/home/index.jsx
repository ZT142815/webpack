import React, { useEffect } from 'react';
import './index.css'
const img = require('../../assets/images/img.png')

const Home = (props) => {
    const clickHandle = () => {
        import('./handle')
    };
    const addClick = () => {
        console.log(23234)
    }
    const cleanClick = () => {   
    }
    return (
        <div className='home'>
            <div>跳转的home</div>
            <button onClick={clickHandle}>点击</button>
            <div>----------------------</div>
            <div>我是</div>
            <button onClick={addClick}>+</button>
            <button onClick={cleanClick}>重置</button>
            <div>123123123</div>
        </div>
    );
}

export default Home;