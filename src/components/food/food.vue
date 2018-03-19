<template>
<transition name="move">
  <div class="foodPage" v-show="showFlag" >
      <div class="contentWrapper">
          <div class="img">
            <div class="back">
                <i class="icon-arrow_lift" @click="hide"></i>
            </div>
            <img :src="selectedFood.image">
          </div>
           <div class="detail_info">
                <h4 class="foods_name">{{selectedFood.name}}</h4>
                <p class="sells">
                  <span class="count">月售{{selectedFood.sellCount}}份</span><span class="rating">好评率{{selectedFood.rating}}%</span>
                </p>
                <p class="price">
                  <span class="new">￥{{selectedFood.price}}</span><span class="old" v-show="selectedFood.oldPrice">￥{{selectedFood.oldPrice}}</span>
                </p>
            </div>
            <div class="cartcontrolWrapper">
                <cartcontrol :foods = "selectedFood" @add="addFood"></cartcontrol>
            </div>
      </div>
  </div>
</transition>
</template>

<script type="text/ecmascript-6">
import cartcontrol from '../cartcontrol/cartcontrol';
export default {
    props: {
        selectedFood: {
            type: Object
        }
    },
    data() {
        return {
            showFlag: false
        };
    },
    methods: {
        show() {
            this.showFlag = true;
        },
        hide() {
            this.showFlag = false;
        },
        addFood(el) {
            console.log('add');
        }
    },
    components: {
        cartcontrol
    }
};
</script>

<style scoped lang="stylus">
@import '../../common/stylus/icon';
.foodPage
    position fixed
    left 0
    top 0
    bottom 46px
    width 100%
    background-color #fff
    transform translate3d(0, 0, 0)
    &.move-enter-active, &.move-leave-active
      transition: all 0.2s linear
    &.move-enter, &.move-leave-active
      transform: translate3d(100%, 0, 0)
    .img
        position relative
        width 100%
        left 0
        top 0
        height 0
        padding-top 100%
        .back
            padding 6px;
            position absolute
            left 0
            top 0
            z-index 11
            .icon-arrow_lift
                font-size 24px
                color #fff
        img
            position absolute
            top 0
            left 0
            width 100%
    .detail_info
        .foods_name
          font-size: 14px;
          line-height: 14px;
          color: rgb(7, 17, 27);
          margin-bottom: 8px;
        .description, .sells
          font-size: 10px;
          color: rgb(147, 153, 159);
          line-height: 10px;
          margin-bottom: 8px;
        .count
          margin-right: 12px;
        .price
          font-size: 10px;
          color: rgb(147, 153, 159);
          line-height: 24px;
          font-weight: 700;
          .new
            color: rgb(240, 20, 20);
            margin-right: 8px;
          .old
            text-decoration: line-through;
    .cartcontrolWrapper
        position absolute
</style>
