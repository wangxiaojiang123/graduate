<template>
  <div class="about">
    <Header :Title="this.title" :Flag="false" />
    <div class="body">
      <div class="me">
        <img src="@/assets/1.png" />
        <router-link :to="{ name: 'Login' }">
          <p v-if="user.length == 0">登录/注册</p>
        </router-link>
        <p v-if="user.length > 0">{{ user[0].name }}</p>
      </div>
      <div class="message other">
        <div class="foot">
          <div>
            <img src="@/assets/qy.png" alt="" />
            <p>我的企业</p>
          </div>
          <van-icon name="arrow" />
        </div>
        <div class="foot">
          <div>
            <img src="@/assets/gr.png" alt="" />
            <p>个人中心</p>
          </div>
          <van-icon name="arrow" />
        </div>
        <div class="foot">
          <div>
            <img src="@/assets/mm.png" alt="" />
            <router-link :to="{ name: 'Forget' }">
              <p>修改密码</p>
            </router-link>
          </div>
          <van-icon name="arrow" />
        </div>
      </div>
      <div class="message">
        <div class="foot">
          <div>
            <img src="@/assets/kf.png" alt="" />
            <p>联系客服</p>
          </div>
          <van-icon name="arrow" />
        </div>
        <div class="foot">
          <div>
            <img src="@/assets/gy.png" alt="" />
            <p>关于</p>
          </div>
          <van-icon name="arrow" />
        </div>
        <div class="foot">
          <div>
            <img src="@/assets/qd.png" alt="" />
            <router-link :to="{ name: 'Protocols' }"
              ><p>用户协议</p></router-link
            >
          </div>
          <van-icon name="arrow" />
        </div>
        <div class="foot">
          <div>
            <img src="@/assets/wen.png" alt="" />
            <router-link :to="{ name: 'Policy' }"><p>隐私政策</p></router-link>
          </div>
          <van-icon name="arrow" />
        </div>
      </div>
      <button class="logout" v-if="user.length > 0" @click="logout()">
        退出登录
      </button>
    </div>
    <Bottom />
  </div>
</template>

<script>
import Bottom from "@/components/Bottom";
import Header from "@/components/Header";
import Storage from "@/views/Storage.js";

export default {
  name: "About",
  components: {
    Bottom,
    Header,
  },
  data() {
    return {
      title: "我的",
      user: Storage.get("user"),
    };
  },
  methods: {
    logout() {
      this.$dialog
        .confirm({
          title: "退出登录",
          message: "您将退出当前账号，是否确认？",
        })
        .then(() => {
          this.$delete(this.user, 0);
          Storage.set("user", this.user);
        })
        .catch(() => {});
    },
  },
  watch: {
    user: {
      handler() {
        Storage.set("user", this.user);
      },
      deep: true,
    },
  },
};
</script>
<style scoped lang="less">
.about {
  width: 100%;
  height: 100vh;
  background-color: #f1f1f1;
  position: relative;
  .van-overlay {
    z-index: 99999999;
  }
  .me {
    width: 100%;
    padding: 30px 20px 50px;
    box-sizing: border-box;
    background-color: rgb(239, 88, 71);
    display: flex;
    align-items: center;
    img {
      width: 50px;
      height: 50px;
      border-radius: 50px;
    }
    p {
      color: #fff;
      margin-left: 15px;
    }
  }
  img {
    width: 25px;
    height: 25px;
  }
  .message {
    width: 96%;
    box-sizing: border-box;
    border-radius: 10px;
    margin: 10px auto;
    font-size: 14px;
    position: relative;
    background: #fff;
    top: -30px;
    left: 0;
    p {
      margin-left: 10px;
    }
  }
  .foot {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #f1f1f1;
    padding: 10px;
    div {
      display: flex;
      align-items: center;
      p {
        color: #000;
      }
    }
  }
  .foot:nth-child(1) {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
  .foot:nth-child(4) {
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }
  .message.other .foot:nth-child(3) {
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }
  .logout {
    position: absolute;
    bottom: 50px;
    border: 0;
    width: 100%;
    color: red;
    padding: 10px;
    font-size: 18px;
    background: #fff;
  }
}
</style>
