<template>
  <div>
    <el-breadcrumb separator="/" class="mb">
      <el-breadcrumb-item to="/admin/list">Посты</el-breadcrumb-item>
      <el-breadcrumb-item>{{ post.title }}</el-breadcrumb-item>
    </el-breadcrumb>

    <el-form 
      :model="controls" 
      :rules="rules" 
      ref="form"
      @submit.native.prevent="onSubmit"
    >
      <el-form-item label="Текст" prop="text">
        <el-input
          type="textarea"
          v-model="controls.text"
          resize="none"
          :rows=20 
        />
      </el-form-item>

      <div class="mb">
        <small class="mr">
          <i class="el-icon-time"></i>
          <span>
            {{ post.registered }}
          </span>
        </small>

        <small>
          <i class="el-icon-view"></i>
          <span>
            {{ post.views }}
          </span>
        </small>
      </div>

      <el-form-item>
        <el-button 
          type="primary"
          round
          native-type="submit"
          :loading="loading"
        >
          Обновить
        </el-button>
      </el-form-item>
    </el-form>
    
    <el-table
      :data="post.comments"
      stripe
      style="width: 100%"
      v-if="post.comments.length > 0"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <div>
            {{ props.row.text }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="Имя"
        sortable
        prop="name">
      </el-table-column>
      <el-table-column
        label="Дата"
        sortable
        prop="registered">
      </el-table-column>
      <el-table-column
        label="Действия">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div v-else>
      Комментариев пока нет
    </div>

  </div>
</template>

<script>
export default {
  layout: 'admin',
  middleware: ['admin-auth'],
  head () {
    return {
      title: `${this.post.title} | ${process.env.appName}`
    }
  },
  validate ({ params }) {
    return Boolean(params.id)
  },
  mounted () {
    this.controls.text = this.post.text
  },
  data () {
    return {
      loading: false,
      controls: {
        text: ''
      },
      rules: {
        text: [
          { required: true, message: 'Текст не должен быть пустым', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    post () {
      return this.$store.getters['post/getOnePost']
    }
  },
  methods: {
    onSubmit () {
      this.$refs.form.validate(async valid => {
        if (valid) {
          this.loading = true

          const formData = {
            text: this.controls.text
          }

          const payload = {
            id: this.post.id,
            formData
          }

          try {
            await this.$store.dispatch('post/updatePost', payload)
            this.$message.success('Пост обновлен')

          } catch(e) {
            
          } finally {
            this.loading = false
          }
        }
      })
    },
    async handleDelete(row) {
      try {
        const formData = {
          post_id: this.post.id,
          comment_id: row.id,
        }

        await this.$store.dispatch('post/remove_comment', formData)

        this.$message.success('Комментарий удален')
      } catch (e) {
        
      } 
    }
  },
  async asyncData ({ store, params }) {
    try {
      await store.dispatch('post/getOnePost', params.id)
    } catch (e) {
      
    }
  }
}
</script>

<style lang="scss" scoped>
  .mr {
    margin-right: 2rem;
  }
</style>