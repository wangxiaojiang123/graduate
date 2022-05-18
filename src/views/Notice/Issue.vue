<template>
  <div class="issue">
    <Header :Title="title" :Address="address" />
    <div
      class="publish"
      v-for="(val, index) in allgoods"
      :key="index"
      @click="goTo(val)"
    >
      <h1>发布服务单</h1>
      <hr />
      <p>
        成功发布（<span>{{ allgoods[index].lists }}</span
        >）订单服务单（<span>#{{ allgoods[index].randomNum }}</span
        >）目前正在匹配师傅，等待派单中
      </p>
      <p class="time">{{ allgoods[index].nowTime }}</p>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Storage from "@/views/Storage.js";
import { mapState } from "vuex";
export default {
  name: "Issue",
  components: {
    Header,
  },
  data() {
    return {
      title: "服务通知",
      user: Storage.get("user"),
      allgoods: [],
      address: "Message",
    };
  },
  computed: {
    ...mapState({
      cargo: "cargo",
    }),
  },
  methods: {
    goTo(val) {
      this.$store.state.cargo = val;
      // console.log(this.cargo);
      this.$router.push({ path: "/detail" });
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
          this.allgoods = response.data.reverse();
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (this.user.length && this.user[0].phone == 17623034493) {
      this.$axios({
        method: "post",
        url: "/user/api/findGoods",
      })
        .then((response) => {
          this.allgoods = response.data.reverse();
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
.issue {
  width: 100%;
  height: 100vh;
  background: #f1f1f1;
  .publish {
    background: white;
    padding: 10px;
    margin: 10px;
    border-radius: 8px;
    h1 {
      font-size: 18px;
    }
    hr {
      margin-top: 10px;
      margin-bottom: 10px;
    }
    .time {
      margin-top: 20px;
      text-align: right;
    }
    p {
      font-size: 13px;
    }
  }
}
</style>
