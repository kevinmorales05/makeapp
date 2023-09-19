import axios from 'axios';


export const apix = () => axios.create({
    baseURL: `/api/`,
});

