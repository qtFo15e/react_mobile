import React,{PureComponent} from 'react';
import { NavBar, Icon } from 'antd-mobile';
import {connect} from "dva/index";
import { Link } from 'dva/router';
import Tips from "../Tips/Tips"




export default class Book extends PureComponent {
  constructor(props) {
    super(props);
    this.selectInfo = this.selectInfo.bind( this )
  }

  state = {
      info: null
  }

  componentDidMount(){
    this.selectInfo( this.props.isLoading, this.props.hasNoData,  this.props.isNetError, this.props.self )
  }

  selectInfo( isLoading, hasNoData,  isNetError, self ){
    if ( isNetError ) {
      this.setState({
        info: <div className={"errorNet"} style={{ height: document.documentElement.clientHeight -45 }} onClick={ ()=>{
          self.componentDidMount();
        }}>
          点击重试
        </div>
      })
      return
    }

    if ( isLoading ) {
      this.setState( {
        info:  <Tips text="加载中..." />
      } )
      return
    }

    if ( hasNoData ) {
      this.setState( {
        info: <Tips text="暂无数据" />
      } )
      return
    }

    this.setState( {
      info: this.props.children
    } )
  }

  render(){
    return <div className={this.props.className}>
      {this.state.info}
    </div>;
  }
}






