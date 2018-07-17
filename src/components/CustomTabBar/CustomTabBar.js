import React,{PureComponent} from 'react';
import { NavBar, Icon, TabBar } from 'antd-mobile';
import { connect } from 'dva';

@connect(({setting, user}) => {
  return {
    setting,
    user
  }
})
export default class CustomTabBar extends PureComponent {
  constructor(props) {
    super(props);
  }

  render(){
    let self = this
    return (
      <TabBar tintColor='#27b677'>
        <TabBar.Item
          title="首页"
          key="index"
          icon={<div style={{
            width: '22px',
            height: '22px',
            background: 'url('+ require('../../assets/icon/index.png') +') center center /  21px 21px no-repeat' }}
          />
          }
          selectedIcon={<div style={{
            width: '22px',
            height: '22px',
            background: 'url('+ require('../../assets/icon/index_active.png') +') center center /  21px 21px no-repeat' }}
          />}
          selected={self.props.selectedTab === '/index'}
          onPress={() => {
            self.props.history.push('/index');
          }}
        >
          {this.props.children}
        </TabBar.Item>
        <TabBar.Item
          icon={<div style={{
            width: '22px',
            height: '22px',
            background: 'url('+ require('../../assets/icon/bookcase.png') +') center center /  21px 21px no-repeat' }}
          />}
          // selectedIcon={require('../imgs/servicelog-blue.png')}
          title="书架"
          key="bookShelf"
          selectedIcon={<div style={{
            width: '22px',
            height: '22px',
            background: 'url('+ require('../../assets/icon/bookcase_active.png') +') center center /  21px 21px no-repeat' }}
          />}
          selected={self.props.selectedTab === '/shelf/bookShelf'}
          onPress={() => {
            self.props.history.push('/shelf/bookShelf');
          }}
        >
        </TabBar.Item>
        <TabBar.Item
          icon={<div style={{
            width: '22px',
            height: '22px',
            background: 'url('+ require('../../assets/icon/mine.png') +') center center /  21px 21px no-repeat' }}
          />}
          // selectedIcon={require('../imgs/user-blue.png')}
          title="我的"
          key="me"
          selectedIcon={<div style={{
            width: '22px',
            height: '22px',
            background: 'url('+ require('../../assets/icon/mine_active.png') +') center center /  21px 21px no-repeat' }}
          />}
          selected={self.props.selectedTab === '/me'}
          onPress={() => {
            self.props.history.push('/me');
          }}
        >
        </TabBar.Item>
      </TabBar>
    )
  }
}
