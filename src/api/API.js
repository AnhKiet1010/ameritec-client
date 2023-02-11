import axios from "axios";
import queryString from "query-string";
import {
    URL_API_LOGIN,
    URL_API_REGISTER,
    URL_API_TRANSACTION,
    URL_API_ACTIVE_ACCOUNT,
    URL_API_CHECK_LINK,
    URL_API_CHECK_TRANS_ID,
    URL_API_FORGOT_PASSWORD,
    URL_API_RESET_PASSWORD,
    URL_API_GET_PACKAGE_LIST,
    URL_API_PAY_PAYPAL,
    URL_API_PAY_CREDIT,
    URL_API_WATCH_SUCCESS_PAYMENT
} from './URL';

import { AccessTokenInterceptor, UnauthorizeInterceptor } from "./Interceptors";


const getInstance = () => {
    const instance = axios.create({
        baseURL: `${process.env.REACT_APP_API_URL}`,
        // timeout: 120000,
        paramsSerializer: params => queryString.stringify(params),
        headers: {'Access-Control-Allow-Origin': '*'}
    });
    instance.interceptors.response.use(UnauthorizeInterceptor.onFullfilled, UnauthorizeInterceptor.onRejected);
    instance.interceptors.request.use(AccessTokenInterceptor.addAccessToken, AccessTokenInterceptor.onRejected);
    return instance;
};

const API = { instance: getInstance() };

API.switchServer = () => {
    API.instance = getInstance();
};

API.checkLink = (body) => {
    return API.instance.post(URL_API_CHECK_LINK, body)
};

API.checkTransId = (body) => {
    return API.instance.post(URL_API_CHECK_TRANS_ID, body)
};

API.getPackageList = (body) => {
    return API.instance.post(URL_API_GET_PACKAGE_LIST, body)
};

API.login = (body) => {
    return API.instance.post(URL_API_LOGIN, body);
};

API.register = (body) => {
    return API.instance.post(URL_API_REGISTER, body);
};

API.transaction = (body) => {
    return API.instance.post(URL_API_TRANSACTION, body);
};

API.active = (body) => {
    return API.instance.post(URL_API_ACTIVE_ACCOUNT, body);
};

API.forgot = (body) => {
    return API.instance.post(URL_API_FORGOT_PASSWORD, body);
};

API.reset = (body) => {
    return API.instance.post(URL_API_RESET_PASSWORD, body);
};

API.payWithPaypal = (body) => {
    return API.instance.post(URL_API_PAY_PAYPAL, body);
};

API.payWithCredit = (body) => {
    return API.instance.post(URL_API_PAY_CREDIT, body);
};

API.successWatched = (body) => {
    return API.instance.post(URL_API_WATCH_SUCCESS_PAYMENT, body);
};

export default API;
