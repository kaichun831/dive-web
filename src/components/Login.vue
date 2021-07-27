<template>
  <div
    class="container"
    data-aos="fade-up"
    data-aos-easing="ease-in-out-quad"
    data-aos-duration="500"
    :style="{ width: cWidth + '%' }"
  >
    <div class="wrapper">
      <div class="title">
        <p>BLUE HOLE</p>
      </div>
      <p>信箱/帳號</p>
      <input
        class="et_input"
        type="account"
        placeholder="ex: abc@gamil.com"
        v-model="acc"
      />
      <p>密碼</p>
      <input class="et_input" type="password" v-model="pwd" />
      <label>
        <input type="checkBox" name="isShow" value="0" checked />
        <span>記住我</span>
      </label>
      <div class="btn-area">
        <button @click="Login">登入</button>
        <button @click="Register">註冊</button>
      </div>
    </div>
  </div>
</template>

<script>
import AOS from "aos";
import "aos/dist/aos.css";
AOS.init();
export default {
  props: ["cWidth"],
  data() {
    return {
      acc: "",
      pwd: "",
    };
  },
  methods: {
    Login() {
      const inputJson = {
        Account: this.acc,
        Password: this.pwd,
      };
      this.axios
        .post(process.env.VUE_APP_BASE_URL + "/api/user/login", inputJson, {
          headers: {
            Authorization: "KAI Admin",
          },
        })
        .then((response) => {
          console.log(response);
          this.emitter.emit("LoginResponse", response);
        })
        .catch((err) => {
          alert(err.body);
        });
    },
    Register() {
      this.$swal("功能尚未開放");
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  margin: 5px;
  p {
    color: white;
  }
  span {
    color: white;
  }
  .wrapper {
    background: rgba($color: rgb(16, 123, 223), $alpha: 0.3);
    padding: 15px;
    border-radius: 5px;
    box-shadow: 3px 3px gray;
    .title {
      text-align: center;
      p {
        color: white;
        font-size: 50px;
        text-shadow: 1px 1px 2px black;
      }
    }
  }
  .et_input {
    width: 100%;
    height: 30px;
    border: 0.5px solid white;
    border-radius: 5px;
    padding: 3px;
  }
  .et_input:focus {
    outline: 3px solid rgba($color: rgb(0, 110, 255), $alpha: 0.5);
  }
}

.btn-area {
  padding: 3px;
  width: 100%;
  margin-top: 5px;
  button {
    margin-top: 10px;
    border: 0.8px solid white;
    border-radius: 5px;
    background: white;
    font-size: 25px;
    color: grey;
    width: 100%;
    display: block;
  }
  button:hover {
    color: white;
    background: rgba($color: #0544a3, $alpha: 1);
  }
}

label {
  padding-top: 10px;
  display: flex;
  height: 25px;
  line-height: 12.5px;
  margin-bottom: -10px;
  span {
    margin-left: 2px;
  }
}
</style>
