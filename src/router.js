import React from 'react';
import { routerRedux, Switch } from 'dva/router';
import { LocaleProvider, ActivityIndicator  } from 'antd-mobile';
import dynamic from 'dva/dynamic';
import BasicLayout from "./layouts/Base"
import { getRouterData } from './common/path.js';
import Authorized from './utils/Authorized';
const { ConnectedRouter } = routerRedux;
const { AuthorizedRoute } = Authorized;
dynamic.setDefaultLoadingComponent(() => {
    return <ActivityIndicator  />;
});

function RouterConfig({ history, app }) {
    const routerData = getRouterData(app);
    const BasicLayout = routerData['/'].component;
    return (
        <LocaleProvider >
            <ConnectedRouter history={history}>
                <Switch>
                    <AuthorizedRoute
                        path="/"
                        render={props => <BasicLayout {...props} />}
                        // authority={['admin', 'user',"guest"]}
                        // redirectPath="/noAuthority"
                    />
                </Switch>
            </ConnectedRouter>
        </LocaleProvider>
    );
}

export default RouterConfig;
