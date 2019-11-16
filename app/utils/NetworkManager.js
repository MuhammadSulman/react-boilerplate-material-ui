import axios from 'axios';

class Request {
    static defaultOptions () {
        return {
            baseURL: process.env.API_URL,
            config: {
                headers: {
                    'Accept-Encoding': 'gzip',
                    Authorization: localStorage.token ? `Basic ${localStorage.token}` : '',
                }
            }
        };
    }

    static customInstance(){
        let instance = axios.create({...this.defaultOptions()});

        instance.interceptors.response.use(function (response) {
            return response.data;
        }, function (error) {
            return  Promise.reject(error.response.data);
        });

        return instance;
    }

    static get(url, options = {}){
        return this.customInstance().get(url, { ...options });
    }

    static put(url, data, options = {}){
        return this.customInstance().put(url, data, {...options })
    }

    static post(url, data, options = {}){
        return this.customInstance().post(url, data, { ...options })
    }

    static delete(url, options = {}){
        return this.customInstance().delete(url, { ...options });
    }

}

export default Request;