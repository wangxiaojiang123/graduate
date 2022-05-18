<template>
  <div class="public">
    <Header :Title="title" :Address="location" />

    <!-- 头部 -->
    <ul class="header">
      <li
        v-for="(list, index) in lists"
        :key="index"
        @click="change(index)"
        :class="{ active: active === index }"
      >
        <img :src="list.path" alt="" />
        <p>{{ list.text }}</p>
      </li>
    </ul>
    <!-- 设备 -->
    <ul class="device">
      <li>
        <span>*设备名称</span>
        <input type="text" placeholder="请输入设备名称" v-model="deviceName" />
      </li>
      <li>
        <span>*设备类型</span>
        <div @click="goDevtype()">
          <p v-if="devtype == '' ? true : false">请选择设备类型</p>
          <p v-if="devtype == '' ? false : true">{{ devtype }}</p>
          <van-icon name="arrow" />
        </div>
      </li>
      <li>
        <span>*设备数量（台）</span>
        <input type="number" placeholder="请输入设备数量" v-model="deviceNum" />
      </li>
    </ul>
    <!-- 类型 -->
    <div class="where">
      <h1>*故障类型</h1>
      <ul class="type">
        <li
          v-for="(type, index) in types"
          :key="index"
          @click="changeType(index)"
          :class="{ typeActive: typeActive === index }"
        >
          {{ type.text }}
        </li>
      </ul>
      <div class="describe">
        <h1>*故障描述</h1>
        <textarea
          type="text"
          rows="3"
          placeholder="请尽可能详细地描述设备异常情况以及损坏原因(如线路损坏，接触不良等)，这样有助于您快速匹配工程师！"
          v-model="description"
        />
        <van-uploader v-model="fileList" />
      </div>
    </div>
    <!--期望  -->
    <ul class="finish">
      <li>
        <van-cell
          title=" *期望服务完成时间"
          :value="date"
          @click="show = true"
        />
        <div>
          <van-calendar v-model="show" @confirm="onConfirm" /><van-icon
            name="arrow"
          />
        </div>
      </li>
      <li>
        预计费用
        <p>
          <input
            type="number"
            placeholder="预计费用仅供师傅报价参考"
            v-model="fee"
          />元
        </p>
      </li>
      <li>
        *联系方式
        <div class="touch" @click="goAddress()">
          <span v-if="address == '' ? true : false">请填写联系方式</span>
          <div v-if="address == '' ? false : true">
            <p>{{ address.addressDetail }}</p>
            <p>{{ address.name }}&nbsp;{{ address.tel }}</p>
          </div>
          <van-icon name="arrow" />
        </div>
      </li>
      <li>
        *支付方式
        <p><span>线下支付</span> <van-icon name="arrow" /></p>
      </li>
    </ul>
    <!-- 发布 -->
    <div class="send">
      <div>
        <button @click="confrimRelease()">发布服务单并匹配维修工程师</button>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../../components/Header.vue";
import Storage from "@/views/Storage.js";
import { mapState } from "vuex";

export default {
  components: { Header },
  name: "Public",
  data() {
    return {
      title: "发布服务单",
      location: "Home",
      active: 1,
      typeActive: 1,
      fileList: [],
      date: "",
      show: false,
      deviceName: "",
      deviceNum: "",
      description: "",
      fee: "",
      user: Storage.get("user"),
      product: Storage.get("product"),
    };
  },
  computed: {
    ...mapState({
      lists: "lists",
      types: "types",
      devtype: "devtype",
      address: "address",
    }),
  },
  methods: {
    change(i) {
      this.active = i;
    },
    changeType(i) {
      this.typeActive = i;
    },
    // 上传图片
    goDevtype() {
      this.$delete(this.product, 0);
      this.$set(this.product, this.product.length, {
        lists: this.active,
        types: this.typeActive,
        deviceName: this.deviceName,
        deviceNum: this.deviceNum,
        description: this.description,
        fileList: this.fileList,
        date: this.date,
        fee: this.fee,
      });
      Storage.set("product", this.product);
      this.$router.push({ name: "Devtype" });
    },
    goAddress() {
      this.$delete(this.product, 0);
      this.$set(this.product, this.product.length, {
        lists: this.active,
        types: this.typeActive,
        deviceName: this.deviceName,
        deviceNum: this.deviceNum,
        description: this.description,
        fileList: this.fileList,
        date: this.date,
        fee: this.fee,
      });
      Storage.set("product", this.product);
      this.$router.push({ name: "Address" });
    },
    formatDate(date) {
      return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
    },
    onConfirm(date) {
      this.show = false;
      this.date = this.formatDate(date);
    },
    // 确认发布
    confrimRelease() {
      // console.log(this.l````````````````ists[this.active].text);保养
      // console.log(this.types[this.typeActive].text);故障类型
      // console.log(this.devtype )设备类型
      // console.log(this.deviceName);设备名称
      // console.log(this.deviceNum);设备数量
      // console.log(this.description);故障描述
      // console.log(this.fileList);读取图片
      // console.log(this.date);期望完成日期
      // console.log(this.fee);费用
      // console.log(this.address);地````````````````址

      this.$delete(this.product, 0);
      var Time = new Date();
      var nowTime = `${Time.getFullYear()}-${
        Time.getMonth() + 1
      }-${Time.getDate()} ${Time.getHours()}:${Time.getMinutes()}:${Time.getSeconds()} `;
      let newTime = "";
      for (var i = 0; i < 4; i++) {
        newTime += Math.floor(Math.random() * 10);
      } //随机4位数
      let randomNum =
        nowTime.split("-").join("").split(" ").join("").split(":").join("") +
        newTime; //订单号

      if (this.user.length > 0) {
        if (
          this.devtype != "" &&
          this.deviceName != "" &&
          this.deviceNum != "" &&
          this.description != "" &&
          this.fileList != "" &&
          this.date != "" &&
          this.fee != "" &&
          this.address != ""
        ) {
          this.$axios({
            method: "post",
            url: "/user/api/addGoods",
            data: {
              phone: this.user[0].phone,
              name: this.user[0].name,
              lists: this.lists[this.active].text,
              types: this.types[this.typeActive].text,
              devtype: this.devtype,
              deviceName: this.deviceName,
              deviceNum: this.deviceNum,
              description: this.description,
              pic: this.fileList,
              date: this.date,
              fee: this.fee,
              addressDetail: this.address.addressDetail,
              addressname: this.address.name,
              addresstel: this.address.tel,
              nowTime: nowTime,
              randomNum: randomNum,
              condition: "待派单",
            },
          })
            .then((response) => {
              if (response) {
                this.$toast("下单成功");
                this.$router.push({ name: "Services" });
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          this.$toast("请将信息填写完整");
        }
      } else {
        this.$toast("请先登录账号");
      }
    },
  },
  created() {
    // console.log(this.product);
    if (this.product.length > 0) {
      this.active = this.product[0].lists;
      this.typeActive = this.product[0].types;
      this.deviceName = this.product[0].deviceName;
      this.deviceNum = this.product[0].deviceNum;
      this.description = this.product[0].description;
      this.fileList = this.product[0].fileList;
      this.date = this.product[0].date;
      this.fee = this.product[0].fee;
    }

    // console.log(this.$store.state.devtype);
  },
  watch: {
    product: {
      handler() {
        Storage.set("product", this.product);
      },
      deep: true,
    },
  },
};
</script>

<style lang="less" scoped>
.public {
  width: 100%;
  background: #f1f1f1;
  .wh() {
    width: 100%;
    box-sizing: border-box;
    padding: 5px 15px 0 15px;
    background: #fff;
    border-radius: 10px;
    margin-bottom: 10px;
  }
  .header {
    display: flex;
    li {
      flex-grow: 1;
      text-align: center;
      padding: 10px 0;
      img {
        width: 30px;
        height: 30px;
      }
      &.active {
        color: white;
        background-color: rgb(247, 97, 72);
      }
    }
  }
  .device {
    .wh();
    li {
      padding: 10px 0;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #f1f1f1;
      justify-content: space-between;
      span {
        font-weight: 800;
      }
      input {
        border: 0;
        text-align: right;
      }
      div {
        color: rgb(118, 118, 118);
        display: flex;
        align-items: center;
      }
    }
  }
  .where {
    .wh();
    h1 {
      font-size: 16px;
      margin: 10px 0;
    }
    .type {
      width: 100%;
      display: flex;
      justify-content: space-between;
      li {
        font-size: 14px;
        padding: 5px;
        background-color: fff;
        color: #b0b0b0;
        border: 1px solid #b0b0b0;
        border-radius: 5px;
        &.typeActive {
          color: #fff;
          border: 1px solid rgb(247, 97, 72);
          background-color: rgb(247, 97, 72);
        }
      }
    }
    .describe {
      textarea {
        width: 100%;
        font-size: 14px;
        border: 0;
        resize: none;
      }
      /deep/ .van-image.van-uploader__preview-image {
        border-radius: 5px;
      }
      /deep/.van-uploader__preview-delete {
        background: red;
      }
      /deep/.van-uploader__wrapper {
        display: flex;
        justify-content: space-between;
      }
    }
  }
  .finish {
    .wh();
    li {
      display: flex;
      font-size: 16px;
      padding: 10px 0;
      border-bottom: 1px solid #f1f1f1;
      font-weight: 800;
      justify-content: space-between;
      align-items: center;
      .touch {
        font-weight: 400;
        font-size: 14px;
        display: flex;
        align-items: center;
        span {
          color: rgb(118, 118, 118);
        }
        div {
          color: #000;
          p {
            width: 200px;
            overflow: hidden;
            text-overflow: ellipsis;
            /*禁止换行显示*/
            white-space: nowrap;
            text-align: right;
          }
        }
      }
      .van-cell {
        padding: 0;
        span {
          font-size: 16px;
          font-weight: 800;
          color: #000;
        }
      }
      .van-cell__value {
        span {
          font-weight: 400;
        }
      }
      &:nth-child(4) {
        margin: 10px 0 30px;
      }
      p {
        font-weight: 400;
        font-size: 14px;
        input {
          border: 0;
          padding-right: 5px;
          text-align: right;
        }
        span {
          color: rgb(118, 118, 118);
        }
      }
    }
  }
  .send {
    width: 100%;
    height: 58px;
    div {
      width: 100%;
      background-color: #fff;
      text-align: center;
      box-sizing: border-box;
      padding: 10px 20px;
      position: fixed;
      bottom: 0;
      button {
        font-size: 14px;
        border: 0;
        padding: 10px 70px;
        background-color: rgb(247, 97, 72);
        color: #fff;
        border-radius: 5px;
      }
    }
  }
}
</style>
