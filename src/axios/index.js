import axios from 'axios'

const api = axios.create({
    baseURL: "https://api.gestshop.ir/api"
})


export default api