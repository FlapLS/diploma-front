<template>
  <div class="backdround">
    <v-container>
      <v-btn
          to="/admin"
          color="primary"
          dark
          class="btn btn-primary float-end">
        Admin Panel
      </v-btn>
      <v-btn
          to="/"
          color="primary"
          dark
          class="btn btn-primary float-start">
        3d PRINTERS
      </v-btn>
      <v-row align-content="space-between">
        <div>
          <v-container>
            <v-col>
              <v-row class="cardproduct" v-for="model in filteredPrinters" :key="model.id">
                <v-col>
                  <v-img style="background: #cbcbdc"
                         :width="200"
                         src="../../../../public/logo.png">
                  </v-img>
                </v-col>
                <v-col align-self="center">
                  <v-row>
                    <v-label><br>
                      <router-link :to="`/plastic-models/${model.id}/card`" class="router-link">
                        {{ model.company }} {{ model.name }}
                      </router-link>
                    </v-label>
                  </v-row>
                  <v-row>
                    <v-label text="Type"><br>
                      {{ model.type }}
                    </v-label>
                  </v-row>
                </v-col>
                <v-row align="center">
                  <v-col>
                    <v-label text="Amount"><br>
                      {{ model.amount }}
                    </v-label>
                  </v-col>
                </v-row>
              </v-row>
            </v-col>
          </v-container>
        </div>
        <v-col>
          <div class="divcard">
            <v-container class="card">
              <v-row>
                <v-responsive
                    class="mx-auto"
                    max-width="344"
                >
                  <v-text-field
                      v-model="searchQuery"
                      clearable
                      hide-details="auto"
                      label="Search item"
                  ></v-text-field>
                </v-responsive>
              </v-row>
              <v-row>
                <v-row class="mx-7">
                  <v-col align-self="center">
                    <v-label class="align-center w-100">Цены</v-label>
                    <br/>
                    <input type="number" placeholder="от" v-model="lower">
                    <input type="number" placeholder="до" v-model="higher">
                    руб
                  </v-col>
                </v-row>
                <v-row class="mx-16">
                  <v-label text="Company" class="w-100"/>
                  <label v-for="(companies,index) in companyList" :key="index" class="ma-2" style="width:120px">
                    <input type="checkbox" :value="companies" v-model="selectedCompanies">
                    {{ companies }}
                  </label>
                </v-row>
                <v-row class="mx-16">
                  <v-label text="Type" class="w-100"/>
                  <label v-for="(types,index) in typeList" :key="index" class="ma-2" style="width:120px">
                    <input type="checkbox" :value="types" v-model="selectedTypes">
                    {{ types }}
                  </label>
                </v-row>
              </v-row>
              <v-row>
                <v-col align-self="center">
                  <v-btn color="error" @click="clearFilters">
                    Clear
                  </v-btn>
                </v-col>
              </v-row>
              <v-row>
              </v-row>
            </v-container>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";


export default {
  name: "BodyPlasticModels",
  components: {},
  data() {
    return {
      plasticModels: [],
      searchQuery: "",
      selectedCompanies: [],
      selectedTypes: [],
      lower: null,
      higher: null,

      typeList: ['AirCraft',
        'Car',
        'Ship',
        'Space',
        'TechnicCar'],
      companyList: ['Academy',
        'Aoshima',
        'AFVClub',
        'BorderModels',
        'Bronco',
        'Dragon',
        'Eduard',
        'HK_Modes',
        'Kinetic',
        'Meng',
        'Minabase',
        'Nunu',
        'Revell',
        'RFM',
        'SUYATA',
        'Tamiya',
        'Trumpeter',
        'Zvezda'],

    }
  },
  computed: {
    filteredPrinters() {
      return this.plasticModels.filter(plasticModel => {
        // Filter by name search input
        if (this.searchQuery && !plasticModel.name.toLowerCase().includes(this.searchQuery.toLowerCase())) {
          return false;
        }
        // Filter by selected company checkboxes
        if (this.selectedCompanies.length && !this.selectedCompanies.includes(plasticModel.company)) {
          return false;
        }
        if (this.selectedTypes.length && !this.selectedTypes.includes(plasticModel.type)) {
          return false;
        }
        if ((this.lower && plasticModel.amount < this.lower) || (this.higher && plasticModel.amount > this.higher)) {
          return false;
        }
        return true;
      });
    },
  },
  methods: {
    getAllPlasticModel() {
      axios.get("http://localhost:8090/plastic-models/all")
          .then((response) => {
            console.log(response.data)
            this.plasticModels = response.data
          })
          .catch((error) => {
            console.log(error)
          })
    },
    getByName(name) {
      axios.get("http://localhost:8080/printers/search/findAllByCompany?company=" + name)
          .then((response) => {
            console.log(response.data)
            //this.printers = response.data
          })
          .catch((error) => {
            console.log(error)
          })

    },
    getPriceBetween(lower, higher) {
      axios.get("http://localhost:8080/printers/search/findAllByAmountBetween?lower=" + lower + "&higher=" + higher)
          .then((response) => {
            console.log(response.data)
            //this.printers = response.data
          })
          .catch((error) => {
            console.log(error)
          })
    },
    clearFilters() {
      this.searchQuery = '';
      this.lower = null;
      this.higher = null;
      this.selectedCompanies = [];
      this.selectedTypes = [];

    }
  },
  mounted() {
    this.getAllPlasticModel()
  }
}
</script>

<style scoped>
.backdround {
  width: auto;
  height: 100%;
  background: #8e8e96;
}

.card {
  background-color: azure;
  border-radius: 10px;
}

.divcard {
  width: 550px;
  margin: 20px;
}

.cardproduct {
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

.router-link {
  color: inherit; /* or the color you want for the link text */
  text-decoration: none; /* remove the underline */
  /* any other styles you want */
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>