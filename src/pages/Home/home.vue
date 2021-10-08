<template>
  <div class="template-box">
    <swiperImg />
    <Recommend />
    <NewMusic />
    <RecommendMV />
    <div class="player">
      <audio :src="musicUrl" controls></audio>
      <!-- autoplay -->
    </div>
  </div>
</template>
<script>
import swiperImg from "../../components/banner.vue";
import Recommend from "../../components/recommend.vue";
import NewMusic from "../../components/newMusic.vue";
import RecommendMV from "../../components/recommendMV.vue";

export default {
  name: "Home",
  components: { swiperImg, Recommend, NewMusic, RecommendMV }, //MusicPlay
  data() {
    return {
      //轮播图
      banners: [],
      musicUrl: ""
    };
  }
};
</script>
