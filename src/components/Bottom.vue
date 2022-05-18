<template>
  <div class="Bottom">
    <ul>
      <li>
        <router-link :to="{ name: 'Home' }">
          <span><img src="@/assets/nav_.png" alt="" /></span>
          <img src="@/assets/nav.png" alt="" />
          <p>首页</p>
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'Services' }">
          <span><img src="@/assets/ser_.png" alt="" /></span>
          <img src="@/assets/ser.png" alt="" />
          <p>服务单</p>
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'Message' }">
          <span><img src="@/assets/mes_.png" alt="" /></span>
          <img src="@/assets/mes.png" alt="" />
          <p>消息</p>
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'About' }">
          <span><img src="@/assets/me_.png" alt="" /></span>
          <img src="@/assets/me.png" alt="" />
          <p>我的</p>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.Bottom {
  width: 100%;
  height: 50px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #ef5648;
    }
    &.router-link-exact-active > span > img {
      display: none;
    }
    &.router-link-exact-active > img {
      display: block;
    }
  }
  ul {
    width: 100%;
    background: #fff;
    border-top: 1px solid #ccc;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 99;
    display: flex;
    justify-content: space-around;
    align-items: center;
    li {
      width: 80px;
      height: 50px;
      font-size: 12px;
      display: flex;
      justify-content: center;
      align-items: center;
      p {
        margin: 0;
      }
      img {
        width: 24px;
        height: 24px;
        display: none;
        margin: 0 auto;
      }
      span {
        img {
          display: block;
          margin: 0 auto;
        }
      }
    }
  }
}
</style>
