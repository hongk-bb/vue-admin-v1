import service from './axios'

export function getImageClassList(page: number): any {
  return service.get('/admin/image_class/' + page)
}

export function createImageClass(data: string) {
  return service.post('/admin/image_class', data)
}

export function updateImageClass(id: number, data: string) {
  return service.post('/admin/image_class/' + id, data)
}

export function deleteImageClass(id: number) {
  return service.post(`/admin/image_class/${id}/delete`)
}
