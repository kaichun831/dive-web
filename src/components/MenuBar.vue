<template>
  <div>
    <template v-for="(item, index) in items" :key="index">
      <div class="divider" v-if="item.type === 'divider'" :key="index" />
      <menu-item v-else v-bind="item" />
    </template>
    <input
      id="imageFile"
      ref="file"
      type="file"
      v-show="false"
      @change="previewImage"
    />
    <!-- <img :src="preview" /> -->
  </div>
</template>

<script>
import MenuItem from "./MenuItem.vue";

export default {
  components: {
    MenuItem,
  },
  props: {
    editor: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      preview: "",
      image: {
        name: "",
        size: "",
      },
      items: [
        //https://remixicon.com/    替換icon
        {
          icon: "bold",
          title: "Bold",
          action: () => this.editor.chain().focus().toggleBold().run(),
          isActive: () => this.editor.isActive("bold"),
        },
        {
          icon: "italic",
          title: "Italic",
          action: () => this.editor.chain().focus().toggleItalic().run(),
          isActive: () => this.editor.isActive("italic"),
        },
        {
          icon: "strikethrough",
          title: "Strike",
          action: () => this.editor.chain().focus().toggleStrike().run(),
          isActive: () => this.editor.isActive("strike"),
        },
        {
          icon: "code-view",
          title: "Code",
          action: () => this.editor.chain().focus().toggleCode().run(),
          isActive: () => this.editor.isActive("code"),
        },
        {
          icon: "mark-pen-line",
          title: "Highlight",
          action: () => this.editor.chain().focus().toggleHighlight().run(),
          isActive: () => this.editor.isActive("highlight"),
        },
        {
          type: "divider",
        },
        {
          icon: "h-1",
          title: "Heading 1",
          action: () =>
            this.editor.chain().focus().toggleHeading({ level: 1 }).run(),
          isActive: () => this.editor.isActive("heading", { level: 1 }),
        },
        {
          icon: "h-2",
          title: "Heading 2",
          action: () =>
            this.editor.chain().focus().toggleHeading({ level: 2 }).run(),
          isActive: () => this.editor.isActive("heading", { level: 2 }),
        },
        {
          icon: "paragraph",
          title: "Paragraph",
          action: () => this.editor.chain().focus().setParagraph().run(),
          isActive: () => this.editor.isActive("paragraph"),
        },
        {
          icon: "list-unordered",
          title: "Bullet List",
          action: () => this.editor.chain().focus().toggleBulletList().run(),
          isActive: () => this.editor.isActive("bulletList"),
        },
        {
          icon: "list-ordered",
          title: "Ordered List",
          action: () => this.editor.chain().focus().toggleOrderedList().run(),
          isActive: () => this.editor.isActive("orderedList"),
        },
        {
          icon: "list-check-2",
          title: "Task List",
          action: () => this.editor.chain().focus().toggleTaskList().run(),
          isActive: () => this.editor.isActive("taskList"),
        },
        {
          icon: "code-box-line",
          title: "Code Block",
          action: () => this.editor.chain().focus().toggleCodeBlock().run(),
          isActive: () => this.editor.isActive("codeBlock"),
        },
        {
          type: "divider",
        },
        {
          icon: "double-quotes-l",
          title: "Blockquote",
          action: () => this.editor.chain().focus().toggleBlockquote().run(),
          isActive: () => this.editor.isActive("blockquote"),
        },
        {
          icon: "separator",
          title: "Horizontal Rule",
          action: () => this.editor.chain().focus().setHorizontalRule().run(),
        },
        {
          type: "divider",
        },
        {
          icon: "text-wrap",
          title: "Hard Break",
          action: () => this.editor.chain().focus().setHardBreak().run(),
        },
        {
          icon: "format-clear",
          title: "Clear Format",
          action: () =>
            this.editor.chain().focus().clearNodes().unsetAllMarks().run(),
        },
        {
          type: "divider",
        },
        {
          icon: "arrow-go-back-line",
          title: "Undo",
          action: () => this.editor.chain().focus().undo().run(),
        },
        {
          icon: "arrow-go-forward-line",
          title: "Redo",
          action: () => this.editor.chain().focus().redo().run(),
        },
        {
          icon: "ghost-fill",
          title: "example",
          action: () =>
            this.editor.commands.setContent(`
          <h1>標題 : 這是一個簡單的範例</h1><blockquote><p>作者 : Kai Chun</p><p>摘要 : 如何好好撰寫一篇文章</p></blockquote><hr contenteditable="false"><h2>說出來可能你不相信，<s>但我還是信了</s>。</h2><p><code>Do you want to build a snow man ?</code></p><p><strong>讓我們好好地寫<mark>文章</mark>吧 !</strong></p><p>執行事項</p><ol><li><p>拿起筆</p></li><li><p>坐好坐滿</p></li><li><p>寫起來~~ 我誰</p></li></ol><ul><li><p>關於一個帥哥</p></li><li><p>提綱 500 字</p></li></ul><ul data-type="taskList"><li data-checked="false"><label contenteditable="false"><input type="checkbox" checked="checked"><span></span></label><div><p> 進度完成</p></div></li><li data-checked="false"><label contenteditable="false"><input type="checkbox"><span></span></label><div><p>出去玩</p></div></li></ul><pre><code>給我好好地上班</code></pre><img src="https://source.unsplash.com/8xznAGy4HcY/800x400" contenteditable="false" draggable="true"><p><br></p>
          `),
        },
        {
          icon: "image-add-fill",
          title: "url-image",
          action: this.addUrlImage,
        },
        {
          icon: "image-line",
          title: "local-image",
          action: this.addLocalImage,
        },
      ],
    };
  },
  methods: {
    addUrlImage() {
      const url = window.prompt("請輸入圖片網址");
      if (url) {
        this.insertImageToEditor(url);
      }
    },
    addLocalImage() {
      this.$refs.file.click();
    },
    insertImageToEditor(url) {
      console.log(url);
      this.editor.chain().focus().setImage({ src: url }).run();
    },
    insertTextToEditer() {
      this.editor.commands.insertContent("TestInsert").run();
    },
    intsertImageToEditer(data) {
      this.editor.commands.insertContent('<img src="' + data + '"/>');
    },
    previewImage(event) {
      const _this = this;
      var input = event.target;
      if (input.files) {
        var reader = new FileReader();
        reader.readAsDataURL(input.files[0]); //有這行 .oload才有作用
        reader.onload = () => {
          //    = e.target.result; //轉換成dataUrl
          var img = new Image();
          img.src = URL.createObjectURL(input.files[0]); //img.src="blod:...."
          var canvas = document.createElement("canvas");
          var ctx = canvas.getContext("2d");
          img.onload = function () {
            console.log("圖片寬度" + img.width);
            console.log("圖片高度" + img.height);
            if (img.width > img.height) {
              if (img.width > 1024 || img.height > 768) {
                console.log("寬圖-圖片過大");
                canvas.width = img.width * 0.8;
                canvas.height = img.height * 0.8;
              } else {
                canvas.width = img.width;
                canvas.height = img.height;
              }
            } else {
              if (img.width > 768 || img.height > 1024) {
                console.log("長圖-圖片過大");
                canvas.width = img.width * 0.25;
                canvas.height = img.height * 0.25;
              } else {
                canvas.width = img.width;
                canvas.height = img.height;
              }
            }
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height); //(寬,高)
            console.log(input.files[0].type);
            canvas.toBlob(function (blob) {
              // const url = URL.createObjectURL(blob);
              let fileName = new Date().getTime() + ".png";
              let fileData = new File([blob], fileName, {
                type: blob.type,
                lastModified: Date.now(),
              });
              var formdata = new FormData();
              formdata.append("image", fileData);
              console.log(formdata.image);
              _this.axios
                .post(
                  process.env.VUE_APP_BASE_URL +
                    "/api/upload/uploadArticleImageT",
                  formdata,
                  {
                    headers: {
                      Authorization: "KAI Admin",
                    },
                  }
                )
                .then((response) => {
                  _this.insertImageToEditor(response.data.data.path);
                })
                .catch((err) => {
                  console.log("fail" + err);
                });
            });

            // const base64Image = canvas.toDataURL();
            // console.log(base64Image);
            // _this.intsertImageToEditer(base64Image);
          };
        };
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.divider {
  width: 2px;
  height: 1.25rem;
  background-color: rgba(0, 0, 0, 0.1);
  margin-left: 0.5rem;
  margin-right: 0.75rem;
}
</style>
