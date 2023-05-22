<template>
  <v-app-bar>
    <v-app-bar-title>
      <v-btn to="/admin/test/create" class="btn btn-primary float-end" color="primary"
             dark>
        Add printer
      </v-btn>
    </v-app-bar-title>
  </v-app-bar>

</template>

<script>


export default {
  name: "HeaderBar",
  components: {

  },

}
</script>

<style scoped>
v-app-bar {
  width: 100%;
  height: 100px;
  background: #cbcbdc;
}


</style>