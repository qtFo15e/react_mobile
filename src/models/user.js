import store from "store2"
import { Toast } from "antd-mobile"
import {getAxios} from "../utils/initAxios"


async  function login( payload ) {
  return getAxios().post( "/app/Login", {} )
}


export default {
  namespace: 'user',
  state: store( "setting" ).remember && store( "user" ) ? Object.assign( store( "user" ) ):{},
  subscriptions: {
    setup({ history, dispatch }) {
      //todo add listener
    },
  },
  effects: {
    *login({ payload }, { call, put }) {
      try {
        const response = yield call(login, payload )
        if ( response.data.Success === false ) {
          Toast.fail( response.data.Message )
          return
        }
        window.user = {
          token: response.data.Token,
        };

        yield put({
          type: 'saveUserinfo',
          payload: response.data,
        });

        window.location.hash = "#/index"

      } catch (e) {
        Toast.fail( "登陆失败，请重试" )
      }
    },

  },

  reducers: {
    saveUserinfo(state, action) {
      let data = Object.assign( {}, action.payload, {
        token: action.payload.Token,
        auth:  action.payload.UserType + ""
      } )

      //记住密码
      if ( store( "setting" ).remember === true ) {
        store.set( "user", action.payload )
      }

      return Object.assign( {}, state, data )
    },
    logout(state, action) {
      //删除密码
      store.remove( "user" );
      return Object.assign( {} )
    },
    //网络状态
    changeNetStatus( state, action ) {
      return Object.assign( {}, state, action.payload )
    },
  },
};
