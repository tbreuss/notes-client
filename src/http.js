// http://testing.tebe.ch/wissen-api/public/api.php/articles

import axios from 'axios';

export const HTTP = axios.create({
    baseURL: 'http://testing.tebe.ch/wissen-api/public/api.php/',
    //baseURL: 'http://jsonplaceholder.typicode.com/',
    headers: {
        //Authorization: 'Bearer {token}'
    }
})
