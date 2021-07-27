<template>
  <div class="editor" v-if="editor">
    <menu-bar class="editor__header" :editor="editor" />
    <editor-content class="editor__content" :editor="editor" />
    <div class="editor__footer" />
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
import MenuBar from "./MenuBar.vue";

export default {
  emits: ["input"], //宣告這個是要發射出去的關鍵字
  props: ["action"],
  components: {
    EditorContent,
    MenuBar,
  },
  data() {
    return {
      provider: null,
      editor: null,
      editContentString: "",
      editContentHtmlString: "",
    };
  },

  mounted() {
    const _this = this;
    this.editor = new Editor({
      extensions: [
        StarterKit.configure({
          history: true,
        }),
        Highlight,
        TaskList,
        TaskItem,
        Image,
        CharacterCount.configure({
          limit: 10000, //字數限制
        }),
      ],
      onUpdate() {
        // const json = this.getJSON();
        const html = this.getHTML();
        // this.editContentString = JSON.stringify(
        //   json.content[0].content[0].text
        // );
        this.editContentHtmlString = html;
        if (this.editContentHtmlString.length > 0) {
          _this.$emit("input", html); //發射出去給父層
        }
      },
    });
  },
  methods: {
    clear() {
      this.editor.commands.setContent("").run();
    },
  },
  beforeUnmount() {
    if (this.editor !== null) {
      this.editor.destroy();
    }
  },
};
</script>

<style lang="scss" scrpoed>
* {
  margin: 0;
}
.editor {
  flex-direction: column;
  // color: #0d0d0d;

  background-color: white;
  border: 3px solid #0d0d0d;
  border-radius: 0.75rem;

  &__header {
    display: flex;
    align-items: center;
    flex: 0 0 auto;
    flex-wrap: wrap;
    padding: 0.25rem;
    border-bottom: 3px solid #0d0d0d;
  }

  &__content {
    padding: 2rem 2rem 2rem 2rem;
    margin-bottom: 20px;
    flex: 1 1 auto;
    overflow-x: hidden;
    overflow-y: auto;

    -webkit-overflow-scrolling: touch;
  }
}
.ProseMirror {
  > * + * {
    margin-top: 0.75em;
  }
  width: 100%;
  height: 500px;
  border: none;
  &:focus {
    outline: none;
  }
  p {
    width: 100%;
  }
  ul,
  ol {
    display: block;
    padding: 0 1rem;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.1;
  }

  code {
    background-color: rgba(#616161, 0.1);
    color: #616161;
  }

  pre {
    background: #0d0d0d;
    color: #fff;
    font-family: "JetBrainsMono", monospace;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;

    code {
      color: inherit;
      padding: 0;
      background: none;
      font-size: 0.8rem;
    }
  }

  mark {
    background-color: #faf594;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  hr {
    margin: 1rem 0;
  }

  blockquote {
    padding-left: 1rem;
    border-left: 2px solid rgba(#0d0d0d, 0.1);
  }

  hr {
    border: none;
    border-top: 2px solid rgba(#0d0d0d, 0.1);
    margin: 2rem 0;
  }

  ul[data-type="taskList"] {
    list-style: none;
    padding: 0;

    li {
      display: flex;
      align-items: center;

      > label {
        flex: 0 0 auto;
        margin-right: 0.5rem;
      }
    }
  }
}
</style>
