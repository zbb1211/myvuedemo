<template>
    <div>
    <div class="back" v-show="showFlag" >
        <i class="icon-arrow_lift" @click="hide"></i>
    </div>
<transition name="move">
  <div class="foodPage" v-show="showFlag" ref="food">
      <div class="contentWrapper">
          <div class="img">
            <img :src="selectedFood.image">
          </div>
           <div class="detail_info border-1px">
                <h4 class="foods_name">{{selectedFood.name}}</h4>
                <p class="sells">
                  <span class="count">月售{{selectedFood.sellCount}}份</span><span class="rating">好评率{{selectedFood.rating}}%</span>
                </p>
                <p class="price">
                  <span class="new">￥{{selectedFood.price}}</span><span class="old" v-show="selectedFood.oldPrice">￥{{selectedFood.oldPrice}}</span>
                </p>
                <cartcontrol :foods = "selectedFood" @add="addFood"></cartcontrol>
                <transition name="fade">
                    <div @click.stop.prevent="addFirst($event)" class="add-to-cart" v-show="!selectedFood.count || selectedFood.count===0" >加入购物车</div>
                </transition>
            </div>
            <split></split>
            <div class="content border-1px">
                <h3 class="title">商品介绍</h3>
                <div class="info">{{selectedFood.info}}</div>
            </div>
            <split></split>
            <div class="ratings">
                <h3 class="title">商品评价</h3>
                <ratingcontent :ratings="selectedFood.ratings" :flag="flag" :desc="desc" :select-type="selectType" @select="selectContent" @toggle="toggleSelect"></ratingcontent>
            </div>
      </div>
  </div>
</transition>
  </div>
</template>

<script type="text/ecmascript-6">
import cartcontrol from '../cartcontrol/cartcontrol';
import Vue from 'vue';
import Bscroll from 'better-scroll';
import split from '../split/split';
import ratingcontent from '../ratingcontent/ratingcontent';
const ERR_OK = 0;
const ALL = 2;
export default {
    props: {
        selectedFood: {
            type: Object
        }
    },
    data() {
        return {
            showFlag: false,
            ratings: [],
            desc: {
                all: '全部',
                positive: '推荐',
                negative: '吐槽'
            },
            selectType: ALL,
            flag: true
        };
    },
    created() {
        this.$http
            .get('/api/goods')
            .then(res => {
                let ratingData = res.data;
                if (ratingData.errno === ERR_OK) {
                    this.ratings = ratingData.data;
                }
            })
            .catch(error => {
                console.log(error);
            });
    },
    methods: {
        show() {
            this.showFlag = true;
            this.$nextTick(() => {
                this.scroll = new Bscroll(this.$refs.food, {
                    click: true
                });
            });
        },
        hide() {
            this.showFlag = false;
        },
        addFood(el) {
          this.$emit('add', el);
        },
        addFirst(event) {
          if (!event._constructed) {
            return;
          }
          this.$emit('add', event.target);
          Vue.set(this.selectedFood, 'count', 1);
        },
        selectContent(type) {
            // console.log(this.selectType);
            this.selectType = type;
            this.$nextTick(() => {
                this.scroll.refresh();
            });
        },
        toggleSelect(checkflag) {
          this.flag = checkflag;
        }
    },
    components: {
        cartcontrol,
        split,
        ratingcontent
    }
};
</script>

<style scoped lang="stylus">
@import '../../common/stylus/icon';
@import '../../common/stylus/mixin';
.back
    padding 6px
    position fixed
    left 0
    top 0
    z-index 11
    .icon-arrow_lift
        font-size 24px
        color #fff
.foodPage
    position fixed
    left 0
    top 0
    bottom 46px
    width 100%
    background-color #fff
    transform translate3d(0, 0, 0)
    &.move-enter-active, &.move-leave-active
      transition all 0.2s linear
    &.move-enter, &.move-leave-active
      transform translate3d(100%, 0, 0)
    .img
        position relative
        width 100%
        left 0
        top 0
        height 0
        padding-top 100%
        img
            position absolute
            top 0
            left 0
            width 100%
            height 100%
    .detail_info
        position relative
        padding 18px
        border-1px(rgba(7, 17, 27, 0.1))
        .foods_name
          font-size 14px
          line-height 14px
          color rgb(7, 17, 27)
          margin-bottom 8px;
        .description, .sells
          font-size 10px
          color rgb(147, 153, 159)
          line-height 10px
          margin-bottom 18px
        .count
          margin-right 12px
        .price
          font-size 10px
          color rgb(147, 153, 159)
          line-height 24px
          font-weight 700
          .new
            color rgb(240, 20, 20)
            margin-right 8px
          .old
            color rgb(143, 153, 159)
            text-decoration line-through
    .cartControl
      position absolute
      right 18px
      bottom 18px
    .add-to-cart
      position absolute
      right 18px
      bottom 25px
      height 11px
      border-radius 12px
      background-color rgb(0, 160, 220)
      color #fff
      padding 7px 12px 4px
      text-align center
      font-size 10px
      display table-cell
      vertical-align middle
      opacity 1
      &.fade-enter-active, &.fade-leave-active
          transition all 0.2s linear
      &.fade-enter, .&.fade-leave-active
          opacity 0
          z-index -1
.content
    padding 18px
    border-1px(rgba(7, 17, 27, 0.1))
    .title
        font-size 14px
        color rgb(7, 17, 27)
        margin-bottom 6px
    .info
        padding 0 8px
        font-size 12px
        line-height 24px
        font-weight 200
        color rgb(77, 85, 93)
.ratings
    padding-top 18px
    .title
        padding-left 18px
        font-size 14px
        color rgb(7, 17, 27)
        margin-bottom 6px
</style>
