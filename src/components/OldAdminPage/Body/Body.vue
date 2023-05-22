<template>
  <div class="backdround">
    <v-container>
      <ButtonRouter/>
      <v-row align-content="space-between">
        <CardProduct/>
        <v-col align-self="start">
         <SearchCard/>
        </v-col>
        <ButtonOverlay/>
      </v-row>
    </v-container>

  </div>
</template>

<script>



import ButtonOverlay from "@/components/OldAdminPage/Body/ButtonOverlay.vue";
import CardProduct from "@/components/OldAdminPage/Body/CardProduct.vue";
import SearchCard from "@/components/OldAdminPage/Body/SearchCard.vue";
import ButtonRouter from "@/components/OldAdminPage/Body/ButtonRouter.vue";



export default {
  name: "BodyForm",
  components: {ButtonRouter, SearchCard,  CardProduct, ButtonOverlay,},

}
</script>

<style scoped>
.backdround {
  width: auto;
  height: 100%;
  background: #8e8e96;
}

</style>