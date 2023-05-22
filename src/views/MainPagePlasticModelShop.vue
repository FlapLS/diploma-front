<template>
  <HeaderBar/>
  <BodyPlasticModels/>
</template>

<script>



import HeaderBar from "@/components/PlaticModelShopPage/Header/Header.vue";
import BodyPlasticModels from "@/components/PlaticModelShopPage/Body/Body.vue";

export default {
  name: "MainPagePlasticModelShop",
  components: {BodyPlasticModels, HeaderBar},


}
</script>

<style scoped>

</style>