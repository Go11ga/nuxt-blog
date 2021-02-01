<template>
  <article class="post">
    <header class="post-header">
      <div class="post-title">
        <h1>{{ post.title }}</h1>
        <nuxt-link to="/">
          <i class="el-icon-back"></i>
        </nuxt-link>
      </div>

      <div class="post-info">
        <small>
          <i class="el-icon-time"></i>
          {{ post.registered | date }}
        </small>
        <small>
          <i class="el-icon-view"></i>
          {{ post.views }}
        </small>
      </div>
      <div class="post-image">
        <img :src="post.img" alt="post image">
      </div>
    </header>
    <main class="post-content">
      {{ post.text }}
    </main>
    <footer>
      <app-comment-form 
        @created="createCommentHandler"
        v-if="canAddComment"
      />

      <div class="comments" v-if="comments.length > 0">
        <app-comment 
          v-for="comment in comments"
          :key="comment.id"
          :comment="comment"
        />
      </div>
      <div class="text-center" v-else>
        Комментариев нет
      </div>
    </footer>
  </article>
</template>

<script>
import AppComment from '@/components/main/Comment'
import AppCommentForm from '@/components/main/CommentForm'

export default {
  validate ({ params }) {
    return Boolean(params.id)
  },
  head () {
    return {
      title: `${this.post.title} | ${process.env.appName}`
    }
  },
  components: {
    AppComment,
    AppCommentForm
  },
  data (){
    return {
      canAddComment: true
    }
  },
  computed: {
    post () {
      return this.$store.getters['post/getOnePost']
    },
    comments () {
      return this.post.comments
    }
  },
  methods: {
    createCommentHandler () {
      this.canAddComment = false
    }
  },
  async asyncData(ctx) {
    try {
      const id = ctx.params.id

      await ctx.store.dispatch('post/increaseViews', id)
      await ctx.store.dispatch('post/getOnePost', id)
    } catch (e) {

    }
  }
}
</script>

<style lang="scss" scoped>
  .post {
    max-width: 600px;
    margin: 0 auto;
  }

  .post-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }

  .post-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: .5rem;
  }

  .post-image img {
    width: 100%;
    height: auto;
  }

  .post-header {
    margin-bottom: 1.5rem;
  }

  .post-content {
    margin-bottom: 2rem;
    text-indent: 1rem;
    text-align: justify;
  }
</style>