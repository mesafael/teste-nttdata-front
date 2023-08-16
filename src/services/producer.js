import axios from 'axios';

const url = "http://localhost:3000/producer";


export const addProducerService = (data) => {
    return axios.post(`${url}/add`,data)
}
export const getProducersService = () => {
    return axios.get(`${url}/get`)
}
export const updateProducerService = (data) => {
    return axios.patch(`${url}/update/`, data)
}
export const deleteProducerService = (data) => {
    return axios.delete(`${url}/delete/${data.cpf}`)
}
export const getProducersCultureService = () => {
    return axios.get(`${url}/culture/get`)
}
export const getProducersAgriVegService = () => {
    return axios.get(`${url}/agriveg/get`)
}
export const getProducersStatesService = () => {
    return axios.get(`${url}/state/get`)
}