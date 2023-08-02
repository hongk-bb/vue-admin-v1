import axios from './axios'

export function getStatistics1(): any {
  return axios.get('/admin/statistics1')
}

export function getStatistics2(): any {
  return axios.get('/admin/statistics2')
}

export function getStatistics3(type: string): any {
  return axios.get('/admin/statistics3?type=' + type)
}
