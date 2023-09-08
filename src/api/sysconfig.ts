import service from './axios'

export function getSysconfig() {
  return service.get(`/admin/sysconfig`)
}

export function setSysconfig(data: any) {
  return service.post(`/admin/sysconfig`, data)
}

export const uploadAction = '/api/admin/sysconfig/upload'
