<template>
  <v-btn
      color="success"
      class="mt-12"
      @click="overlay = !overlay"
  >
    Show Overlay
  </v-btn>
  <v-overlay
      v-model="overlay"
      contained
      class="align-center justify-center">
    <RegisterForm/>
  </v-overlay>
</template>

<script>
import RegisterForm from "@/components/OldAdminPage/Header/PrinterOverlayCreate.vue";
import axios from "axios";

export default {
  name: "ButtonOverlay",
  components: {RegisterForm},
  data() {
    return {
      overlay: false,
    }
  },
  methods: {
    addPrinter() {
      axios.post("http://localhost:8080/printers", this.formData)
    },
  }
}
</script>

<style scoped>

</style>