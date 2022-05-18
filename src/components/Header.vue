<template>
  <div class="header">
    <div class="title">
      <van-icon name="arrow-left" size="16px" @click="back()" v-if="Flag" />
      <p>{{ Title }}</p>
    </div>
  </div>
</template>

<script>
import Storage from "@/views/Storage.js";

export default {
  name: "Header",
  props: {
    Flag: { type: Boolean, default: true },
    Title: { type: String, default: "" },
    Address: { type: String, default: "" },
  },
  data() {
    return {
      product: Storage.get("product"),
    };
  },
  methods: {
    back() {
      if (this.Address == "") {
        this.$router.go(-1);
      } else {
        this.$delete(this.product, 0);
        Storage.set("product", this.product);
        this.$router.push({ name: this.Address });
      }
    },
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
.header {
  width: 100%;
  height: 45px;
  box-sizing: border-box;
  .title {
    width: 100%;
    box-sizing: border-box;
    padding: 0 10px;
    background: #ef5648;
    position: fixed;
    top: 0;
    left: 0;
    height: 45px;
    display: flex;
    align-items: center;
    color: #fff;
    z-index: 9999;
    p {
      flex: 1;
      text-align: center;
    }
    img {
      width: 20px;
      height: 20px;
    }
  }
}
</style>
