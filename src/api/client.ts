import axios from 'axios';

const client = axios.create({
  baseURL: '/api-mercadolibre',
  headers: {
    'Authorization': `Bearer APP_USR-92783577301737-112615-9a5ae0381638b10b4a6273106c2bc985-48687107`,
  },
});

export default client;
