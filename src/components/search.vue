<template>
  <div class="search-wrap">
    <div class="search-box">
      <i class="i-search"></i>
      <input
        type="text"
        class="search-text"
        v-model="searchValue"
        @keyup.enter="goResult()"
      />
      <i class="i-close">x</i>
    </div>
  </div>
</template>
<script>
// import axios from "axios";

export default {
  name: "search",
  data() {
    return {
      searchValue: null
    };
  },
  methods: {
    goResult() {
      if (this.searchValue == "") {
        alert("您还没有输入检索词");
      } else {
        this.$router.push("/result?q=" + this.searchValue);
        this.searchValue = null;
      }
    }
  }
};
</script>
