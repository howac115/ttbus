import _axios from 'axios';

const axios = baseUrl => {
    const instance = _axios.create({
        baseURL: baseUrl
        // baseURL: 'http://localhost:5000'
    });
    return instance;
};

export { axios };

export default axios();
