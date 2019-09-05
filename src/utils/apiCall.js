import axios from 'axios';
const environment = process.env.NODE_ENV;



let api_url = environment === "production" ? 'https://ht-fullstack.herokuapp.com/api' : 'http://localhost:5000/api';

class ApiCall {


    post = (url, data, token = null) => new Promise((resolve, reject) => {

        var headers = {
            'Authorization': "Bearer " + token
        };

        axios.post(api_url + url, data, token !== null ? { headers } : undefined)
            .then(function (response) {
                resolve(response);
            })
            .catch(function (error) {
                reject(error);
            });
    });

    get = (url, token) => new Promise((resolve, reject) => {
        var headers = {
            'Authorization': "Bearer " + token
        };

        axios.get(api_url + url, { headers })
            .then(function (response) {
                resolve(response);
            })
            .catch(function (error) {
                reject(error);
            })
    })


}


export default new ApiCall();