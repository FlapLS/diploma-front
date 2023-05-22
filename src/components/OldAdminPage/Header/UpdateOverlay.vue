<template>
  <v-card style="background-color: burlywood">
    <label for="Name">{{formData.name}}}</label>
    <input type="text" name="Name" v-model="formData.name" placeholder="name">
    <label for="company">{{formData.company}}</label>
    <input type="text" name="company" v-model="formData.company" placeholder="company"><br/>
    <label for="amount">{{formData.amount}}</label>
    <input type="number" name="amount" v-model="formData.amount" placeholder="amount"><br/>
    <button class="submit" v-on:click="addPrinter">Add a new printer</button>
  </v-card>
</template>

<script>
import axios from "axios";


export default {
  name: "UpdateOverlay",
  data() {
    return {
      formData: {
        name: "",
        company: "",
        amount: ""
      }
    }
  },
  methods:{
    getPrinter(id){
      axios.get("http://localhost:8080/printers/" + id)
          .then((response) => {
            console.log(response.data)
            this.printers = response.data
          })
          .catch((error) => {
            console.log(error)
          })
    },
  },
  beforeMount() {
      this.getPrinter();
    },
  beforeUpdate() {
    this.getPrinter();
  }
}
</script>

<style scoped>

</style>