import { Toast } from "antd-mobile"
import store from "store2"
import { setAxios } from "../utils/initAxios";

export default {
  namespace: 'setting',
  state: {
  },
  subscriptions: {
    setup({ history, dispatch }) {
    },
  },
  effects: {

  },

  reducers: {
    set(state, action) {
      store.set( "setting", Object.assign({}, action.payload, {
        remember: store( "setting" ).remember
      }))
      setAxios( {
        serverURL: action.payload.serverURL,
        port: action.payload.port
      } )

      return { ...state, ...action.payload };
    },
    remember(state, action) {
      let setting = store( "setting" )
      setting.remember = action.payload.remember
      store.set( "setting" , setting )
      return { ...state, ...setting };
    },
  },
};
