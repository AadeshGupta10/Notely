import axios from "axios";

const axios_instance = axios.create({
    baseURL: import.meta.env.VITE_REACT_APP_SERVER_URL,
    headers: {
        'Content-Type': 'application/json',
    }
})

export default axios_instance;