import React, { useEffect, useState } from "react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import ADMIN from "../../api/Admin";
import { Button } from "@windmill/react-ui";
import Spinner from "../../components/Spinner";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import DropFileInput from '../../components/DropFileInput/DropFileInput';
import InputField from "../../components/CustomFields/input-field";
import SelectField from "../../components/CustomFields/select-field";
import { CATEGORY } from "../../constants/documentCategory";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import "../../assets/css/Payment.css";
import { useHistory } from 'react-router-dom';

function PolicyDetail({ match }) {
    let message = 'Đã xảy ra lỗi vui lòng thử lại sau';
    const [currentViewType, setCurrentViewType] = useState('');
    const [policy, setPolicy] = useState({});
    const [dataTextVN, setDataTextVN] = useState("");
    const [dataTextEN, setDataTextEN] = useState("");
    const [filename, setFilename] = useState("");
    const [filename_en, setFilenameEn] = useState("");
    const { id } = match.params;
    const history = useHistory();

    const initialValues = {
        id,
        title_vn: policy.title_vn,
        title_en: policy.title_en,
        text_vn: dataTextVN,
        text_en: dataTextEN,
        type: policy.type,
        file: policy.file,
        file_en: policy.file_en,
        category: policy.category
    };

    const validationSchema = Yup.object().shape({
        category: Yup.string().required("Không được để trống"),
        title_vn: Yup.string().required("Không được để trống"),
        title_en: Yup.string().required("Không được để trống"),
    });

    const handleDeletePolicy = (id, name) => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className="custom-ui">
                        <h1>❗ Xóa tài liệu ❗</h1>
                        <p>
                            Bạn muốn xóa tài liệu : <span className="font-bold">{name}</span>
                        </p>
                        <br />

                        <button className="" onClick={() => onClose()}>Hủy</button>
                        <button
                            className="red"
                            onClick={() => {
                                ADMIN.deletePolicy({ id })
                                    .then((res) => {
                                        const status = res.data.status;
                                        if (status !== 200) {
                                            toast.error(res.data.message);
                                        } else {
                                            onClose();
                                            toast.success(res.data.message);
                                            history.push('/admin/policy');
                                        }
                                    })
                                    .catch((err) => {
                                        toast.error(message);
                                    });
                            }}
                        >
                            Xác nhận
                        </button>
                    </div>
                );
            },
            closeOnEscape: false,
            closeOnClickOutside: false,
        });
    }

    useEffect(() => {
        ADMIN.getPolicy({ id })
            .then((res) => {
                const status = res.data.status;
                if (status !== 200) {
                    toast.error(message);
                } else {
                    setPolicy(res.data.data.policy);
                    setDataTextVN(res.data.data.policy.text_vn);
                    setDataTextEN(res.data.data.policy.text_en);
                    setCurrentViewType(res.data.data.policy.type);
                    setFilename(res.data.data.policy.filename);
                    setFilenameEn(res.data.data.policy.filename_en);
                }
            })
            .catch((err) => {
                console.log(err);
                toast.error(message);
            });
    }, []);

    const handleSubmit = (values, { setSubmitting, resetForm }) => {
        let message = 'Đã xảy ra lỗi vui lòng thử lại sau';

        var formData = new FormData();

        formData.append("id", values.id);
        formData.append("category", values.category);
        formData.append("title_vn", values.title_vn);
        formData.append("text_vn", values.text_vn);
        formData.append("title_en", values.title_en);
        formData.append("text_en", values.text_en);
        formData.append('file', values.file);
        formData.append('file_en', values.file_en);
        formData.append('type', values.type);

        ADMIN.editPolicy(values.type === 'text' ? { ...values } : formData)
            .then((res) => {
                const status = res.data.status;
                if (status === 200) {
                    setSubmitting(false);
                    toast.success(res.data.message);
                    history.push('/admin/policy');
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
                                                <h1 className="text-2xl font-semibold text-gray-700">Tạo Tài Liệu mới</h1>
                                                <div className="flex justify-end">
                                                    <div className={`${id === process.env.REACT_APP_ID_MAIN_POLICY && 'hidden'}`}>
                                                        <Button onClick={() => handleDeletePolicy(policy._id, policy.title_vn)}>Xóa bài viết</Button>
                                                    </div>
                                                    <div>
                                                        <a href="/admin/policy" className="ml-4 flex items-center cursor-pointer justify-between text-sm font-semibold text-red-100 px-4 py-2 bg-red-600 rounded-lg shadow-md focus:outline-none focus:shadow-outline-red">
                                                            <span className="mr-2 text-md" dangerouslySetInnerHTML={{ __html: '&LeftArrow;' }}></span>
                                                            <span>Trở về</span>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="w-full">
                                                <Field
                                                    component={SelectField}
                                                    name="category"
                                                    options={CATEGORY}
                                                    label="Chủ Đề"
                                                    placeholder="Chọn chủ đề"
                                                />
                                                <Field
                                                    component={InputField}
                                                    name="title_vn"
                                                    type="text"
                                                    placeholder="Nhập tiêu đề tiếng Việt"
                                                    label="Tiêu đề tiếng Việt"
                                                />
                                                <Field
                                                    component={InputField}
                                                    name="title_en"
                                                    type="text"
                                                    placeholder="Nhập tiêu đề tiếng Anh"
                                                    label="Tiêu đề tiếng Anh"
                                                />
                                                {currentViewType === 'file' &&
                                                    <div class="mt-3">
                                                        <label class="block text-sm text-gray-700 dark:text-gray-400" forhtml="title_en">
                                                            <span>Tải File (Tiếng Việt) : </span>
                                                            <div className="mt-2">
                                                                <a className="font-normal underline text-blue-500" href={`${process.env.REACT_APP_API_URL}/uploads/document/${filename}`} download>{filename}</a>
                                                            </div>
                                                        </label>
                                                    </div>
                                                }
                                                {currentViewType === 'file' &&
                                                    <div className="mt-6 flex flex-col items-center">
                                                        <DropFileInput
                                                            onFileChange={(files) => setFieldValue('file', files[0])}
                                                        />
                                                    </div>
                                                }
                                                {currentViewType === 'file' &&
                                                    <div class="mt-3">
                                                        <label class="block text-sm text-gray-700 dark:text-gray-400" forhtml="title_en">
                                                            <span>Tải File (Tiếng Anh) : </span>
                                                            <div className="mt-2">
                                                                <a className="font-normal underline text-blue-500" href={`${process.env.REACT_APP_API_URL}/uploads/document/${filename_en}`} download>{filename_en}</a>
                                                            </div>
                                                        </label>
                                                    </div>
                                                }
                                                {currentViewType === 'file' &&
                                                    <div className="mt-6 flex flex-col items-center">
                                                        <DropFileInput
                                                            onFileChange={(files) => setFieldValue('file_en', files[0])}
                                                        />
                                                    </div>
                                                }
                                                {currentViewType === 'text' && <>
                                                    <div className="mb-3">
                                                        <span className="mb-2 block text-lg text-gray-700">Nội dung tiếng Việt</span>
                                                        <CKEditor
                                                            editor={ClassicEditor}
                                                            data={dataTextVN}
                                                            onChange={(event, editor) => {
                                                                const data = editor.getData();
                                                                setFieldValue('text_vn', data);
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="mb-3">
                                                        <span className="mb-2 block text-lg text-gray-700">Nội dung tiếng Anh</span>
                                                        <CKEditor
                                                            editor={ClassicEditor}
                                                            data={dataTextEN}
                                                            onChange={(event, editor) => {
                                                                const data = editor.getData();
                                                                setFieldValue('text_en', data);
                                                            }}
                                                        />
                                                    </div>
                                                </>
                                                }
                                                <Button type="submit" block className="mt-8 mb-8" disabled={isSubmitting}>
                                                    {isSubmitting ? (
                                                        <Spinner />
                                                    ) : (
                                                        <i className="fas fa-sign-in-alt  w-6 -ml-2 mx-3" />
                                                    )}
                                                    Chỉnh Sửa Bài Viết
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

export default PolicyDetail;
