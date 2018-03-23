<template>
<div id="seller" ref="seller">
<div>
  <div class="overview border-1px">
    <div class="sellername">{{seller.name}}</div>
    <div class="sales">
    <star :size="36" :score="seller.serviceScore"></star>
    <div class="ratingCount">({{seller.ratingCount}})</div>
    <div class="sellCount">月售{{seller.sellCount}}笔</div>
    </div>
    <div class="store">
      <i class="icon-favorite"></i>
      <p class="storetext">收藏</p>
    </div>
  </div>
  <div class="deliveryDetails border-1px">
    <div class="content">
      <p class="text">起送价</p>
      <p class="info">{{seller.minPrice}}元</p>
    </div>
    <div class="content">
      <p class="text">商家配送</p>
      <p class="info">{{seller.deliveryPrice}}元</p>
    </div>
    <div class="content">
      <p class="text">平均配送时间</p>
      <p class="info">{{seller.deliveryTime}}</p>
    </div>
  </div>
  <split></split>
  <div class="bulletin border-1px">
    <h3 class="title">公告与活动</h3>
    <p class="text">{{seller.bulletin}}</p>
  </div>
  <div class="supports" v-if="seller.supports">
    <div class="support border-1px" v-for="(item,index) in seller.supports" :key="index">
      <span class="icon" :class="classMap[item.type]"></span>
      <span class="supporttext">{{item.description}}</span>
    </div>
  </div>
  <split></split>
  <div class="sellerpics border-1px">
    <h3 class="title">商家实景</h3>
    <div class="pics" ref="picsWrapper">
      <ul class="items" ref="picsList">
        <li v-for="(item,index) in seller.pics" :key="index" class="item"><img :src="item" width="120" height="90"></li>
      </ul>
    </div>
  </div>
  <split></split>
  <div class="sellerinfo">
    <h3 class="title border-1px">商家信息</h3>
    <div class="infos border-1px" v-for="(item,index) in seller.infos" :key="index">{{item}}</div>
  </div>
</div>
</div>
</template>

<script>
import star from '../star/star';
import split from '../split/split';
import BScroll from 'better-scroll';
export default {
  props: {
    seller: {
      type: Object
    }
  },
  created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
  },
  watch: {
    'seller'() {
      this.$nextTick(() => {
        this._initScroll();
        this._initPics();
      });
    }
  },
   mounted() {
    this.$nextTick(() => {
      this._initScroll();
      this._initPics();
    });
  },
  methods: {
     _initScroll() {
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.seller, {
          click: true
        });
      } else {
        this.scroll.refresh();
      }
     },
     _initPics() {
       if (this.seller.pics) {
          let w = 120;
          let margin = 6;
          let ulWidth = (w + margin) * this.seller.pics.length - margin;
          this.$refs.picsList.style.width = ulWidth + 'px';
          this.$nextTick(() => {
            if (!this.picScroll) {
              this.picScroll = new BScroll(this.$refs.picsWrapper, {
                scrollX: true,
                eventPassthrough: 'vertical'
              });
            } else {
              this.picScroll.refresh();
            }
          });
       }
     }
  },
  components: {
    star,
    split
  }
};
</script>

<style scoped lang="stylus">
@import '../../common/stylus/icon';
@import '../../common/stylus/mixin';
#seller
  position absolute
  width 100%
  top 174px
  bottom 0
  overflow hidden
  .overview
    position relative
    padding 18px 0
    margin 0 18px
    border-1px(rgba(7, 17, 27, 0.1))
    .sellername
      font-size 14px
      line-height 14px
      margin-bottom 8px
      color rgb(7, 17, 27)
    .sales
      font-size 0
      line-height 18px
      .star
        margin 0 8px 0 0
        display inline-block
      .ratingCount,.sellCount
        display inline-block
        font-size 10px
        color rgb(77, 85, 93)
        margin-right 12px
        vertical-align top
    .store
      position absolute
      width 50px
      right 0px
      bottom 18px
      text-align center
      .icon-favorite
        color #cccccc
        font-size 24px
        line-height 24px
      .storetext
        font-size 10px
        color rgb(77, 85, 93)
        line-height 10px
        margin-top 4px
  .deliveryDetails
    padding 18px
    border-1px(rgba(7, 17, 27, 0.1))
    display flex
    .content
      flex 1
      text-align center
      border-right 1px solid rgba(7, 17, 27, 0.1)
      &:last-child
        border-right none
      .text
        font-size 10px
        line-height 10px
        color rgb(147, 153, 159)
        margin-bottom 4px
      .info
        font-size 24px
        font-weight 200
        color rgb(7, 17, 27)
        line-height 24px
  .bulletin
    padding 18px 0 16px 0
    margin 0 18px
    border-1px(rgba(7, 17, 27, 0.1))
    .title
      font-size 12px
      color rgb(7, 17, 27)
      margin-bottom 8px
    .text
      padding 0 12px
      font-size 12px
      font-weight normal
      color rgb(240, 20, 20)
      line-height 24px
  .supports
    padding 0 18px
    .support
      padding 16px 12px
      border-1px(rgba(7, 17, 27, 0.1))
      font-size 0
      .icon
        display inline-block
        width 16px
        height 16px
        vertical-align top
        margin-right 6px
        background-size: 16px 16px
        background-repeat: no-repeat
        &.decrease
          bg-image('images/decrease_4')
        &.discount
          bg-image('images/discount_4')
        &.guarantee
          bg-image('images/guarantee_4')
        &.invoice
          bg-image('images/invoice_4')
        &.special
          bg-image('images/special_4')
      .supporttext
        font-size 12px
        line-height 16px
        color rgb(7, 17, 27)
  .sellerpics
    padding 18px 0 18px 18px
    .title
      font-size 12px
      color rgb(7, 17, 27)
      margin-bottom 12px
    .pics
      height 90px
      overflow hidden
      .items
        .item
          float left
          margin-right 6px
          &:last-child
            margin-right 0
  .sellerinfo
    padding 18px 18px 0
    color rgb(7, 17, 27)
    .title
      padding-bottom 12px
      font-weight 200
      border-1px(rgba(7, 17, 27, 0.1))
    .infos
      padding 16px 12px
      border-1px(rgba(7, 17, 27, 0.1))
      font-size 12px
      line-height 16px
      font-weight 200
      color rgb(7, 17, 27)
      &:last-child
        border-none()
</style>
