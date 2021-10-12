import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";

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
      name: "index",
      component: () => import("./pages/Index/index.vue"),
      children: [
        {
          path: "",
          name: "home",
          component: () => import("./pages/Home/home.vue")
        },
        {
          path: "resonglist",
          name: "resonglist",
          component: () => import("./pages/ResongList/resonglist.vue")
        },
        {
          path: "newestmusic",
          name: "newestmusic",
          component: () => import("./pages/NewestMusic/newestmusic.vue")
        },
        {
          path: "newestmv",
          name: "newestmv",
          component: () => import("./pages/NewestMv/newestmv.vue")
        },
        {
          path: "/result",
          name: "result",
          component: () => import("./pages/result/result.vue")
        }
      ]
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
    },

    {
      path: "*",
      redirect: "/"
    }
  ]
});
// 暴露 路由
export default router;
