<template>
  <div class="address">
    <Header :Title="this.title" Address="Public" />
    <van-address-edit
      :area-list="areaList"
      show-search-result
      :save-button-text="save"
      :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @change-detail="onChangeDetail"
    />
  </div>
</template>

<script>
import Header from "../../components/Header.vue";
import { mapState } from "vuex";
import { areaList } from "@vant/area-data";

export default {
  name: "Address",
  components: { Header },
  data() {
    return {
      title: "联系方式",
      areaList,
      searchResult: [],
      save: "确定",
    };
  },
  computed: {
    ...mapState({
      address: "address",
    }),
  },
  methods: {
    onSave(content) {
      console.log(content);
      this.$store.state.address = {
        name: content.name,
        tel: content.tel,
        addressDetail: `${content.province}${content.city}${content.county}${content.addressDetail}`,
      };
      // console.log(this.$store.state.address);
      this.$router.push({ name: "Public" });
    },
    onChangeDetail(val) {
      if (val) {
        this.searchResult = [
          {
            name: "青青草原",
            address: "狼堡与羊村",
          },
        ];
      } else {
        this.searchResult = [];
      }
    },
  },
  mounted() {
    var name = document.querySelectorAll(".van-field__control")[0];
    var iPhone = document.querySelectorAll(".van-field__control")[1];
    name.setAttribute("placeholder", "请填写联系人姓名");
    iPhone.setAttribute("placeholder", "请填写联系电话");
  },
};
</script>

<style lang="less" scoped></style>
