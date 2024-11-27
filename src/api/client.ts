import axios from 'axios';

const client = axios.create({
  baseURL: 'https://api.mercadolibre.com',
  headers: {
    'Authorization': `Bearer APP_USR-92783577301737-112621-7ac8a254c71f38e96334b833859c6076-48687107`,
  },
});

export default client;
