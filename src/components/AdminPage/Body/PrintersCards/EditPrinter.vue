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
    <div class=" my-form w-25 " style="background-color: #8e8e96">
      <div class="card form-group ma-4">
        <div class="card-header">
          <h3 class="mx-4 float-end">Edit printer</h3>
        </div>
        <div class="card-body">
          <div>
            <label for="">Name</label>
            <input type="text" v-model="name" class="form-control ml-9"/>
          </div>
          <div>
            <label for="">Company</label>
            <select v-model="company" style="width: 200px">
              <option disabled value="">Please select company</option>
              <option>Anet</option>
              <option>Anycubic</option>
              <option>Artillery</option>
              <option>Creality</option>
              <option>CreateBot</option>
              <option>Elegoo</option>
              <option>FlashForge</option>
              <option>Kingroon</option>
              <option>Phrozen</option>
              <option>Qidi</option>
              <option>Tevo</option>
              <option>Tianfour</option>
            </select>
          </div>
          <div>
            <label for="">Amount</label>
            <input type="number" v-model="amount" class="form-control ml-5"/>
          </div>
          <div>
            <label for="">Type</label>
            <select v-model="type" class="ml-10" style="width: 200px">
              <option disabled value="">Please select type</option>
              <option>DLP</option>
              <option>FDM</option>
              <option>SLA</option>
            </select>
          </div>
          <div>
            <label for="">PhotoUrl</label>
            <input type="text" v-model="photo" class="form-control ml-3"/>
          </div>
          <div class="mb-5">
            <v-btn type="text" v-on:click="updatePrinter" color="success" class="mx-11 btn btn-primary float-end">
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
  name: "EditPrinter",
  data() {
    return {
      name: '',
      company: '',
      amount: '',
      type: '',
      photo: ''
    }
  },
  mounted() {
    this.id = this.$route.params.id;
    this.getPrinterData(this.$route.params.id)
  },
  methods: {
    getPrinterData(id) {
      let strUrl = "http://localhost:8080/printers/"
      axios.get(strUrl + id)
          .then(res => {
            console.log(res.data);
            this.name = res.data.name;
            this.company = res.data.company;
            this.amount = res.data.amount;
            this.type = res.data.type;
            this.photo = res.data.photo;
          })

    },
    updatePrinter() {
      let strUrl = "http://localhost:8080/printers/"
      let data = {
        name: this.name,
        company: this.company,
        amount: this.amount,
        type: this.type,
        photo: this.photo
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