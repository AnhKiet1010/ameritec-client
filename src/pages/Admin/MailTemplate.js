import React, { useEffect, useState } from "react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import ADMIN from "../../api/Admin";
import { Button } from "@windmill/react-ui";
import Spinner from "../../components/Spinner";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import InputField from "../../components/CustomFields/input-field";
import SelectField from "../../components/CustomFields/select-field";
import { CATEGORY } from "../../constants/documentCategory";

function MailTemplate() {
    const [data, setData] = useState([]);
    const [currentShowTab, setCurrentShowTab] = useState(0);
    const [currentUpdateMail, setCurrentUpdateMail] = useState({});
    const [dataContentVN, setDataContentVN] = useState("");
    const [dataContentEN, setDataContentEN] = useState("");
    const [refresh, setRefresh] = useState(false);
    const [key, setKey] = useState(0);

    const initialValues = {
        id: currentUpdateMail._id,
        subject_vn: currentUpdateMail.subject_vn,
        subject_en: currentUpdateMail.subject_en,
        content_vn: dataContentVN,
        content_en: dataContentEN,
    };

    const validationSchema = Yup.object().shape({
        subject_vn: Yup.string().required("Không được để trống"),
        content_vn: Yup.string().required("Không được để trống"),
        subject_en: Yup.string().required("Không được để trống"),
        content_en: Yup.string().required("Không được để trống"),
    });

    useEffect(() => {
        ADMIN.getListMailTemplate()
            .then((res) => {
                const status = res.data.status;
                if (status === 200) {
                    setData(res.data.data.mail);
                    setCurrentUpdateMail(res.data.data.mail[key]);
                    setDataContentVN(res.data.data.mail[key].content_vn);
                    setDataContentEN(res.data.data.mail[key].content_en);
                } else {
                    toast.error(res.data.message);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, [refresh]);

    const handleCurrentShowTabChange = (key) => {
        setCurrentShowTab(key);
        setCurrentUpdateMail(data[key]);
        setDataContentVN(data[key].content_vn);
        setDataContentEN(data[key].content_en);
    }

    const handleSubmit = (values, { setSubmitting }) => {
        let message = 'Đã xảy ra lỗi vui lòng thử lại sau';

        ADMIN.updateMailTemplate(values)
            .then((res) => {
                const status = res.data.status;
                if (status === 200) {
                    setSubmitting(false);
                    toast.success(res.data.message);
                    setRefresh(!refresh);
                } else {
                    toast.error(res.data.message);
                    setSubmitting(false);
                }
            })
            .catch((error) => {
                console.log(error);
                setSubmitting(false);
                toast.error(message);
            });
    };

    return (
        <>
            <ToastContainer />
            <div className="grid">
                <div className="flex items-start justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
                    <ToastContainer />
                    <div className="flex-1 h-full max-w-4xl dark:bg-gray-800">
                        <div className="flex flex-col items-center">
                            <Formik
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={handleSubmit}
                                enableReinitialize
                            >
                                {(formikProps) => {
                                    const { isSubmitting, setFieldValue } = formikProps;

                                    return (
                                        <Form className="flex flex-col items-center justify-center w-full">
                                            <div className="flex justify-between my-6 w-full">
                                                <h1 className="text-2xl font-semibold text-gray-700">Cài đặt Mail</h1>
                                            </div>
                                            <div className="grid grid-cols-1 xl:grid-cols-3 md:grid-cols-2 mb-4">
                                                {
                                                    data.map((mail, index) => {
                                                        return <div key={mail._id} onClick={() => {
                                                            handleCurrentShowTabChange(index);
                                                            setKey(index);
                                                        }} className={`border-blue-500 transition-all cursor-pointer ${currentShowTab === index && "border-b-2 font-bold"} uppercase px-4 py-2`}>{mail.subject_vn}</div>;
                                                    })
                                                }
                                            </div>
                                            <div className="w-full">
                                                <Field
                                                    component={InputField}
                                                    name="subject_vn"
                                                    type="text"
                                                    placeholder="Nhập chủ đề đề tiếng Việt"
                                                    label="Chủ đề tiếng Việt"
                                                />
                                                <Field
                                                    component={InputField}
                                                    name="subject_en"
                                                    type="text"
                                                    placeholder="Nhập chủ đề tiếng Anh"
                                                    label="Chủ đề tiếng Anh"
                                                />
                                                <div className="mb-3">
                                                    <span className="mb-2 block text-lg text-gray-700">Nội dung Tiếng Việt</span>
                                                    <CKEditor
                                                        editor={ClassicEditor}
                                                        data={dataContentVN}
                                                        onChange={(event, editor) => {
                                                            let data = editor.getData();
                                                            setFieldValue('content_vn', data);
                                                        }}
                                                    />
                                                </div>
                                                <div className="mb-3">
                                                    <span className="mb-2 block text-lg text-gray-700">Nội dung Tiếng Anh</span>
                                                    <CKEditor
                                                        editor={ClassicEditor}
                                                        data={dataContentEN}
                                                        onChange={(event, editor) => {
                                                            let data = editor.getData();
                                                            setFieldValue('content_en', data);
                                                        }}
                                                    />
                                                </div>
                                                <div className="px-6 pt-6 mt-8 mb-20">
                                                    <h2 className="text-xl">* <strong>Chú thích</strong> : </h2>
                                                    <ul>
                                                        <li className="my-2"><span role="img" aria-label="emoji">❗</span> [NGAY_HET_HAN] = ngày hết hạn</li>
                                                        <li className="my-2"><span role="img" aria-label="emoji">❗</span> [DANH_SACH_TAI_KHOAN] =  danh sách link kích hoạt</li>
                                                        <li className="my-2"><span role="img" aria-label="emoji">❗</span> [SANPHAM] = thông tin sản phẩm</li>
                                                        <li className="my-2"><span role="img" aria-label="emoji">❗</span> [CHU_KY] = chữ ký mail</li>
                                                        <li className="my-2"><span role="img" aria-label="emoji">❗</span> [FULL_NAME] = tên user</li>
                                                        <li className="my-2"><span role="img" aria-label="emoji">❗</span> [LINK_GIOI_THIEU] = Danh sách link giới thiệu</li>
                                                        <li className="my-2"><span role="img" aria-label="emoji">❗</span> [LINK_RESET_PASS] = đường dẫn khôi phục mật khẩu</li>
                                                        <li className="my-2"><span role="img" aria-label="emoji">❗</span> [THONG_TIN] = thông tin tài khoản</li>
                                                        <li className="my-2"><span role="img" aria-label="emoji">❗</span> [EMAIL] = Email khách</li>
                                                        <li className="my-2"><span role="img" aria-label="emoji">❗</span> [LEVEL] = level người dùng</li>
                                                    </ul>
                                                </div>
                                                <Button type="submit" block className="mt-8 mb-8" disabled={isSubmitting}>
                                                    {isSubmitting ? (
                                                        <Spinner />
                                                    ) : (
                                                        <i className="fas fa-sign-in-alt  w-6 -ml-2 mx-3" />
                                                    )}
                                                    Chỉnh sửa
                                                </Button>
                                            </div>
                                        </Form>
                                    );
                                }}
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MailTemplate;
