<template>
  <div class="template-box">
    <div class="goodsonglist-nav">
      <a
        href="#"
        class="gn-a"
        :class="index == styleindex ? 'active' : ''"
        v-for="(item, index) of styleMusic"
        :key="index"
        @click="gostyle(index)"
        >{{ styleMusic[index].name }}</a
      >
    </div>
    <musicPlay />
    <div class="music-table-box">
      <div class="music-th">
        <span>音乐标题</span>
        <span>歌手</span>
        <span>专辑</span>
        <span>时长</span>
      </div>
      <div class="music-tr" v-for="(item, index) of newestMusic" :key="index">
        <span class="music-num">{{ index + 1 }}</span>
        <div class="music-play-sm">
          <img :src="item.album.picUrl" />
          <a href="javascript:;" class="a-play" @click="goplay(item.id)"
            >播放</a
          >
        </div>
        <div class="music-dl">
          <h2 class="music-name">{{ item.name }}</h2>
          <i class="play-sm"></i>
          <p class="music-p">{{ item.album.name }}</p>
        </div>
        <div class="music-artisit">{{ item.album.artists[0].name }}</div>
        <div class="ablum">{{ item.album.name }}</div>
        <div class="time">{{ item.duration }}</div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import musicPlay from "../../components/musicPlay.vue";

export default {
  name: "newestMusic",
  components: { musicPlay },
  data() {
    return {
      newestMusic: [],
      //   分类
      styleindex: 0,
      styleMusic: [
        {
          name: "全部",
          num: 0
        },
        {
          name: "华语",
          num: 7
        },
        {
          name: "欧美",
          num: 96
        },
        {
          name: "日本",
          num: 8
        },
        {
          name: "韩国",
          num: 16
        }
      ]
    };
  },
  created() {
    this.listData();
  },
  watch: {
    //   数据类型切换方法二
    styleindex() {
      this.listData();
    }
  },
  methods: {
    listData() {
      axios({
        url: "https://autumnfish.cn/top/song",
        method: "get",
        params: { type: this.styleMusic[this.styleindex].num }
      }).then(res => {
        // console.log(styleindex);
        this.newestMusic = res.data.data;
        for (var i = 0; i < this.newestMusic.length; i++) {
          let duration = this.newestMusic[i].duration;
          var min = parseInt(duration / 1000 / 60);
          var sec = parseInt((duration / 1000) % 60);
          if (min < 10) {
            min = "0" + min;
          }
          if (sec < 10) {
            sec = "0" + sec;
          }
          this.newestMusic[i].duration = min + ":" + sec; //"${min}:${sec}";
        }
      });
    },
    gostyle(index) {
      this.styleindex = index;
      //   数据类型切换方法一
      //   this.listData(index);
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
    }
  }
};
</script>
