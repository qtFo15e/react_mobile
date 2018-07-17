import React,{PureComponent} from 'react';
import { Toast } from 'antd-mobile';
import {connect} from "dva/index";
import _ from "underscore"
import { Link } from 'dva/router';
let url =  require('../../assets/image/exception.png');
const queryString = require('querystringify');

export default class Book extends PureComponent {
  constructor(props) {
    super(props);
  }

  state = {

  }

  componentDidMount(){

  }

  render(){
    return (
      <div style={{ height: document.documentElement.clientHeight -45 }} onClick={ ()=>{
        this.props.content.componentDidMount();
        Toast.loading('重新加载中...', 1);
      }}>
        <div style={{ margin: '100px auto 0', textAlign: 'center' }}>
          <img src={url} alt="" style={{ width: 170 }}/>
          <div style={{ marginTop: 10 }}>
            <p style={{ fontSize: 17, color: '#363636' }}> 数据获取失败 </p>
            <p style={{ fontSize: 15, color: '#898989' }}> 请检查网络后点击重试 </p>
          </div>
        </div>

      </div>
    );
  }
}






