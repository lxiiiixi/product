import Request from '../request';

export function getRiskList() {
  return Request({
    method: 'GET',
    url: '/api/risk/list/all'
  });
}
