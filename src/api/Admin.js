import {
    URL_API_ADMIN_DASHBOARD,
    URL_API_ADMIN_USERS,
    URL_API_ADMIN_TREE,
    URL_API_ADMIN_PENDING_TRANSACTION,
    URL_API_ADMIN_COUNT_PENDING_TRANSACTION,
    URL_API_ADMIN_STORAGE,
    URL_API_ADMIN_GET_USER,
    URL_API_ADMIN_GET_EXPORT_CHILD_USER,
    URL_API_ADMIN_EDIT_USER,
    URL_API_ADMIN_CREATE_ADMIN,
    URL_API_ADMIN_CREATE_USER,
    URL_API_ADMIN_CREATE_POLICY,
    URL_API_ADMIN_POLICY,
    URL_API_ADMIN_GET_RECEIPTS,
    URL_API_ADMIN_GET_COM_DETAIL,
    URL_API_ADMIN_EDIT_TREE,
    URL_API_ACTIVE_TRANS,
    URL_API_ADMIN_DELETE_USER,
    URL_API_ADMIN_DASHBOARD_RANK,
    URL_API_ADMIN_GET_UPDATE_TRANS,
    URL_API_ADMIN_GET_UPDATE_STATUS_COMMISSION,
    URL_API_ADMIN_GET_UPDATE_RECEIVE_MEM_ID,
    URL_API_ADMIN_GET_DELETE_TRANS,
    URL_API_ADMIN_GET_REQUEST_LIST,
    URL_API_ADMIN_REQUEST_USER,
    URL_API_ADMIN_CREATE_BONUS,
    URL_API_ADMIN_COUNT_REQUEST,
    URL_API_ADMIN_DELETE_POLICY,
    URL_API_ADMIN_GET_POLICY,
    URL_API_ADMIN_EDIT_POLICY,
    URL_API_ADMIN_GET_PACKAGE_LIST,
    URL_API_ADMIN_UPDATE_PACKAGE,
    URL_API_ADMIN_GET_LIST_MAIL_TEMPLATE,
    URL_API_ADMIN_GET_UPDATE_MAIL_TEMPLATE,
    URL_API_ADMIN_BLOCK_USER,
    URL_API_ADMIN_UNBLOCK_USER,
    URL_API_ADMIN_CHANGE_STATUS_REQUEST,
    URL_API_ADMIN_RENEW,
    URL_API_ADMIN_LIST_DELETE_USER,
    URL_API_ADMIN_DELETE_TRASH_USER,
    URL_API_ADMIN_DELETE_STORAGE,
    URL_API_ADMIN_DELETE_REQUEST,
    URL_API_ADMIN_GET_BONUS_BY_USER,
    URL_API_ADMIN_DELETE_BONUS,
    URL_API_ADMIN_DELETE_ADMIN,
    URL_API_ADMIN_GET_ADMIN_LIST,
    URL_API_ADMIN_CHILD_TREE_BY_ID,
    URL_API_ADMIN_GET_RETURN_COMMISSION_NL,
    URL_API_ADMIN_CHECK_CASH_OUT_NL
 } from "./URL";
import API from "./API";

const Admin = {
    dashboard: () => {
        let Url = URL_API_ADMIN_DASHBOARD;
        return API.instance.get(Url);
    },
    rank: () => {
        let Url = URL_API_ADMIN_DASHBOARD_RANK;
        return API.instance.get(Url);
    },
    users: (body) => {
        return API.instance.post(URL_API_ADMIN_USERS, body);
    },
    getUser: (id) => {
        let Url = URL_API_ADMIN_GET_USER.replace(":id", id);
        return API.instance.get(Url);
    },
    getExportListChildData: (body) => {
        return API.instance.post(URL_API_ADMIN_GET_EXPORT_CHILD_USER, body);
    },
    editUser: (body) => {
        return API.instance.post(URL_API_ADMIN_EDIT_USER, body);
    },
    tree: (body) => {
        return API.instance.post(URL_API_ADMIN_TREE, body);
    },
    getChildTreeById: (body) => {
        return API.instance.post(URL_API_ADMIN_CHILD_TREE_BY_ID, body);
    },
    getPendingList: (body) => {
        return API.instance.post(URL_API_ADMIN_PENDING_TRANSACTION, body);
    },
    getCountPendingList: () => {
        return API.instance.get(URL_API_ADMIN_COUNT_PENDING_TRANSACTION);
    },
    getStorage: (body) => {
        return API.instance.post(URL_API_ADMIN_STORAGE, body);
    },
    getPolicyList: (body) => {
        return API.instance.post(URL_API_ADMIN_POLICY, body);
    },
    deletePolicy: (body) => {
        return API.instance.post(URL_API_ADMIN_DELETE_POLICY, body);
    },
    getPolicy: (body) => {
        return API.instance.post(URL_API_ADMIN_GET_POLICY, body);
    },
    editPolicy: (body) => {
        return API.instance.post(URL_API_ADMIN_EDIT_POLICY, body);
    },
    getReceipts: (body) => {
        return API.instance.post(URL_API_ADMIN_GET_RECEIPTS, body);
    },
    getDetailCommission: (body) => {
        return API.instance.post(URL_API_ADMIN_GET_COM_DETAIL, body);
    },
    updateReceiveMemId: (body) => {
        return API.instance.post(URL_API_ADMIN_GET_UPDATE_RECEIVE_MEM_ID, body);
    },
    updateStatusCommission: (body) => {
        return API.instance.post(URL_API_ADMIN_GET_UPDATE_STATUS_COMMISSION, body);
    },
    createAdmin: (body) => {
        return API.instance.post(URL_API_ADMIN_CREATE_ADMIN, body);
    },
    createUser: (body) => {
        return API.instance.post(URL_API_ADMIN_CREATE_USER, body);
    },
    createBonus: (body) => {
        return API.instance.post(URL_API_ADMIN_CREATE_BONUS, body);
    },
    requestBonusUser: (body) => {
        return API.instance.post(URL_API_ADMIN_REQUEST_USER, body);
    },
    deleteUser: (body) => {
        return API.instance.post(URL_API_ADMIN_DELETE_USER, body);
    },
    editTree: (body) => {
        return API.instance.post(URL_API_ADMIN_EDIT_TREE, body);
    },
    updateTransPaymentMethod: (body) => {
        return API.instance.post(URL_API_ADMIN_GET_UPDATE_TRANS, body);
    },
    createPolicy: (body) => {
        return API.instance.post(URL_API_ADMIN_CREATE_POLICY, body);
    },
    activeTrans: (id) => {
        let Url = URL_API_ACTIVE_TRANS.replace(":id", id);
        return API.instance.get(Url);
    },
    deleteTrans: (body) => {
        return API.instance.post(URL_API_ADMIN_GET_DELETE_TRANS, body);
    },
    getRequestList: (body) => {
        return API.instance.post(URL_API_ADMIN_GET_REQUEST_LIST, body);
    },
    countRequestUser: () => {
        return API.instance.get(URL_API_ADMIN_COUNT_REQUEST);
    },
    getListPackage: (body) => {
        return API.instance.post(URL_API_ADMIN_GET_PACKAGE_LIST, body);
    },
    updatePackage: (body) => {
        return API.instance.post(URL_API_ADMIN_UPDATE_PACKAGE, body);
    },
    getListMailTemplate: (body) => {
        return API.instance.post(URL_API_ADMIN_GET_LIST_MAIL_TEMPLATE, body);
    },
    updateMailTemplate: (body) => {
        return API.instance.post(URL_API_ADMIN_GET_UPDATE_MAIL_TEMPLATE, body);
    },
    blockUser: (body) => {
        return API.instance.post(URL_API_ADMIN_BLOCK_USER, body);
    },
    unBlockUser: (body) => {
        return API.instance.post(URL_API_ADMIN_UNBLOCK_USER, body);
    },
    changeRequestStatus: (body) => {
        return API.instance.post(URL_API_ADMIN_CHANGE_STATUS_REQUEST, body);
    },
    renewLicense: (body) => {
        return API.instance.post(URL_API_ADMIN_RENEW, body);
    },
    getListDeleteUser: (body) => {
        return API.instance.post(URL_API_ADMIN_LIST_DELETE_USER, body);
    },
    deleteTrashUser: (body) => {
        return API.instance.post(URL_API_ADMIN_DELETE_TRASH_USER, body);
    },
    deleteStorage: (body) => {
        return API.instance.post(URL_API_ADMIN_DELETE_STORAGE, body);
    },
    deleteRequest: (body) => {
        return API.instance.post(URL_API_ADMIN_DELETE_REQUEST, body);
    },
    getListBonusByUserId: (body) => {
        return API.instance.post(URL_API_ADMIN_GET_BONUS_BY_USER, body);
    },
    deleteBonus: (body) => {
        return API.instance.post(URL_API_ADMIN_DELETE_BONUS, body);
    },
    getListAdmin: (body) => {
        return API.instance.post(URL_API_ADMIN_GET_ADMIN_LIST, body);
    },
    deleteAdmin: (body) => {
        return API.instance.post(URL_API_ADMIN_DELETE_ADMIN, body);
    },
    returnCommissionNL: (body) => {
        return API.instance.post(URL_API_ADMIN_GET_RETURN_COMMISSION_NL, body);
    },
    checkCashOutStatusNL: (body) => {
        return API.instance.post(URL_API_ADMIN_CHECK_CASH_OUT_NL, body);
    },
};

export default Admin;
