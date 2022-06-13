import Config from "backend/config.json";
import Axios from "axios";

export async function requestPOSTCartInsert(accessToken, movieId, quantity) {
    const requestBody = {
        movieId: movieId,
        quantity: quantity
    };

    const options = {
        method: "POST", // Method type
        baseURL: Config.billingServiceBaseUrl, // Base part of URL
        url: Config.billing.insert, // Path part of URL,
        data: requestBody, // Data to send in Body (The RequestBody to send)
        headers: {
            Authorization: "Bearer " + accessToken
        }
    }

    return Axios.request(options);
}

export async function requestPOSTCartUpdate(accessToken, movieId, quantity) {
    const requestBody = {
        movieId: movieId,
        quantity: quantity
    };

    const options = {
        method: "POST", // Method type
        baseURL: Config.billingServiceBaseUrl, // Base part of URL
        url: Config.billing.update, // Path part of URL,
        data: requestBody, // Data to send in Body (The RequestBody to send)
        headers: {
            Authorization: "Bearer " + accessToken
        }
    }

    return Axios.request(options);
}

export async function requestDELETECartDelete(accessToken, movieId) {
    const options = {
        method: "DELETE", // Method type
        baseURL: Config.billingServiceBaseUrl, // Base part of URL
        url: "/cart/delete/" + movieId, // Path part of URL,
        headers: {
            Authorization: "Bearer " + accessToken
        }
    }

    return Axios.request(options);
}

export async function requestGETCartRetrieve(accessToken) {
    const options = {
        method: "GET", // Method type
        baseURL: Config.billingServiceBaseUrl, // Base part of URL
        url: Config.billing.retrieve, // Path part of URL,
        headers: {
            Authorization: "Bearer " + accessToken
        }
    }

    return Axios.request(options);
}

export async function requestGETOrderList(accessToken) {
    const options = {
        method: "GET", // Method type
        baseURL: Config.billingServiceBaseUrl, // Base part of URL
        url: Config.billing.orderList, // Path part of URL,
        headers: {
            Authorization: "Bearer " + accessToken
        }
    }

    return Axios.request(options);
}

export async function requestGETOrderDetail(accessToken, saleId) {
    const options = {
        method: "GET", // Method type
        baseURL: Config.billingServiceBaseUrl, // Base part of URL
        url: "/order/detail/" + saleId, // Path part of URL,
        headers: {
            Authorization: "Bearer " + accessToken
        }
    }

    return Axios.request(options);
}

export async function requestGETOrderPayment(accessToken) {
    const options = {
        method: "GET", // Method type
        baseURL: Config.billingServiceBaseUrl, // Base part of URL
        url: Config.billing.orderPayment, // Path part of URL,
        headers: {
            Authorization: "Bearer " + accessToken
        }
    }

    return Axios.request(options);
}

export async function requestPOSTOrderComplete(accessToken, paymentIntentId) {
    const requestBody = {
        paymentIntentId: paymentIntentId,
    };

    const options = {
        method: "POST", // Method type
        baseURL: Config.billingServiceBaseUrl, // Base part of URL
        url: Config.billing.orderComplete, // Path part of URL,
        data: requestBody, // Data to send in Body (The RequestBody to send)
        headers: {
            Authorization: "Bearer " + accessToken
        }
    }

    return Axios.request(options);
}
