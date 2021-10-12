<template>
  <div class="mvdetail-wrap">
    <div class="mv-left">
      <h1 class="mv-title">mv详情</h1>
      <div class="mvplay-box">
        <video :src="mvurl" controls="controls" />
      </div>
      <div class="artitis-box">
        <img :src="mvdetail.cover" alt class="user-head" />
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
          <h2 class="index-ht">热门评论（{{hotcomment.length}}）</h2>
          <ul class="comments-ul">
            <li class="comments-li" v-for="(item,index) of hotcomment" :key="index">
              <div class="comments">
                <img :src="item.user.avatarUrl" alt class="user-head" />
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
                <div class="comments-time">{{item.time}}</div>
              </div>
            </li>
          </ul>
        </div>
        <div class="comments-box">
          <h2 class="index-ht">最新评论（{{comment.length}}）</h2>
          <ul class="comments-ul">
            <li class="comments-li" v-for="(item,index) of comment" :key="index">
              <div class="comments">
                <img :src="item.user.avatarUrl" alt class="user-head" />
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
                <div class="comments-time">{{item.time}}</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="mvdetail-right">
      <h1 class="mv-title">相关推荐</h1>
      <div class="mv-list">
        <div class="mv" v-for="(item2,index) of mvabout" :key="index" @click="goMvDetail(item2.id)">
          <div class="img-posr">
            <span class="play-num">播放量：{{item2.playCount }}</span>
            <img :src="item2.cover" alt class="mv-img" />
            <a href="#" class="mv-time">{{item2.duration }}</a>
          </div>
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
    //mv地址
    this.mvurlData();
    //详情
    this.mvdetailData();
    //相关mv
    this.aboutData();
    //评论
    this.commentData();
  },
  methods: {
    //跳转mv详情页
    goMvDetail(id) {
      this.$router.push("/mvdetail?mvid=" + id);
      //mv地址
      this.mvurlData();
      //详情
      this.mvdetailData();
      //相关mv
      this.aboutData();
      //评论
      this.commentData();
    },

    //mv地址
    mvurlData() {
      this.$http
        .get("mv/url", {
          params: { id: this.$route.query.mvid }
        })
        .then(res => {
          this.mvurl = res.data.data.url;
        })
        .catch(err => {
          alert("请求失败");
        });
    },
    //详情
    mvdetailData() {
      this.$http
        .get("/mv/detail", {
          params: { mvid: this.$route.query.mvid }
        })
        .then(res => {
          this.mvdetail = res.data.data;
        })
        .catch(err => {
          alert("请求失败");
        });
    },
    //相关mv
    aboutData() {
      this.$http
        .get("simi/mv", {
          params: { mvid: this.$route.query.mvid }
        })
        .then(res => {
          this.mvabout = res.data.mvs;
          for (var i = 0; i < this.mvabout.length; i++) {
            console.log(this.mvabout[i].duration);
            this.mvabout[i].duration = this.dateShow(this.mvabout[i].duration); //?????
            this.mvabout[i].playCount = this.playCount(
              this.mvabout[i].playCount
            );
          }
        })
        .catch(err => {
          alert("请求失败");
        });
    },
    //评论
    commentData() {
      this.$http
        .get("comment/mv", {
          params: { id: this.$route.query.mvid }
        })
        .then(res => {
          this.comment = res.data.comments;
          this.hotcomment = res.data.hotComments;
          for (var i = 0; i < this.comment.length; i++) {
            this.comment[i].time = this.dateShow(this.comment[i].time);
            this.hotcomment[i].time = this.dateShow(this.hotcomment[i].time);
          }
        });
      // .catch(err => {
      //   alert("请求失败");
      // });
    }
  }
};
</script>
