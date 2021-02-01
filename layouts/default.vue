<template>
  <el-container>
    <el-header>
      <app-navigation />
    </el-header>
    <el-main>
      <nuxt />
    </el-main>
    <el-footer />
  </el-container>
</template>

<script>

import AppNavigation from '@/components/main/Navigation'

export default {
  components: {
    AppNavigation
  },
  computed: {
    error () {
      return this.$store.getters.error
    }
  },
  watch: {
    error(value) {
      this.$message.error(value.message)
    }
  }
}
</script>

<style>

</style>
