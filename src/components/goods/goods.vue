<template>
    <div id="goods">
      <div ref="menuWrapper">
        <div class="menutabs" ref="menutabWrapper">
        <ul>
          <li v-for="(good, index) in goods" :key="index" class="classify" :class="{'current': currentIndex === index}" ref="menuList">
            {{good.name}}
          </li>
        </ul>
      </div>
      </div>
      <div class="foods" ref="goodsWrapper">
        <div>
        <div class="foods_wrapper" v-for="(good, index) in goods" :key="index" ref="foodsList">
          <h3 class="title">{{good.name}}</h3>
          <div class="detail border-1px" v-for="(food, i) in good.foods" :key="i">
            <div class="picture">
              <img :src="food.image" width="57" height="57">
            </div>
            <div class="detail_info">
              <h4 class="foods_name">{{food.name}}</h4>
              <p class="description">{{food.description}}</p>
              <p class="sells">
                <span class="count">月售{{food.sellCount}}份</span>
                <span class="rating">好评率{{food.rating}}%</span>
              </p>
              <p class="price">
                <span class="new">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
              </p>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
</template>

<script>
import BScroll from 'better-scroll';
const ERR_OK = 0;
export default {
  data() {
    return {
      goods: [],
      classMap: [],
      menuScroll: null,
      goodsScroll: null,
      scrollY: 0,
      heightArr: []
    };
  },
  computed: {
    currentIndex() {
      for (let i = 0; i < this.heightArr.length; i++) {
        let h1 = this.heightArr[i];
        let h2 = this.heightArr[i + 1];
        if (!h2 || (this.scrollY >= h1 && this.scrollY < h2)) {
          this._scrollTo(i);
          return i;
        };
      };
      return 0;
    }
  },
  created() {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    this.$http
      .get('/api/goods')
      .then(res => {
        let goodsdata = res.data;
        if (goodsdata.errno === ERR_OK) {
          this.goods = Object.assign({}, this.goodsdata, goodsdata.data);
          this.$nextTick(() => {
            this._initScroll();
            //this._calculateHeight();
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    _initScroll() {
      this.menuScroll = new BScroll(this.$refs.menuWrapper, {
        click: true
      });
      this.goodsScroll = new BScroll(this.$refs.goodsWrapper, {
        click: true,
        probeType: 3
      });
      this.goodsScroll.on('scroll', pos => {
        this.scrollY = Math.abs(Math.round(pos.y));
      });
    },
    _calculateHeight() {
      let height = 0;
      let foodsList = this.$refs.foodsList;
      this.heightArr.push(height);
      for (let i = 0; i < foodsList.length; i++) {
        height += foodsList[i].clientHeight;
        this.heightArr.push(height);
      };
    },
    _scrollTo(index) {
      let el = this.$refs.menuList[index];
      this.menuScroll.scrollToElement(el, 300, 0, -100);
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixin';

#goods {
  position: absolute;
  width: 100%;
  display: flex;
  top: 174px;
  bottom: 46px;
  overflow: hidden;

  .menutabs {
    width: 80px;
    background-color: #f3f5f7;

    .classify {
      width: 56px;
      height: 54px;
      padding: 0 12px;
      display: flex;
      align-items: center;
      font-size: 12px;
      line-height: 14px;
      color: rgb(75, 85, 93);
    }
  }

  .foods {
    flex: 1;

    .title {
      height: 26px;
      line-height: 26px;
      border-left: 2px solid #d9dde1;
      background-color: #f3f5f7;
      padding-left: 13px;
      font-size: 12px;
      color: rgb(147, 153, 159);
    }

    .detail {
      padding: 18px;
      display: flex;
      border-bottom: 1px solid rgba(7, 17, 27, 0.1);

      .picture {
        margin-right: 10px;

        img {
          border-radius: 2px;
        }
      }

      .detail_info {
        flex: 1;

        .foods_name {
          font-size: 14px;
          line-height: 14px;
          color: rgb(7, 17, 27);
          margin-bottom: 8px;
        }

        .description, .sells {
          font-size: 10px;
          color: rgb(147, 153, 159);
          line-height: 10px;
          margin-bottom: 8px;
        }

        .count {
          margin-right: 12px;
        }

        .price {
          font-size: 10px;
          color: rgb(147, 153, 159);
          line-height: 24px;
          font-weight: 700;

          .new {
            color: rgb(240, 20, 20);
            margin-right: 8px;
          }

          .old {
            text-decoration: line-through;
          }
        }
      }
    }
  }
}
</style>
