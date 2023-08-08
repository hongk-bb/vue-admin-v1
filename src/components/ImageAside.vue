<script lang="ts" setup>
import { computed, reactive, ref } from 'vue'
import AsideList from './AsideList.vue'
import { useImageClassStore } from '@/stores/image_class'
import { storeToRefs } from 'pinia'
import { toast } from '@/utils/util'

const imageClassStore = useImageClassStore()
const { totalCount, list } = storeToRefs(imageClassStore)

// 加载动画
const loading = ref(false)

// 分页
const currentPage = ref<number>(1)
const limit = ref<number>(10)

// 获取数据
function getData(p: number | null = null) {
  if (typeof p === 'number') {
    currentPage.value = p
  }

  loading.value = true
  imageClassStore
    .getImageClassListAction(currentPage.value)
    .then(() => {
      let item = list.value[0]
      if (item) {
        handleChangeActiveId(item.id)
      }
    })
    .finally(() => {
      loading.value = false
    })
}

getData()

const editId = ref<any>(0)
const drawerTitle = computed(() => (editId.value ? '修改' : '新增'))
const formDrawerRef = ref<any>(null)

const form = reactive({
  name: '',
  order: 50
})

const rules = {
  name: [
    {
      required: true,
      message: '图库分类名称不能为空',
      trigger: 'blur'
    }
  ]
}
const formRef = ref<any>(null)
const handleSubmit = () => {
  formRef.value.validate((valid: any) => {
    if (!valid) return

    formDrawerRef.value.showLoading()

    const fun = editId.value
      ? imageClassStore.updateImageClassAction(editId.value, form)
      : imageClassStore.createImageClassAction(form)

    fun
      .then(() => {
        toast(drawerTitle.value + '成功')
        getData(editId.value ? currentPage.value : 1)
        formDrawerRef.value.close()
      })
      .finally(() => {
        formDrawerRef.value.hideLoading()
      })
  })
}

// 新增
const handleCreate = () => {
  editId.value = 0
  form.name = ''
  form.order = 50
  formDrawerRef.value.open()
}

// 编辑
const handleEdit = (row: any) => {
  editId.value = row.id
  form.name = row.name
  form.order = row.order
  formDrawerRef.value.open()
}

// 删除
const handleDelete = (id: any) => {
  loading.value = true
  imageClassStore
    .deleteImageClassAction(id)
    .then(() => {
      toast('删除成功')
      getData()
    })
    .finally(() => {
      loading.value = false
    })
}

// 选中图库分类ID
const activeId = ref<any>(0)
const emit = defineEmits(['change'])
// 切换分类
function handleChangeActiveId(id: number) {
  activeId.value = id
  emit('change', id)
}

defineExpose({
  handleCreate
})
</script>

<template>
  <el-aside width="220px" class="image-aside" v-loading="loading">
    <div class="top">
      <AsideList
        :active="activeId == item.id"
        v-for="(item, index) in list"
        :key="index"
        @edit="handleEdit(item)"
        @delete="handleDelete(item.id)"
        @click="handleChangeActiveId(item.id)"
      >
        {{ item.name }}
      </AsideList>
    </div>
    <div class="bottom">
      <el-pagination
        background
        layout="prev, next"
        :total="totalCount"
        :current-page="currentPage"
        :page-size="limit"
        @current-change="getData"
      />
    </div>
  </el-aside>

  <FormDrawer :title="drawerTitle" ref="formDrawerRef" @submit="handleSubmit">
    <el-form
      :model="form"
      ref="formRef"
      :rules="rules"
      label-width="80px"
      :inline="false"
    >
      <el-form-item label="分类名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="排序" prop="order">
        <el-input-number v-model="form.order" :min="0" :max="1000" />
      </el-form-item>
    </el-form>
  </FormDrawer>
</template>

<style scoped>
.image-aside {
  border-right: 1px solid #eeeeee;
  position: relative;
}
.image-aside .top {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 50px;
  overflow-y: auto;
}
.image-aside .bottom {
  height: 50px;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  @apply flex items-center justify-center;
}
</style>
