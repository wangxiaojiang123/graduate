<template>
  <div class="more">
    <Header :Title="title" />
    <div class="image"></div>
    <h1>服务介绍</h1>
    <van-collapse v-model="activeNames">
      <van-collapse-item
        title="工厂维保|云维保"
        name="1"
        icon="http://localhost:8080/img/3.ba1fe98b.png"
        ><ul>
          <li>
            <h1>设备报修</h1>
            <p>
              扫描设备二维码，填写报修内容、提交报修，简单3步即可完成设备报修，自主报修
            </p>
          </li>
          <li>
            <h1>设备报修</h1>
            <p>
              扫描设备二维码，填写报修内容、提交报修，简单3步即可完成设备报修，自主报修
            </p>
          </li>
          <li>
            <h1>设备报修</h1>
            <p>
              扫描设备二维码，填写报修内容、提交报修，简单3步即可完成设备报修，自主报修
            </p>
          </li>
          <li>
            <h1>设备报修</h1>
            <p>
              扫描设备二维码，填写报修内容、提交报修，简单3步即可完成设备报修，自主报修
            </p>
          </li>
        </ul></van-collapse-item
      >
      <van-collapse-item
        title="售后服务|云维保"
        name="2"
        icon="http://localhost:8080/img/3.ba1fe98b.png"
        >内容</van-collapse-item
      >
      <van-collapse-item
        title="维保分析|云维保"
        name="3"
        icon="http://localhost:8080/img/3.ba1fe98b.png"
        >内容</van-collapse-item
      >
      <van-collapse-item
        title="工厂备件|云维保"
        name="4"
        icon="http://localhost:8080/img/3.ba1fe98b.png"
        >内容</van-collapse-item
      >
      <van-collapse-item title="合作伙伴" name="5">内容</van-collapse-item>
      <van-collapse-item title="关于云维保" name="6">内容</van-collapse-item>
    </van-collapse>
  </div>
</template>

<script>
import Header from "../../components/Header.vue";
export default {
  name: "More",
  components: { Header },
  data() {
    return {
      title: "更多服务",
      activeNames: ["0"],
    };
  },
};
</script>

<style scoped lang="less">
.more {
  width: 100%;
  background: #f1f1f1;
  .image {
    width: 100%;
    height: 150px;
    background: url("../../assets/lb1.png") no-repeat center/100% 100%;
  }
  h1 {
    font-size: 20px;
    padding: 10px;
    font-weight: 400;
  }
  /deep/.van-cell {
    height: 60px;
  }
  /deep/.van-icon__image {
    width: 40px;
    height: 40px;
  }
  /deep/.van-cell__title {
    line-height: 40px;
    span {
      font-size: 16px;
    }
  }
  .van-collapse-item__content {
    h1 {
      padding: 0;
      font-weight: 800;
      font-size: 16px;
      color: #000;
    }
    p {
      font-size: 14px;
    }
  }
}
</style>
