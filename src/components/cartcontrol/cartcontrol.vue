<template>
    <div class="cartControl">
    <transition name="move">
      <div class="cart-decrease" @click.stop.prevent="decreaseQuantity" v-show="foods.count > 0">
        <span class="inner icon-remove_circle_outline"></span>
      </div>
    </transition>
    <div class="cart-count" v-show="foods.count > 0">{{foods.count}}</div>
    <div class="cart-add icon-add_circle" @click.stop.prevent="addQuantity"></div>
  </div>
</template>

<script>
import Vue from 'vue';
export default {
    props: {
        foods: {
            type: Object
        }
    },
    methods: {
        addQuantity(e) {
            if (!event._constructed) {
                return;
            };
            if (!this.foods.count) {
                Vue.set(this.foods, 'count', 1);
            } else {
                this.foods.count++;
            }
            this.$emit('add', e.target);
        },
        decreaseQuantity(e) {
            if (!event._constructed) {
                return;
            };
             if (this.foods.count) {
                this.foods.count--;
            }
        }
    }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/icon';
.cartControl
    font-szie 0
    position absolute
    right 0
    bottom 12px
    .cart-decrease
        display inline-block
        padding 6px
        height 24px
        opacity: 1
        transform: translate3d(0, 0, 0)
        .inner
            display inline-block
            line-height 24px
            font-size 24px
            color rgb(0, 160, 220)
            transition all 0.4s linear
            transform rotate(0)
        &.move-enter-active, &.move-leave-active
            transition all 0.4s linear
        &.move-enter, &.move-leave-active
            opacity 0
            transform translate3d(24px, 0, 0)
            .inner
               transform rotate(180deg)
    .cart-count
        display inline-block
        vertical-align top
        width 12px
        text-align center
        font-size 10px
        line-height 24px
        padding-top 6px
        color rgb(147, 153, 159)
    .cart-add
        display inline-block
        padding 6px
        font-size 24px
        color rgb(0, 160, 220)
</style>
