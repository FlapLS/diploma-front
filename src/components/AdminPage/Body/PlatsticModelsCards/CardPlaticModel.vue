<template>
  <div style="background-color:slategray; height: 100%">
    <v-btn to="/admin" class="btn btn-primary float-end ma-4" color="primary"
           dark>
      Close
    </v-btn>
    <v-container class="w25">
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
                {{ plasticModel.id }}
              </v-label>
              <v-label text="Company"><br>
                {{ plasticModel.company }}
              </v-label>
              <v-label text="Name"><br>
                {{ plasticModel.name }}
              </v-label>
            </v-row>
          </v-col>
          <v-row align="center">
            <v-col>
              <v-label text="Amount"><br>
                {{ plasticModel.amount }}
              </v-label>
            </v-col>
          </v-row>
        </v-row>
      </v-col>
      <div class="float-end">
        <apexchart width="500" type="line" :options="chartOptions" :series="series"></apexchart>
        <div>
          <button @click="updateChart">Update!</button>
        </div>
      </div>
    </v-container>
    <v-btn
        color="success"
        class="ma-3"
        @click="overlayShop = !overlayShop"
    >
      Add shop
    </v-btn>
    <v-overlay
        v-model="overlayShop"
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
        <v-btn @click="goToUrl(shoptest.url)" class="btn btn-primary float-start mt-1" color="yellow">
          Go to
        </v-btn>

        <td>
          {{ shoptest.creationDate }}
        </td>
        <td>
          {{shoptest.updateDate}}
        </td>
        <td>
          <v-btn :to="`/admin/plastic-models/${shoptest.shopId}/card/${plasticModel.id}/shop`" class="btn btn-primary float-start" color="warning"
                 dark>
            Update
          </v-btn>
        </td>
        <td>
          <v-btn v-on:click="deleteShop(shoptest.shopId)" class="btn btn-primary float-start" color="error"
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
  name: "CardPlaticModel",
  data() {
    return {
      plasticModel: {
        id: '',
        name: '',
        company: '',
        amount: ''
      },
      chartData: {
        type: 'line',
        series: [{
          values: [4,5,3,3,4,4]
        }]
      },
      shops: {
        name: '',
        url: '',
        price: '',
        plasticModelId: '',
      },
      shopAll: [],
      prices: [],
      len: "",
      dates: [],
      overlayShop: false,
      overlayUpdate: false,
      chartOptions: {
        chart: {
          id: 'vuechart-example',
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
        },
      },
      series: [{
        name: 'series-1',
        data: [30, 40, 45, 50, 49, 60, 70, 81]
      }]
    };
  },
  methods: {
    updateChart() {
      const max = 90;
      const min = 20;
      const newData0 = this.series[0].data.map(() => {
        return Math.floor(Math.random() * (max - min + 1)) + min
      })
      const colors = ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0']

      // Make sure to update the whole options config and not just a single property to allow the Vue watch catch the change.
      this.chartOptions = {
        colors: [colors[Math.floor(Math.random() * colors.length)]]
      };
      // In the same way, update the series option
      this.series = [{
        data: newData0
      }]
    },
    getPlasticModel(id) {
      axios.get("http://localhost:8090/plastic-models/" + id)
          .then(res => {
            console.log(res.data);
            this.plasticModel.id = res.data.id;
            this.plasticModel.name = res.data.name;
            this.plasticModel.company = res.data.company;
            this.plasticModel.amount = res.data.amount
          })
    },
    getShops(id) {
      axios.get(`http://localhost:8090/shops/search/findAllByPlasticModelId?plasticModelId=${id}`)
          .then((response) => {
            console.log(response.data)
            this.shopAll = response.data._embedded.shops
            this.len = response.data._embedded.shops.length
            for (let i = 0; i < this.len; i++) {
              this.prices.push(response.data._embedded.shops[i].price)
              this.dates.push(response.data._embedded.shops[i].creationDate)
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
      axios.delete(`http://localhost:8090/shops/${id}`)
          .then((response) => {
            this.getShops(this.plasticModel.id);
            console.log('Printer deleted:', response.data);
          })
          .catch((error) => {
            console.log(error)
          })
    },
    addShop() {
      let strUrlGet = "http://localhost:8090/plastic-models/"
      axios.get(strUrlGet + this.plasticModel.id)
          .then(res => {
            console.log(res.data);
            const plasticModeIdGet = res.data.id;
            let data = {
              name: this.shops.name,
              url: this.shops.url,
              price: this.shops.price,
              plasticModelId: plasticModeIdGet
            }
            let strUrlPost = "http://localhost:8090/shops"
            axios.post(strUrlPost, data)
                .then((respone) => {
                  console.log(respone)
                  this.getShops(this.plasticModel.id);
                });
          })
    },

  },
  mounted() {
    this.id = this.$route.params.id
    this.getPlasticModel(this.$route.params.id)
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