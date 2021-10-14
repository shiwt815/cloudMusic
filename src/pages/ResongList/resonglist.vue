<template>
  <div class="goodsonglist-box">
    <div class="goodsonglist-top">
      <img v-lazy="goodsonglist.coverImgUrl" alt class="group-img" />
      <div class="goodsonglist-tr">
        <h3 class="group-t">
          <span class="bage">精品歌单</span>
          {{ goodsonglist.name }}
        </h3>
        <p class="group-p">{{ goodsonglist.description }}</p>
      </div>
      <img v-lazy="goodsonglist.coverImgUrl" alt class="group-bj" />
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
        <div class="img-posr">
          <span class="play-num">播放量：{{ item.commentCount }}</span>
          <a href="#" class="a-play" @click="gosonglistdetail(item.id)">播放</a>
          <img v-lazy="item.coverImgUrl" alt class="goodsong-img" />
        </div>
        <p class="title-name">{{ item.name }}</p>
      </div>
    </div>
    <!-- <div class="pagenav">
      <a href="#" class="a-pre" @click="page()">上一页</a>
      <a
        href="#"
        class="p-a"
        v-for="(item, index) of pagenum"
        :key="index"
        @click="gopagenum(index)"
        :class="pnum == index ? 'active' : ''"
      >{{ item }}</a>
      <a href="#" class="a-next">下一页</a>
      <span class="total">共{{ total }}条</span>
      <span>每页显示4条</span>
      <span class="pagesize">共{{ pagesize }}页</span>
    </div> -->
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page.sync="page"
      :page-size="limit - 1"
      layout="total, prev, pager, next"
      :total="total"
    >
    </el-pagination>
  </div>
</template>
<script>
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
      limit: 12,
      total: null, //总数
      //偏移量
      page: 1
      // pagesize: 0, //页数
      // pagenum: [],
      // pnum: 0
    };
  },
  created() {
    this.topData();
    this.listData();
  },
  watch: {},
  methods: {
    topData() {
      this.$http
        .get("/top/playlist/highquality", {
          params: { limit: 1, cat: this.stylelist[this.epnum] }
        })
        .then(res => {
          this.goodsonglist = res.data.playlists[0];
        })
        .catch(err => {
          alert("请求失败");
        });
    },
    listData(pnum) {
      this.$http
        .get("top/playlist", {
          params: {
            cat: this.stylelist[this.epnum],
            //最大量
            limit: this.limit,
            //偏移量
            // page: this.page,
            offset: (this.page - 1) * this.limit
          }
        })
        .then(res => {
          this.songlist = res.data.playlists;
          this.total = res.data.total;
        })
        .catch(err => {
          alert("请求失败");
        });
    },
    //分类选择
    gosonglist(num) {
      this.epnum = num;
      this.topData();
      this.listData();
    },
    //跳转歌曲详情页
    gosonglistdetail(id) {
      this.$router.push("/songlistdetail?q=" + id);
    },
    //分页
    handleCurrentChange(val) {
      this.page = val;
      this.listData();
      // console.log("pagenum", val);
    }
    // page() {
    //   this.listData();
    //   var pagesize = Math.ceil(this.total / 4);
    //   this.pagesize = pagesize;
    //   //获取页数
    //   for (var i = 1; i <= pagesize; i++) {
    //     this.pagenum.push(i);
    //   }
    // },
    // gopagenum(index) {
    //   this.pnum = index;
    //   this.listData(index);
    //   if (index > 3) {
    //     this.listData[index + 2];
    //   }
    // }
  },
  mounted() {}
};
</script>
