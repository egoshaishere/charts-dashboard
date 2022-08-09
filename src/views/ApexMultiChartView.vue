<template>
  <div>
    <ApexMenu />
    <ApexChart />
  </div>
</template>

<script>
import ApexChart from "@/components/ApexChart.vue";
import ApexMenu from '../components/ApexChartMenu.vue'

export default {
  name: "ApexMultiCharts",
  components: {
    ApexChart,
    ApexMenu
  },
};
</script>

<style>
</style>