<template>
  <div id="chart">
    <apexchart
      ref="radar"
      type="line"
      height="600"
      :options="apexOptions"
      :series="apexSeries"
    ></apexchart>
  </div>
</template>

<script>
//import ApexCharts from 'apexcharts'
import VueApexCharts from "vue-apexcharts";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "ApexChart",
  components: {
    apexchart: VueApexCharts,
  },
  computed: {
    ...mapGetters({
      apexOptions: "multiChartModule/apexOptions",
      apexSeries: "multiChartModule/apexSeries",
    }),
  },
};
</script>

<style>
</style>