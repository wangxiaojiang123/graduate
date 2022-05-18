<template>
  <div class="services">
    <Header :Title="this.title" :Flag="false" />
    <div class="body" v-if="ifshow">
      <van-tabs v-model="active">
        <van-tab title="全部">
          <div v-if="allgoods.length > 0" class="all">
            <ul>
              <li
                v-for="(val, index) in allgoods"
                :key="index"
                @click="goTo(val)"
              >
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
          <div v-if="allgoods.length == 0">
            <van-empty description="您还没有相关服务单">
              <van-button
                round
                type="danger"
                class="bottom-button"
                @click="goPublic()"
                >我要保修</van-button
              >
            </van-empty>
          </div>
        </van-tab>
        <van-tab title="待派单">
          <div v-if="waitGoods.length > 0" class="all">
            <ul>
              <li
                v-for="(val, index) in waitGoods"
                :key="index"
                @click="goTo(val)"
              >
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
                  <span @click.stop="cancel(val)">{{ val.condition }}</span>
                </div>
              </li>
            </ul>
          </div>
          <div v-if="waitGoods.length == 0">
            <van-empty description="您还没有相关服务单">
              <van-button
                round
                type="danger"
                class="bottom-button"
                @click="goPublic()"
                >我要报修</van-button
              >
            </van-empty>
          </div>
        </van-tab>
        <van-tab title="服务中">
          <van-empty description="您还没有相关服务单">
            <van-button
              round
              type="danger"
              class="bottom-button"
              @click="goPublic()"
              >我要保修</van-button
            >
          </van-empty>
        </van-tab>
        <van-tab title="待验收">
          <van-empty description="您还没有相关服务单">
            <van-button
              round
              type="danger"
              class="bottom-button"
              @click="goPublic()"
              >我要保修</van-button
            >
          </van-empty>
        </van-tab>
      </van-tabs>
    </div>
    <div class="_body" v-if="!ifshow">
      <div ref="bar" style="height: 300px"></div>
      <div ref="pie" style="height: 300px"></div>
    </div>
    <Bottom />
  </div>
</template>

<script>
import Bottom from "@/components/Bottom";
import Header from "@/components/Header";
import Storage from "@/views/Storage.js";
import echarts from "../../echarts";
import { mapState } from "vuex";

export default {
  name: "Services",
  components: {
    Bottom,
    Header,
  },
  data() {
    return {
      title: "服务单",
      active: 0,
      user: Storage.get("user"),
      allgoods: [],
      waitGoods: [],
      piedate: [0, 0, 0, 0],
      bardate: [0, 0, 0, 0],
      ifshow: true,
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
    goPublic() {
      this.$router.push({ name: "Public" });
    },
    cancel(val) {
      // console.log(val.goods.randomNum);
      this.$dialog
        .confirm({
          title: "提示",
          message: "确定取消该订单吗？",
        })
        .then(() => {
          this.$axios({
            method: "post",
            url: "/user/api/cancelGoods",
            data: {
              phone: this.user[0].phone,
              name: this.user[0].name,
              goods: val.randomNum,
            },
          })
            .then((response) => {
              // console.log(response);
              if (response.data) {
                this.$toast("成功取消该订单");
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
    bar() {
      var bar = echarts.init(this.$refs.bar);
      var pie = echarts.init(this.$refs.pie);
      // 指定图表的配置项和数据
      var baroption = {
        title: {
          text: "订单",
        },
        tooltip: {},
        legend: {
          data: ["订单量"],
        },
        xAxis: {
          data: ["近七天", "近一个月", "近半年", "近一年"],
        },
        yAxis: {},
        color: ["#2f4554", "#61a0a8", "#d48265", "#91c7ae", "#c23531"],
        series: [
          {
            name: "订单量",
            type: "bar",
            data: this.bardate,
            colorBy: "data",
          },
        ],
        backgroundColor: "#f1f1f1",
      };
      var pieoption = {
        tooltip: {},
        series: [
          {
            type: "pie",
            data: [
              {
                value: this.piedate[0],
                name: "已取消",
              },
              {
                value: this.piedate[1],
                name: "待派单",
              },
              {
                value: this.piedate[2],
                name: "服务中",
              },
              {
                value: this.piedate[3],
                name: "已验收",
              },
            ],
            radius: "50%",
          },
        ],
        backgroundColor: "#f1f1f1",
      };
      // 使用刚指定的配置项和数据显示图表。
      bar.setOption(baroption);
      pie.setOption(pieoption);
    },
    count(date, index) {
      date[index]++;
      this.$set(date, index, date[index]++);
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
          // console.log(response.data);
          this.allgoods = response.data;
          response.data.forEach((val) => {
            if (val.condition == "待派单") {
              this.waitGoods[this.waitGoods.length] = val;
            }
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (this.user.length && this.user[0].phone == 17623034493) {
      this.ifshow = false;
      this.$axios({
        method: "post",
        url: "/user/api/findGoods",
      }).then((response) => {
        this.allgoods = response.data;
        const actions = new Map([
          [1, "已取消"],
          [2, "待派单"],
          [3, "服务中"],
          [4, "待验收"],
          [5, "已完成"],
        ]);
        let startTime = new Date().valueOf();
        this.allgoods.forEach((el) => {
          switch (el.condition) {
            case actions.get(1):
              this.count(this.piedate, 0);
              break;
            case actions.get(2):
              this.count(this.piedate, 1);
              break;
            case actions.get(3):
              this.count(this.piedate, 2);
              break;
            case actions.get(4):
              this.count(this.piedate, 3);
              break;
          }
          var endTime = new Date(el.date).valueOf();
          var time = startTime - endTime;
          var day = Math.floor(time / 1000 / 60 / 60 / 24);
          var month = Math.floor(time / 1000 / 60 / 60 / 24 / 30);
          if (day <= 7) {
            for (var i = 0; i <= 3; i++) {
              this.count(this.bardate, i);
            }
          } else if (month <= 1) {
            for (var i = 1; i <= 3; i++) {
              this.count(this.bardate, i);
            }
          } else if (month <= 6) {
            for (var i = 2; i <= 3; i++) {
              this.count(this.bardate, i);
            }
          } else if (month <= 12) {
            this.count(this.bardate, 3);
          }
        });
        this.bar();
      });
    }
  },
};
</script>

<style scoped lang="less">
.services {
  width: 100%;
  height: 100vh;
  background-color: #f1f1f1;
  .body {
    .bottom-button {
      width: 160px;
      height: 40px;
    }
    .all {
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
  }
  ._body {
    width: 100%;
  }
}
</style>
