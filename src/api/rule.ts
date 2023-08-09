import service from './axios'

export function getRuleList(page: number): any {
  return service.get(`/admin/rule/${page}`)
}

export function createRule(data: any) {
  return service.post('/admin/rule', data)
}

export function updateRule(id: number, data: any) {
  return service.post('/admin/rule/' + id, data)
}

export function updateRuleStatus(id: number, status: any) {
  return service.post(`/admin/rule/${id}/update_status`, {
    status
  })
}

export function deleteRule(id: number) {
  return service.post(`/admin/rule/${id}/delete`)
}
