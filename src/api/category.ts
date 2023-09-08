import service from './axios'

export function getCategoryList() {
  return service.get('/admin/category')
}

export function createCategory(data: any) {
  return service.post('/admin/category', data)
}

export function updateCategory(id: number, data: any) {
  return service.post('/admin/category/' + id, data)
}

export function updateCategoryStatus(id: number, status: any) {
  return service.post(`/admin/category/${id}/update_status`, {
    status
  })
}

export function deleteCategory(id: number) {
  return service.post(`/admin/category/${id}/delete`)
}

export function getCategoryGoods(id: number) {
  return service.get(`/admin/app_category_item/list?category_id=${id}`)
}

export function deleteCategoryGoods(id: number) {
  return service.post(`/admin/app_category_item/${id}/delete`)
}

export function connectCategoryGoods(data: any) {
  return service.post(`/admin/app_category_item`, data)
}
