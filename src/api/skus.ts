import service from './axios'

export function getSkusList(page: number): any {
  return service.get(`/admin/skus/${page}`)
}

export function createSkus(data: any) {
  return service.post('/admin/skus', data)
}

export function updateSkus(id: number, data: any) {
  return service.post('/admin/skus/' + id, data)
}

export function deleteSkus(ids: any) {
  ids = !Array.isArray(ids) ? [ids] : ids
  return service.post(`/admin/skus/delete_all`, { ids })
}

export function updateSkusStatus(id: number, status: any) {
  return service.post(`/admin/skus/${id}/update_status`, {
    status
  })
}
