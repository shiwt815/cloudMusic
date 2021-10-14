<template>
  <div class="newstmv-wrap">
    <div class="list-nav-tl">
      <div class="list-nav-m">
        <span>地区：</span>
        <a
          href="#"
          class="gn-a"
          :class="index == areanum ? 'active' : ''"
          v-for="(item, index) of area"
          :key="index"
          @click="goarea(index)"
          >{{ item }}</a
        >
      </div>
      <div class="list-nav-m">
        <span>类型：</span>
        <a
          href="#"
          class="gn-a"
          :class="index == typenum ? 'active' : ''"
          v-for="(item, index) of type"
          :key="index"
          @click="gotype(index)"
          >{{ item }}</a
        >
      </div>
      <div class="list-nav-m">
        <span>排序：</span>
        <a
          href="#"
          class="gn-a"
          :class="index == ordernum ? 'active' : ''"
          v-for="(item, index) of order"
          :key="index"
          @click="goorder(index)"
          >{{ item }}</a
        >
      </div>
    </div>
    <div class="mv-list">
      <div
        class="mv"
        v-for="(item, index) of nestMVList"
        :key="index"
        @click="goMvDetail(item.id)"
      >
        <div class="img-posr">
          <div class="play-num">
            <i class="san"></i>
          </div>
          <img v-lazy="item.cover" alt class="mv-img" />
          <span class="play-num">播放量：{{ item.playCount }}</span>
        </div>
        <a href="#" class="title-name">{{ item.name }}</a>
        <a href="#" class="word-small">{{ item.artistName }}</a>
      </div>
    </div>
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
// import axios from "axios";

export default {
  name: "newestmv",
  data() {
    return {
      nestMVList: [],
      areanum: 0,
      typenum: 0,
      ordernum: 0,
      //地区
      area: ["全部", "内地", "港台", "欧美", "日本", "韩国"],
      //类型
      type: ["全部", "官方版", "原声", "现场版", "网易出品"],
      //排序
      order: ["上升最快", "最热", "最新"],
      //最大量
      limit: 12,
      //偏移量
      page: 1,

      total: 0
    };
  },
  created() {
    this.mvData();
  },
  methods: {
    mvData() {
      this.$http
        .get("/mv/all", {
          params: {
            area: this.area[this.areanum],
            type: this.type[this.typenum],
            //排序
            order: this.order[this.ordernum],
            //最大量
            limit: this.limit,
            //偏移量
            // page: this.page,
            offset: (this.page - 1) * this.limit
          }
        })
        .then(res => {
          this.nestMVList = res.data.data;
          for (var i = 0; i < this.nestMVList.length; i++) {
            if (this.nestMVList[i].playCount > 10000) {
              this.nestMVList[i].playCount = this.playCount(
                this.nestMVList[i].playCount
              );
            }
          }
          //总条数
          //接口问题
          if (res.data.count) {
            this.total = res.data.count;
          }
        })
        .catch(err => {
          alert("请求失败");
        });
    },
    goarea(index) {
      this.areanum = index;
      this.page = 1;
      this.mvData();
    },
    gotype(index) {
      this.typenum = index;
      this.page = 1;
      this.mvData();
    },
    goorder(index) {
      this.typenum = index;
      this.page = 1;
      this.mvData();
    },

    //跳转mv详情页
    goMvDetail(id) {
      console.log(id);
      this.$router.push("/mvdetail?mvid=" + id);
    },
    //分页
    handleCurrentChange(val) {
      this.page = val;
      this.mvData();
      console.log("pagenum", val);
    }
  }
};
</script>
