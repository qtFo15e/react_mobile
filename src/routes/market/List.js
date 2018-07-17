import React,{PureComponent} from 'react';
import { Link } from 'dva/router';
import { WhiteSpace, Flex, NavBar, Icon, ListView, Drawer } from 'antd-mobile';
import { connect } from 'dva';

import Reload from "../../components/Reload/Reload";
import Tip from "../../components/Tips/Tips"

require("./List.less")
const queryString = require('querystringify');


function selectInfo( content, self ){
  if ( self.props.user.isNetError ) {
    return <div className={'contentWrap'}><Reload content={self}/></div>
  }

  return content
}
@connect(({ user, loading}) => {
  return {
    user,
    loading: loading.models.user
  }
})

export default class Setting extends PureComponent {
  constructor(props) {
    super(props);
  }

  onEndReached = () => {
  }
  selectTipText( isLoading, isALL, hasBookCount ){
    if ( isLoading ) {
      this.setState( {
        tipText: "加载中..."
      } )
    } else {
      if ( !hasBookCount ) {
        this.setState( {
          tipText: "暂无数据"
        } )
      } else if ( isALL ) {
        this.setState( {
          tipText: "没有更多了"
        } )
      } else {
        this.setState( {
          tipText: ""
        } )
      }
    }
  }

  render(){
    let row = ( book ) => {
      return  (
        <Link to={"/market/book/" + book.Id}>

        </Link>
      )
    };

    let content = <Drawer
      className="my-drawer contentWrap"
      style={{ minHeight: document.documentElement.clientHeight - 45 }}
      contentStyle={{ color: '#A6A6A6', textAlign: 'center' }}
      sidebar={ "dsa"}
      position={'right'}
    >

      <ListView
        className={'book-list-wrap'}
        ref={el => this.lv = el}
        initialListSize={10}
        pageSize={1}
        dataSource={1}
        onEndReachedThreshold={2000}
        renderRow={row}
        renderFooter={() => {
          return <Tip text={this.state.tipText}/>
        }}

        onEndReached={this.onEndReached}
      />
    </Drawer>




    return (
      <div className={"market-list screen-drawer-wrapper"} style={{ backgroundColor:"white" }} >
        <NavBar
          className={}
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={() => window.history.go(-1)}
        ><div className={"navBarTopTitle"}>dsa</div></NavBar>
        {
          selectInfo( content, this )
        }
      </div>
    );
  }
}






