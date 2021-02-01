<template>
  <el-row type="flex" justify="center">
    <el-col :xs="24" :sm="18" :md="12" :lg="10">
      <app-post
        v-for="post in posts"
        :key="post.id"
        :model="post"
      />
    </el-col>
  </el-row>
</template>

<script>
import AppPost from '@/components/main/Post'

export default {
  head: {
    title: `Главная | ${process.env.appName}`
  },
  components: {
    AppPost
  },
  computed: {
    posts () {
      return this.$store.getters['post/getPosts']
    }  
  },
  async asyncData (ctx) {
    try {
      await ctx.store.dispatch('post/getAll')
    } catch (e) {

    }
  }
}
</script>

<style>

</style>
