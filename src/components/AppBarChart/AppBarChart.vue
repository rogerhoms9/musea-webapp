<template src="./AppBarChart.html"></template>

<script>
import VueApexCharts from 'vue-apexcharts'

export default {
    name: 'AppBarChart',
    components: {
      apexcharts: VueApexCharts,
    },
    props: {
      chartData: Object,
    },
    data: () => ({
      chartOptions: {
        chart: {
          id: 'basic-bar'
        },
        xaxis: {
          categories: []
        }
      },
      series: []
    }),
    watch: {
      chartData: function () {
        this.refresh_chart_data();
      },
    },
    methods: {
      refresh_chart_data: function() {
        let newChartOptions = JSON.parse(JSON.stringify(this.chartOptions));
        newChartOptions.xaxis.categories = this.chartData.xcategories;
        this.chartOptions = newChartOptions;
        this.series = this.chartData.series;
      }
    },
    mounted() {
      this.refresh_chart_data();
    }
}
</script>

<style lang="scss" src="./AppBarChart.scss"></style>