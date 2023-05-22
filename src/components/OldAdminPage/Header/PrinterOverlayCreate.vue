<template>

  <v-card style="background-color: burlywood">
    <label for="Name">Name</label>
    <input type="text" name="Name" v-model="formData.name" placeholder="name"><br/>
    <label for="company">Company</label>
    <input type="text" name="company" v-model="formData.company" placeholder="company"><br/>
    <label for="amount">Amount</label>
    <input type="number" name="amount" v-model="formData.amount" placeholder="amount"><br/>
    <button class="submit" v-on:click="addPrinter">Add a new printer</button>
  </v-card>

</template>

<script>


import axios from "axios";

export default {
  name: "RegisterForm",
  data() {
    return {
      formData: {
        name: "",
        company: "",
        amount: ""
      }
    }
  },
  methods: {
    addPrinter() {
      axios.post("http://localhost:8080/printers", this.formData)
    },

  },
}
</script>

<style scoped>
header-bar {

  width: auto;
  height: auto;
}

input{
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
.submit {
  width: 100%;
  background-color: #4CAF50;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.submit:hover {
  background-color: #45a049;
}
</style>