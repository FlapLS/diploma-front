<template>
  <div class="backdround">
    <v-container>
      <v-btn
          to="/plastic-models"
          color="primary"
          dark
          class="btn btn-primary float-start">
        PlasticModels
      </v-btn>
      <v-row align-content="space-between">
        <div>
          <v-container>
            <v-col>
              <v-row class="cardproduct" v-for="printer in filteredPrinters" :key="printer.id">
                <v-col>
                  <v-img style="background: #cbcbdc"
                         :width="200"
                         src="../../../../public/logo.png">
                  </v-img>
                </v-col>
                <v-col align-self="center">
                  <v-row>
                    <v-label><br>
                      <router-link :to="`/${printer.id}/card`" class="router-link">
                        {{ printer.company }} {{ printer.name }}
                      </router-link>
                    </v-label>
                  </v-row>
                  <v-row>
                    <v-label text="Type: ">
                      {{ printer.type }}
                    </v-label>
                  </v-row>
                </v-col>
                <v-row align="center">
                  <v-col>
                    <v-label text="Amount"><br>
                      {{ printer.amount }}
                    </v-label>
                  </v-col>
                </v-row>
                <v-row align="center">
                  <v-col>
                    <v-btn style="background-color: azure" @click="getPrinterData(printer.id)">
                      Сравнить
                    </v-btn>
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
              <v-row align-content="center">
                <v-row class="mx-7 w-100 h-100">
                  <v-col align-self="center">
                    <v-label class="align-center">Цены</v-label>
                    <br/>
                    <input type="number" placeholder="от" v-model="lower">
                    <input type="number" placeholder="до" v-model="higher">
                    руб
                  </v-col>
                </v-row>
                <v-row class="mx-16">
                  <v-label text="Company" class="w-100"/>
                  <label v-for="(companies,index) in companyList" :key="index" class="ma-2" style="width:100px">
                    <input type="checkbox" :value="companies" v-model="selectedCompanies">
                    {{ companies }}
                  </label>
                </v-row>
                <v-row class="mx-16">
                  <v-label text="Type" class="w-100"/>
                  <label v-for="(types,index) in typeList" :key="index" class="ma-2" style="width:100px">
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
          <div>
            <v-row style="background-color: red">
              <v-col>
                <v-btn
                    color="success"
                    class="ma-3"
                    @click="overlay = !overlay,getData(arr)"
                >
                  {{ arr.length}}  Сравнить
                </v-btn>
                  <v-overlay
                      v-model="overlay"
                      contained
                      class="align-center justify-center">
                    <v-card class="overlay" style="background-color: burlywood">
                      <v-row >
                        <v-col v-for="printeqauls in printersEqauls" :key="printeqauls.id">
                          <div>
                            {{printeqauls.model}} {{printeqauls.company}} {{printeqauls.type}} {{printeqauls.amount}}
                          </div>
                        </v-col>
                      </v-row>
                    </v-card>
                  </v-overlay>
                <v-btn @click="clearEqauls">
                  Clear
                </v-btn>
              </v-col>
            </v-row>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>


import axios from "axios";


export default {
  name: "BodyForm",
  components: {},
  data() {
    return {
      printers: [],
      printersEqauls: [],
      searchQuery: "",
      selectedCompanies: [],
      selectedTypes: [],
      lower: null,
      higher: null,
      arr: [],
      uniquearr:[],
      overlay: false,
      model: {
        printer: {
          name: '',
          company: '',
          amount: '',
          type: ""
        }
      },
      typeList: ['DLP', 'FDM', 'SLA'],
      companyList: ['Anet',
        'Anycubic',
        'Artillery',
        'Creality',
        'CreateBot',
        'Elegoo',
        'FlashForge',
        'Kingroon',
        'Phrozen',
        'Qidi',
        'Tevo',
        'Tianfour'],

    }
  },
  computed: {
    filteredPrinters() {
      return this.printers.filter(printer => {
        // Filter by name search input
        if (this.searchQuery && !printer.name.toLowerCase().includes(this.searchQuery.toLowerCase())) {
          return false;
        }
        // Filter by selected company checkboxes
        if (this.selectedCompanies.length && !this.selectedCompanies.includes(printer.company)) {
          return false;
        }
        if (this.selectedTypes.length && !this.selectedTypes.includes(printer.type)) {
          return false;
        }
        if ((this.lower && printer.amount < this.lower) || (this.higher && printer.amount > this.higher)) {
          return false;
        }
        return true;
      });
    },
  },
  methods: {
    deletePrinter(id) {
      axios.delete("http://localhost:8080/printers/" + id)
          .then((response) => {
            console.log(response.data)
            this.printers = response.data
          })
          .catch((error) => {
            console.log(error)
          })
    },
    getAllPrinnters() {
      axios.get("http://localhost:8080/printers/all")
          .then((response) => {
            console.log(response.data)
            this.printers = response.data
          })
          .catch((error) => {
            console.log(error)
          })
    },
    getPrinterData(id) {
      axios.get("http://localhost:8080/printers/" + id)
          .then(res => {
            this.model.printer.printerId = res.data.id
            console.log(res.data.id);
            if (!this.arr.includes(res.data.id)){
              this.arr.push(res.data.id)
            }
          })
    },
    getData(arr) {
      arr.forEach((arr) => {
        if (!this.uniquearr.includes(arr)) {
          this.uniquearr.push(arr)
        }
      })
      console.log(this.uniquearr)
      this.uniquearr.forEach(item=> {
        axios.get("http://localhost:8080/printers/" + item)
            .then(res => {
              if (!this.printersEqauls.some(printer => printer.id === res.data.id)){
                this.printersEqauls.push(res.data)
              }

            })
      })
      console.log(this.printersEqauls)
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

    },
    clearEqauls(){
      this.arr=[];
      console.log(this.arr)
      this.printersEqauls=[]
      this.uniquearr=[]
    },
  },
  mounted() {
    this.getAllPrinnters()
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
  width: 500px;
  margin: 30px;
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
.overlay {
  margin: auto;
  width: 400px;
  height: 250px;
  border-radius: 10px;
}
</style>