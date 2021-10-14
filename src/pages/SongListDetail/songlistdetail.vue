<template>
  <div class="songlistdetail-wrap">
    <div class="goodsonglist-top">
      <img v-lazy="playlistdetail.coverImgUrl" alt class="group-img" />
      <div class="goodsonglist-tr">
        <h2 class="group-t">{{ playlistdetail.name }}</h2>
        <div class="user-p">
          <img
            v-lazy="playlistdetail.creator.avatarUrl"
            alt
            class="user-head"
          />
          <span class="user-name">{{ playlistdetail.creator.nickname }}</span>
          <span class="creat-time">{{ playlistdetail.createTime }}</span>
          <a href="#" class="play-btn">
            <i class="i-play"></i>
            全部播放
          </a>
        </div>
        <div class="sld-p">
          <span>标签：</span>
          <span
            class="tag"
            v-for="(item, index) of playlistdetail.tags"
            :key="index"
            >{{ item }}</span
          >
        </div>
        <div class="sld-p">
          <span>简介：</span>
          {{ playlistdetail.description }}
        </div>
      </div>
    </div>
    <div class="songlistdetail-bottom">
      <div class="search-tab">
        <a
          href="javascript:;"
          class="t-t"
          :class="{ active: itemActive == 1 }"
          @click="goTabItem(1)"
          >歌曲列表</a
        >
        <a
          href="javascript:;"
          class="t-t"
          :class="{ active: itemActive == 2 }"
          @click="goTabItem(2)"
          >评论({{ hotComments.length }})</a
        >
      </div>
      <div class="music-table-box" v-if="itemActive == 1">
        <div class="music-th">
          <span class="music-num music-td"></span>
          <span class="music-td music-picbox"></span>
          <span class="music-dl music-td">音乐标题</span>
          <span class="music-artisit music-td">歌手</span>
          <span class="ablum music-td">专辑</span>
          <span class="time music-td">发布时间</span>
        </div>

        <div
          class="music-tr"
          v-for="(item, index) of playlistdetail.tracks"
          :key="index"
          @dblclick="playMusic(item.id)"
        >
          <span class="music-num music-td">{{ index + 1 }}</span>
          <div class="music-td music-picbox">
            <div class="music-play-sm">
              <img v-lazy="item.al.picUrl" />
              <a href="javascript:;" class="a-play">播放</a>
              <!-- @click="playMusic(item.id)" -->
            </div>
          </div>
          <div class="music-dl music-td">
            <h2 class="music-name">{{ item.name }}</h2>
            <a
              href="javascript:;"
              class="a-mv"
              v-if="item.mv != 0"
              @click="goplaymv()"
            ></a>
            <p class="word-small">{{ item.alia }}</p>
          </div>
          <div class="music-artisit music-td">{{ item.ar[0].name }}</div>
          <div class="ablum music-td">{{ item.al.name }}</div>
          <div class="time music-td">{{ item.publishTime }}</div>
        </div>
      </div>
      <div class="comments-wrap" v-if="itemActive == 2">
        <div class="comments-box">
          <h2 class="index-ht">热门评论（{{ hotcount }}）</h2>
          <ul class="comments-ul">
            <li
              class="comments-li"
              v-for="(item, index) of hotComments"
              :key="index"
            >
              <div class="comments">
                <img v-lazy="item.user.avatarUrl" alt class="user-head" />
                <span class="user-name">{{ item.user.nickname }}</span>
                <p class="comments-p">{{ item.content }}</p>
                <div
                  class="reply-box"
                  v-if="item.beReplied.length != 0"
                  v-for="(item1, index) of item.beReplied"
                  :key="index"
                >
                  <span class="user-name">{{ item1.user.nickname }}</span>
                  <div class="reply-p">{{ item1.content }}</div>
                </div>
                <div class="comments-time">{{ item.time }}</div>
              </div>
            </li>
          </ul>
        </div>
        <div class="comments-box">
          <h2 class="index-ht">最新评论（{{ newcount }}）</h2>
          <ul class="comments-ul">
            <li
              class="comments-li"
              v-for="(item, index) of newComments"
              :key="index"
            >
              <div class="comments">
                <img v-lazy="item.user.avatarUrl" alt class="user-head" />
                <span class="user-name">{{ item.user.nickname }}</span>
                <p class="comments-p">{{ item.content }}</p>
                <div
                  class="reply-box"
                  v-if="item.beReplied.length != 0"
                  v-for="(item1, index) of item.beReplied"
                  :key="index"
                >
                  <span class="user-name">{{ item1.user.nickname }}</span>
                  <div class="reply-p">{{ item1.content }}</div>
                </div>
                <div class="comments-time">{{ item.time }}</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import axios from "axios";

export default {
  name: "songlistdetail",
  data() {
    return {
      itemActive: 1,
      playlistdetail: [],
      hotComments: [],
      newComments: [],
      hotcount: 0
    };
  },
  created() {
    //数据列表
    this.$http
      .get("/playlist/detail", {
        params: {
          id: this.$route.query.q
        }
      })
      .then(res => {
        this.playlistdetail = res.data.playlist;
        for (var i = 0; i < this.playlistdetail.tracks.length; i++) {
          var ok = this.dateShow(this.playlistdetail.tracks[i].publishTime);
          this.playlistdetail.tracks[i].publishTime = ok;
        }
      })
      .catch(err => {
        alert("请求失败");
      });
    //评论详情
    this.$http
      .get("comment/hot", {
        params: {
          id: this.$route.query.q,
          type: 2 //"歌单"
        }
      })
      .then(res => {
        this.hotComments = res.data.hotComments;
        this.hotcount = res.data.total;
        this.topComments = res.data; //.topComments;
        for (var i = 0; i < this.hotComments.length; i++) {
          this.hotComments[i].time = this.dateShow(this.hotComments[i].time);
        }
      })
      .catch(err => {
        alert("请求失败");
      });
    //评论详情
    this.$http
      .get("comment/playlist", {
        params: {
          id: this.$route.query.q,
          type: 2 //"歌单"
        }
      })
      .then(res => {
        this.newComments = res.data.comments;
        this.newcount = res.data.total;

        for (var i = 0; i < this.newComments.length; i++) {
          this.newComments[i].time = this.dateShow(this.newComments[i].time);
        }
      })
      .catch(err => {
        alert("请求失败");
      });
  },
  methods: {
    goTabItem(num) {
      this.itemActive = num;
    },
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
    goplaymv() {}
  }
};
</script>
