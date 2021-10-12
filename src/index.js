import "./css/main.css";
import "./css/iconfont.css";
import "swiper/dist/css/swiper.css";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./js/iconfont.js";
import axios from "./httpConfig/http";
Vue.prototype.$http = axios;

//播放时长
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
//播放量
Vue.prototype.playCount = function(count) {
  if (count > 10000) {
    count = parseInt(count / 10000) + "万";
    // console.log("万");
    return count;
  } else {
    count = count;
    // console.log("小");
    return count;
  }
};
//时间戳转换
Vue.prototype.dateShow = function(dateShow) {
  var timedate = dateShow;
  timedate = new Date(timedate);
  var year = timedate.getFullYear();
  var month = timedate.getMonth() + 1;
  var date = timedate.getDate();
  return (timedate = [year, month, date].join("-"));
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
