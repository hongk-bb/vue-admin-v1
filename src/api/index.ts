import axios from './axios'

export function getStatistics1(): any {
  return axios.get('/admin/statistics1')
}
