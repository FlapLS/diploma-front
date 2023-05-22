<template>
  <v-overlay
      v-model="overlay"
      contained
      class="align-center justify-center">
    <v-card class="overlay" style="background-color: burlywood">
      <label for="Name" class="ml-10">Name</label>
      <input type="text" name="Name" v-model="shops.name" placeholder="name" class="ml-5"><br/>
      <label for="company" class="ml-10">Price</label>
      <input type="number" name="company" v-model="shops.price" placeholder="company" class="ml-6"><br/>
      <label for="amount" class="ml-10">Url</label>
      <input type="text" name="amount" v-model="shops.url" placeholder="url" class="ml-10"><br/>
      <div style="margin: auto">
        <v-btn type="text" v-on:click="addShop" color="success" style="margin-left: 150px">
          Save
        </v-btn>
      </div>
    </v-card>
  </v-overlay>
</template>

<script>
export default {
  name: "EqulasComponent"
}
</script>

<style scoped>

</style>