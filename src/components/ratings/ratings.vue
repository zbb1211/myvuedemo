<template>
<div ref="ratings">
<div id="ratings">
  <div class="services">
    <div class="services_left">
      <div class="score">3.9</div>
      <div class="scoretext">综合评分</div>
      <div class="higher">高于周边商家69.2%</div>
    </div>
    <div class="services_right">
      <div class="attitude">
        <span class="text">服务态度</span>
        <star :size="36" :score="seller.serviceScore"></star>
        <span class="core">{{seller.serviceScore}}</span>
      </div>
      <div class="attitude">
        <span class="text">商品评分</span>
        <star :size="36" :score="seller.foodScore"></star>
        <span class="core">{{seller.foodScore}}</span>
      </div>
      <div class="attitude delivery">
        <span class="text">送达时间</span>
        <span class="deliveryTime">{{seller.deliveryTime}}分钟</span>
      </div>
    </div>
  </div>
  <split></split>
  <ratingcontent :ratings="ratings" :flag="flag"></ratingcontent>
  <div class="ratingInfo">
    <div v-for="(item,index) in ratings" :key="index" class="infowrapper border-1px">
      <div class="picture">
        <img :src="item.avatar" width="28">
      </div>
      <div class="info">
        <div class="titletext">
          <span class="username">{{item.username}}</span>
          <span class="rateTime">{{item.rateTime}}</span>
        </div>
        <div class="deliverytext">
          <star :size="24" :score="ratings.score"></star>
          <span class="deliverytime">{{item.deliveryTime}}分钟送达</span>
        </div>
        <div class="infotext">{{item.text}}</div>
        <div class="recommends">
          <i class="icon-thumb_up"></i>
          <span class="recomenttext" v-for="(text,index) in item.recommend" :key="index" >{{text}}</span>
        </div>
      </div>
    </div>
  </div>
</div>
</div>
</template>

<script>
import star from '../star/star';
import split from '../split/split';
import ratingcontent from '../ratingcontent/ratingcontent';
import Bscroll from 'better-scroll';
const ERR_OK = 0;
export default {
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      flag: false,
      ratings: []
    };
  },
  created() {
    this.$http
        .get('/api/ratings')
        .then(res => {
            let ratingData = res.data;
            if (ratingData.errno === ERR_OK) {
                this.ratings = ratingData.data;
            }
        })
        .catch(error => {
            console.log(error);
        });
    this.$nextTick(() => {
       this.scroll = new Bscroll(this.$refs.ratings, {
            click: true
        });
    });
  },
  components: {
    star,
    split,
    ratingcontent
  }
};
</script>

<style scoped lang="stylus">
@import '../../common/stylus/icon';
@import '../../common/stylus/mixin';
#ratings
  .services
    display flex
    padding 18px 24px 18px 0
    .services_left
      width 137px
      text-align center
      padding 6px 0
      border-right 1px solid rgba(7, 17, 27, 0.1)
      .score
        font-size 24px
        color rgb(255, 153, 0)
        line-height 28px
        margin-bottom 6px
      .scoretext
        font-size 12px
        color rgb(7, 17, 27)
        line-height 12px
        margin-bottom 8px
      .higher
        font-size 10px
        color rgb(147, 153, 159)
        line-height 10px
    .services_right
      flex 1
      padding-left 24px
      font-size 0
      .attitude
        margin-bottom 8px
        .text
          display inline-block
          font-size 12px
          color rgb(7, 17, 27)
          line-height 18px
          vertical-align top
        .core
          display inline-block
          font-size 12px
          color rgb(255, 153, 0)
          line-height 18px
          vertical-align top
      .star
        display inline-block
        margin 0 12px
      .delivery
        margin-bottom 0
        .deliveryTime
          font-size 12px
          color rgb(143, 157, 159)
          line-height 18px
          margin-left 12px
  .ratingInfo
    padding 0 18px
    .infowrapper
      padding 18px 0
      border-1px(rgba(7, 17, 27, 0.1))
      display flex
      .picture
        margin-right 12px
        img
          border-radius 50%
      .info
        flex 1
        .titletext
          display flex
          font-size 0
          .username
            flex 1
            font-size 10px
            line-height 12px
            color rgb(7, 17, 27)
          .rateTime
            flex 1
            text-align right
            font-size 10px
            line-height 12px
            font-weight 200
            color rgb(147, 153, 159)
            margin-bottom 4px
        .deliverytext
          font-size 0
          margin-bottom 6px
          .star
            margin 0
            text-align left
            display inline-block
            margin-right 6px
          .deliverytime
            font-size 10px
            font-weight 200
            color rgb(147, 153, 159)
            line-height 12px
        .infotext
          font-size 12px
          line-height 18px
          color rgb(7, 17, 27)
        .recommends
          font-size 0
          .icon-thumb_up
            color rgb(0, 160, 220)
            font-size 24px
            line-height 16px
          .recomenttext
            display inline-block
            margin 8px 8px 0 8px
            padding 0 6px
            border 1px solid rgba(7, 17, 27, 0.1)
            border-radius 2px
            font-size 9px
            line-height 16px
            color rgb(147, 153, 159)
</style>
