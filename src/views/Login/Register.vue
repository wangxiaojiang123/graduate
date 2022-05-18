<template>
  <div class="register">
    <Header :Title="title" :Address="address" />
    <img src="@/assets/ywb.png" alt="" />
    <van-cell-group>
      <van-field
        v-model="username"
        @blur="bluruser()"
        required
        label="用户名"
        placeholder="请填写用户名"
        :error-message="setuser"
      />
      <van-field
        v-model="password"
        required
        type="password"
        @blur="blurword()"
        label="密码"
        placeholder="请设置密码"
        :error-message="setword"
      />
      <van-field
        v-model="repassword"
        required
        type="password"
        @blur="blurreword()"
        label="确认密码"
        placeholder="再次设置密码"
        :error-message="resetword"
      />
      <van-field
        v-model="phone"
        required
        @blur="blurphone()"
        label="手机号"
        placeholder="建议常用手机号"
        :error-message="setphone"
      />
    </van-cell-group>
    <div class="foot" @click="register()">注册</div>
  </div>
</template>

<script>
import Header from "@/components/Header";

export default {
  name: "Register",
  components: {
    Header,
  },
  data() {
    return {
      title: "注册",
      username: "",
      phone: "",
      password: "",
      repassword: "",
      setuser: "请输入长度为4-10位的字母、数字、下划线",
      setword: "以字母开头的6-10位，除空白符号外",
      resetword: "",
      setphone: "",
      title: "注册",
      address: "Login",
      a: "",
      b: "",
      c: "",
      d: "",
    };
  },
  methods: {
    // 用户名
    bluruser() {
      var pattern = /^\w{4,10}$/;
      this.a = false;
      if (pattern.test(this.username)) {
        this.setuser = "";
        this.$axios({
          method: "post",
          url: "/user/api/register/user",
          data: {
            username: this.username,
          },
        })
          .then((response) => {
            var users = response.data;
            // console.log(users);
            for (let i = 0; i < users.length; i++) {
              if (users[i].username == this.username) {
                this.a = false;
                this.$toast("用户已被注册");
                return;
              } else {
                this.a = true;
              }
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.setuser = "请输入长度为4-10位的字母、数字、下划线";
        this.a = false;
      }
    },
    blurword() {
      var pattern = /^[a-zA-Z]\S{5,9}$/;
      if (pattern.test(this.password)) {
        this.setword = "";
        this.b = true;
      } else {
        this.setword = "格式错误，以字母开头的6-10位";
        this.b = false;
      }
    },
    blurreword() {
      if (this.password == this.repassword) {
        this.resetword = null;
        this.c = true;
      } else {
        this.resetword = "两次密码不匹配";
        this.c = false;
      }
    },
    blurphone() {
      var pattern = /^1\d{10}$/;
      this.d = false;
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
            // console.log(phones);
            for (let i = 0; i < phones.length; i++) {
              if (phones[i].phone == this.phone) {
                this.d = false;
                this.$toast("手机号已被注册");
                return;
              } else {
                this.d = true;
              }
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.setphone = "手机号格式错误";
        this.d = false;
      }
    },
    register() {
      this.a = false;
      this.d = false;
      this.$axios({
        method: "post",
        url: "/user/api/register/user",
        data: {
          phone: this.phone,
          username: this.username,
        },
      })
        .then((response) => {
          var users = response.data;
          // console.log(users);
          for (var i = 0; i < users.length; i++) {
            if (users[i].username == this.username) {
              this.a = false;
              return;
            } else {
              this.a = true;
            }
          }
          for (var i = 0; i < users.length; i++) {
            if (users[i].phone == this.phone) {
              this.d = false;
              return;
            } else {
              this.d = true;
            }
          }
          // console.log(this.a, this.b);
          // console.log(this.c, this.d);
          if (this.a && this.b && this.c && this.d) {
            this.$axios({
              method: "post",
              url: "/user/api/register",
              data: {
                name: this.username,
                password: this.password,
                phone: this.phone,
              },
            })
              .then((response) => {
                // console.log(response);
                if (response.data) {
                  this.$toast("注册成功");
                  this.$router.push({ name: "Login" });
                }
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            this.$toast("信息错误");
          }
        })
        .catch((err) => {
          console.log(err);
        });

      //在注册时，判断是否有输入
      if (this.phone == "") {
        this.$toast("请输入手机号");
      }
      if (this.repassword == "") {
        this.$toast("请确认密码");
      }
      if (this.password == "") {
        this.$toast("请设置密码");
      }
      if (this.username == "") {
        this.$toast("请输入用户名");
      }
    },
  },
};
</script>

<style lang="less" scoped>
.register {
  img {
    display: block;
    width: 80%;
    height: 200px;
    margin: 0 auto;
  }
  /deep/ .van-field__label {
    text-indent: 30px;
  }
  /deep/ .van-cell--required::before {
    left: 38px;
  }
  .foot {
    width: 85%;
    height: 40px;
    background-color: rgb(239, 88, 71);
    border-radius: 10px;
    color: #fff;
    margin: 20px auto;
    text-align: center;
    line-height: 40px;
    a {
      color: #fff;
    }
  }
}
</style>
