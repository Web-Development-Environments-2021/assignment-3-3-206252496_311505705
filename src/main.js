import Vue from "vue";
import App from "./App.vue";
import VueAxios from "vue-axios";
import axios from "axios";
axios.defaults.withCredentials = true;

import routes from "./routes";
import VueRouter from "vue-router";
Vue.use(VueRouter);
const router = new VueRouter({
  routes,
});

import PrettyCheckbox from "pretty-checkbox-vue";

Vue.use(PrettyCheckbox);

import Vuelidate from "vuelidate";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import {
  FormGroupPlugin,
  FormPlugin,
  FormInputPlugin,
  ButtonPlugin,
  CardPlugin,
  NavbarPlugin,
  FormSelectPlugin,
  AlertPlugin,
  ToastPlugin,
  LayoutPlugin,
  InputGroupPlugin,
} from "bootstrap-vue";
[
  FormGroupPlugin,
  FormPlugin,
  FormInputPlugin,
  ButtonPlugin,
  CardPlugin,
  NavbarPlugin,
  FormSelectPlugin,
  AlertPlugin,
  ToastPlugin,
  LayoutPlugin,
  InputGroupPlugin,
].forEach((x) => Vue.use(x));
Vue.use(Vuelidate);

axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    return response;
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

const shared_data = {
  username: localStorage.username,
  permission: localStorage.permission,
  searchquery: localStorage.searchquery,
  search_player: localStorage.search_player,
  search_team: localStorage.search_team,
  // username: "hilla",
  login(username) {
    localStorage.setItem("username", username);
    this.username = username;
    console.log("login", this.username);
  },
  loginPermission(permission) {
    localStorage.setItem("permission", permission);
    this.permission = permission;
    console.log("permission", this.permission);
  },
  logout() {
    console.log("logout");
    localStorage.removeItem("username");
    localStorage.removeItem("searchquery");
    localStorage.removeItem("search_player");
    localStorage.removeItem("search_team");

    this.username = undefined;
    this.searchquery = "";
    this.search_player = undefined;
    this.search_team = undefined;
  },
  lastSearchQuery(searchquery) {
    localStorage.setItem("searchquery", searchquery);
    this.searchquery = searchquery;
    console.log("searchquery", this.searchquery);
  },
  searchPlayer(search_player) {
    localStorage.setItem("search_player", search_player);
    this.search_player = search_player;
    console.log("search_player", this.search_player);
  },
  searchTeam(search_team) {
    localStorage.setItem("search_team", search_team);
    this.search_team = search_team;
    console.log("search_team", this.search_team);
  },
};
// console.log(shared_data);
// Vue.prototype.$root.store = shared_data;

new Vue({
  router,
  data() {
    return {
      store: shared_data,
    };
  },
  methods: {
    toast(title, content, variant = null, append = false) {
      this.$bvToast.toast(`${content}`, {
        title: `${title}`,
        toaster: "b-toaster-top-center",
        variant: variant,
        solid: true,
        appendToast: append,
        autoHideDelay: 3000,
      });
    },
  },
  render: (h) => h(App),
}).$mount("#app");
