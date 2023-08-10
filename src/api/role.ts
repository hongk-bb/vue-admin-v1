import service from './axios'

export function getRoleList(page: number) {
  return service.get(`/admin/role/${page}`)
}

export function createRole(data: any) {
  return service.post('/admin/role', data)
}

export function updateRole(id: number, data: any) {
  return service.post('/admin/role/' + id, data)
}

export function deleteRole(id: number) {
  return service.post(`/admin/role/${id}/delete`)
}

export function updateRoleStatus(id: number, status: any) {
  return service.post(`/admin/role/${id}/update_status`, {
    status
  })
}

export function setRoleRules(id: number, rule_ids: number) {
  return service.post(`/admin/role/set_rules`, {
    id,
    rule_ids
  })
}
