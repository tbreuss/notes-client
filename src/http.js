// http://testing.tebe.ch/wissen-api/public/api.php/articles

import axios from 'axios';

var instance = axios.create({
    baseURL: 'http://testing.tebe.ch/wissen-api/public/api.php/',
    //baseURL: 'http://localhost:8999/api.php/',
    headers: {
        //Authorization: 'Bearer {token}'
    }
});

// Add a request interceptor
instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config
}, function (error) {
    // Do something with request error
    return Promise.reject(error)
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Do something with response data
    return response
}, function (error) {
    // Do something with response error
    return Promise.reject(error)
});

export const HTTP = instance;
