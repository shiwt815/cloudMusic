<template>
  <div class="search-wrap">
    <div class="search-top">
      <h1 class="search-word">{{ $route.query.q }}</h1>
      <span class="small-word">共找到{{ count }}个结果</span>
    </div>
    <!-- <musicPlay /> -->
    <div class="search-tab">
      <a href="#" class="t-t" :class="{ active: typeNum == 1 }" @click="chooseType(1)">歌曲</a>
      <a href="#" class="t-t" :class="{ active: typeNum == 1000 }" @click="chooseType(1000)">歌单</a>
      <a href="#" class="t-t" :class="{ active: typeNum == 1004 }" @click="chooseType(1004)">MV</a>
    </div>
    <div class="music-table-box" v-if="typeNum === 1">
      <div class="music-th">
        <span class="music-num music-td"></span>
        <span class="music-artisit music-td">音乐标题</span>
        <span class="music-artisit music-td">歌手</span>
        <span class="ablum music-td">专辑</span>
        <span class="time music-td">时长</span>
      </div>

      <div
        class="music-tr"
        v-for="(item, index) of songlist"
        :key="index"
        @dblclick="playMusic(item.id)"
      >
        <span class="music-num music-td">{{ index + 1 }}</span>
        <div class="music-artisit music-td">
          <h2 class="music-name">{{ item.name }}</h2>
          <a href="javascript:;" class="a-mv" v-if="item.mvid != 0" @click="goplaymv()"></a>
        </div>
        <div class="music-artisit music-td">{{ item.artists[0].name }}</div>
        <div class="ablum music-td">{{ item.album.name }}</div>
        <div class="time music-td">{{ item.duration }}</div>
      </div>
    </div>
    <div class="resonglists" v-else-if="typeNum === 1000">
      <div class="goodsong" v-for="(item, index) of playlist" :key="index">
        <div class="img-posr">
          <span class="play-num">播放量：{{ item.playCount }}</span>
          <a href="#" class="a-play" @click="gosonglistdetail(item.id)">播放</a>
          <img :src="item.coverImgUrl" alt class="goodsong-img" />
        </div>
        <p class="goodsong-name">{{ item.name }}</p>
      </div>
    </div>
    <div class="mvlist" v-else-if="typeNum === 1004">
      <div class="mv-list">
        <div class="mv" v-for="(item, index) of mvcount" :key="index" @click="goMvDetail(item.id)">
          <div class="img-posr">
            <div class="play">
              <i class="san"></i>
            </div>
            <img :src="item.cover" alt class="mv-img" />
            <span class="play-num">{{ item.playCount }}</span>
            <span class="mvtime">{{ item.duration }}</span>
          </div>
          <a href="#" class="mv-name">{{ item.name }}</a>
          <a href="#" class="artits-name">{{ item.artistName }}</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "result",
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
      this.$http
        .get("search", {
          params: {
            limit: this.limit,
            type: this.typeNum,
            keywords: this.$route.query.q
          }
        })
        .then(res => {
          if (this.typeNum == 1) {
            this.songlist = res.data.result.songs;
            this.count = res.data.result.songCount;
            for (var i = 0; i < this.songlist.length; i++) {
              res.data.result.songs[i].duration = this.mvTime(
                this.songlist[i].duration
              );
            }
          } else if (this.typeNum == 1000) {
            this.playlist = res.data.result.playlists;
            for (var i = 0; i < this.playlist.length; i++) {
              this.playlist[i].playCount = this.playCount(
                this.playlist[i].playCount
              );
            }
          } else if (this.typeNum == 1004) {
            this.mvcount = res.data.result.mvs;
            for (var i = 0; i < this.mvcount.length; i++) {
              this.mvcount[i].playCount = this.playCount(
                this.mvcount[i].playCount
              );
              this.mvcount[i].duration = this.mvTime(this.mvcount[i].duration);
            }
          }
        })
        .catch(err => {
          alert("搜索结果数据请求失败");
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
          alert("播放音乐请求失败");
        });
    },
    gosonglistdetail(id) {
      this.$router.push("/songlistdetail?q=" + id);
    },
    //跳转mv详情页
    goMvDetail(id) {
      this.$router.push("/mvdetail?mvid=" + id);
    }
  }
};
</script>
