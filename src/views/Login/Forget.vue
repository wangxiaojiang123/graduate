<template>
  <div class="forget">
    <Header :Title="title" />
    <img src="@/assets/ywb.png" alt="" />

    <ul>
      <li>
        手机号：<input
          v-model.lazy="phone"
          type="text"
          name="phone"
          placeholder="请输入手机号"
        />
      </li>
      <li>
        旧密码：<input
          type="password"
          name="pass"
          placeholder="请输入6-12位密码"
          v-model="pass"
        />
      </li>
      <li>
        新密码：<input
          type="password"
          name="newpass"
          v-model="newpass"
          placeholder="请输入6-12位密码"
        />
      </li>
      <li>
        确认新密码：<input
          type="password"
          name="renew"
          v-model="renewpass"
          placeholder="请确认密码"
        />
      </li>
    </ul>
    <div class="btn"><button @click="upDate()">提交</button></div>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Storage from "@/views/Storage.js";

export default {
  name: "Forget",
  components: {
    Header,
  },
  data() {
    return {
      title: "修改密码",
      pass: "",
      renewpass: "",
      newpass: "",
      phone: "",
      user: Storage.get("user"),
      a: false,
      b: false,
      c: false,
      d: false,
    };
  },
  methods: {
    upDate() {
      if (this.d) {
        this.$axios({
          method: "post",
          url: "/user/api/forget",
          data: {
            phone: this.phone,
            pass: this.pass,
            newpass: this.newpass,
          },
        })
          .then((response) => {
            var pass = response.data;
            if (pass) {
              this.$delete(this.user, 0);
              Storage.set("user", this.user);
              this.$router.push({ name: "About" });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.$toast("信息错误");
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
        this.$axios({
          method: "post",
          url: "/user/api/register/user",
          data: {
            phone: this.phone,
          },
        })
          .then((response) => {
            console.log("phone");
            var phones = response.data;
            for (let i = 0; i < phones.length; i++) {
              if (phones[i].phone == this.phone) {
                this.a = true;
                return;
              }
            }
            if (this.a == false) {
              this.$toast("手机号不存在");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      },
    },
    newpass: {
      handler() {
        var pattern = /^[a-zA-Z]\S{5,9}$/;
        if (this.a && this.b) {
          if (pattern.test(this.newpass)) {
            this.c = true;
            return;
          } else {
            this.$toast("密码格式错误");
            this.c = false;
          }
          return;
        } else {
          this.$toast("手机或密码错误");
          this.c = false;
        }
      },
    },
    renewpass: {
      handler() {
        if (this.c == true) {
          if (this.newpass === this.renewpass) {
            this.d = true;
            return;
          } else {
            this.$toast("两次密码不一致");
            this.d = false;
          }
          return;
        } else {
          this.d = false;
          this.$toast("密码格式错误");
        }
      },
    },
  },
};
</script>

<style lang="less" scoped>
.forget {
  width: 100%;
  height: 100vh;
  background: #f1f1f1;
  position: relative;
  img {
    width: 100%;
    height: 200px;
  }
  ul {
    width: 95%;
    margin: 0 auto;
    background: #fff;
    padding: 0 7px;
    margin-top: 10px;
    border-radius: 10px;
    box-sizing: border-box;
    li {
      padding: 15px 0;
      border-bottom: 1px solid #f1f1f1;
      display: flex;
      justify-content: space-between;
      input {
        border: 0;
        text-align: right;
      }
    }
  }
  .btn {
    width: 100%;
    background: #fff;
    padding: 10px 0;
    position: absolute;
    bottom: 0;
    button {
      display: block;
      color: #fff;
      background: red;
      border: 0;
      width: 90%;
      margin: 0 auto;
      border-radius: 10px;
      padding: 10px 0;
    }
  }
}
</style>
