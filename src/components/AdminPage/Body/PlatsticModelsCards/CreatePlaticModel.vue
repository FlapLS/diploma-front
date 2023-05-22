<template>
  <div style="background-color: #E0E0E0; height: 100%">
    <v-app-bar>
      <v-app-bar-title>
        <v-btn to="/admin" class="btn btn-primary float-end m-3" color="primary"
               dark>
          Close
        </v-btn>
      </v-app-bar-title>
    </v-app-bar>
    <div class="my-form w-25" style="background-color: #8e8e96">
      <div class="card form-group ma-4">
        <div class="card-header">
          <h3 class=" float-end">Add plastic model</h3>
        </div>
        <div class="card-body">
          <div>
            <label for="">Name</label>
            <input type="text" v-model="name" class="ml-9"/>
          </div>
          <div>
            <label for="">Company</label>
            <select v-model="company" style="width: 200px">
              <option disabled value="">Please select company</option>
              <option>Academy</option>
              <option>Aoshima</option>
              <option>AFVClub</option>
              <option>BorderModels</option>
              <option>Bronco</option>
              <option>Dragon</option>
              <option>Eduard</option>
              <option>HK_Modes</option>
              <option>Kinetic</option>
              <option>Meng</option>
              <option>Minabase</option>
              <option>Nunu</option>
              <option>Revell</option>
              <option>RFM</option>
              <option>SUYATA</option>
              <option>Tamiya</option>
              <option>Trumpeter</option>
              <option>'Zvezda'</option>
            </select>
          </div>
          <div>
            <label for="">Amount</label>
            <input type="number" v-model="amount" class="ml-5"/>
          </div>
          <div>
            <label for="">Type</label>
            <select v-model="type" class="ml-10" style="width: 200px">
              <option disabled value="">Please select type</option>
              <option>AirCraft</option>
              <option>Car</option>
              <option>Ship</option>
              <option>Space</option>
              <option>TechnicCar</option>
            </select>
          </div>
          <div>
            <v-btn type="text" v-on:click="addPlasticModel" color="success" class="mx-11 btn btn-primary float-end">
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
  name: "CreatePrinter",
  data() {
    return {
      name: '',
      company: '',
      amount: '',
      type:'',

    }
  },
  methods: {
    addPlasticModel() {
      let strUrl = "http://localhost:8090/plastic-models"
      let data = {
        name: this.name,
        company: this.company,
        amount: this.amount,
        type: this.type
      }
      axios.post(strUrl, data)
          .then(resp => {
            console.log(resp.data)
          })
          .catch(err => {
            console.log(err.message)
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