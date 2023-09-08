import service from './axios'

export function getUserLevelList(page: number) {
  return service.get(`/admin/user_level/${page}`)
}

export function createUserLevel(data: any) {
  return service.post('/admin/user_level', data)
}

export function updateUserLevel(id: number, data: any) {
  return service.post('/admin/user_level/' + id, data)
}

export function deleteUserLevel(id: number) {
  return service.post(`/admin/user_level/${id}/delete`)
}

export function updateUserLevelStatus(id: number, status: any) {
  return service.post(`/admin/user_level/${id}/update_status`, {
    status
  })
}
