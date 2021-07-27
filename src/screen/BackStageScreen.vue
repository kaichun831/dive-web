<template>
  <div class="article-container">
    <h1>新增文章模組</h1>
    <div>
      <div class="wrap">
        <h3 class="left">標題</h3>
        <input type="text" v-model="title" @change="testChange" />
        <!-- <p>{{ title }}</p> -->
      </div>
      <div class="wrap">
        <h3 class="left">次標</h3>
        <input type="text" v-model="secondTitle" />
        <!-- <p>{{ title }}</p> -->
      </div>
      <div class="wrap">
        <h3 class="left">上架日期</h3>
        <input type="date" v-model="inputDate" />
        <!-- <p>{{ inputDate }}</p> -->
      </div>
      <div class="wrap">
        <h3 class="left">文章顯示</h3>

        <label
          ><input
            type="radio"
            name="isShow"
            value="0"
            checked
            v-model="isShow"
          />顯示</label
        >
        <label
          ><input
            type="radio"
            name="isShow"
            value="1"
            v-model="isShow"
          />隱藏</label
        >

        <!-- {{ isShow }} -->
      </div>

      <div class="wrap">
        <h3 class="left">允許回覆</h3>
        <label
          ><input
            type="radio"
            name="isAllowRecovery"
            value="0"
            checked
            v-model="isAllowRecovery"
          />允許</label
        >
        <label
          ><input
            type="radio"
            name="isAllowRecovery"
            value="1"
            v-model="isAllowRecovery"
          />不允許</label
        >
        <!-- {{ isAllowRecovery }} -->
      </div>
      <div class="wrap">
        <h3 class="left">文章分類</h3>
        <select v-model="selected">
          <option disabled value="">尚未選取分類</option>
          <option
            v-for="(item, index) in selectedType"
            :key="index"
            :value="index"
          >
            {{ item }}
          </option>
        </select>
        <!-- <p>{{ selected }}</p> -->
      </div>
      <div class="wrap">
        <h3 class="left">內文</h3>
        <tiptap
          class="right"
          @input="listenerEditContentChange"
          ref="tiptap"
        ></tiptap>
      </div>
    </div>
    <button @click="submit" style="padding: 5px">送出</button>
    <router-link to="/preview">預覽</router-link>
  </div>
</template>

<script>
import Tiptap from "../components/Tiptap.vue";
export default {
  components: {
    Tiptap,
  },
  data() {
    return {
      account: "",
      title: "", //標題
      secondTitle: "", //次標
      inputDate: "", //上架日期
      isShow: 0, //允許顯示於網頁  0:允許 1:不允許
      isAllowRecovery: 0, //允許回覆  0:允許 1:不允許
      selected: "", //文章分類
      inputEditorContentHtml: "", //內容
      selectedType: ["推薦", "評論", "分享", "開箱", "教學", "技巧"],
    };
  },
  watch: {
    // title(newValue) {
    //   // console.log(newValue);
    // },
  },
  created() {
    // var account = this.$cookie.get("account");
    // var isLogin = this.$cookie.get("isLogin");
    // this.account = account;
    // if (isLogin !== "true") {
    //   this.$router.push("/login");
    // }
  },
  methods: {
    listenerEditContentChange(event) {
      if (event.length > 0) {
        this.inputEditorContentHtml = event;
      }
    },
    submit() {
      //送出文章
      const _this = this;
      const request = {
        ArticleTitle: _this.title,
        ArticleSecondTitle: _this.secondTitle,
        ArticleContent: _this.inputEditorContentHtml,
        ArticleType: _this.selected,
        IsAllowShow: _this.isShow,
        IsAllowRecovery: _this.isAllowRecovery,
        LuanchDate: new Date(_this.inputDate),
        Author: _this.account,
      };
      if (
        _this.title === "" ||
        _this.secondTitle === "" ||
        _this.inputEditorContentHtml === "" ||
        _this.selected === "" ||
        _this.isShow === "" ||
        _this.inputDate === ""
      ) {
        alert("有欄位忘記輸入囉!");
        return false;
      }
      this.axios
        .post(process.env.VUE_APP_BASE_URL + "/api/article/create", request, {
          headers: {
            Authorization: "KAI Admin",
          },
        })
        .then((response) => {
          alert(JSON.stringify(response.data));
          _this.title = "";
          _this.secondTitle = "";
          _this.inputEditorContentHtml = "";
          _this.selected = "";
          _this.isShow = "";
          this.$refs.tiptap.clear();
        });
    },
  },
};
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}
.article-container {
  padding: 30px;
  .wrap {
    display: flex;
    width: 100%;
    margin-top: 10px;
    .left {
      width: 8%;
    }
    .right {
      width: 80%;
    }
  }
}

button {
  border: 1px solid gray;
  border-radius: 3px;
}
</style>
