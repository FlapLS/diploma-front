<template>
  <v-app-bar>
    <v-app-bar-title>
      <h3 class="text-h4 white--text">Admin Panel</h3>
    </v-app-bar-title>
  </v-app-bar>
  <div style="background-color: #E0E0E0; height: 100%">
    <div class="input-container">
      <input type="text" placeholder="Type a name" v-model="searchQuery"/>
      <v-btn to="/admin/plastic-models/create" class="btn btn-primary float-end ma-2" color="success"
             dark>
        Add plastic model
      </v-btn>
      <v-btn to="/admin/printers/create" class="btn btn-primary float-end ma-2" color="success"
             dark>
        Add printer
      </v-btn>
      <v-btn to="/" class="btn btn-primary float-end ma-2" color="primary"
             dark>
        GO Shop
      </v-btn>
    </div>
    <v-table theme="dark">
      <thead>
      <tr>
        <th>Type</th>
        <th>ID</th>
        <th>Company</th>
        <th>Name</th>
        <th>Type</th>
        <th>Creating Date</th>
        <th>Amount</th>
        <th>Card</th>
        <th>Update</th>
        <th>Delete</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="printer in filteredPrinters" :key="printer.id">
        <td>{{ TypePrinter }}</td>
        <td>{{ printer.id }}</td>
        <td>{{ printer.company }}</td>
        <td>{{ printer.name }}</td>
        <td>{{ printer.type }}</td>
        <th>{{printer.creationDate}}</th>
        <td>{{ printer.amount }}</td>
        <td>
          <v-btn :to="`/admin/printers/${printer.id}/card`" class="btn btn-primary float-start" color="info"
          >
            Open Card
          </v-btn>
        </td>
        <td>
          <v-btn :to="`/admin/printers/${printer.id}/edit`" class="btn btn-primary float-start" color="warning"
                 dark>
            Update
          </v-btn>
        </td>
        <td>
          <v-btn v-on:click="deletePrinter(printer.id)" class="btn btn-primary float-start" color="error"
                 dark>
            Delete
          </v-btn>
        </td>
      </tr>
      <tr v-for="models in models" :key="models.id">
        <td>{{ TypePlasticModels }}</td>
        <td>{{ models.id }}</td>
        <td>{{ models.company }}</td>
        <td>{{ models.name }}</td>
        <td>{{ models.type }}</td>
        <th>{{models.creationDate}}</th>
        <td>{{ models.amount }}</td>
        <td>
          <v-btn :to="`/admin/plastic-models/${models.id}/card`" class="btn btn-primary float-start" color="info"
          >
            Open Card
          </v-btn>
        </td>
        <td>
          <v-btn :to="`/admin/plastic-models/${models.id}/edit`" class="btn btn-primary float-start" color="warning"
                 dark>
            Update
          </v-btn>
        </td>
        <td>
          <v-btn v-on:click="deletePlasticModel(models.id)" class="btn btn-primary float-start" color="error"
                 dark>
            Delete
          </v-btn>
        </td>
      </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script>


import axios from "axios";


export default {
  name: "BodyAdmin",
  components: {},
  data() {
    return {
      printers: [],
      models: [],
      TypePrinter: "3D-Printer",
      TypePlasticModels: "PlasticModel",
      searchQuery: ""
    }
  },
  computed: {
    filteredPrinters() {
      if (!this.searchQuery) {
        return this.printers;
      }
      const lowercaseQuery = this.searchQuery.toLowerCase();
      return this.printers.filter((printer) => {
        const nameMatch = printer.name.toLowerCase().includes(lowercaseQuery);
        const companyMatch = printer.company.toLowerCase().includes(lowercaseQuery);

        return nameMatch || companyMatch;
      });
    },
  },
  mounted() {
    this.getAllPrinters()
    this.getAllModels()
  },
  methods: {
    getAllPrinters() {
      let strUrl = "http://localhost:8080/printers/all"
      axios.get(strUrl)
          .then((response) => {
            console.log(response.data)
            this.printers = response.data
          })
          .catch((error) => {
            console.log(error)
          })
    },
    getAllModels() {
      let strUrl = "http://localhost:8090/plastic-models/all"
      axios.get(strUrl)
          .then((response) => {
            console.log(response.data)
            this.models = response.data
          })
          .catch((error) => {
            console.log(error.data())
          })
    },
    deletePrinter(id) {
      let strUrl = `http://localhost:8080/printers/${id}`
      axios.delete(strUrl)
          .then((response) => {
            this.printers = response.data
            this.getAllPrinters();
          })
          .catch((error) => {
            console.log(error)
          })
    },
    deletePlasticModel(id) {
      let strUrl = `http://localhost:8090/plastic-models/${id}`
      axios.delete(strUrl)
          .then((response) => {
            this.models = response.data
            this.getAllModels();
          })
          .catch((error) => {
            console.log(error)
          })
    },
  },

}
</script>

<style scoped>
input[type="text"] {
  padding: 15px;
  font-size: 16px;
  outline: none;
  width: 74%;
  background-color: #575155;
  color: azure;
}

.card {
  background-color: #424242;
  height: 100%;
}

.divcard {
  margin-top: 10px;
  width: 100%;
  height: 200px;
}
.center {
  margin: auto;
  width: 25%;
  padding: 10px;
}
</style>