import { 
    URL_API_CLIENT_DASHBOARD,
    URL_API_CLIENT_DASHBOARD_TOTAL_POINT,
    URL_API_CLIENT_DASHBOARD_COUNT_PACKAGE,
    URL_API_CLIENT_DASHBOARD_USER_INFO,
    URL_API_CLIENT_TREE,
    URL_API_CLIENT_GET_CHILD_TREE,
    URL_API_CLIENT_GET_LIST_CHILDS_IN_TREE,
    URL_API_CLIENT_PROFILE,
    URL_API_CLIENT_PROFILE_EDIT,
    URL_API_CLIENT_INVITE_URL,
    URL_API_CLIENT_GET_RECEIPTS,
    URL_API_CLIENT_UPGRADE,
    URL_API_CLIENT_CREATE_REQUEST,
    URL_API_CLIENT_GET_RANK_500,
    URL_API_CLIENT_GET_HEADER,
    URL_API_CLIENT_REQUEST_RENEW,
    URL_API_CLIENT_POLICY,
    URL_API_CLIENT_GET_POLICY,
    URL_API_CLIENT_GET_REQUEST
 } from "./URL";
import API from "./API";

const Client = {
    dashboard: (id) => {
        let Url = URL_API_CLIENT_DASHBOARD.replace(":id", id);
        return API.instance.get(Url);
    },
    dashboardTotalPoint: (id) => {
        let Url = URL_API_CLIENT_DASHBOARD_TOTAL_POINT.replace(":id", id);
        return API.instance.get(Url);
    },
    dashboardCountPackage: (id) => {
        let Url = URL_API_CLIENT_DASHBOARD_COUNT_PACKAGE.replace(":id", id);
        return API.instance.get(Url);
    },
    dashboardUserInfo: (id) => {
        let Url = URL_API_CLIENT_DASHBOARD_USER_INFO.replace(":id", id);
        return API.instance.get(Url);
    },
    getRank500: (body) => {
        return API.instance.post(URL_API_CLIENT_GET_RANK_500, body);
    },
    getHeaderDashBoard: (body) => {
        return API.instance.post(URL_API_CLIENT_GET_HEADER, body);
    },
    tree: (body) => {
        return API.instance.post(URL_API_CLIENT_TREE, body);
    },
    getChildInTree: (body) => {
        return API.instance.post(URL_API_CLIENT_GET_CHILD_TREE, body);
    },
    getListChildInTree: (body) => {
        return API.instance.post(URL_API_CLIENT_GET_LIST_CHILDS_IN_TREE, body);
    },
    upgrade: (body) => {
        return API.instance.post(URL_API_CLIENT_UPGRADE, body);
    },
    profile: (id) => {
        let Url = URL_API_CLIENT_PROFILE.replace(":id", id);
        return API.instance.get(Url);
    },
    editProfile: (body) => {
        return API.instance.post(URL_API_CLIENT_PROFILE_EDIT, body);
    },
    inviteUrl: (body) => {
        return API.instance.post(URL_API_CLIENT_INVITE_URL, body);
    },
    receipts: (id) => {
        let Url = URL_API_CLIENT_GET_RECEIPTS.replace(":id", id);
        return API.instance.get(Url);
    },
    getPolicyList: (body) => {
        return API.instance.post(URL_API_CLIENT_POLICY, body);
    },
    getPolicy: (body) => {
        return API.instance.post(URL_API_CLIENT_GET_POLICY, body);
    },
    createRequest: (body) => {
        return API.instance.post(URL_API_CLIENT_CREATE_REQUEST, body);
    },
    requestRenew: (body) => {
        return API.instance.post(URL_API_CLIENT_REQUEST_RENEW, body);
    },
    getRequestList: (body) => {
        return API.instance.post(URL_API_CLIENT_GET_REQUEST, body);
    },
};

export default Client;