<template>
<div>
  <div id="shopcart">
      <div class="leftWrapper" @click="toggleList">
        <div class="icon" :class="{'highlight':totalCount > 0}">
          <i class="icon-shopping_cart" :class="{'highlight':totalCount > 0}"></i>
          <span class="count" v-show="totalCount > 0">{{totalCount}}</span>
        </div>
      </div>
      <div class="centerWrapper">
        <div class="left">¥{{totalPrice}}</div>
        <div class="right">另需配送费¥{{deliveryPrice}}元</div>
      </div>
      <div class="rightWrapper" :class="payClass">{{payDesc}}</div>
  </div>
  <div class="ballContainer">
    <div v-for="(ball, index) in balls" :key="index">
      <transition name="drop" @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
        <div class="ball" v-show="ball.show">
          <div class="inner inner-hook"></div>
        </div>
      </transition>
    </div>
  </div>
  <transition name="fold">
    <div class="foodsLists">
      <div class="title border-1px">
        <span class="left">购物车</span><span class="right" @click="empty">清空</span>
      </div>
      <div class="content" ref="listContent">
        <div class="detail" v-for="(item, index) in selectFoods" :key="index">
          <div class="left">
            <span class="name">{{item.name}}</span>
            <span class="price">{{item.price * item.count}}</span>
          </div>
          <div class="right">
            <cartcontrol :foods = "item" @add="addFood"></cartcontrol>
          </div>
        </div>
      </div>
    </div>
  </transition>
</div>
</template>

<script>
/* eslint-disable */
import cartcontrol from '../cartcontrol/cartcontrol';
import BScroll from 'better-scroll';
export default {
  props: {
    deliveryPrice: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 0
    },
    selectFoods: {
      type: Array,
      default() {
        return [
        ];
      }
    }
  },
  data() {
    return {
      balls: [
        {show: false},
        {show: false}
      ],
      dropBalls: [],
      fold: true
    };
  },
  computed: {
    totalPrice() {
      let total = 0;
      this.selectFoods.forEach((food) => {
        total += food.price * food.count;
      });
      return total;
    },
    totalCount() {
      let count = 0;
      this.selectFoods.forEach((food) => {
        count += food.count;
      });
      return count;
    },
    payDesc() {
      if (this.totalPrice === 0) {
        return `￥${this.minPrice}元起送`;
      } else if (this.totalPrice < this.minPrice) {
        return `还差￥${this.minPrice - this.totalPrice}元起送`;
      } else {
        return '去结算';
      }
    },
    payClass() {
      if (this.totalPrice < this.minPrice) {
        return 'not-enough';
      }
      return 'enough';
    },
    listShow() {
      if (!this.totalCount) {
        this.fold = true;
        return false;
      };
      let show = !this.fold;
      if (show) {
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.listContent, {
              click: true
            });
          } else {
            this.scroll.refresh();
          }
        });
      }
      return show;
    }
  },
  methods: {
    drop(target) {
      for (let i = 0; i < this.balls.length; i++) {
        let ball = this.balls[i];
        if (!ball.show) {
          ball.show = true;
          ball.el = target;
          this.dropBalls.push(ball);
          return;
        }
      }
    },
    beforeDrop(el) {
      let count = this.balls.length;
      while (count--) {
        let ball = this.balls[count];
        if (ball.show) {
          let rect = ball.el.getBoundingClientRect();
          let x = rect.left - 32;
          let y = -(window.innerHeight - rect.top - 22);
          el.style.display = '';
          el.style.webkitTransform = `translate3d(0,${y}px,0)`;
          el.style.transform = `translate3d(0,${y}px,0)`;
          let inner = el.getElementsByClassName('inner-hook')[0];
          inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
          inner.style.transform = `translate3d(${x}px,0,0)`;
        }
      }
    },
    dropping(el, done) {
      /* eslint-disable no-unused-vars */
      let rf = el.offsetHeight;
      this.$nextTick(() => {
        el.style.webkitTransform = 'translate3d(0,0,0)';
        el.style.transform = 'translate3d(0,0,0)';
        let inner = el.getElementsByClassName('inner-hook')[0];
        inner.style.webkitTransform = 'translate3d(0,0,0)';
        inner.style.transform = 'translate3d(0,0,0)';
        el.addEventListener('transitionend', done);
      });
    },
    afterDrop(el) {
      let ball = this.dropBalls.shift();
      if (ball) {
        ball.show = false;
        el.style.display = 'none';
      }
    },
    addFood(el) {
      this.drop(el);
    },
    toggleList() {
      this.fold = !this.fold;
    },
    hideList() {
      this.fold = true;
    },
    empty() {
      this.selectFoods.forEach((food) => {
        food.count = 0;
      });
    }
  },
  components: {
    'cartcontrol': cartcontrol
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/icon.styl';
@import '../../common/stylus/mixin.styl';
#shopcart
    position fixed
    bottom 0
    width 100%
    height 46px
    background-color #141d27
    display flex
    z-index 111
    .leftWrapper
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
        position relative
        &.highlight
          background-color rgb(0, 160, 220)
        .icon-shopping_cart
          font-size 24px
          color rgba(255, 255, 255, 0.4)
          line-height 24px
          &.highlight
            color #fff
        .count
          position absolute
          top -5px
          left 30px
          width 24px
          height 16px
          line-height 16px
          font-size 9px
          border-radius 6px
          background-color rgb(240, 20, 20)
          box-shadow 0 2px 4px 0 rgba(0, 0, 0, .4)
          color #fff

    .rightWrapper
      width 105px
      height 100%
      background-color rgb(43, 51, 59)
      color rgb(255, 255, 255, 0.4)
      font-size 12px
      line-height 46px
      font-weight 700
      text-align center
      &.not-enough
        background: #2b333b
      &.enough
        background: #00b43c
        color: #fff
    .centerWrapper
      flex 1
      display flex
      .left
        margin 12px 12px 12px 0
        color rgb(255, 255, 255, 0.4)
        font-weight 700
        line-height 24px
      .right
        border-left 1px solid rgb(43, 51, 59)
        font-size 16px
        line-height 24px
        margin-top 12px
        margin-bottom 12px
        font-weight 700
        padding-left 12px
        color rgba(255, 255, 255, 0.4)
.ballContainer
  .ball
    position fixed
    left 38px
    bottom 21px
    z-index 200
    transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
    .inner
      width 16px
      height 16px
      border-radius 50%
      background-color rgb(0, 160, 240)
      transition all 0.4s linear
.foodsLists
  position fixed
  bottom 46px
  width 100%
  max-height 259px
  .title
    height 40px
    background-color #f3f5f7
    line-height 40px
    padding 0 18px
    border-1px(rgba(7, 17, 27, 0.1))
    font-size 0
    .left
      display inline-block
      width 50%
      text-align left
      color rgb(7, 17, 27)
      font-weight 200
      font-size 14px
    .right
      display inline-block
      width 50%
      text-align right
      font-size 12px
      color rgb(0, 160, 220)
  .content
    background-color #fff
    padding 0 18px
    .detail
      height 48px
      padding 12px 0
      border-1px(rgba(7, 17, 27, 0.1))
      font-size 0
      position relative
      display flex
      .left
        font-size 0
        flex 1
        display flex
        align-items center
        .name
          display inline-block
          width 50%
          text-align left
          font-size 14px
          color rgb(7, 17, 27)
        .price
          display inline-block
          width 50%
          box-sizing border-box
          padding 0 6px 0 18px
          text-align right
          font-size 12px
          color rgb(240, 20, 20)
          font-weight 700
      .right
        width 84px
        .cartControl
          height 42px
</style>
