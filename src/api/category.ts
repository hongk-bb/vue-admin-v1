import service from './axios'

export function getCategoryList() {
  return service.get('/admin/category')
}
