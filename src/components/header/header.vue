<template>
  <div id="headbar">
    <img :src="seller.avatar" width="64" height="64" class="picture">
    <div class="goods_desc">
      <div class="goods_title">{{seller.name}}</div>
      <div class="delivery_time">{{seller.description}} / {{seller.deliveryTime}}分钟到达</div>
      <div class="promotion_desc">
        <span class="icon_promotion"></span>
        <span class="description"></span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      seller: {
        type: Object
      }
    }
  };
</script>

<style scoped>
  #headbar {
    background-color: #000;
    padding: 24px 12px 18px 24px;
    font-size: 0;
    color: #fff;
  }

  .picture {
    display: inline-block;
    vertical-align: top;
    margin-right: 16px;
    border-radius: 2px;
  }

  .goods_desc {
    display: inline-block;
  }

  .goods_desc .goods_title {
    font-size: 16px;
    font-weight: bold;
    line-height: 18px;
    margin-bottom: 8px;
  }

  .goods_desc .delivery_time {
    font-size: 12px;
  }
</style>
