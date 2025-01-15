import axios from "axios";

const axios_instance = axios.create({
    baseURL: import.meta.env.VITE_REACT_APP_SERVER_URL
})

export default axios_instance;