import axios from "axios";
import { toast } from "react-toastify";

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_API,
  headers: { "Content-Type": "application/json" },
  // params: {
  //   api_key: process.env.REACT_APP_BACKEND_APIKEY,
  //   language: `en-US`,
  //   page: 1,
  // },
});

// Add a request interceptor
api.interceptors.request.use(
  function (request) {
    // Do something before request is sent
    console.log(`Start Requesting`, request);
    return request;
  },
  function (error) {
    // Do something with request error
    console.log(`Something wrong while requesting`, error);
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    console.log(`Response success`, response);
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.log(`Response fail ->`, error);
    toast.error(error.response.data.messsage);
    return Promise.reject(error);
  }
);

export default api;
