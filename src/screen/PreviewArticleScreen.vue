<template>
  <div>
    <div class="wrap">
      <h3>使用者文章</h3>
      <input type="text" @change="userName" />
      <button @click="query">查詢</button>
    </div>
    <div class="wrap">
      <h3>標題名稱</h3>
      <select @change="seletedAction">
        <option
          v-for="(item, index) in result"
          :key="index"
          :value="index"
          @click="queryArticle"
        >
          {{ item.ArticleTitle }}
        </option>
      </select>
    </div>
    <hr />
    <editor-content class="editor__content_preview" :editor="editor" />
  </div>
</template>

<script>
import { Editor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Highlight from "@tiptap/extension-highlight";
import CharacterCount from "@tiptap/extension-character-count";
import Image from "@tiptap/extension-image";
export default {
  components: {
    EditorContent,
  },
  created() {
    // var isLogin = this.$cookie.get("isLogin");
    // if (isLogin !== "true") {
    //   this.$router.push("/login");
    // }
  },
  data() {
    return {
      user: null,
      editor: null,
      result: [],
      previewText: null,
    };
  },
  mounted() {
    const _this = this;
    this.editor = new Editor({
      extensions: [
        StarterKit,
        Highlight,
        TaskList,
        TaskItem,
        Image,
        CharacterCount.configure({
          limit: 10000, //字數限制
        }),
      ],
      content: _this.previewText,
      editable: false,
    });
  },
  methods: {
    userName(e) {
      this.user = e.target.value;
    },
    query() {
      if (this.user == null || this.user == "") {
        this.$swal("請輸入使用者");
        return false;
      }
      const inputJson = {
        Author: this.user,
        Amount: 100,
        Sort: 1,
      };
      this.axios
        .post(
          process.env.VUE_APP_BASE_URL + "/api/article/queryByAuthor",
          inputJson,
          {
            headers: {
              Authorization: "KAI Admin",
            },
          }
        )
        .then((response) => {
          this.result = response.data.data;
          if (this.result.length == 0) {
            this.$swal("尚未有文章");
            return false;
          }
          if (this.result.length == 1) {
            this.setArticleShow(0);
          }
        })
        .catch((err) => {
          console.log(err);
          alert(err.body);
        });
    },
    seletedAction(event) {
      this.setArticleShow(event.target.value);
    },
    setArticleShow(position) {
      this.previewText = this.result[position].ArticleContent;
      this.editor.commands.setContent(this.previewText);
    },
  },
};
</script>

<style lang="scss">
.wrap {
  justify-self: center;
  display: flex;
  width: 100%;
  margin-top: 10px;
  h3 {
    margin-left: 30px;
    width: 150px;
  }
  button {
    margin-left: 5px;
  }
}

.editor__content_preview {
  margin-top: 30px;
  margin-left: 30px;
  max-width: 80%;
  height: 100%;
}
</style>
