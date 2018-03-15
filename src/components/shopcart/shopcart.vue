<template>
  <div id="shopcart">
      <div class="leftWrapper">
        <div class="icon">
          <i class="icon-shopping_cart"></i>
        </div>
      </div>
      <div class="centerWrapper">
        <div class="left">¥0</div>
        <div class="right">另需配送费¥4元</div>
      </div>
      <div class="rightWrapper">¥20元起送</div>
  </div>
</template>

<script>
export default {
  'name': 'shopcart'
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/icon.styl';
#shopcart
    position fixed
    bottom 0
    width 100%
    height 46px
    background-color #141d27
    display flex
    .leftWrapper
      padding 0 18px
      .icon
        margin-bottom 2px
        width 44px
        height 34px
        border-radius 50%
        background-color rgb(43, 51, 59)
        border 6px solid #141d27
        margin-top -9px
        padding-top 9px
        text-align center
        .icon-shopping_cart
          font-size 24px
          color rgb(255, 255, 255, 0.4)
          line-height 24px
    .rightWrapper
      width 105px
      height 100%
      background-color rgb(43, 51, 59)
      color rgb(255, 255, 255, 0.4)
      font-size 12px
      line-height 46px
      font-weight 700
      text-align center
    .centerWrapper
      flex 1
      display flex
      .left
        padding 12px 12px 12px 0
        border-right 1px solid rgb(43, 51, 59)
        color rgb(255, 255, 255, 0.4)
        font-weight 700
      .right  
</style>
