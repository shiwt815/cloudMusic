<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(item, index) of banners" :key="index">
        <img :src="item.imageUrl" alt="" />
      </div>
      <!-- <div class="swiper-slide">Slide 2</div>
      <div class="swiper-slide">Slide 3</div> -->
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>

    <!-- 如果需要滚动条 -->
    <div class="swiper-scrollbar"></div>
  </div>
</template>
<script>
import axios from "axios";

import Swiper from "swiper";
export default {
  name: "HelloWorld",
  data() {
    return {
      //轮播图
      banners: []
    };
  },
  mounted() {
    new Swiper(".swiper-container", {
      loop: true,
      // 如果需要分页器
      pagination: ".swiper-pagination",
      // 如果需要前进后退按钮
      nextButton: ".swiper-button-next",
      prevButton: ".swiper-button-prev",
      // 如果需要滚动条
      scrollbar: ".swiper-scrollbar"
    });
  },
  created() {
    // console.log("created");
    //轮播图接口
    axios({
      url: "https://autumnfish.cn/banner",
      method: "get"
      // params: {}//不传数据时可以不写
    }).then(res => {
      //console.log(res);
      this.banners = res.data.banners;
    });
  }
};
</script>
<style>
.swiper-slide img {
  max-width: 100%;
}
</style>
