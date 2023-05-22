<template>
  <v-app-bar>
    <v-app-bar-title>
      <h3 class="text-h4 white--text">Admin Panel</h3>
    </v-app-bar-title>
  </v-app-bar>


</template>

<script>







export default {
  name: "HeaderBar",
  components: {

  },
  data: () => ({
    overlay: false,
  }),

}
</script>

<style scoped>
v-app-bar {
  width: 100%;
  height: 100px;
  background: #cbcbdc;
}


</style>