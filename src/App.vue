<template>
  <div id="app">
    <Search />
    <Head />
  </div>
</template>
<script>
import Head from "./components/nav.vue";
import Search from "./components/search.vue";

export default {
  name: "App",
  components: { Head, Search },
  data() {
    return {};
  }
};
</script>
<style>
.swiper-container {
  height: 300px;
}
img {
  max-width: 100%;
}
.active {
  color: red;
}
</style>
