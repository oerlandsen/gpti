import axios from 'axios';

const client = axios.create({
  baseURL: 'https://mercadovision-api.onrender.com',
});

export default client;
