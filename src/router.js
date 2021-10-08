import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";
// important

// import t1 from "./components/this.vue";

Vue.use(VueRouter);

//解决重复点击路由报错
const routerPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error);
};

var router = new VueRouter({
  routes: [
    {
      path: "/",
      name: "Home",
      component: () => import("./pages/Home/home.vue")
    },
    {
      path: "/result",
      name: "result",
      component: () => import("./pages/result/result.vue")
    },
    {
      path: "/resonglist",
      name: "ResongList",
      component: () => import("./pages/ResongList/resonglist.vue")
    },
    {
      path: "/newestmusic",
      name: "NewestMusic",
      component: () => import("./pages/NewestMusic/newestmusic.vue")
    },
    {
      path: "/newestmv",
      name: "newestmv",
      component: () => import("./pages/NewestMV/newestmv.vue")
    },
    {
      path: "/songlistdetail",
      name: "songlistdetail",
      component: () => import("./pages/SongListDetail/songlistdetail.vue")
    },
    {
      path: "/mvdetail",
      name: "mvdetail",
      component: () => import("./pages/MvDetail/mvdetail.vue")
    }
  ]
});
// 暴露 路由
export default router;
