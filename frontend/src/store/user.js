import axios from "@/utils/axios";

export default {
  state: {
    id: "",
    username: "",
    photo: "",
    token: "",
    is_login: false,
  },
  getters: {},
  mutations: {
    updateUser(state, user) {
      state.id = user.id;
      state.username = user.username;
      state.photo = user.photo;
      state.is_login = user.is_login;
    },
    updateToken(state, token) {
      state.token = token;
    },
    logout(state) {
      state.id = "";
      state.username = "";
      state.photo = "";
      state.token = "";
      state.is_login = false;
    },
  },
  actions: {
    login(context, data) {
      axios.post('/user/account/token/', {
          username: data.username,
          password: data.password,

      }).then(resp => {
            if (resp.error_message === "success") {
              localStorage.setItem("jwt_token", resp.token);
              context.commit("updateToken", resp.token);
              data.success(resp);
              axios.defaults.headers['Authorization'] =  "Bearer " + resp.token;
            }
      }).catch(resp => {
        data.error(resp);
      });

    },
    getinfo(context, data) {
      axios.get('/user/account/info/').then(resp => {
        if (resp.error_message === "success") {
          context.commit("updateUser", {
            ...resp,
            is_login: true,
          });
          data.success(resp);
        } else {
          data.error(resp);
        }
      }).catch(resp => {
        data.error(resp);
      });

    },
    logout(context) {
      localStorage.removeItem("jwt_token");
      context.commit("logout");
    },
  },
  modules: {},
};
