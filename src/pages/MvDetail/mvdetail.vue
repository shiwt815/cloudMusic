<template>
  <div class="mvdetail-wrap">
    <div class="mv-left">
      <h1 class="mv-title">mv详情</h1>
      <div class="mvplay-box">
        <video :src="mvurl" controls="controls" />
      </div>
      <div class="artitis-box">
        <img :src="mvdetail.cover" alt class="user-pic" />
        <span class="user-name">{{mvdetail.artistName}}</span>
      </div>
      <div class="mvdetail-box">
        <h1 class="mv-name">{{mvdetail.name}}</h1>
        <div class="word-smLL">
          <span>发布</span>
          <span>{{mvdetail.publishTime}}</span>
          <span>播放</span>
          <span>{{mvdetail.playCount}}次</span>
        </div>
        <p class="mvdetail-p">{{mvdetail.desc}}</p>
      </div>

      <div class="comments-wrap">
        <div class="comments-box">
          <h2 class="comments-title">热门评论（{{hotcomment.length}}）</h2>
          <ul class="comments-ul">
            <li class="comments-li" v-for="(item,index) of hotcomment" :key="index">
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
          <h2 class="comments-title">最新评论（{{comment.length}}）</h2>
          <ul class="comments-ul">
            <li class="comments-li" v-for="(item,index) of comment" :key="index">
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
    <div class="mvdetail-right">
      <h1 class="mv-title">相关推荐</h1>
      <div class="mv-list">
        <div class="mv" v-for="(item2,index) of mvabout" :key="index">
          <span class="playcount">{{item2.playCount }}</span>
          <img :src="item2.cover" alt class="mv-img" />
          <a href="#" class="mv-time">{{item2.duration }}</a>
          <a href="#" class="mv-name">{{item2.name}}</a>
          <a href="#" class="artits-name">{{item2.artistName}}</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "mvdetail",
  data() {
    return {
      mvdetail: [],
      mvurl: [],
      mvabout: [],
      comment: [],
      hotcomment: []
    };
  },
  created() {
    //   mv地址
    axios({
      url: "https://autumnfish.cn/mv/url",
      method: "get",
      params: { id: this.$route.query.mvid }
    }).then(res => {
      this.mvurl = res.data.data.url;
    });
    axios({
      url: "https://autumnfish.cn/mv/detail",
      method: "get",
      params: { mvid: this.$route.query.mvid }
    }).then(res => {
      this.mvdetail = res.data.data;
      console.log("详情", res);
    });
    axios({
      url: "https://autumnfish.cn/simi/mv",
      method: "get",
      params: { mvid: this.$route.query.mvid }
    }).then(res => {
      this.mvabout = res.data.mvs;
      console.log("相关", res);
    });
    //评论
    axios({
      url: "https://autumnfish.cn/comment/mv",
      method: "get",
      params: { id: this.$route.query.mvid }
    }).then(res => {
      this.comment = res.data.comments;
      this.hotcomment = res.data.hotComments;
      console.log("评论", res);
      console.log("rm评论", res);
    });
  },
  methods: {}
};
</script>
