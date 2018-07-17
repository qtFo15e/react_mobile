import React,{PureComponent} from 'react';
import { Link } from 'dva/router';
import { connect } from 'dva';
import CustomTabBar from "../components/CustomTabBar/CustomTabBar"
import RenderAuthorized from "../components/Authorized";
require('./Index.less');

@connect(({ user, loading}) => {
  return {
    user,
    loading: loading.models.user
  }
})

export default class Index extends PureComponent {
  constructor(props) {
    super(props);
  }
  componentWillUnmount(){
  }


  render(){
    const Authorized = RenderAuthorized( this.props.user.auth );
    return (
      <div>
        <div className={'contentWrap'}>
          <Link to={{
            pathname:"/recommend/recommend",
            search:"?sort=free"
          }}>
            <span className={'freeMore'}>跳转传参</span>
          </Link>

          <Authorized authority={[ "2" ]} noMatch={""}>权限验证</Authorized>
        </div>
        <CustomTabBar history={this.props.history} selectedTab={ this.props.match.path } >
        </CustomTabBar>
      </div>
    );
  }
}






