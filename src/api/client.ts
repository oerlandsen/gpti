import axios from 'axios';

const client = axios.create({
  baseURL: '/api-mercadolibre',
  headers: {
    'Authorization': `Bearer APP_USR-92783577301737-112719-35dbbd096c9b6fdf97eba895f3d29885-48687107`,
  },
});

export default client;
