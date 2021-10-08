<template>
  <div class="goodsonglist-box">
    <div class="goodsonglist-top">
      <img :src="goodsonglist.coverImgUrl" alt="" class="group-img" />
      <div class="goodsonglist-tr">
        <span class="bage">精品歌单</span>
        <h3 class="group-t">{{ goodsonglist.name }}</h3>
        <p class="group-p">{{ goodsonglist.description }}</p>
      </div>
      <img :src="goodsonglist.coverImgUrl" alt="" class="group-bj" />
    </div>
    <div class="goodsonglist-nav">
      <a
        href="#"
        class="gn-a"
        v-bind:class="epnum == index ? 'active' : ''"
        v-for="(item, index) of stylelist"
        :key="index"
        @click="gosonglist(index)"
        >{{ item }}</a
      >
    </div>
    <div class="goodsonglist-con">
      <div class="goodsong" v-for="(item, index) of songlist" :key="index">
        <div class="goodsong-box">
          <span class="play-num">播放量：{{ item.commentCount }}</span>
          <a href="#" class="a-play">播放</a>
          <img :src="item.coverImgUrl" alt="" class="goodsong-img" />
        </div>
        <p class="goodsong-name">{{ item.name }}</p>
      </div>
    </div>
    <div class="pagenav">
      <a href="#" class="a-pre" @click="page()">上一页</a>
      <a
        href="#"
        class="p-a"
        v-for="(item, index) of pagenum"
        :key="index"
        @click="gopagenum(index)"
        :class="pnum == index ? 'active' : ''"
        >{{ item }}</a
      >
      <a href="#" class="a-next">下一页</a>
      <span class="total">共{{ total }}条</span>
      <span>每页显示4条</span>
      <span class="pagesize">共{{ pagesize }}页</span>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "resongList",
  data() {
    return {
      goodsonglist: [],
      songlist: [],
      epnum: 0, //歌曲分类索引值
      stylelist: [
        "全部",
        "欧美",
        "华语",
        "流行",
        "说唱",
        "摇滚",
        "民谣",
        "电子",
        "轻音乐",
        "影视原声",
        "ACG",
        "怀旧",
        "治愈",
        "旅行"
      ],
      total: null, //总数
      pagesize: 0, //页数
      pagenum: [],
      pnum: 0
    };
  },
  created() {
    this.topData();
    this.listData();
    // var pagesize = Math.ceil(this.total / 4);
    // console.log(this.total);
  },
  watch: {},
  methods: {
    topData() {
      axios({
        url: "https://autumnfish.cn/top/playlist/highquality",
        method: "get",
        params: {
          limit: 1,
          cat: this.stylelist[this.epnum]
        }
      }).then(res => {
        this.goodsonglist = res.data.playlists[0];
      });
    },
    listData(pnum) {
      axios({
        url: "https://autumnfish.cn/top/playlist",
        method: "get",
        params: {
          limit: 4,
          cat: this.stylelist[this.epnum],
          offset: this.pnum * 4
        }
      }).then(res => {
        this.songlist = res.data.playlists;
        this.total = res.data.total;
      });
    },
    gosonglist(num) {
      this.epnum = num;
      //   console.log(this.stylelist[num]);
      this.topData();
      this.listData();
    },
    page() {
      this.listData();
      var pagesize = Math.ceil(this.total / 4);
      this.pagesize = pagesize;
      //获取页数
      for (var i = 1; i <= pagesize; i++) {
        this.pagenum.push(i);
      }
    },
    gopagenum(index) {
      this.pnum = index;
      this.listData(index);
      if (index > 3) {
        this.listData[index + 2];
      }
    }
  },
  mounted() {
    // console.log(this.pagesize);
  }
};
</script>
