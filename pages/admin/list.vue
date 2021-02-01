<template>
  <el-table
    :data="posts"
    style="width: 100%"
  >
    <el-table-column
      prop="title"
      label="Название"
    />

    <el-table-column label="Дата">
      <template slot-scope="{row: { registered }}">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ registered | date }}</span>
      </template>
    </el-table-column>

    <el-table-column label="Просмотры">
      <template slot-scope="{row: { views }}">
        <i class="el-icon-view"></i>
        <span style="margin-left: 10px">{{ views }}</span>
      </template>
    </el-table-column>

    <el-table-column label="Комментарии">
      <template slot-scope="{row: { comments }}">
        <i class="el-icon-message"></i>
        <span style="margin-left: 10px">{{ comments.length }}</span>
      </template>
    </el-table-column>

    <el-table-column label="Действия">
      <template slot-scope="{ row }">
        <el-tooltip effect="dark" content="Открыть пост" placement="top">
          <el-button
            icon="el-icon-edit"
            type="primary"
            circle
            @click="open(row.id)"
          />
        </el-tooltip>

        <el-tooltip effect="dark" content="Удалить пост" placement="top">
          <el-button
            icon="el-icon-delete"
            type="danger"
            circle
            @click="remove(row.id)"
          />
        </el-tooltip>
        
      </template>
    </el-table-column>

  </el-table>
</template>

<script>
export default {
  layout: 'admin',
  middleware: ['admin-auth'],
  head: {
    title: `Все посты | ${process.env.appName}`
  },
  computed: {
    posts () {
      return this.$store.getters['post/getPosts']
    }
  },
  methods: {
    open (id) {
      this.$router.push(`/admin/post/${id}`)
    },
    async remove (id) {
      try {
        await this.$confirm('Удалить пост?', 'Внимание!', {
          confirmButtonText: 'Да',
          cancelButtonText: 'Отменить',
          type: 'warning'
        })
        await this.$store.dispatch('post/removePost', id)

        this.$message.success('Пост удален')
      } catch (e) {
        
      }
    }
  },
  async asyncData ({ store }) {
    try {
      await store.dispatch('post/getAll')
    } catch (e) {

    } 
  }
}
</script>