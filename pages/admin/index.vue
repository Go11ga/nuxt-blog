<template>
  <div>
    <h1 class="mb2">Аналитика по постам</h1>
    <canvas height="0" ref="canvas"></canvas>
    <AppAnalyticsChart 
      :axleX="postNames"
      :axleY="views"
      name="Количество просмотров"
    />
    <AppAnalyticsChart 
      :axleX="postNames"
      :axleY="comments"
      name="Количество коментариев"
    />
  </div>
</template>

<script>
import { Bar } from 'vue-chartjs'

import AppAnalyticsChart from '~/components/admin/AnalyticsChart'

export default {
  layout: 'admin',
  middleware: ['admin-auth'],
  head: {
    title: `Аналитика | ${process.env.appName}`
  },
  extends: Bar,
  components: {
    AppAnalyticsChart
  },
  computed: {
    posts () {
      return this.$store.getters['post/getPosts']
    },
    postNames () {
      return this.posts.map(el => el.title)
    },
    views () {
      return this.posts.map(el => el.views)
    },
    comments () {
      return this.posts.map(el => el.comments.length)
    }
  },
  async asyncData(ctx) {
    try {
      await ctx.store.dispatch('post/getAll')
    } catch (e) {
      
    }  
  }
}
</script>
