// ✨ implement axiosWithAuth

import axios from "axios";


export const axiosWithAuth = () => {
    const token = localStorage.getItem('token');

    return axios.create({ baseURL: 'http://localHost:3000', headers: { authorization: token } })
}