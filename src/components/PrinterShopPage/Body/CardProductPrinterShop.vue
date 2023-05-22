<template>
  <div style="background-color:slategray; height: 100%">
    <v-btn to="/" class="btn btn-primary float-end ma-4" color="primary"
           dark>
      Close
    </v-btn>
    <v-container>
      <v-col>
        <v-row class="cardproduct">
          <v-col>
            <v-img style="background: #cbcbdc"
                   :width="200"
                   src="../../../../public/logo.png">
            </v-img>
          </v-col>
          <v-col align-self="center">
            <v-row>
              <v-label text="Company"><br>
                {{ model.printer.company }}
              </v-label>
            </v-row>
            <v-row>
              <v-label text="Name"><br>
                {{ model.printer.name }}
              </v-label>
            </v-row>
            <v-row>
              <v-label text="Type: ">
                {{ model.printer.type }}
              </v-label>
            </v-row>
          </v-col>
          <v-row align="center">
            <v-col>
              <v-label text="Amount"><br>
                {{ model.printer.amount }}
              </v-label>
            </v-col>
          </v-row>
        </v-row>
      </v-col>
      <div class="float-end">
        <apexchart width="500" type="line" :options="options" :series="series"></apexchart>
      </div>
      <v-table theme="dark" class="w-50">
        <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Link</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="shop in shopss" :key="shop.id">
          <td>
            {{ shop.name }}
          </td>
          <td>
            {{ shop.price }}
          </td>
          <v-btn @click="goToUrl(shop.url)" color="success" class="btn btn-primary ma-2">
            Go to
          </v-btn>
        </tr>
        </tbody>
      </v-table>
    </v-container>
  </div>
</template>

<script>


import axios from "axios";

export default {
  name: "CardProductPrinterShop",
  data() {
    return {
      model: {
        printer: {
          name: '',
          company: '',
          amount: '',
          type: ""

        },
        shops: {
          name: '',
          url: '',
          price: '',
          id: ''
        }
      },
      shopss: [],
      dates:['2023-04-26', '2023-04-27'],
      prices:[1 ,2],
      overlay: false,
      options: {
        xchart:this.dates,
        chart: {
          id: 'vuechart-example'
        },
        xaxis: {
          categories: this.dates,
        }
      },
      series: [{
        name: 'Price change',
        data: this.prices
      },],
    }
  },
  methods: {
    getPrinterData(id) {
      axios.get("http://localhost:8080/printers/" + id)
          .then(res => {
            console.log(res.data);
            this.model.printer.name = res.data.name;
            this.model.printer.company = res.data.company;
            this.model.printer.amount = res.data.amount;
            this.model.printer.type = res.data.type;
          })
    },
    getShops(id) {
      axios.get(`http://localhost:8080/shops/search/findAllByPrinterId?printerId=${id}`)
          .then((response) => {
            console.log(response.data)
            this.shopss = response.data._embedded.shops
          })
          .catch((error) => {
            console.log(error)
          })
    },
    goToUrl(url) {
      window.open(url)
    },

    addPrinter() {
      axios.post("http://localhost:8080/shops", this.model.shops)
    },
  },
  mounted() {
    console.log(this.$route.params.id)
    this.id = this.$route.params.id;
    this.getPrinterData(this.$route.params.id)
    this.getShops(this.$route.params.id)
  },
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
</style>