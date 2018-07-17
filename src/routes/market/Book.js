import React,{PureComponent} from 'react';
import { NavBar, Icon, List } from 'antd-mobile';
import Tips from "../../components/Tips/Tips";
import Reload from "../../components/Reload/Reload";
import { connect } from 'dva';
require("./Book.less")


function SelectInfo( args){
  let content = args.content
  let self = args.self
  if ( self.props.user.isNetError ) {
    return <div className={'contentWrap'}><Reload content={self}/></div>
  }

  if ( self.props.loading || self.props.loading === undefined  ) {
    return <div className={'contentWrap'}><Tips text={"加载中。。。"}/></div>
  }

  if ( self.props.loading === false   ) {
    return content
  }

}


@connect(({ user, loading}) => {
  return {
    user,
    loading: loading.models.user
  }
})
export default class Book extends PureComponent {
  constructor(props) {
    super(props);
  }
  render(){
    let content = <div className={'contentWrap'} >
        内容区
    </div>
    return (
      <div>
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={() => window.history.go(-1)}
        >图书详情</NavBar>
        <SelectInfo  content={content} self={this} />
      </div>
    );
  }
}







