<template>
  <div class="login">
    <Header :Title="title" :Address="address" />
    <div class="nav">
      <img src="@/assets/3.png" alt="" />
    </div>
    <!-- 手机号  密码 -->
    <ul>
      <li>
        <img src="@/assets/yonghu.png" alt="" />
        <input type="text" placeholder="请输入手机号码" v-model.lazy="phone" />
      </li>
      <li>
        <img src="@/assets/mima.png" alt="" />
        <input
          type="password"
          placeholder="请输入6-12位密码"
          v-model.lazy="password"
        />
      </li>
    </ul>
    <button @click="goTo()">登录</button>
    <div class="register">
      <router-link :to="{ name: 'Forget' }">
        <span>修改密码</span>
      </router-link>
      <p>
        <router-link :to="{ name: 'Register' }">
          没有账号?<span>去注册</span>
        </router-link>
      </p>
    </div>
    <p class="foot">
      <input
        type="checkbox"
        :checked="check"
        @click="change()"
      />已阅读并同意<router-link :to="{ name: 'Protocols' }"
        >《服务协议》</router-link
      >和<router-link :to="{ name: 'Policy' }">《隐私政策》</router-link>
    </p>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Storage from "@/views/Storage.js";
import Vue from "vue";
import { Toast } from "vant";

Vue.use(Toast);
export default {
  name: "Login",
  components: {
    Header,
  },
  data() {
    return {
      check: true,
      title: "登录",
      address: "About",
      phone: "",
      password: "",
      user: Storage.get("user"),
      a: false,
    };
  },
  methods: {
    change() {
      this.check = !this.check;
    },
    goTo() {
      if (this.check) {
        this.$axios
          .post("/user/api/login", {
            phone: this.phone,
            pass: this.passowrd,
          })
          .then((response) => {
            var pass = response.data;
            if (
              pass[0]?.password == this.password &&
              pass[0]?.phone == this.phone
            ) {
              Toast("登录成功");
              this.$delete(this.user, 0);
              this.$set(this.user, this.user.length, {
                name: pass[0].username,
                phone: pass[0].phone,
              });
              Storage.set("user", this.user);
              this.$router.push({ name: "About" });
            } else {
              Toast("手机号或密码错误");
            }
          });
      } else {
        Toast("请勾选同意");
      }
    },
  },
  watch: {
    user: {
      handler() {
        Storage.set("user", this.user);
      },
      deep: true,
    },
    phone: {
      handler() {
        var pattern = /^1\d{10}$/;
        if (pattern.test(this.phone)) {
          this.setphone = "";
          this.$axios({
            method: "post",
            url: "/user/api/register/user",
            data: {
              phone: this.phone,
            },
          })
            .then((response) => {
              var phones = response.data;
              for (let i = 0; i < phones.length; i++) {
                if (phones[i].phone == this.phone) {
                  this.a = true;
                  return;
                }
              }
              if (this.a == false) {
                Toast("手机号不存在");
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          Toast("请输入正确手机号");
        }
      },
    },
    password: {
      handler() {
        this.$axios({
          method: "post",
          url: "/user/api/login",
          data: {
            phone: this.phone,
          },
        })
          .then((response) => {
            var pass = response.data;
            if (pass.length > 0) {
              if (pass[0].password == this.password) {
              } else {
                Toast("密码错误");
              }
            }
          })
          .catch((err) => {
            console.log(err);
          });
      },
    },
  },
};
</script>

<style lang="less" scoped>
.login {
  .nav {
    width: 100%;
    height: 200px;
    background: rgb(239, 88, 71);
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 100px;
      height: 100px;
      border-radius: 50%;
    }
  }
  ul {
    width: 80%;
    margin: 20px auto;
    li {
      width: 100%;
      height: 30px;
      line-height: 30px;
      padding: 5px 0;
      border-bottom: 1px solid #f1f1f1;
      img {
        width: 25px;
        vertical-align: middle;
        height: 25px;
      }
      input {
        padding-left: 10px;
        border: 0;
      }
    }
  }
  button {
    width: 90%;
    height: 40px;
    line-height: 40px;
    display: block;
    border-radius: 8px;
    color: #fff;
    background: rgb(239, 88, 71);
    text-align: center;
    margin: 0 auto;
    border: 0;
  }
  .register {
    width: 85%;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    margin: 20px auto 30px;
    span {
      color: #b0b0b0;
    }
    p {
      a {
        color: #b0b0b0;
        span {
          color: rgb(239, 88, 71);
        }
      }
    }
  }
  .foot {
    text-align: center;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    a {
      color: rgba(0, 0, 255, 0.616);
    }
    input {
      margin: 2px 5px 0 0;
    }
  }
}
</style>
