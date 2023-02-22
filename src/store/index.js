import Vuex from 'vuex'
// 用Vuex.Store对象用来记录token
const store = new Vuex.Store({
  state: {
    token:"test",
    userName:"lwq", // 必填
    loading:false
  },
  getters: {
    getToken(state){
        return state.token || localStorage.getItem(state.userName+"token") || "";
    }
  },
  mutations: {
    // 修改token，并将token存入localStorage
    setToken(state,token) {
      state.token = token;
      localStorage.setItem(state.userName+'token', token);
    },
    delToken(state) {
      state.token = "";
      localStorage.removeItem(state.userName+"token");
    },
    // 可选
    setUserInfo(state, userName) {
      state.userName = userName;
    }
  },
 actions: {
   // removeToken: (context) => {
     // context.commit('setToken')
   // }
 },
});
export default store;