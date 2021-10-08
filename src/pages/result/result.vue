<template>
  <div class="search-wrap">
    <div class="search-top">
      <h1 class="search-word">{{ $route.query.q }}</h1>
      <span class="small-word">共找到{{ count }}个结果</span>
    </div>
    <musicPlay />
    <div class="search-tab">
      <a href="#" class="t-t" :class="{ active: typeNum == 1 }" @click="chooseType(1)">歌曲</a>
      <a href="#" class="t-t" :class="{ active: typeNum == 1000 }" @click="chooseType(1000)">歌单</a>
      <a href="#" class="t-t" :class="{ active: typeNum == 1004 }" @click="chooseType(1004)">MV</a>
    </div>
    <div class="music-table-box" v-if="typeNum === 1">
      <div class="music-th">
        <span>音乐标题</span>
        <span>歌手</span>
        <span>专辑</span>
        <span>时长</span>
      </div>

      <div
        class="music-tr"
        v-for="(item, index) of songlist"
        :key="index"
        @dblclick="goplay(item.id)"
      >
        <span class="music-num">{{ index + 1 }}</span>
        <div class="music-artisit">
          <h2 class="music-name">{{ item.name }}</h2>
          <a href="javascript:;" class="a-mv" v-if="item.mvid != 0" @click="goplaymv()"></a>
        </div>
        <div class="music-artisit">{{ item.artists[0].name }}</div>
        <div class="ablum">{{ item.album.name }}</div>
        <div class="time">{{ item.duration }}</div>
      </div>
    </div>
    <div class="resonglists" v-else-if="typeNum === 1000">
      <div class="goodsong" v-for="(item, index) of playlist" :key="index">
        <div class="goodsong-box">
          <span class="play-num">播放量：{{ item.playCount }}</span>
          <a href="#" class="a-play" @click="gosonglistdetail(item.id)">播放</a>
          <img :src="item.coverImgUrl" alt class="goodsong-img" />
        </div>
        <p class="goodsong-name">{{ item.name }}</p>
      </div>
    </div>
    <div class="mvlist" v-else-if="typeNum === 1004">
      <div class="mv-list">
        <div class="mv" v-for="(item, index) of mvcount" :key="index">
          <div class="play-num">
            <i class="san"></i>
          </div>
          <img :src="item.cover" alt class="mv-img" />
          <span class="mvtime">{{ item.duration }}</span>
          <span class="playcount">{{ item.playCount }}</span>
          <a href="#" class="mv-name">{{ item.name }}</a>
          <a href="#" class="artits-name">{{ item.artistName }}</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import musicPlay from "../../components/musicPlay.vue";

export default {
  name: "result",
  components: { musicPlay },
  data() {
    return {
      //监听方法
      activename: "",
      songlist: [],
      playlist: [],
      mvcount: [],
      count: 0,
      typeNum: 1,
      limit: 4
      // mv:1004,
      // list:1000
    };
  },
  created() {
    this.resuleData();
  },
  methods: {
    resuleData() {
      axios({
        url: "https://autumnfish.cn/search",
        method: "get",
        params: {
          limit: this.limit,
          type: this.typeNum,
          keywords: this.$route.query.q
        }
      }).then(res => {
        if (this.typeNum == 1) {
          this.songlist = res.data.result.songs;
          this.count = res.data.result.songCount;
          for (var i = 0; i < this.songlist.length; i++) {
            var min = parseInt(this.songlist[i].duration / 1000 / 60);
            var sec = parseInt((this.songlist[i].duration / 1000) % 60);
            if (min < 10) {
              min = "0" + min;
            }
            if (sec < 10) {
              sec = "0" + sec;
            }
            res.data.result.songs[i].duration = min + ":" + sec;
          }
        } else if (this.typeNum == 1000) {
          this.playlist = res.data.result.playlists;
          for (var i = 0; i < this.length; i++) {
            this.playlist[i].playCount =
              parseInt(this.playlist[i].playCount / 10000) + "万"; //;
          }
        } else if (this.typeNum == 1004) {
          this.mvcount = res.data.result.mvs;
          for (var i = 0; i < this.mvcount.length; i++) {
            this.mvcount[i].playCount =
              parseInt(this.mvcount[i].playCount / 10000) + "万"; //;
            var min = parseInt(this.mvcount[i].duration / 1000 / 60);
            var sec = parseInt((this.mvcount[i].duration / 1000) % 60);
            this.mvcount[i].duration = min + ":" + sec;
          }
        }
      });
    },
    chooseType(a) {
      this.typeNum = a;
      if (a == 1004) {
        this.limit = 1;
      } else {
        this.limit = 4;
      }
      this.resuleData();
    },
    goplay(id) {
      axios({
        url: "https://autumnfish.cn/song/url",
        method: "get",
        params: { id: id }
      }).then(res => {
        let url = res.data.data[0].url;
        this.$children[0].musicUrl = url;
      });
    },
    gosonglistdetail(id) {
      // console.log(id);
      this.$router.push("/songlistdetail?q=" + id);
      // this.$router.push("/songlistdetail?q=${id}");
    }
  }
};
</script>
