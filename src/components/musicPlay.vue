<template>
  <div class="player">
    <audio :src="musicUrl" controls></audio>
    <!-- autoplay -->
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "musicPlay",
  data() {
    return {
      musicUrl:
        "http://m801.music.126.net/20211006121443/a8c5417677754a03c2fd911dcc795415/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/11010502573/1826/ac11/23ba/b931e92443cc904e1451fe96272b4752.mp3"
    };
  },

  methods: {}
};
</script>
<style scoped></style>
