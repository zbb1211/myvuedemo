<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
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
    <keep-alive>
    <router-view :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice" :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script>
import header from './components/header/header.vue';
const ERR_OK = 0;
export default {
  data() {
    return {
      seller: {
        type: Object
      }
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
<style scoped lang="stylus" rel="stylesheet/stylus">
@import './common/stylus/mixin';

#app
  font-family "Avenir", Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  color #2c3e50
  .tab
    width 100%
    height 40px
    line-height 40px
    display flex
    border-1px(rgba(7, 17, 27, 0.1))
    z-index 11
    background-color #fff
    .tab-item
      flex 1
      text-align center
      & > a
        display block
        font-size 14px
        color rbg(77, 85, 93)
        &.active
          color rgb(240, 20, 20)
</style>
