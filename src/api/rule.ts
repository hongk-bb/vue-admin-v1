import service from './axios'

export function getRuleList(page: number) {
  return service.get(`/admin/rule/${page}`)
}
