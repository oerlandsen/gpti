import axios from 'axios';

const client = axios.create({
  baseURL: '/api-mercadolibre',
  headers: {
    'Authorization': `Bearer APP_USR-92783577301737-112608-21b350e21409f12e2c25fb7903fb682b-48687107`,
  },
});

export default client;
