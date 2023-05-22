<template>
  <div style="background-color: #E0E0E0; height: 100%">
    <v-app-bar>
      <v-app-bar-title>
        <v-btn :to="`/admin/plastic-models/${this.id_shop}/card`" class="btn btn-primary float-end m-3" color="primary"
               dark>
          Close
        </v-btn>
      </v-app-bar-title>
    </v-app-bar>
    <div class="my-form w-25" style="background-color: #8e8e96">
      <div class="card form-group ma-4">
        <div class="card-header">
          <h3 class=" float-end">Edit plastic model shop</h3>
        </div>
        <div class="card-body">
          <label for="company" class="ml-10">Price</label>
          <input type="number" name="company" v-model="price" placeholder="company" class="ml-6"><br/>
          <div>
            <v-btn type="text" v-on:click="updatePlasticModel" color="success" class="mx-11 btn btn-primary float-end">
              Save
            </v-btn>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>


import axios from "axios";

export default {
  name: "UpdateShop",
  data() {
    return {
      name: '',
      url: '',
      price: '',
      plasticModelId: '',

    }
  },
  mounted() {
    this.id= this.$route.params.id;
    this.id_shop = this.$route.params.id_shop;
    this.getPlasticModelData(this.$route.params.id)
  },
  methods: {
    getPlasticModelData(id) {
      let strUrl = "http://localhost:8090/shops/"
      axios.get(strUrl + id)
          .then(res => {
            console.log(res.data);
            this.price = res.data.price;
          })

    },
    updatePlasticModel() {
      let strUrl = "http://localhost:8090/shops/"
      let data = {
        price: this.price,
      }
      axios.put(strUrl + this.id, data)
          .then(resp => {
            console.log(resp.data)
          })
          .catch(err => {
            console.log(err.data())
          })
    },
  }
}
</script>

<style scoped>
.my-form {
  display: flex;

  margin: auto;
  border-radius: 10px;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
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
  padding: 0.75rem;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>