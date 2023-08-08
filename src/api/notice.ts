import service from './axios'

export function getNoticeList(page: number): any {
  return service.get(`/admin/notice/${page}`)
}

export function createNotice(data: any) {
  return service.post('/admin/notice', data)
}

export function updateNotice(id: number, data: any) {
  return service.post('/admin/notice/' + id, data)
}

export function deleteNotice(id: number) {
  return service.post(`/admin/notice/${id}/delete`)
}
