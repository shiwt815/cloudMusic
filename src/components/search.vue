<template>
  <div class="search-wrap">
    <div class="search-box">
      <a href="#" class="search-i">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-sousuo" />
        </svg>
      </a>
      <input type="text" class="search-text" v-model="searchValue" @keyup.enter="goResult()" />
      <a href="#" class="search-x">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-guanbishixin" />
        </svg>
      </a>
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
