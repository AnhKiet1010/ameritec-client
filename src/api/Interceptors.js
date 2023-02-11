import store from "../store/store";

export const AccessTokenInterceptor = {
    addAccessToken: (config) => {
        const headers = {
            ...config.headers,
            Accept: "application/json",
            "Content-Type": "application/json"
        };
        const accessToken = store.getState().auth.accessToken;
        if (accessToken) {
            headers.Authorization = `Bearer ${accessToken}`;
        }
        return { ...config, headers };
    },
    onRejected: (error) => {
        return Promise.reject(error);
    },
};

export const LanguageInterceptor = {
    addLanguage: (config) => {
        return { ...config };
    },
};

export const UnauthorizeInterceptor = {
    onFullfilled: (response) => {
        return Promise.resolve(response);
    },

    onRejected: (error) => {
        return Promise.resolve();
    },
};
