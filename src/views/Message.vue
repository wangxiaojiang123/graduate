<template>
  <div class="message">
    <Header :Title="this.title" :Flag="false" />
    <div class="body">
      <div class="service">
        <img src="@/assets/ld.png" alt="" />
        <div class="title" @click="goTo">
          <p>服务通知</p>
          <p>{{ text || "暂无新消息" }}</p>
        </div>
      </div>
      <div class="system">
        <img src="@/assets/sz.png" alt="" />
        <div class="title">
          <p>系统通知</p>
          <p>暂无新消息</p>
        </div>
      </div>
      <div class="active">
        <img src="@/assets/yy.png" alt="" />
        <div class="title">
          <p>活动通知</p>
          <p>暂无新消息</p>
        </div>
      </div>
      <div class="other">
        <img src="@/assets/qt.png" alt="" />
        <div class="title">
          <p>其他通知</p>
          <p>暂无新消息</p>
        </div>
      </div>
    </div>
    <Bottom />
  </div>
</template>

<script>
import Bottom from "@/components/Bottom";
import Header from "@/components/Header";
import Storage from "@/views/Storage.js";

export default {
  name: "Message",
  components: {
    Bottom,
    Header,
  },
  data() {
    return {
      title: "消息",
      user: Storage.get("user"),
      allgoods: [],
      text: "",
    };
  },
  methods: {
    goTo() {
      this.$router.push({ name: "Issue" });
    },
  },
  created() {
    if (this.user.length > 0) {
      this.$axios({
        method: "post",
        url: "/user/api/findGoods",
        data: {
          phone: this.user[0].phone,
          name: this.user[0].name,
        },
      })
        .then((response) => {
          this.allgoods = response.data;
          if (this.allgoods.length) {
            this.text = "最新消息：成功发布订单";
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },
};
</script>

<style scoped lang="less">
.message {
  width: 100%;
  height: 100vh;
  .Bottom {
    background: #f1f1f1;
  }
  background-color: #f1f1f1;
  .body {
    div {
      width: 100%;
      box-sizing: border-box;
      background-color: #fff;
      display: flex;
      padding: 10px;
      .title {
        width: 100%;
        padding: 0 0 0 10px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        p {
          &:nth-child(2) {
            color: #b0b0b0;
            font-size: 12px;
          }
        }
      }
      img {
        width: 30px;
        padding: 5px;
        height: 30px;
        border-radius: 50px;
      }
    }
    .service img {
      background-color: red;
    }
    .system img {
      background-color: rgb(54, 127, 220);
    }
    .active img {
      background-color: rgb(35, 201, 62);
    }
    .other img {
      background-color: rgb(180, 45, 255);
    }
  }
}
</style>
