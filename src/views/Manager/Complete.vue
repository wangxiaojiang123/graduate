<template>
  <div class="complete">
    <Header :Title="title" Address="Home" />
    <div class="content">
      <div v-if="allgoods.length > 0" class="all">
        <ul>
          <li v-for="(val, index) in allgoods" :key="index" @click="goTo(val)">
            <p class="title">
              <span>{{ val.lists }}</span> {{ val.nowTime }}
            </p>
            <div class="goods">
              <img :src="val.pic[0].content" alt="" />
              <div>
                <h1>{{ val.devtype }}</h1>
                <p>设备数量：{{ val.deviceNum }}台</p>
                <p>区域：{{ val.addressDetail }}</p>
                <p>费用：详议</p>
              </div>
              <span>{{ val.condition }}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Bottom from "@/components/Bottom";
import Header from "@/components/Header";
import { mapState } from "vuex";

export default {
  name: "complete",

  components: {
    Bottom,
    Header,
  },
  data() {
    return {
      title: "已验收订单",
      allgoods: [],
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
    updata(val) {
      this.$dialog
        .confirm({
          title: "提示",
          message: "是否成功验收订单",
        })
        .then(() => {
          this.$axios({
            method: "post",
            url: "/user/api/updateGoods",
            data: {
              condition: val.condition,
              goods: val.randomNum,
            },
          })
            .then((response) => {
              if (response.data) {
                this.$toast("成功处理");
                location.reload();
              }
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.$axios({
      method: "post",
      url: "/user/api/findGoods",
    }).then((response) => {
      let goods = [];
      response.data.forEach((el) => {
        if (el.condition === "已验收") {
          goods.push(el);
        }
      });
      this.allgoods = goods.reverse();
    });
  },
};
</script>
<style scoped lang="less">
.complete {
  width: 100%;
  ul {
    width: 100%;
    box-sizing: border-box;
    padding: 0 7px;
    li {
      width: 100%;
      background: #fff;
      box-sizing: border-box;
      border-radius: 5px;
      margin-top: 15px;
      padding: 8px 10px;
      a {
        color: #000;
      }
      .title {
        font-size: 14px;
        padding: 5px 0 10px;
        margin-bottom: 10px;
        border-bottom: 1px solid #b0b0b0;
        span {
          font-size: 12px;
          padding: 2px 10px;
          color: #3cb371;
          border: 1px solid #3cb371;
        }
      }
      .goods {
        display: flex;
        img {
          border: 1px solid #000;
          width: 120px;
          height: 90px;
        }
        div {
          margin-left: 10px;
          font-size: 14px;
          h1 {
            font-size: 20px;
            margin-bottom: 10px;
          }
          p {
            margin-bottom: 4px;
          }
        }
        span {
          width: 100px;
          text-align: center;
          color: #b0b0b0;
          align-self: center;
        }
      }
    }
  }
}
</style>
