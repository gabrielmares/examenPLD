import axios from 'axios';
// axios.defaults.headers.post['Content-Type'] ='application/json';

const clienteAxios = axios.create({
    baseURL: process.env.REACT_APP_API_URL  

});

export default clienteAxios; 