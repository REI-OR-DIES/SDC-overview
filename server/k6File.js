import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 1,
  duration: '60s',
};

export default function () {
  http.get(`http://54.193.90.100:3001/api/products/id/${Math.ceil(Math.random() * 10000000)}`);
  sleep(1);
}
