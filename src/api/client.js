import axios from "axios";

const client = axios.create({
    baseURL: 'https://vendobuyo-api-gateway.onrender.com',
    // baseURL: 'http://localhost:3000',
  });

export default client;