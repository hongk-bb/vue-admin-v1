import { ref, reactive, computed } from 'vue'
import { toast } from '@/utils/util'

export function useInitTable(opt: any = {}) {
  let searchForm: any = null
  let resetSearchForm: any = null
  if (opt.searchForm) {
    searchForm = reactive({ ...opt.searchForm })
    resetSearchForm = () => {
      for (const key in opt.searchForm) {
        searchForm[key] = opt.searchForm[key]
      }
      getData()
    }
  }

  const tableData = ref([])
  const loading = ref(false)

  // 分页
  const currentPage = ref(1)
  const total = ref(0)
  const limit = ref(10)

  // 获取数据
  function getData(p: any = null) {
    if (typeof p == 'number') {
      currentPage.value = p
    }

    loading.value = true
    opt
      .getList(currentPage.value, searchForm)
      .then((res: any) => {
        if (opt.onGetListSuccess && typeof opt.onGetListSuccess == 'function') {
          opt.onGetListSuccess(res)
        } else {
          tableData.value = res.list
          total.value = res.totalCount
        }
      })
      .finally(() => {
        loading.value = false
      })
  }

  getData()

  // 删除
  const handleDelete = (id: number) => {
    loading.value = true
    opt
      .delete(id)
      .then(() => {
        toast('删除成功')
        getData()
      })
      .finally(() => {
        loading.value = false
      })
  }

  // 修改状态
  const handleStatusChange = (status: any, row: any) => {
    row.statusLoading = true
    opt
      .updateStatus(row.id, status)
      .then(() => {
        toast('修改状态成功')
        row.status = status
      })
      .finally(() => {
        row.statusLoading = false
      })
  }

  // 多选选中ID
  const multiSelectionIds = ref<any>([])
  const handleSelectionChange = (e: any) => {
    multiSelectionIds.value = e.map((o: any) => o.id)
  }
  
  // 批量删除
  const multipleTableRef = ref<any>(null)
  const handleMultiDelete = () => {
    loading.value = true
    opt
      .delete(multiSelectionIds.value)
      .then(() => {
        toast('删除成功')
        // 清空选中
        if (multipleTableRef.value) {
          multipleTableRef.value.clearSelection()
        }
        getData()
      })
      .finally(() => {
        loading.value = false
      })
  }

  // 批量修改状态
  const handleMultiStatusChange = (status: any) => {
    loading.value = true
    opt
      .updateStatus(multiSelectionIds.value, status)
      .then((res: any) => {
        toast('修改状态成功')
        // 清空选中
        if (multipleTableRef.value) {
          multipleTableRef.value.clearSelection()
        }
        getData()
      })
      .finally(() => {
        loading.value = false
      })
  }

  return {
    searchForm,
    resetSearchForm,
    tableData,
    loading,
    currentPage,
    total,
    limit,
    getData,
    handleDelete,
    handleStatusChange,
    handleSelectionChange,
    multipleTableRef,
    handleMultiDelete,
    handleMultiStatusChange
  }
}

// 新增，修改
export function useInitForm(opt: any = {}) {
  // 表单部分
  const formDrawerRef = ref<any>(null)
  const formRef = ref<any>(null)
  const defaultForm = opt.form
  const form = reactive<any>({})
  const rules = opt.rules || {}
  const editId = ref(0)
  const drawerTitle: any = computed(() => (editId.value ? '修改' : '新增'))

  const handleSubmit = () => {
    formRef.value.validate((valid: any) => {
      if (!valid) return

      formDrawerRef.value.showLoading()

      let body = {}
      if (opt.beforeSubmit && typeof opt.beforeSubmit == 'function') {
        body = opt.beforeSubmit({ ...form })
      } else {
        body = form
      }

      const fun = editId.value
        ? opt.update(editId.value, body)
        : opt.create(body)

      fun
        .then(() => {
          toast(drawerTitle.value + '成功')
          // 修改刷新当前页，新增刷新第一页
          opt.getData(editId.value ? false : 1)
          formDrawerRef.value.close()
        })
        .finally(() => {
          formDrawerRef.value.hideLoading()
        })
    })
  }

  // 重置表单
  function resetForm(row: any = false) {
    if (formRef.value) formRef.value.clearValidate()
    for (const key in defaultForm) {
      form[key] = row[key]
    }
  }

  // 新增
  const handleCreate = () => {
    editId.value = 0
    resetForm(defaultForm)
    formDrawerRef.value.open()
  }

  // 编辑
  const handleEdit = (row: any) => {
    editId.value = row.id
    resetForm(row)
    formDrawerRef.value.open()
  }

  return {
    formDrawerRef,
    formRef,
    form,
    rules,
    editId,
    drawerTitle,
    handleSubmit,
    resetForm,
    handleCreate,
    handleEdit
  }
}
