<template>
  <v-responsive
      class="mx-auto"
      max-width="344"
  >
    <v-text-field
        v-model="model"
        clearable
        hide-details="auto"
        label="Last name"
    ></v-text-field>
  </v-responsive>
</template>

<script>
export default {
  name: "SearchBar",


}
</script>

<style scoped>


</style>