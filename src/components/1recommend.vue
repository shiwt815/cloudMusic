<template>
  <div class="template-box">
    <h1 class="index-ht">推荐歌单</h1>
    <div class="song-list">
      <div class="song" v-for="(item, index) of songList" :key="index">
        <i class="picwrite">{{ item.copywriter }}</i>
        <img :src="item.picUrl" alt class="song-img" />
        <a href="#" class="a-play" @click="gosonglistdetail(item.id)">播放</a>
        <a href="#" class="song-name">{{ item.name }}</a>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "Recommend",
  data() {
    return {
      songList: []
    };
  },
  created() {
    axios({
      url: "https://autumnfish.cn/personalized",
      method: "get",
      params: { limit: 4 }
    }).then(res => {
      //   console.log(res);
      this.songList = res.data.result;
    });
  },
  methods: {
    gosonglistdetail(id) {
      // console.log(id);
      this.$router.push("/songlistdetail?q=" + id);
      // this.$router.push("/songlistdetail?q=${id}");
    }
  }
};
</script>
<style scoped></style>
