<template>
  <div class="ratingcontent border-1px">
      <div class="buttons border-1px">
        <button class="all" :class="{'active':changeSelectType===2}" @click="selectContent(2,$event)">{{desc.all}} {{ratings.length}}</button>
        <button class="positive" :class="{'active':changeSelectType===0}" @click="selectContent(0,$event)">{{desc.positive}} {{positiveArr.length}}</button>
        <button class="negative" :class="{'active':changeSelectType===1}" @click="selectContent(1,$event)">{{desc.negative}} {{negativeArr.length}}</button>
      </div>
      <div class="checkers" :class="{'active':toggleSelectContent}" @click="toggleContent(toggleSelectContent,$event)">
        <i class="icon-check_circle"></i><span class="text">只查看有内容的评价</span>
      </div>
  </div>
</template>

<script type="text/ecmascript-6">
const POSITIVE = 0;
const NEGATIVE = 1;
const ALL = 2;
export default {
    props: {
        ratings: {
            type: Array,
            default() {
                return [];
            }
        },
        selectType: {
            type: Number,
            default: ALL
        },
        flag: {
            type: Boolean,
            default: false
        },
        desc: {
            type: Object,
            default() {
                return {
                    all: '全部',
                    positive: '满意',
                    negative: '不满意'
                };
            }
        }
    },
    computed: {
        changeSelectType() {
            return this.selectType;
        },
        toggleSelectContent() {
            return this.flag;
        },
        positiveArr() {
          return this.ratings.filter((type) => {
            return type.rateType === POSITIVE;
          });
        },
        negativeArr() {
          return this.ratings.filter((type) => {
            return type.rateType === NEGATIVE;
          });
        }
    },
    methods: {
        selectContent(type, event) {
            // if (!event._constructed) {
            //     return;
            // }
            this.$emit('select', type);
        },
        toggleContent(flag, event) {
          // if (!event._constructed) {
          //     return;
          // }
          this.$emit('toggle', !this.toggleSelectContent);
        }
    }
};
</script>

<style scoped lang="stylus">
@import '../../common/stylus/icon';
@import '../../common/stylus/mixin';
.ratingcontent
    border-1px(rgba(7, 17, 27, 0.1))
    .buttons
        margin 0 18px
        padding 12px 0 18px 0;
        border-1px(rgba(7, 17, 27, 0.1))
        font-size 0
        .all, .positive, .negative
            padding 8px 12px
            font-size 12px
            border none
            border-radius 2px
        .all
            background-color rgba(0, 160, 220, 0.2)
            &.active
                background-color rgb(0, 160, 220)
                color #fff
        .positive
            background-color rgba(0, 160, 220, 0.2)
            color rgb(77, 85, 93)
            margin 0 8px
            &.active
                background-color rgb(0, 160, 220)
                color #fff
        .negative
            background-color rgba(77, 85, 93, 0.2)
            &.active
                background-color rgb(77, 85, 93)
    .checkers
        padding 12px 0 12px 18px
        &.active
            .icon-check_circle
                color #00c850
        .icon-check_circle
            color rgb(147, 153, 159)
            font-size 24px
            line-height 24px
            margin-right 4px
            vertical-align middle
        .text
            color rgb(147, 153, 159)
            font-size 12px
            line-height 24px
</style>
