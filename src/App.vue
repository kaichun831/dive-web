<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return {
      bg: require("./assets/background/bg_ocean001.jpg"),
      myTitle: "買吉它還是買弓箭？初學選集它必知道'弦距高度'",
    };
  },
  provide: {
    swiperObject: {
      title: ["001", "002", "003"],
      img: [
        require("./assets/background/bg_ocean001.jpg"),
        require("./assets/background/bg_ocean002.jpg"),
        require("./assets/background/bg_ocean003.jpg"),
      ],
      path: [
        "https://www.google.com/",
        "https://www.yahoo.com/",
        "https://www.youtube.com/?gl=TW&hl=zh-TW",
      ],
    },
  },
};
</script>

<style lang="scss">
* {
  margin: 0 auto;
  padding: 0;
}
.con {
  width: 800px;
}
.flex {
  margin: 5px;
  // background: blanchedalmond;
  display: inline-block;
  flex: auto;
}
</style>
