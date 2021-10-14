import "./css/main.css";
import "./css/iconfont.css";
import "swiper/dist/css/swiper.css";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./js/iconfont.js";
import axios from "./httpConfig/http";
Vue.prototype.$http = axios;
//element
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);
// 图片懒加载
import VueLazyload from "vue-lazyload";
// 使用方法1:
// Vue.use(VueLazyload)
// 使用方法2: 自定义参数选项配置
Vue.use(VueLazyload, {
  preLoad: 1.3, // 提前加载高度（数字 1 表示 1 屏的高度） 默认值:1.3
  error: require("./images/error.jpg"), // 当加载图片失败的时候
  loading: require("./images/load.gif"), // 图片加载状态下显示的图片
  attempt: 3 //  加载错误后最大尝试次数 默认值:3
});

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
