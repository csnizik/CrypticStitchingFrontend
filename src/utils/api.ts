import axios from 'axios'

const api = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? 'https://to-be-determined-endpoint.com'
      : 'https://localhost:5000',
})
export default api
