<template>
  <Header />
  <div class="top">
    <swiper
      :isAutoPlay="true"
      :isNavigation="false"
      :isPagination="false"
      :isScrollbar="true"
      :borderSize="5"
    ></swiper>
  </div>
  <div class="container">
    <div class="article-left">
      <p>最 新 消 息</p>
      <div class="border">
        <ul class="news">
          <li>開始一個新的篇章吧 !</li>
          <li>開始一個新的篇章吧 !</li>
          <li>開始一個新的篇章吧 !</li>
          <li>開始一個新的篇章吧 !</li>
          <li>開始一個新的篇章吧 !</li>
        </ul>
      </div>
      <p>湛 藍 精 選</p>
      <swiper
        class="best-img"
        :isAutoPlay="true"
        :isNavigation="true"
        :isPagination="true"
        :isScrollbar="true"
        :borderSize="5"
      ></swiper>
    </div>
    <div class="article-right">
      <p>熱 門 文 章</p>
      <div class="border">
        <ul>
          <li v-for="item in 5" :key="item.id">
            <article-item></article-item>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div class="container1">
    <div class="imgLeft">
      <produce-item
        :imgName="'孤獨的海人'"
        :imgWidth="100"
        :imgHeight="100"
      ></produce-item>
      <div class="btn-area"><button>我 也 要 投 稿</button></div>
    </div>
    <div class="imgRight">
      <produce-item :imgName="'孤獨的海人'" :imgWidth="48"></produce-item>
      <produce-item :imgName="'孤獨的海人'" :imgWidth="48"></produce-item>
      <produce-item :imgName="'孤獨的海人'" :imgWidth="48"></produce-item>
      <produce-item :imgName="'孤獨的海人'" :imgWidth="48"></produce-item>
      <produce-item :imgName="'孤獨的海人'" :imgWidth="48"></produce-item>
      <produce-item :imgName="'孤獨的海人'" :imgWidth="48"></produce-item>
    </div>
  </div>
</template>

<script>
import Swiper from "../components/Swiper.vue";
import Header from "../components/Header.vue";
import ArticleItem from "../components/ArticleItem.vue";
import ProduceItem from "../components/ProduceItem.vue";
export default {
  components: {
    Header,
    Swiper,
    ArticleItem,
    ProduceItem,
  },
};
</script>

<style lang="scss" scoped>
* {
  margin: 0 auto;
}
.top {
  max-width: 80%;
}
p {
  padding: 5px;
}
.container {
  position: relative;
  margin-top: 30px;
  display: flex;
  // background: olive;
  height: 350px;
  max-width: 80%;
  .article-left {
    padding-right: 7.5px;
    display: flex;
    flex-direction: column;
    width: 45%;
    height: 100%;
    .border {
      position: relative;
      width: 100%;
      height: 40%;
      overflow-y: auto;
      border: 2px solid #72bed7;
      border-radius: 5px;
      .news {
        margin-top: 5px;
        padding-left: 30px;
        margin-right: 5px;
        li {
          padding: 2px;
        }
      }
    }
    .best-img {
      position: relative;
      width: 100%;
      height: 60%;
    }
  }
  .article-right {
    display: flex;
    flex: 1;
    padding-left: 7.5px;
    flex-direction: column;
    height: 100%;
    width: 55%;
    .border {
      width: 100%;
      height: 100%;
      border: 2px solid #72bed7;
      border-radius: 5px;
      overflow-y: auto;
      ul {
        // height: 100%;
        list-style: none;
      }
    }
  }
}
.container1 {
  position: relative;
  margin-top: 30px;
  max-width: 80%;
  display: flex;
  .imgLeft {
    width: 50%;
    height: 100%;
    .btn-area {
      text-align: center;
      width: 100%;
      button {
        text-align: center;
        position: relative;
        vertical-align: middle;
        margin: 0 auto;
        border-radius: 5px;
        height: 45px;
        width: 90%;
      }
    }
  }
  .imgRight {
    width: 50%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
