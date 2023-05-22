<template>
  <HeaderBar/>
  <BodyForm/>
</template>

<script>
import HeaderBar from "@/components/PrinterShopPage/Header/Header.vue";
import BodyForm from "@/components/PrinterShopPage/Body/Body.vue";

export default {
  name: "MainPagePrinterShop",
  components: {BodyForm, HeaderBar}
}
</script>

<style scoped>

</style>