<template>
  <div style="background-color:slategray; height: 100%">
    <v-btn to="/admin" class="btn btn-primary float-end ma-4" color="primary"
           dark>
      Close
    </v-btn>
    <v-container>
      <v-col>
        <v-row class="cardproduct">
          <v-col>
            <v-img style="background: #cbcbdc"
                   :width="200"
                   src="../../../../../public/logo.png">
            </v-img>
          </v-col>
          <v-col align-self="center">
            <v-row>
              <v-label text="Id"><br>
                {{ printer.printerId }}
              </v-label>
              <v-label text="Company"><br>
                {{ printer.company }}
              </v-label>
              <v-label text="Name"><br>
                {{ printer.name }}
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
              <v-label text="Type"><br>
                {{ printer.type }}
              </v-label>
            </v-col>
          </v-row>
        </v-row>
      </v-col>
    </v-container>
    <v-btn
        color="success"
        class="ma-3"
        @click="overlay = !overlay"
    >
      Add shop
    </v-btn>
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
    <v-table theme="dark" class="w-50 ml-10">
      <thead>
      <tr>
        <th>Id</th>
        <th>Name</th>
        <th>Price</th>
        <th>Action</th>
        <th>Creation Date</th>
        <th>Update Date</th>
        <th>Chart</th>
        <th>Update</th>
        <th>Delete</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="shoptest in shopAll" :key="shoptest.shopId">
        <td>
          {{ shoptest.shopId }}
        </td>
        <td>
          {{ shoptest.name }}
        </td>
        <td>
          {{ shoptest.price }}
        </td>
        <v-btn @click="goToUrl(shoptest.url)" class="btn btn-primary float-start ma-2" color="yellow">
          Go to
        </v-btn>
        <td>
          {{shoptest.creationDate}}
        </td>
        <td>
          {{shoptest.updateDate}}
        </td>
        <td>
          <v-btn :to="`/admin/printers/${shoptest.shopId}/card/${printer.printerId}/chart`" class="btn btn-primary float-start" color="warning"
                 dark>
            CHart
          </v-btn>
        </td>
        <td>
          <v-btn :to="`/admin/printers/${shoptest.shopId}/card/${printer.printerId}/shop`" class="btn btn-primary float-start" color="warning"
                 dark>
            Update
          </v-btn>
        </td>
        <td>
          <v-btn  v-on:click="deleteShop(shoptest.shopId)" class="btn btn-primary" color="error"
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
  name: "CardProduct",
  data() {
    return {
      printer: {
        name: '',
        company: '',
        type: '',
        amount: '',
        printerId: ''
      },
      shops: {
        name: '',
        url: '',
        price: '',
        shopId: '',
        printerId: '',
      },
      shopAll: [],
      prices:[],
      len:"",
      overlay: false,

      historyprice:[],
      dates:[],
      lendates:"",
      priceschart:[],
      categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"],
      series: [31, 40, 28, 51, 42, 109, 1500],
    }
  },
  methods: {
    getPrinterData(id) {
      axios.get("http://localhost:8080/printers/" + id)
          .then(res => {
            console.log(res.data);
            this.printer.printerId = res.data.id;
            this.printer.name = res.data.name;
            this.printer.company = res.data.company;
            this.printer.amount = res.data.amount;
            this.printer.type = res.data.type
          })
    },
    getShops(id) {
      axios.get(`http://localhost:8080/shops/search/findAllByPrinterId?printerId=${id}`)
          .then((response) => {
            this.shopAll = response.data._embedded.shops
            this.len=response.data._embedded.shops.length
            for (let i = 0; i < this.len; i++) {
              this.prices.push(response.data._embedded.shops[i].price)
            }
          })
          .catch((error) => {
            console.log(error)
          })
    },
    goToUrl(url) {
      window.open(url)
    },
    deleteShop(id) {
      axios.delete(`http://localhost:8080/shops/${id}`)
          .then((response) => {
            this.getShops(this.printer.printerId)
            console.log('Printer deleted:', response.data);
            this.dates=[]
            this.priceschart=[]
          })
          .catch((error) => {
            console.log(error)
          })
    },
    addShop() {
      let strUrlGet="http://localhost:8080/printers/"
      axios.get(strUrlGet + this.printer.printerId)
          .then(res => {
            console.log(res.data);
            const printerIdGet = res.data.id;
            let data = {
              name: this.shops.name,
              url: this.shops.url,
              price: this.shops.price,
              printerId: printerIdGet
            }
            let strUrlPost="http://localhost:8080/shops"
            axios.post(strUrlPost, data)
                .then((response) => {
                  console.log(response.data)
                  this.getShops(this.printer.printerId)
                });
          })
    },

    computed: {
      error () {
        return this.shopAll = null
      }
    }
  },

  mounted() {
    this.id = this.$route.params.id
    this.getPrinterData(this.$route.params.id)
    this.getShops(this.$route.params.id)



  },
}
</script>

<style scoped>
.cardproduct {
  margin: 10px;
  background: azure;
  width: 900px;
  left: auto;
  border-radius: 5px;
}

v-label {
  margin: 15px;
  padding: 10px;
  color: black;
}

.overlay {
  margin: auto;
  width: 400px;
  height: 250px;
  border-radius: 10px;
}

input[type="text"],
input[type="number"],
select {
  margin: 10px;
  padding: 0.5rem;
  font-size: 1rem;
  border-radius: 5px;
  border: 1px solid #ccc;
}

v-btn {
  background-color: #4CAF50;
  border: none;
  color: white;
  text-align: center;
  text-decoration: none;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 40px;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>