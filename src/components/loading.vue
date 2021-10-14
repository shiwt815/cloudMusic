<template>
  <div class="loading">
    <span>loading...</span>
  </div>
</template>

<script>
export default {
  name: "loading"
};
</script>

<style>
/* scoped */
.loading {
  position: relative;
  margin: 150px auto;
  width: 100px;
  height: 100px;
  border-top: 10px solid red;
  border-radius: 50%;
  z-index: 1000;
  animation: loadRotate 2s linear infinite;
  text-align: center;
  line-height: 100px;
}

.loading:before,
.loading:after {
  content: "";
  position: absolute;
  top: -10px;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 50%;
}
.loading:before {
  border-top: 10px solid blue;
  transform: rotate(120deg);
}
.loading:after {
  border-top: 10px solid green;
  transform: rotate(240deg);
}
.loading > span {
  display: block;
  animation: loadRotate2 2s linear infinite;
}
@keyframes loadRotate {
  /* 0% {
    transform: rotate(0);
  } */
  to {
    transform: rotate(360deg);
  }
}
@keyframes loadRotate2 {
  /* 0% {
    transform: rotate(0);
  } */
  to {
    transform: rotate(-360deg);
  }
}
</style>
