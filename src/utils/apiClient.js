import React from "react";
import axios from "axios";
import {toast} from "react-toastify";
import { deleteToken } from "pages/bol_info/utility/Utility";
import { TOKEN } from "pages/bol_info/constants/BOLConstants";

// Set config defaults when creating the instance
const ApiClient = axios.create({
    baseURL: process.env.REACT_APP_API_FREIGHT_URL, 
    headers: localStorage.getItem(TOKEN) ? {
        [TOKEN]: `Bearer ${localStorage.getItem(TOKEN)}`
    } : {}
});

export const ApiClientFileDownload = axios.create({
    baseURL: process.env.REACT_APP_API_FREIGHT_URL, 
    headers: localStorage.getItem(TOKEN) ? {
        [TOKEN]: `Bearer ${localStorage.getItem(TOKEN)}`,
    } : {},
    responseType: 'blob'
});

// Alter defaults after instance has been created
// ApiClient.defaults.headers.common['Accept'] = 'application/json';
// ApiClient.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// Error handler (by a response interceptor)
ApiClient.interceptors.response.use(function (response) {
    // Do nothing with response data
    return response.data;
}, function (error) {
    // Do something with response error
    // For now just print in console
    // TODO: Add better error handler
    console.log('[ApiClient] Error handler');
    if (error.response) {
        // The request was made and the server responded with a status code
        console.log(error.response.data);
        console.log(error.response.headers);
        console.log('status code: ' + error.response.status);
        notifyError(error.response.data);
        if(error.response.status === 403) {
            notifyError(error.response.data);
        }
        else if (error.response.status === 401 && error.response.data?.loginUrl) {
            deleteToken(TOKEN);
            window.location.replace(`${error.response.data.loginUrl}?url=${window.location.origin}${window.location.pathname}`);
        }
    } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
    } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
    }
    return Promise.reject(error);
});

/**
 * Display warning message with error response data
 * @param data
 */
const notifyError = (data) => {
    toast.error(getErrorMessageContent(data), {
        position: "top-right",
        autoClose: false,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
    });
};

/**
 * parse and build error message content
 * @param errorData
 * @returns {JSX.Element}
 */
const getErrorMessageContent = (errorData) => {
    let errorList = [];

    //Check if error response include list of errors
    if (errorData.errors) {
        errorList = Object.values(errorData.errors).flat();
    }

    return (
        <div>
            <span className="font-weight-bold">{errorData.message}</span>
            <ul>
                {errorList.map((item, index) =>
                    <li key={index} >{item.message}</li>
                )}
            </ul>
        </div>
    );
}

export default ApiClient;
