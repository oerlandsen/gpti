import axios from 'axios';

const client = axios.create({
  baseURL: 'https://api.mercadolibre.com',
  headers: {
    'Authorization': `Bearer APP_USR-92783577301737-112517-3374cea6a34159edcfd42baf2021aef1-48687107`,
  },
});

export default client;
