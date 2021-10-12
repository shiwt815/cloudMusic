<template>
  <div class="h100">
    <Nav />
    <div class="right-content">
      <router-view />
    </div>
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