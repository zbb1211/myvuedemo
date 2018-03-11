<template>
  <div id="headbar">
    <img :src="seller.avatar" width="64" height="64" class="picture">
    <div class="goods_desc">
      <div class="goods_title">
        <span class="icon_brand"></span>
        <span class="barnd_name">{{seller.name}}</span>
      </div>
      <div class="delivery_time">{{seller.description}} / {{seller.deliveryTime}}分钟到达</div>
      <div class="promotion_desc" v-if="seller.supports">
        <span class="icon_promotion" :class="classMap[seller.supports[0].type]"></span>
        <span class="description">{{seller.supports[0].description}}</span>
      </div>
    </div>
    <div class="promotion_quantity" v-if="seller.supports" @click="showDetail">
      <span class="quantity">{{seller.supports.length}}个</span></div>
    <div class="notice">
      <span class="icon_notice"></span><span class="text_notice">{{seller.bulletin}}</span>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%">
    </div>
    <div class="promotion_invoice" v-show="showInvoice">
      <div class="content_wrapper">
        <div class="brand_name">{{seller.name}}</div>
        <div class="star">
          <v-star :score="seller.score" :size="48"></v-star>
        </div>
        <div class="promotion_title">
          <div class="line"></div>
          <div class="text">优惠信息</div>
          <div class="line"></div>
        </div>
        <div class="promotion_info" v-if="seller.supports">
          <div v-for="(support, index) in seller.supports" :key="index" class="support">
            <span class="icon_promotion" :class="classMap[seller.supports[index].type]"></span>
            <span class="description">{{seller.supports[index].description}}</span>
          </div>
        </div>
        <div class="promotion_title">
          <div class="line"></div>
          <div class="text">商家公告</div>
          <div class="line"></div>
        </div>
        <div class="invoice_text">{{seller.bulletin}}</div>
      </div>
      <div class="close" @click="closeDetail">×</div>
    </div>
  </div>
</template>

<script>
import star from '../star/star';
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        showInvoice: false
        };
    },
    methods: {
      showDetail() {
        this.showInvoice = true;
      },
      closeDetail() {
        this.showInvoice = false;
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
    components: {
      'v-star': star
    }
  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixin';
  #headbar
    background-color rgba(7,17,27,0.5)
    padding 24px 0 0 0
    font-size 0
    color #fff
    position relative
    overflow hidden

  .picture
    display inline-block
    vertical-align top
    margin-left 24px
    margin-right 16px
    margin-bottom 18px
    border-radius 2px

  .goods_desc
    display inline-block
    .goods_title
      font-size 16px
      font-weight bold
      line-height 18px
      margin-bottom 8px
      .icon_brand
        display inline-block
        width 30px
        height 18px
        border-radius 2px
        bg-image('images/brand')
        background-size 30px 18px
        background-repeat no-repeat
        vertical-align top
        margin-right 6px
    .delivery_time
      font-size 12px
      line-height 12px
      margin-bottom 10px
    .promotion_desc
      font-size 0
      .icon_promotion
        display inline-block
        width 12px
        height 12px
        border-radius 2px
        bg-image('images/decrease_1')
        background-size 12px 12px
        background-repeat no-repeat
        margin-right 4px
      .description
        font-size 10px
        line-height 12px
  .promotion_quantity
    height 24px
    line-height 24px
    color #ffffff
    background-color rgba(0, 0, 0, .2)
    display inline-block
    border-radius 12px
    padding 0 8px
    position absolute
    right 12px
    top 65px
    .quantity
      font-size 10px
      color #fff
  .notice
    width 100%
    height 28px
    line-height 28px
    color #ffffff
    padding 0 22px 0 0;
    background-color rgba(7, 17, 27, 0.2)
    overflow hidden
    white-space nowrap
    text-overflow ellipsis
    box-sizing border-box
    .icon_notice
      display inline-block
      vertical-align top
      width 22px
      height 12px
      bg-image('images/bulletin')
      background-size 22px 12px
      background-repeat no-repeat
      margin-right 4px
      margin-left 12px
      margin-top 8px
    .text_notice
      display inline-block
      font-size 10px
      color #ffffff
  .background
    position absolute
    left 0
    top 0
    width 100%
    height 100%
    z-index -1
    filter blur(10px)
  .promotion_invoice
    position fixed
    left 0
    top 0
    width 100%
    height 100%
    background-color rgba(7, 17, 27, .8)
    overflow-y auto
    .content_wrapper
      padding-top 64px
      padding-bottom 32px
      min-height 100%
      box-sizing border-box
      .brand_name
        font-size 16px
        font-weight 700
        line-height 16px
        text-align center
      .promotion_title
        font-size 14px
        color #fff
        width 80%
        margin 0 auto
        display flex
        margin-bottom 24px
        .line
          flex 1
          height 0
          border-top 1px solid rgba(255, 255, 255, 0.2)
          margin-top 7px
        .text
          padding 0 12px
      .promotion_info
        font-size 0
        width 80%
        margin 0 auto
        padding 0 12px
        .support
          margin-bottom 12px
          .icon_promotion
            display inline-block
            width 16px
            height 16px
            border-radius 2px
            background-size 12px 12px
            background-repeat no-repeat
            margin-right 6px
            vertical-align top
            &.decrease
              bg-image('images/decrease_1')
            &.discount
              bg-image('images/discount_1')
            &.special
              bg-image('images/special_1')
            &.invoice
              bg-image('images/invoice_1')
            &.guarantee
              bg-image('images/guarantee_1')
              margin-bottom 28px
          .description
            font-size 12px
            line-height 12px
      .invoice_text
        width 80%
        margin 0 auto
        padding 0 12px
        font-size 12px
        line-height 24px
        color #ffffff
  .close
    width 100%
    font-size 32px
    text-align center
    margin-top -32px
</style>
