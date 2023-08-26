import axios from 'axios';


export const apix = (locale: string) => axios.create({
    baseURL: `/${locale}/api/`,
});

