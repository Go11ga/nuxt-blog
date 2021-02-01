export const state = () => ({
  posts: [],
  onePost: {}
})

export const getters = {
  getPosts (state) {
    return state.posts
  },
  getOnePost (state) {
    return state.onePost
  }
}

export const mutations = {
  setPosts (state, response) {
    const posts = response.data.sort((a, b) => {
      return ('' + b.registered).localeCompare(a.registered);
    })

    state.posts = posts
  },
  setOnePost (state, post) {
    const { comments } =  post
    comments.sort((a, b) => {
      return ('' + b.registered).localeCompare(a.registered);
    })
    post.comments = comments
    state.onePost = post
  },
  remove_comment (state, comment_id) {
    const ind = state.onePost.comments.findIndex(el => el.id === comment_id)
    state.onePost.comments.splice(ind, 1)
  },
  removeOnePost (state, id) {
    const ind = state.posts.findIndex(el => el.id === id)
    state.posts.splice(ind, 1)
  }
}

export const actions = {
  /**
   * * Получить все посты
   */
  async getAll ({ commit }) {
    try {
      const response = await this.$axios.$get('https://blog.garrykhr.ru/api/posts')

      commit('setPosts', response)
    } catch (e) {
      commit('setError', e.response.data, { root: true })
      throw e
    }
  },
  /**
   * * Получить один пост
   */
  async getOnePost ({ commit }, id) {
    try {
      const post = await this.$axios.$get(`https://blog.garrykhr.ru/api/posts/${id}`)

      commit('setOnePost', post.data)
    } catch (e) {
      commit('setError', e.response.data, { root: true })
      throw e
    }
  },
  /**
   * * Обновить пост
   */
  async updatePost ({ commit }, { id, formData }) {
    try {
      await this.$axios.$post(`https://blog.garrykhr.ru/api/posts/update/${id}/text?text=${formData.text}`)

    } catch (e) {
      commit('setError', e.response.data, { root: true })
      throw e
    }
  },
  /**
   * * Удалить пост
   */
  async removePost ({ commit }, id) {
    try {
      await this.$axios.$post(`https://blog.garrykhr.ru/api/posts/delete/${id}`)

      commit('removeOnePost', id)
    } catch (e) {
      commit('setError', e.response.data, { root: true })
      throw e
    }
  },
  /**
   * * Добавить пост
   */
  async createPost ({ commit }, formData) {
    try {
      this.$axios.$post(`https://blog.garrykhr.ru/api/posts/add/title?title=${formData.title}&text=${formData.text}`)
      
    } catch (e) {
      commit('setError', e.response.data, { root: true })
      throw e
    }
  },
  /**
   * * Добавить комментарий
   */
  async setComment ({ commit, dispatch }, { id, formData}) {
    try {
      await this.$axios.$post(`https://blog.garrykhr.ru/api/comment/add/${id}/title?title=${formData.title}&text=${formData.text}`)
      
      await dispatch('getOnePost', id)
    } catch (e) {
      commit('setError', e.response.data, { root: true })
      throw e
    }
  },
  /**
   * * Удалить комментарий
   */
  async remove_comment ({ commit }, { post_id, comment_id}) {
    try {
      await this.$axios.$post(`https://blog.garrykhr.ru/api/comment/delete/${post_id}/${comment_id}`)

      commit('remove_comment', comment_id)
    } catch (e) {
      commit('setError', e.response.data, { root: true })
      throw e
    }
  },
  /**
   * * Увеличить счетчик просмотров
   */
  async increaseViews ({ commit }, id) {
    try {
      await this.$axios.$post(`https://blog.garrykhr.ru/api/views/${id}`)
    } catch (e) {
      console.log(e)
    }
  }
}