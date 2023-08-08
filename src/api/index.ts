import service from './axios'

export function getStatistics1(): any {
  return service.get('/admin/statistics1')
}

export function getStatistics2(): any {
  return service.get('/admin/statistics2')
}

export function getStatistics3(type: string): any {
  return service.get('/admin/statistics3?type=' + type)
}
