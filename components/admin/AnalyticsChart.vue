<template>
  <div class="mb2">
    <canvas height="80vh" ref="canvas"></canvas>
  </div>
</template>

<script>
import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,
  props: {
    axleX: {
      type: Array,
      required: true
    },
    axleY: {
      type: Array,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },
  mounted () {
    const views = {
      labels: this.axleX,
      datasets: [{
        label: this.name,
        data: this.axleY,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    }

    const options = {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
    this.renderChart(views, options)
  } 
}
</script>