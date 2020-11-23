import axios from 'axios';
const baseUrl = 'http://localhost:3001/persons'

const get = (id) => {
    return axios.get(`${baseUrl}/${id}`)
}

const getAll = () => {
    return axios.get(baseUrl);
}

const destroy = (id) => {
    return axios.delete(`${baseUrl}/${id}`);
}

const create = (data) => { 
    return axios.post(baseUrl, data);
} 

const update = (id, data) => {
    return axios.put(`${baseUrl}/${id}`, data);
}

export default {
    get: get,
    getAll: getAll,
    create: create,
    update: update,
    destroy: destroy
}