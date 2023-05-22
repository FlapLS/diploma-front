<template>
  <div>
    <div id="chart"></div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "PrinerShopChart",
  data(){
    return{
      historyprice:[],
      dates:[],
      lendates:"",
      priceschart:[],
      len:"",
    }
  },
  methods:{
    getDataForCharts(id){
      axios.get(`http://localhost:8080/history/search/findAllByShopId?shopId=${id}`)
          .then(respone =>{
            this.historyprice=respone.data._embedded.history
            this.lendates=respone.data._embedded.history.length
            console.log(this.historyprice)
            for (let i = 0; i < this.lendates; i++) {
              this.dates.push(respone.data._embedded.history[i].updateDate)
              this.priceschart.push(respone.data._embedded.history[i].price)

            }
            console.log(this.dates)
            console.log(this.priceschart)
          })
    },
  },
  mounted() {
    this.id= this.$route.params.id;
    this.id_shop = this.$route.params.id_shop;
    this.getDataForCharts(this.$route.params.id)
    // eslint-disable-next-line no-undef
    const chart = new ApexCharts(document.querySelector("#chart"), {
      chart: {
        type: "line",
        height: 300,
        width:500
      },
      plotOptions: {
        bar: {
          horizontal: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      series: [
        {
          data: this.priceschart,
        },
      ],
      xaxis: {
        type:'datetime',
        categories: this.dates,
      },
      tooltip: {
        x: {
          format: 'dd/MM/yy HH:mm'
        },
      },
      fill: {
        colors: ["#5FAD74"],
      },
    });
    chart.render();

  },

}
</script>

<style scoped>

</style>