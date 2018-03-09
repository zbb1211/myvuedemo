<template>
    <div id="headbar">
        <div class="picture">
            <img :src="seller.avatar" width="64" height="64">
        </div>
        <div class="goods_desc">
            <div class="goods_title">{{seller.name}}</div>
            <div class="delivery_time">{{seller.description}} / {{seller.deliveryTime}}</div>
            <div class="promotion_desc"></div></div>
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

</style>
