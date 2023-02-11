import React, { useState } from "react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import ADMIN from "../../api/Admin";
import { Button } from "@windmill/react-ui";
import Spinner from "../../components/Spinner";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import DropFileInput from '../../components/DropFileInput/DropFileInput';
import InputField from "../../components/CustomFields/input-field";
import SelectField from "../../components/CustomFields/select-field";
import { CATEGORY } from "../../constants/documentCategory";
import TextEditor from '../../components/TextEditor';

function Policy() {
    const [currentUpType, setCurrentUpType] = useState(1);

    const initialValues = {
        title_vn: "",
        title_en: "",
        text_vn: "",
        text_en: "",
        type: currentUpType === 1 ? 'text' : 'file',
        file: "",
        file_en: "",
        category: ""
    };

    const validationSchema = Yup.object().shape({
        category: Yup.string().required("Không được để trống"),
        title_vn: Yup.string().required("Không được để trống"),
        title_en: Yup.string().required("Không được để trống"),
    });

    const handleSubmit = (values, { setSubmitting, resetForm }) => {
        let message = 'Đã xảy ra lỗi vui lòng thử lại sau';

        var formData = new FormData();

        formData.append("category", values.category);
        formData.append("title_vn", values.title_vn);
        formData.append("text_vn", values.text_vn);
        formData.append("title_en", values.title_en);
        formData.append("text_en", values.text_en);
        formData.append('file', values.file);
        formData.append('file_en', values.file_en);
        formData.append('type', values.type);

        ADMIN.createPolicy(values.type === 1 ? { ...values } : formData)
            .then((res) => {
                const status = res.data.status;
                if (status === 200) {
                    setSubmitting(false);
                    toast.success(res.data.message);
                    resetForm();
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
                                                    <div>
                                                        {currentUpType === 2 && <Button onClick={() => setCurrentUpType(1)}>Biên soạn</Button>}
                                                        {currentUpType === 1 && <Button onClick={() => setCurrentUpType(2)}>Upload File</Button>}
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
                                                {currentUpType === 2 &&
                                                <div>
                                                    <div className="mt-6 flex flex-col items-center">
                                                        <div className="mb-2 text-gray-600">File Tiếng Việt</div>
                                                        <DropFileInput
                                                            onFileChange={(files) => setFieldValue('file', files[0])}
                                                        />
                                                    </div>
                                                    <div className="mt-6 flex flex-col items-center">
                                                            <div className="mb-2 text-gray-600">File Tiếng Anh</div>
                                                            <DropFileInput
                                                                onFileChange={(files) => setFieldValue('file_en', files[0])}
                                                            />
                                                        </div>
                                                    </div>
                                                }
                                                {currentUpType === 1 && <>
                                                    <div className="mb-3">
                                                        <span className="mb-2 block text-lg text-gray-700">Nội dung tiếng Việt</span>
                                                        <TextEditor
                                                            editor={ClassicEditor}
                                                            data={""}
                                                            onChangeHandle={(event, editor) => {
                                                                const data = editor.getData();
                                                                setFieldValue('text_vn', data);
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="mb-3">
                                                        <span className="mb-2 block text-lg text-gray-700">Nội dung tiếng Anh</span>
                                                        <TextEditor
                                                            data={""}
                                                            onChangeHandle={(event, editor) => {
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
                                                    Tạo Bài Viết
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

export default Policy;
