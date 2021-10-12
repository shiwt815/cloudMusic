<template>
  <div class="home-wrap">
    <swiperImg />
    <h1 class="index-ht">推荐歌单</h1>
    <div class="song-list">
      <div class="song" v-for="(item, index) of songList" :key="index">
        <div class="img-posr">
          <i class="picwrite">{{ item.copywriter }}</i>
          <img :src="item.picUrl" alt class="song-img" />
          <a href="#" class="a-play" @click="gosonglistdetail(item.id)">播放</a>
        </div>
        <a href="#" class="song-name">{{ item.name }}</a>
      </div>
    </div>
    <h1 class="index-ht">最新音乐</h1>
    <div class="new-list">
      <div class="new" v-for="(item, index) of newMusicList" :key="index">
        <div class="img-posr">
          <img :src="item.picUrl" alt class="new-img" />
          <a href="javascript:;" class="a-play" @click="playMusic(item.id)">播放</a>
        </div>
        <a href="javascript:;" class="new-name">{{ item.name }}</a>
        <a href="javascript:;" class="songer">
          {{
          item.song.artists[0].name
          }}
        </a>
      </div>
    </div>

    <h1 class="index-ht">推荐MV</h1>
    <div class="mv-list">
      <div
        class="mv"
        v-for="(item, index) of recommendMVList"
        :key="index"
        @click="goMvDetail(item.id)"
      >
        <div class="img-posr">
          <i class="picwrite">{{ item.copywriter }}</i>
          <div class="play-num">播放量：{{ item.playCount }}</div>
          <img :src="item.picUrl" alt class="mv-img" />
        </div>
        <a href="#" class="mv-group">{{ item.name }}</a>
        <a href="#" class="artits-name">{{ item.artistName }}</a>
      </div>
    </div>
  </div>
</template>
<script>
import swiperImg from "../../components/banner.vue";
export default {
  name: "Home",
  components: { swiperImg },
  data() {
    return {
      banners: [], //轮播图
      songList: [], //最新歌单
      newMusicList: [], //最新音乐
      recommendMVList: [] //推荐mv
    };
  },
  created() {
    //最新歌单
    this.$http
      .get("/personalized", {
        params: { limit: 4 }
      })
      .then(res => {
        this.songList = res.data.result;
      })
      .catch(err => {
        alert("请求失败");
      });
    //最新音乐
    this.$http
      .get("/personalized/newsong", {
        params: { limit: 4 }
      })
      .then(res => {
        this.newMusicList = res.data.result;
      })
      .catch(err => {
        alert("请求失败");
      });
    //推荐mv
    this.$http
      .get("/personalized/personalized/mv", {
        params: { limit: 4 }
      })
      .then(res => {
        this.recommendMVList = res.data.result;
        for (var i = 0; i < this.recommendMVList.length; i++) {
          this.recommendMVList[i].playCount = this.playCount(
            this.recommendMVList[i].playCount
          );
        }
      })
      .catch(err => {
        alert("请求失败");
      });
  },
  methods: {
    //跳转歌曲详情页
    gosonglistdetail(id) {
      this.$router.push("/songlistdetail?q=" + id);
    },
    //播放音乐
    playMusic(id) {
      this.$http
        .get("song/url", {
          params: { id }
        })
        .then(res => {
          let url = res.data.data[0].url;
          this.$parent.$parent.musicUrl = url;
        })
        .catch(err => {
          alert("请求失败");
        });
    },
    //跳转mv详情页
    goMvDetail(id) {
      this.$router.push("/mvdetail?mvid=" + id);
    }
  }
};
</script>
