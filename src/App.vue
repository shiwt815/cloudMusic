<template>
  <div id="app">
    <div class="top">
      <div class="wrap">
        <a href="javascript:;" class="return-a" @click="goReturn()" v-show="isShow">返回</a>
        <Search />
      </div>
    </div>
    <div class="content">
      <router-view ref="child" />
    </div>

    <div class="bottom">
      <div class="player">
        <audio :src="musicUrl" controls></audio>
      </div>
    </div>
  </div>
</template>
<script>
import Search from "./components/search.vue";
export default {
  name: "App",
  components: { Search }, // Index,
  data() {
    return {
      //音乐播放器地址
      musicUrl: "",
      isShow: false
    };
  },
  watch: {
    $route(now, old) {
      //监控路由变换，控制返回按钮的显示
      if (now.path == "/") {
        this.isShow = false;
      } else {
        this.isShow = true;
      }
      if (now.path.indexOf("mvdetail") >= 0) {
        this.$refs.child.mvurlData();
        this.$refs.child.mvdetailData();
        this.$refs.child.aboutData();
        this.$refs.child.commentData();
        console.log(22222);
      }
    }
  },
  methods: {
    //跳转歌曲详情页
    goReturn() {
      window.history.go(-1);
      // if (now.path.indexOf("mvdetail?mvid") >= 0) {
      //   this.$refs.child.mvurlData();
      //   this.$refs.child.mvdetailData();
      //   this.$refs.child.aboutData();
      //   this.$refs.child.commentData();
      //   console.log(22222);
      // }
    }
  }
};
</script>

