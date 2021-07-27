<template>
  <div>
    <div class="swiper-container" :style="{ borderRadius: borderSize + 'px' }">
      <swiper
        :pagination="isPagination"
        :navigation="isNavigation"
        :scrollbar="isScrollbar"
        :autoplay="isAutoPlay"
      >
        >
        <swiper-slide
          v-for="(item, index) in swiperObject.title"
          :key="item.id"
        >
          <img :src="swiperObject.img[index]" @click="go(index)" />
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  Autoplay,
} from "swiper/core";
SwiperCore.use([Navigation, Pagination, Scrollbar, Autoplay]);
// Import Swiper styles
import "swiper/swiper-bundle.min.css";
export default {
  inject: ["swiperObject"],
  props: [
    "isPagination",
    "isNavigation",
    "isScrollbar",
    "isAutoPlay",
    "borderSize",
  ],
  components: {
    Swiper,
    SwiperSlide,
  },
};
</script>

<style lang="scss" scoped>
.swiper-container {
  height: 100%;
  .swiper-slide {
    text-align: center;
    font-size: 18px;
    background: #fff;
    /* Center slide text vertically */
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    img {
      width: 100%;
      display: block;
    }
  }
}
</style>
