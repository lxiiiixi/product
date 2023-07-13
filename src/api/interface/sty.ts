import Request from '../request';

export function getStyList() {
  return Request({
    method: 'GET',
    url: '/api/sty/list/all'
  });
}
