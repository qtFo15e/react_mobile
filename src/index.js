// import 'babel-polyfill';
// import 'url-polyfill';
import dva from 'dva';
import FastClick from 'fastclick';
import { setAxios,getAxios } from "./utils/initAxios"
import createLoading from 'dva-loading';
import createHistory from 'history/createHashHistory';
import store from  "store2"
import $ from  "jquery"

import './index.less';

window.X = document.documentElement.clientHeight
window.Y = document.documentElement.clientWidth



//应用的api路径
let apiPath = ""
//服务器地址


let remember = true
let serverURL = "litijiaocai.com"
let port = "8001"



let setting = store( "setting" )
if ( setting ) {
  serverURL = setting.serverURL
  port = setting.port
  remember = setting.remember
}
setting = {
  serverURL,
  port,
  remember
}
store( "setting", setting )


FastClick.attach(document.body)

setAxios({
  serverURL,
  port,
  apiPath
})


// 1. Initialize
const app = dva({
  history: createHistory(),
  initialState: {
    setting: setting,
  },
  onError( e ){
    console.log( e )
  }
});
window.app = app
// 2. Plugins
app.use(createLoading({
  except: ["book/deleteShare", "book/addShare"]
}));

// 3. Model
app.model(require('./models/setting').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');


//Toast.Hide
$(document).on('click','.am-toast-mask',function(){
  $(this).css('display','none')
})
