<template>
  <el-card
    shadow="hover"
    :body-style="{ padding: 0 }"
    class="post"
  >
    <header slot="header" class="post-header">
      <h3>{{ model.title }}</h3>

      <small>
        <i class="el-icon-time"></i>
        {{ model.registered | date }}
      </small>
    </header>
    <div class="post-body">
      <img 
        class="post-img" 
        :src="model.img"
        alt="post image"
      />
    </div>
    <footer class="post-footer">
      <el-button round @click="openPost">
        Открыть
      </el-button>
      <span>
        <i class="el-icon-chat-line-round"></i>
        {{ model.comments.length }}
      </span>
    </footer>
  </el-card>
</template>

<script>
export default {
  props: {
    model: {
      type: Object,
      required: true
    }
  },
  methods: {
    openPost () {
      this.$router.push(`/post/${this.model.id}`)
    }
  }
}
</script>

<style lang="scss" scoped>
  .post {
    margin-bottom: 1.5rem;
  }

  .post-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .post-img {
    width: 100%;
    height: auto;
  }

  .post-footer {
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

</style>