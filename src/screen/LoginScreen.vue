<template>
  <div class="container" :style="{ height: screenHight + 'px' }">
    <login :cWidth="100" class="right-view"></login>
  </div>
  <swiper
    :isAutoPlay="true"
    :isNavigation="false"
    :isPagination="false"
    :isScrollbar="true"
    :borderSize="5"
  ></swiper>
</template>

<script>
import Swiper from "../components/Swiper.vue";
import Login from "../components/Login.vue";
export default {
  components: {
    Login,
    Swiper,
  },
  created() {
    this.handleLoginResponse();
  },
  methods: {
    handleLoginResponse() {
      this.emitter.on("LoginResponse", (payload) => {
        if (payload.data.code == 200) {
          this.$cookie.set("isLogin", true, {
            expires: process.env.VUE_APP_LOGIN_TIMEOUT,
          });
          this.$cookie.set("account", payload.data.data[0].UserAccount, {
            expires: process.env.VUE_APP_LOGIN_TIMEOUT,
          });
          this.$router.push("/backStage");
        } else {
          this.$swal("登入失敗");
        }
      });
    },
  },
  computed: {
    screenHight() {
      return window.innerHeight;
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  background: grey;
  display: flex;
  position: relative;

  .right-view {
    position: absolute;
    transform: translateY(-50%);
    top: 50%;
  }
}
</style>
