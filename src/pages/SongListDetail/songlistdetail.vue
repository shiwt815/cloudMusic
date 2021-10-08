<template>
  <div class="songlistdetail-wrap">
    <div class="songlistdetail-top">
      <img :src="playlistdetail.coverImgUrl" alt class="sonoglist-img" />
      <div class="songlistdetail-tr">
        <h2 class="songlistdetail-t">{{playlistdetail.name}}</h2>
        <img :src="playlistdetail.creator.avatarUrl" alt class="user-head" />
        <span class="user-name">{{playlistdetail.creator.nickname}}</span>
        <span class="creat-time">{{playlistdetail.createTime}}</span>
        <a href="#" class="play-btn">
          <i class="i-play"></i>
          全部播放
        </a>
        <div class="sld-p">
          <span>标签：</span>
          <span class="tag" v-for="(item,index) of playlistdetail.tags" :key="index">{{item}}</span>
        </div>
        <div class="sld-p">
          <span>简介：</span>
          {{playlistdetail.description}}
        </div>
      </div>
    </div>
    <div class="songlistdetail-bottom">
      <div class="search-tab">
        <a
          href="javascript:;"
          class="t-t"
          :class="{active:itemActive==1}"
          @click="goTabItem(1)"
        >歌曲列表</a>
        <a
          href="javascript:;"
          class="t-t"
          :class="{active:itemActive==2}"
          @click="goTabItem(2)"
        >评论({{hotComments.length}})</a>
      </div>
      <div class="music-table-box" v-if="itemActive==1">
        <div class="music-th">
          <span>音乐标题</span>
          <span>歌手</span>
          <span>专辑</span>
          <span>时长</span>
        </div>

        <div
          class="music-tr"
          v-for="(item, index) of playlistdetail.tracks"
          :key="index"
          @dblclick="goplay(item.id)"
        >
          <span class="music-num">{{ index + 1 }}</span>

          <div class="music-play-sm">
            <img :src="item.al.picUrl" />
            <a href="javascript:;" class="a-play" @click="goplay(item.id)">播放</a>
          </div>
          <div class="music-dl">
            <h2 class="music-name">{{ item.name }}</h2>
            <a href="javascript:;" class="a-mv" v-if="item.mv != 0" @click="goplaymv()"></a>
            <p class="music-p">{{ item.alia }}</p>
          </div>
          <div class="music-artisit">{{ item.ar[0].name }}</div>
          <div class="ablum">{{ item.al.name }}</div>
          <div class="time">{{ item.publishTime }}</div>
        </div>
      </div>
      <div class="comments-wrap" v-if="itemActive==2">
        <div class="comments-box">
          <h2 class="comments-title">热门评论（{{hotcount}}）</h2>
          <ul class="comments-ul">
            <li class="comments-li" v-for="(item,index) of hotComments" :key="index">
              <div class="comments">
                <img :src="item.user.avatarUrl" alt class="user-pic" />
                <span class="user-name">{{item.user.nickname}}</span>
                <p class="comments-p">{{item.content}}</p>
                <div
                  class="reply-box"
                  v-if="item.beReplied.length!=0"
                  v-for="(item1,index) of item.beReplied"
                  :key="index"
                >
                  <span class="user-name">{{item1.user.nickname}}</span>
                  <div class="reply-p">{{item1.content}}</div>
                </div>
                <div class="time">{{item.time}}2020-02-17 15:40:00</div>
              </div>
            </li>
          </ul>
        </div>
        <div class="comments-box">
          <h2 class="comments-title">最新评论（{{newcount}}）</h2>
          <ul class="comments-ul">
            <li class="comments-li" v-for="(item,index) of newComments" :key="index">
              <div class="comments">
                <img :src="item.user.avatarUrl" alt class="user-pic" />
                <span class="user-name">{{item.user.nickname}}</span>
                <p class="comments-p">{{item.content}}</p>
                <div
                  class="reply-box"
                  v-if="item.beReplied.length!=0"
                  v-for="(item1,index) of item.beReplied"
                  :key="index"
                >
                  <span class="user-name">{{item1.user.nickname}}</span>
                  <div class="reply-p">{{item1.content}}</div>
                </div>
                <div class="time">{{item.time}}2020-02-17 15:40:00</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";

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
    axios({
      url: "https://autumnfish.cn/playlist/detail",
      method: "get",
      params: {
        id: this.$route.query.q
      }
    }).then(res => {
      this.playlistdetail = res.data.playlist;
      for (var i = 0; i < this.playlistdetail.tracks.length; i++) {
        var ok = this.mvTime(this.playlistdetail.tracks[i].publishTime);
        this.playlistdetail.tracks[i].publishTime = ok;
      }
    });
    //评论详情
    axios({
      url: "https://autumnfish.cn/comment/hot",
      method: "get",
      params: {
        id: this.$route.query.q,
        type: 2 //"歌单"
      }
    }).then(res => {
      this.hotComments = res.data.hotComments;
      this.hotcount = res.data.total;
      this.topComments = res.data; //.topComments;
    });
    //评论详情
    axios({
      url: "https://autumnfish.cn/comment/playlist",
      method: "get",
      params: {
        id: this.$route.query.q,
        type: 2 //"歌单"
      }
    }).then(res => {
      this.newComments = res.data.comments;
      this.newcount = res.data.total;
      // this.topComments = res.data;
      console.log(res);
    });
  },
  methods: {
    goTabItem(num) {
      this.itemActive = num;
      console.log(num);
    }
  }
};
</script>
