<template>
  <div class="template-box">
    <div class="nav">
      <a
        href="#"
        class="n-a"
        v-bind:class="nav.id == index ? 'active' : ''"
        v-for="nav of navMenu"
        :key="nav.id"
        @click="goto(nav.path, nav.id)"
        >{{ nav.name }}</a
      >
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: "Head",
  data() {
    return {
      index: 1,
      navMenu: [
        {
          id: 1,
          name: "首页",
          path: "/"
        },
        {
          id: 3,
          name: "推荐歌单",
          path: "/resonglist"
        },
        {
          id: 4,
          name: "最新音乐",
          path: "/newestmusic"
        },
        {
          id: 5,
          name: "最新MV",
          path: "/newestmv"
        }
      ]
    };
  },
  methods: {
    goto(alink, i) {
      this.$router.push({ path: alink });
      this.index = i;
      // console.log(i);
    }
  }
};
</script>
<style scoped></style>
