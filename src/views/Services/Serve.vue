<template>
  <div class="serve">
    <ul>
      <li>
        <span>设备数量：</span>
        <p>{{ cargo.deviceNum }}台</p>
      </li>
      <li>
        <span>服务类型：</span>
        <p>{{ cargo.lists }}</p>
      </li>
      <li>
        <span>服务费用：</span>
        <p>{{ cargo.fee }}</p>
      </li>
      <li>
        <span>期望完成时间：</span>
        <p>{{ cargo.date }}</p>
      </li>
      <li>
        <span>服务单号：</span>
        <p>{{ cargo.randomNum }}</p>
      </li>
      <li>
        <span>支付方式：</span>
        <p>线下支付</p>
      </li>
      <li class="describe">
        <span>故障描述</span>
        <p>纯属娱乐</p>
        <div v-for="(list, index) in cargo.pic" :key="index">
          <img :src="list.content" alt="" />
        </div>
      </li>
      <li>
        <span>联系人：</span>
        <p>{{ cargo.addressname }} {{ cargo.addresstel }}</p>
      </li>
      <li>
        <span>所属区域：</span>
        <p>{{ cargo.addressDetail }}</p>
      </li>
      <li>
        <span>发布时间：</span>
        <p>{{ cargo.nowTime }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import Storage from "@/views/Storage.js";
import { mapState } from "vuex";
export default {
  name: "Serve",
  data() {
    return {
      allgoods: [],
      user: Storage.get("user"),
    };
  },
  computed: {
    ...mapState({
      cargo: "cargo",
    }),
  },
  mounted() {
    console.log(this.cargo);
  },
};
</script>

<style lang="less" scoped>
.serve {
  width: 100%;
  box-sizing: border-box;
  padding: 0 10px;
  ul {
    li {
      width: 100%;
      display: flex;
      padding: 5px 0;
      font-size: 14px;
      justify-content: space-between;
      &.describe {
        display: block;
        border-top: 1px solid #b1b1b1;
        border-bottom: 1px solid #b1b1b1;
        p {
          margin: 10px 0;
        }
        img {
          width: 30%;
          border-radius: 5px;
          margin-right: 10px;
        }
      }
      span {
        color: #696969;
      }
      p {
        color: #000;
      }
    }
  }
}
</style>
