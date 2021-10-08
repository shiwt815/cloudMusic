import "./css/main.css";
import "./css/iconfont.css";
import "swiper/dist/css/swiper.css";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";

//使用Vue.prototype;
Vue.prototype.mvTime = function(Time) {
  var min = parseInt(Time / 1000 / 60);
  var sec = parseInt((Time / 1000) % 60);
  if (min < 10) {
    min = "0" + min;
  }
  if (sec < 10) {
    sec = "0" + sec;
  }
  return min + ":" + sec;
};

var vm = new Vue({
  el: "#vapp",
  data: {
    msg: ""
  },
  //简写
  render: c => c(App),
  router
  // store
});

// console.log(1);

// const spp = function() {
//   console.log(1);
// };

// new spp();
