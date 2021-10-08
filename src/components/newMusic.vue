<template>
  <div class="template-box">
    <h1 class="index-ht">最新音乐</h1>
    <div class="new-list">
      <div class="new" v-for="(item, index) of newMusicList" :key="index">
        <img :src="item.picUrl" alt="" class="new-img" />
        <a href="javascript:;" class="a-play" @click="playMusic(item.id)"
          >播放</a
        >
        <a href="javascript:;" class="new-name">{{ item.name }}</a>
        <a href="javascript:;" class="songer">{{
          item.song.artists[0].name
        }}</a>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "newMusic",
  data() {
    return {
      newMusicList: []
    };
  },
  created() {
    axios({
      url: "https://autumnfish.cn/personalized/newsong",
      method: "get",
      params: {}
    }).then(res => {
      this.newMusicList = res.data.result;
      //   console.log(res.data.result);
    });
  },
  methods: {
    playMusic(id) {
      axios({
        url: "https://autumnfish.cn/song/url",
        method: "get",
        params: { id } //id:id
      }).then(res => {
        // this.newMusicList = res.data.result;
        let url = res.data.data[0].url;
        this.$parent.musicUrl = url;
      });
    }
  }
};
</script>
<style scoped></style>
