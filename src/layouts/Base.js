import React from 'react';
import PropTypes from 'prop-types';
import store from "store2"
import {  Redirect, Switch  } from 'dva/router';
// const queryString = require('querystringify');


import { getRoutes } from '../utils/utils';
import Authorized from '../utils/Authorized';
require("./Base.less")



const { AuthorizedRoute } = Authorized;


export default class BasicLayout extends React.PureComponent {
  static childContextTypes = {
    location: PropTypes.object,
    breadcrumbNameMap: PropTypes.object,
  }

  getChildContext() {
    const { location, routerData } = this.props;
    return {
      location,
      breadcrumbNameMap: routerData,
    };
  }

  getPageTitle() {
    const { routerData, location } = this.props;
    const { pathname } = location;
    let title
    if (routerData[pathname] && routerData[pathname].name) {
      title = `${routerData[pathname].name}`;
    }
    return title;
  }

  getBashRedirect = () => {
    if ( (!!store( "setting" )) &&  (!!store( "setting" ).remember) && (!!store( "user" )) ) {
      return '/index';
    } else {
      debugger
      return '/login';
    }

    // // According to the url parameter to redirect
    // // 这里是重定向的,重定向到 url 的 redirect 参数所示地址
    // const urlParams = new URL(window.location.href);
    // debugger
    // const redirect = urlParams.searchParams.get('redirect');
    // // Remove the parameters in the url
    // if (redirect) {
    //   urlParams.searchParams.delete('redirect');
    //   window.history.replaceState(null, 'redirect', urlParams.href);
    // } else {
    //
    //   if ( store( "setting" ) &&  store( "setting" ).remember && store( "user" ) ) {
    //     return '/index';
    //   } else {
    //     return '/login';
    //   }
    // }
    // return redirect;
  }

  render() {
    const {
       routerData, match,
    } = this.props;
    const bashRedirect = this.getBashRedirect();
    const layout = (
      <Switch>
        {
          getRoutes(match.path, routerData).map(item =>
            (
              <AuthorizedRoute
                key={item.key}
                path={item.path}
                component={item.component}
                exact={item.exact}
                authority={item.authority}
              />
            )
          )
        }
        <Redirect exact from="/" to={bashRedirect} />
      </Switch>
    );

    return (
      <div className={"Base"} style={{ height: Math.max(window.X, window.Y)  }}>{layout}</div>
    );
  }
}


