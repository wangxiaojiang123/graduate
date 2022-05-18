<template>
  <div class="handle">{{ cargo.condition }}</div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Handle",
  data() {
    return {};
  },
  computed: {
    ...mapState({
      cargo: "cargo",
    }),
  },
};
</script>

<style>
.handle {
  width: 100%;
  box-sizing: border-box;
  padding: 0 10px;
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
}
</style>
