import axios from "axios";

const client = axios.create({
    baseURL: 'https://vendobuyo-api-gateway.onrender.com',
  });

export default client;