<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评价</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import header from './components/header/header.vue';
const ERR_OK = 0;
export default {
  data() {
    return {
      seller: {}
    };
  },
  created() {
    this.$http
      .get('/api/seller')
      .then(res => {
        let sellerdata = res.data;
        if (sellerdata.errno === ERR_OK) {
          this.seller = Object.assign({}, this.seller, sellerdata.data);
        };
      })
      .catch(error => {
        console.log(error);
      });
  },
  components: {
    'v-header': header
  }
};
</script>
<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#app .tab {
  width: 100%;
  height: 40px;
  line-height: 40px;
  display: flex;
  background-color: red;
}
#app .tab .tab-item {
  flex: 1;
}
</style>
