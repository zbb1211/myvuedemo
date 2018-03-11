<template>
  <div class="star" :class="startType">
      <span v-for="(itemClass,index) in itemClasses" :class="itemClass" :key="index" class="star-item"></span>
  </div>
</template>

<script>
const LENGTH = 5;
const clsOn = 'on';
const clsOff = 'off';
const clsHalf = 'half';
export default {
  props: {
    size: {
      type: Number
    },
    score: {
      type: Number
    }
  },
  computed: {
    startType() {
      return 'star-' + this.size;
    },
    itemClasses() {
      let result = [];
      let score = Math.floor(this.score * 2) / 2;
      let hasDecimal = score % 1 !== 0;
      let intNum = Math.floor(score);
      for (let index = 0; index < intNum; index++) {
        result.push(clsOn);
      };
      if (hasDecimal) {
        result.push(clsHalf);
      };
      while (result.length < LENGTH) {
        result.push(clsOff);
      };
      return result;
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixin.styl'
  .star
    font-size: 0
    text-align center
    margin 16px 0 28px 0
    .star-item
      display: inline-block
      background-repeat: no-repeat
    &.star-48
      .star-item
        width: 20px
        height: 20px
        margin-right: 22px
        background-size: 20px 20px
        &:last-child
          margin-right: 0
        &.on
          bg-image('./images/star48_on')
        &.half
          bg-image('./images/star48_half')
        &.off
          bg-image('./images/star48_off')
    &.star-36
      .star-item
        width: 15px
        height: 15px
        margin-right: 6px
        background-size: 15px 15px
        &:last-child
          margin-right: 0
        &.on
          bg-image('./images/star36_on')
        &.half
          bg-image('./images/star36_half')
        &.off
          bg-image('./images/star36_off')
    &.star-24
      .star-item
        width: 10px
        height: 10px
        margin-right: 3px
        background-size: 10px 10px
        &:last-child
          margin-right: 0
        &.on
          bg-image('./images/star24_on')
        &.half
          bg-image('./images/star24_half')
        &.off
          bg-image('./images/star24_off')
</style>
