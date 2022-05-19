const axios = require('axios');
const FormData = require('form-data');

// Initial Config of API Route URLs
const http = axios.create({
  baseURL: 'http://18.141.0.46',
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
  withCredentials: true,
});

// Function for logging in user
export async function logIn(username, password) { 
  // return http.get('/sanctum/csrf-cookie').then(response => {
  //   http.post('/api/login', {
  //     'username': username,
  //     'password': password,
  //   }).then(response => {
  //     response.json().data
  //   }).catch(err => {
  //     console.log(err)
  //   })
  // });
  const csrf = await http.get('/sanctum/csrf-cookie');
  const response = await http.post('/api/login', {
    'username': username,
    'password': password,
  })
  return response;
}

