<template>
  <div class="h100">
    <Nav />
    <el-scrollbar class="right-content">
      <router-view />
    </el-scrollbar>
  </div>
</template>
<script>
import Nav from "../../components/nav.vue";
export default {
  name: "Index",
  components: { Nav }, // Index,
  data() {
    return {};
  }
};
</script>
