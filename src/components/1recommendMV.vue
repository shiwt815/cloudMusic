<template>
  <div class="template-box">
    <h1 class="index-ht">推荐MV</h1>
    <div class="mv-list">
      <div
        class="mv"
        v-for="(item, index) of recommendMVList"
        :key="index"
        @click="goMvDetail(item.id)"
      >
        <div class="play-num">
          <i class="san"></i>
          {{ item.playCount }}
        </div>
        <img :src="item.picUrl" alt class="mv-img" />
        <!-- <a href="#" class="a-play">播放</a> -->
        <a href="#" class="mv-group">{{ item.copywriter }}</a>
        <a href="#" class="artits-name">{{ item.artistName }}</a>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "recommendMV",
  data() {
    return {
      recommendMVList: []
    };
  },
  created() {
    axios({
      url: "https://autumnfish.cn/personalized/mv",
      method: "get"
    }).then(res => {
      // console.log(res);
      this.recommendMVList = res.data.result;
    });
  },
  methods: {
    //跳转mv详情页
    goMvDetail(id) {
      console.log(id);
      this.$router.push("/mvdetail?mvid=" + id);
    }
  }
};
</script>
<style scoped></style>
