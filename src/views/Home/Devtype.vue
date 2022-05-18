<template>
  <div class="devtype">
    <Header :Title="title" :Address="adress" />
    <!-- 热门搜索 -->
    <van-search v-model="value" placeholder="请输入搜索关键词" />
    <van-collapse v-model="activeNames">
      <van-collapse-item title="热门搜索" name="1">
        <ul class="hot">
          <li v-for="(item, index) in hot" :key="index" @click="goBack(index)">
            <img :src="item.path" alt="" />
            <p>{{ item.text }}</p>
          </li>
        </ul>
      </van-collapse-item>
    </van-collapse>
    <!-- 设备 -->
    <div class="devices">
      <ul class="left">
        <li
          v-for="(item, index) in devices"
          :key="index"
          :class="{ active: active === index }"
          @click="change(index)"
        >
          <p>{{ item }}</p>
        </li>
      </ul>
      <div class="right">
        <!-- 线路板设备 -->
        <ul v-if="active === 0">
          <li
            v-for="(item, index) in dev1"
            :key="index"
            @click="goback_dev(dev1, index)"
          >
            <p>{{ item }}</p>
          </li>
        </ul>
        <!-- 空压机 -->
        <ul v-if="active === 1">
          <li
            v-for="(item, index) in dev2"
            :key="index"
            @click="goback_dev(dev2, index)"
          >
            <p>{{ item }}</p>
          </li>
        </ul>
        <!-- 数控机床 -->
        <ul v-if="active === 2">
          <li
            v-for="(item, index) in dev3"
            :key="index"
            @click="goback_dev(dev3, index)"
          >
            <p>{{ item }}</p>
          </li>
        </ul>
        <!-- 注塑设备 -->
        <ul v-if="active === 3">
          <li
            v-for="(item, index) in dev4"
            :key="index"
            @click="goback_dev(dev4, index)"
          >
            <p>{{ item }}</p>
          </li>
        </ul>
        <!-- 印刷设备 -->
        <ul v-if="active === 4">
          <li
            v-for="(item, index) in dev5"
            :key="index"
            @click="goback_dev(dev5, index)"
          >
            <p>{{ item }}</p>
          </li>
        </ul>
        <!-- 泵类 -->
        <ul v-if="active === 5">
          <li
            v-for="(item, index) in dev6"
            :key="index"
            @click="goback_dev(dev6, index)"
          >
            <p>{{ item }}</p>
          </li>
        </ul>
        <!-- 其他设备 -->
        <ul v-if="active === 6">
          <li
            v-for="(item, index) in dev7"
            :key="index"
            @click="goback_dev(dev7, index)"
          >
            <p>{{ item }}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../../components/Header.vue";
import { mapState, mapMutations } from "vuex";
export default {
  name: "Devtype",
  components: {
    Header,
  },
  data() {
    return {
      title: "选择设备",
      value: "",
      active: 0,
      adress: "Home",
      activeNames: ["1"],
    };
  },
  computed: {
    ...mapState({
      hot: "hot",
      devices: "devices",
      dev1: "dev1",
      dev2: "dev2",
      dev3: "dev3",
      dev4: "dev4",
      dev5: "dev5",
      dev6: "dev6",
      dev7: "dev7",
      devtype: "devtype",
    }),
  },
  methods: {
    change(i) {
      this.active = i;
    },
    goBack(i) {
      var text = this.hot[i].text;
      this.$store.state.devtype = text;
      this.$router.push({ name: "Public" });
    },

    goback_dev(lists, index) {
      var text = lists[index];
      this.$store.state.devtype = text;
      this.$router.push({ name: "Public" });
    },
  },
};
</script>

<style lang="less" scoped>
.devtype {
  width: 100%;
  height: 100%;
  position: absolute;
  background: #fff;
  /deep/.van-cell__title {
    span {
      color: rgb(247, 97, 72);
    }
  }
  .hot {
    width: 100%;
    display: flex;
    justify-content: space-between;
    li {
      display: flex;
      align-items: center;
      flex-direction: column;
      p {
        margin-top: 10px;
        color: #444;
      }
      img {
        width: 75px;
        height: 75px;
        border-radius: 50%;
        border: 1px solid #000;
      }
    }
  }
  .devices {
    width: 100%;
    display: flex;
    border-top: 1px solid #f1f1f1;
    .left {
      width: 30%;
      height: 60vh;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      flex-direction: column;
      background: #f1f1f1;

      li {
        width: 100%;
        text-align: center;

        &.active {
          color: rgb(247, 97, 72);
          background: #fff;
          position: relative;
        }
        &.active > p::before {
          content: "|";
          font-weight: 800;
          position: absolute;
          left: 0;
          top: 9px;
        }
        p {
          padding: 10px 0;
        }
      }
    }
    .right {
      width: 70%;
      ul {
        padding: 0 10px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
      }
      li {
        width: 45%;
        text-align: center;
        box-sizing: border-box;
        padding: 2.5px 5px;
        border-radius: 5px;
        margin-top: 10px;
        border: 1px solid #000;
        font-size: 14px;
      }
    }
  }
}
</style>
