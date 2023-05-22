<template>
  <div>
  <v-container>
    <v-col>
      <v-row class="card" v-for="printer in printers" :key="printer.id">
        <v-col>
          <v-img style="background: #cbcbdc"
                 :width="200"
                 src="../../../../public/logo.png">
          </v-img>
        </v-col>
        <v-col align-self="center">
          <v-row>
            <v-label text="Company"><br>
              {{ printer.company }}
            </v-label>
          </v-row>
          <v-row>
            <v-label text="Name"><br>
              {{ printer.name }}
            </v-label>
          </v-row>
          <v-row>
            <v-label text="Amount"><br>
              {{ printer.amount }}
            </v-label>
          </v-row>
        </v-col>
        <v-row align="center">
          <v-col>
            <v-btn >
              Update
            </v-btn>
          </v-col>
          <v-col>
            <v-btn v-on:click="deletePrinter(printer.id)">
              Delete
            </v-btn>
          </v-col>
        </v-row>
      </v-row>
    </v-col >
  </v-container>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "CardProduct",
  data(){
    return{
      printers: [],
      search:""
    }
  },
  methods: {
    deletePrinter(id) {
      axios.delete("http://localhost:8080/printers/" + id)
          .then((response) => {
            console.log(response.data)
            this.printers = response.data
            this.getAllPrinters();
          })
          .catch((error) => {
            console.log(error)
          })
    },
    getAllPrinters(){
      axios.get("http://localhost:8080/printers/all")
          .then((response) => {
            console.log(response.data)
            this.printers = response.data
          })
          .catch((error) => {
            console.log(error)
          })
    },
      getByName(name){
        axios.get("http://localhost:8080/printers/search/findAllByName?name=" + name)
        .then((response) => {
            console.log(response.data)
            this.printers = response.data
          })
              .catch((error) => {
                console.log(error)
              })

      },
  },
  mounted() {
    this.getAllPrinters()
  }
}
</script>

<style scoped>
.card {
  margin: 10px;
  background: azure;
  width: 800px;
  left: auto;
  border-radius: 5px;
}
v-label {
  margin: 15px;
  padding: 10px;
  color: black;
}

</style>