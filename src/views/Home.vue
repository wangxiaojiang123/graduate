<template>
  <div class="home">
    <Header :Title="title" :Flag="flag" />
    <div class="body" v-if="ifshow">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item><img src="@/assets/lb1.png" alt="" /> </van-swipe-item>
        <van-swipe-item><img src="@/assets/lb2.jpg" alt="" /></van-swipe-item>
      </van-swipe>
      <!-- 服务流程 -->
      <h1 class="title">服务流程</h1>
      <ul class="service">
        <li>
          <img src="@/assets/h_ser1.png" mode="" />
          <p>确认故障</p>
        </li>
        <li>
          <img src="@/assets/h_ser2.png" mode="" />
          <p>提交报修</p>
        </li>
        <li>
          <img src="@/assets/h_ser3.png" mode="" />
          <p>到厂维修</p>
        </li>
        <li>
          <img src="@/assets/h_ser4.png" mode="" />
          <p>交付验收</p>
        </li>
      </ul>
      <router-link :to="{ name: 'Public' }" class="btn">我要报修</router-link>
      <!-- 服务动态 -->
      <h1 class="title">服务动态</h1>
      <div class="dynamics">
        <ul class="header">
          <li>地区</li>
          <li>报修物品</li>
          <li>报修类型</li>
          <li>状态</li>
        </ul>
        <div class="scroll">
          <ul class="product">
            <li>广东/广州</li>
            <li>曝光机</li>
            <li>维修</li>
            <li>进行中</li>
          </ul>
          <ul class="product">
            <li>广东/广州</li>
            <li>激光切割机</li>
            <li>维修</li>
            <li>进行中</li>
          </ul>
          <ul class="product">
            <li>广东/广州</li>
            <li>港片机</li>
            <li>其他</li>
            <li>报价中</li>
          </ul>
          <ul class="product active">
            <li>广东/广州</li>
            <li>测试机</li>
            <li>保养</li>
            <li>已完成</li>
          </ul>
        </div>
      </div>
      <!-- 更多服务 -->
      <h1 class="title">
        更多服务
        <router-link :to="{ name: 'More' }"
          ><span>查看更多 <van-icon name="arrow" /></span
        ></router-link>
      </h1>
      <div class="more">
        <div class="words">
          <img src="@/assets/1.png" />
          <div>
            <span>工厂维保 | 云维保</span>
            <span>云维保工厂设备管理系统，为工业企业的日常设备维保</span>
          </div>
        </div>
        <div class="words">
          <img src="@/assets/2.png" />
          <div>
            <span>售后服务 | 云维保</span>
            <span>云维保设备售后支撑系统，提供工业售后只能运营服务，</span>
          </div>
        </div>
        <div class="words">
          <img src="@/assets/3.png" />
          <div>
            <span>维保分析 | 云维保</span>
            <span>用于所有设备信息管理（整厂设备数据信息管理）</span>
          </div>
        </div>
      </div>
      <!-- 平台优势 -->
      <h1 class="title">平台优势</h1>
      <ul class="service advantage">
        <li>
          <img src="@/assets/h_ser5.png" alt="" />
          <p>快捷发布</p>
        </li>
        <li>
          <img src="@/assets/h_ser6.png" alt="" />
          <p>智能对接</p>
        </li>
        <li>
          <img src="@/assets/h_ser7.png" alt="" />
          <p>自主派单</p>
        </li>
        <li>
          <img src="@/assets/h_ser8.png" alt="" />
          <p>服务保障</p>
        </li>
      </ul>
    </div>
    <div class="_body" v-if="!ifshow">
      <ul>
        <li>
          <van-icon name="newspaper-o" size="40" />
          <span @click="goTo('allGoods')">全部订单</span>
        </li>
        <li>
          <van-icon name="tosend" size="40" />
          <span @click="goTo('Wait')">等待派单</span>
        </li>
        <li>
          <van-icon name="todo-list-o" size="40" />
          <span @click="goTo('Pending')">服务订单</span>
        </li>
        <li>
          <van-icon name="sign" size="40" />
          <span @click="goTo('Complete')">订单验收</span>
        </li>
      </ul>
    </div>
    <Bottom />
  </div>
</template>

<script>
import Bottom from "@/components/Bottom";
import Header from "@/components/Header";
import Storage from "@/views/Storage.js";

export default {
  name: "Home",

  components: {
    Bottom,
    Header,
  },
  data() {
    return {
      title: "云维保",
      flag: false,
      allgoods: [],
      user: Storage.get("user"),
      ifshow: true,
    };
  },
  methods: {
    goTo(val) {
      this.$router.push({ name: val });
    },
  },
  mounted() {
    if (this.user.length && this.user[0].phone == 17623034493) {
      this.ifshow = false;
    }
  },
};
</script>
<style scoped lang="less">
.home {
  width: 100%;
  background-color: #f1f1f1;
  font-size: 14px;
  .body {
    .my-swipe .van-swipe-item img {
      height: 150px;
      width: 100%;
      border-radius: 10px;
    }
    .title {
      font-size: 16px;
      margin: 10px;
      display: flex;
      justify-content: space-between;
      span {
        font-weight: 400;
        color: #a0a0a0;
      }
    }
    .service {
      margin: 0 10px;
      display: flex;
      background: #fff;
      border-radius: 10px;
      li {
        width: 100%;
        padding: 10px 0;
        display: flex;
        text-align: center;
        justify-content: space-around;
        align-items: center;
        flex-direction: column;
        img {
          width: 40px;
          height: 40px;
        }
        p {
          margin-top: 5px;
        }
      }
    }
    .btn {
      width: 90%;
      display: block;
      box-sizing: border-box;
      margin: 10px auto;
      font-size: 14px;
      padding: 10px 0;
      text-align: center;
      border: 0;
      color: #fff;
      background-color: #dd524d;
      border-radius: 50px;
    }
    .dynamics {
      background: #fff;
      margin: 0 10px;
      box-sizing: border-box;
      padding: 5px 10px;
      border-radius: 5px;
      font-size: 16px;
      .header {
        display: flex;
        justify-content: space-around;
      }
      .scroll {
        height: 100px;
        margin-top: 10px;
        overflow: auto;
        padding-bottom: 10px;
        .product {
          padding: 5px 0;
          display: flex;
          color: #dd524d;
          justify-content: space-around;
          & > li:nth-child(4) {
            padding: 5px;
            color: #fff;
            border-radius: 5px;
            font-size: 12px;
            background: #dd524d;
          }
        }
        .product.active > li {
          color: #b0b0b0;
          &:nth-child(4) {
            color: #fff;
            background: #b0b0b0;
          }
        }
      }
    }
    .more {
      padding: 0 5px;
      background-color: #fff;
      margin: 10px 10px 20px;
      border-radius: 7px;
      box-sizing: border-box;
      .words {
        padding: 10px 0;
        border-bottom: 1px solid #f1f1f1;
        display: flex;
        img {
          width: 40px;
          height: 40px;
        }
        div {
          width: 80%;
          margin-left: 10px;
          display: flex;
          flex-wrap: wrap;
          overflow: hidden;
          span {
            font-size: 12px;
            font-size: 14px;
            width: 100%;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            padding: 2px 0;
          }
        }
      }
    }
    .service.advantage {
      margin-bottom: 30px;
    }
  }
  ._body {
    width: 100%;
    height: calc(100vh - 147px);
    display: flex;
    justify-content: center;
    align-items: center;
    ul {
      width: 375px;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      li {
        width: 150px;
        box-sizing: border-box;
        height: 150px;
        margin-left: 10px;
        margin-top: 10px;
        background: white;
        font-size: 22px;
        text-align: center;
        line-height: 150px;
        font-weight: 800;
        border-radius: 8px;
        color: rgb(239, 86, 72);
        .van-icon-newspaper-o:before {
          position: relative;
          top: 5px;
        }
        .van-icon-sign:before {
          position: relative;
          top: 5px;
        }
        .van-icon-tosend:before {
          position: relative;
          top: 5px;
        }
        .van-icon-todo-list-o:before {
          position: relative;
          top: 5px;
        }
      }
    }
  }
}
</style>
