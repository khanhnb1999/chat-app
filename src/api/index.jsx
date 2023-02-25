import axios from 'axios';

export default axios.create({
       baseURL: 'http://localhost:3003/api'
})

export const urlImage = 'http://localhost:3003/image/';