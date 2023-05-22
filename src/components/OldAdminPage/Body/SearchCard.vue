<template>
  <div>
    <v-container class="card">
      <v-row>
        <SearchBar/>
      </v-row>
      <v-row align-content="center">
        <v-col align-self="center">
          <v-label >Цены</v-label><br/>
          <input type="number" placeholder="от">
          <input type="number" placeholder="до">
           руб
        </v-col>
        <v-row>
          <v-col cols="2">
            <v-checkbox-btn>
              Elegoo
            </v-checkbox-btn>
          </v-col>
        </v-row>
      </v-row>
      <v-row>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import SearchBar from "@/components/OldAdminPage/Body/SearchBar.vue";

export default {
  name: "SearchCard",
  components: {SearchBar}
}
</script>

<style scoped>
.card {
  background-color: azure;
  border-radius: 10px;
}

div {
  width: 500px;
  margin: 30px;
}
v-row{
  height: 100px;
  text-align: center;
}
</style>