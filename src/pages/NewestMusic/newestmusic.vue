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
      >{{ styleMusic[index].name }}</a>
    </div>
    <div class="music-table-box">
      <div class="music-th">
        <span class="music-num music-td"></span>
        <span class="music-td music-picbox"></span>
        <span class="music-dl music-td">音乐标题</span>
        <span class="music-artisit music-td">歌手</span>
        <span class="ablum music-td">专辑</span>
        <span class="time music-td">时长</span>
      </div>
      <div class="music-tr" v-for="(item, index) of newestMusic" :key="index">
        <span class="music-num music-td">{{ index + 1 }}</span>
        <div class="music-td music-picbox">
          <div class="music-play-sm">
            <img :src="item.album.picUrl" />
            <a href="javascript:;" class="a-play" @click="playMusic(item.id)">播放</a>
          </div>
        </div>
        <div class="music-dl music-td">
          <h2 class="music-name">{{ item.name }}</h2>
          <i class="play-sm"></i>
          <p class="music-p">{{ item.album.name }}</p>
        </div>
        <div class="music-artisit music-td">{{ item.album.artists[0].name }}</div>
        <div class="ablum music-td">{{ item.album.name }}</div>
        <div class="time music-td">{{ item.duration }}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "newestMusic",
  data() {
    return {
      newestMusic: [],
      styleindex: 0, //   分类
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
      this.$http
        .get("/top/song", {
          params: { type: this.styleMusic[this.styleindex].num }
        })
        .then(res => {
          this.newestMusic = res.data.data;
          for (var i = 0; i < this.newestMusic.length; i++) {
            this.newestMusic[i].duration = this.mvTime(
              this.newestMusic[i].duration
            );
          }
        })
        .catch(err => {
          alert("请求失败");
        });
    },
    //选择类别
    gostyle(index) {
      this.styleindex = index;
      //   数据类型切换方法一
      //   this.listData(index);
    },
    //播放音乐
    playMusic(id) {
      this.$http
        .get("/song/url", {
          params: { id: id }
        })
        .then(res => {
          let url = res.data.data[0].url;
          this.$parent.$parent.musicUrl = url;
        })
        .catch(err => {
          alert("请求失败");
        });
    }
  }
};
</script>
