import React, { useState, useEffect } from "react";

import PageTitle from "../components/Typography/PageTitle";
import CLIENT from "../api/Client";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import '../assets/css/PolicyDetail.css';


function PolicyDetail({ match }) {
    const { t, i18n } = useTranslation();
    const [html, setHtml] = useState("<div>Loading</div>");
    const [policy, setPolicy] = useState({});
    const { id } = match.params;

    function createMarkup() {
        return {
            __html: html
        };
    };

    const stringToHTML = function (str) {
        const domContainer = document.createElement("span");
        domContainer.innerHTML = str;
        return domContainer;
    };

    useEffect(() => {
        document.title = "Ameritec || " + t("Chi Tiết");
        let message = t('Đã xảy ra lỗi vui lòng thử lại sau');

        CLIENT.getPolicy({ id })
            .then((res) => {
                console.log('res', res.data);
                const status = res.data.status;
                if (status !== 200) {
                    toast.error(message);
                } else {
                    setPolicy(res.data.data.policy);
                    setHtml(i18n.language === 'vi' ? res.data.data.policy.text_vn : res.data.data.policy.text_en);
                }
            })
            .catch((err) => {
                console.log(err);
                toast.error(message);
            });
    }, [i18n.language]);

    return (
        <>
            <div className={`${id === process.env.REACT_APP_ID_MAIN_POLICY && "md:p-20 p-10"}`}>
                <PageTitle>{i18n.language === 'vi' ? policy.title_vn : policy.title_en}</PageTitle>
                <div className="my-2 italic">
                    <div>
                        {new Date(policy.ctime).toLocaleTimeString('vi').substring(0, new Date(policy.ctime).toLocaleTimeString('vi').length - 3)} - {new Date(policy.ctime).toLocaleDateString('vi')}
                    </div>
                    <div>
                        {policy.category === '1' && t('Chính Sách Công Ty')}
                        {policy.category === '2' && t('Tài Liệu Học Tập')}
                    </div>
                </div>
                <div className="flex items-center space-x-4 mt-3 mb-64">
                    {policy.type === 'text' && <div dangerouslySetInnerHTML={{ __html: html }} />}
                    {policy.type === 'file' &&
                        <div class="mt-3">
                            <label class="block text-sm text-gray-700 dark:text-gray-400" forHtml="title_en">
                                <span>{t('Tải File')} : </span>
                                <div className="mt-2">
                                <a className="font-normal underline text-blue-500" download rel="noopener noreferrer" target="_blank" href={`${process.env.REACT_APP_API_URL}/uploads/document/${i18n.language === 'vi' ? policy.filename : policy.filename_en}`}>{i18n.language === 'vi' ? policy.filename : policy.filename_en}</a>
                                </div>
                            </label>
                        </div>
                    }
                </div>
            </div>
        </>
    );
}

export default PolicyDetail;
