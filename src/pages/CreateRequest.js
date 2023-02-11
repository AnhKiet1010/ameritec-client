import React, { useState, useEffect } from "react";
import { FastField, Form, Formik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

import CLIENT from "../api/Client";
import PageTitle from "../components/Typography/PageTitle";

import { Button } from "@windmill/react-ui";
import TextareaField from "../components/CustomFields/textarea-field";
import Spinner from "../components/Spinner";
import socket from '../helpers/socketConnect';
import { useTranslation } from "react-i18next";
import DropFileInput from '../components/DropSingleFileInput/DropFileInput';

function CreateRequest() {
  const [data, setData] = useState([]);
  const id = JSON.parse(localStorage.getItem("user")).user.id;
  const [refresh, setRefresh] = useState(false);
  const { t } = useTranslation();
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    document.title = "Ameritec || " + t("Tạo yêu cầu gửi lên Công Ty");
    CLIENT.getRequestList({ id })
      .then((res) => {
        console.log('res.data', res.data);
        const status = res.data.status;
        if (status !== 200) {
          toast.error(res.data.message);
        } else {
          setData(res.data.data.listRequest);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refresh]);

  useEffect(() => {

    socket.on("AdminChangeStatusRequest", (data) => {
      if (data.data === id) {
        setRefresh(!refresh);
      }
    });

    return () => {
      socket.off("AdminChangeStatusRequest");
    }
  });

  const initialValues = {
    content: "",
    file: "",
    reason: ""
  };

  const validationSchema = Yup.object().shape({
    content: Yup.string().required(t('Vui lòng điền nội dung')),
    reason: Yup.string().required(t('Vui lòng điền lý do')),
  });

  const handleSubmit = (values, { setSubmitting, setFieldError, resetForm }) => {
    let message = t('Đã xảy ra lỗi vui lòng thử lại sau');

    var formData = new FormData();

    formData.append("content", values.content);
    formData.append("reason", values.reason);
    formData.append("file", values.file);

    CLIENT.createRequest(formData)
      .then((res) => {
        const status = res.data.status;
        if (status === 200) {
          setSubmitting(false);
          resetForm();
          toast.success(t('Đã gửi thành công'));
          setFileList([]);
          setRefresh(!refresh);
        } else if (status === 400) {
          toast.error(t('File không hỗ trợ'));
          setFileList([]);
          setSubmitting(false);
        } else {
          toast.error(message);
          for (var err of res.data.errors) {
            setFieldError(err.label, err.err_message);
          }
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
    <div className="mb-64">
      <PageTitle>{t('Tạo yêu cầu gửi lên Công Ty')}</PageTitle>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {(formikProps) => {
          const { isSubmitting, setFieldValue } = formikProps;

          return (
            <Form className="flex items-center justify-start">
              <div className="w-full">
                <FastField
                  component={TextareaField}
                  name="content"
                  type="text"
                  placeholder={`${t('Nhập nội dung yêu cầu')}...`}
                  label={t('Nội dung')}
                />
                <FastField
                  component={TextareaField}
                  name="reason"
                  type="text"
                  placeholder={`${t('Nhập lý do yêu cầu')}...`}
                  label={t('Lý do')}
                />
                <div className="mt-4">
                  <div className="text-gray-700 text-lg">{t('Tải lên hình ảnh (JPG, PNG) hoặc PDF')}</div>
                  <div className="mt-6 flex flex-col items-center">
                    <DropFileInput
                      onFileChange={(files) => setFieldValue('file', files[0])}
                      fileList={fileList}
                      setFileList={setFileList}
                    />
                  </div>
                </div>
                <Button type="submit" block className="mt-8" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <Spinner />
                  ) : (
                    <i className="fas fa-sign-in-alt  w-6 -ml-2 mx-3" />
                  )}
                  {t('Gửi yêu cầu')}
                </Button>
              </div>
            </Form>
          );
        }}
      </Formik>
      <PageTitle>{t('Danh sách yêu cầu đã gửi đi')}</PageTitle>
      <div className="grid grid-cols-1 xl:grid-cols-3 md:grid-cols-2 gap-4">
        {data.length > 0 && data.map((req, i) => (
          <div key={i} className={`${req.status === 'pending' ? 'bg-yellow-300 hover:bg-yellow-400' : req.status === 'denied' ? 'bg-gray-300 hover:bg-gray-400' : req.status === 'accept' ? 'bg-green-300 hover:bg-green-400' : ''}relative w-full p-2 mx-auto border-blue-100 rounded-lg cursor-pointer`}>
            <div className="text-gray-800 text-center p-4 w-full">
              <div className="flex justify-between items-center gap-4">
                <div className="flex flex-col items-start">
                  <p className="font-semibold text-md text-left mt-2">
                    {t('Yêu cầu')} : <span className="text-sm font-normal">{req.content}</span>
                  </p>
                  <p className="font-semibold text-md text-left mt-2">
                    {t('Lý do')} : <span className="text-sm font-normal">{req.content}</span>
                  </p>
                  {
                    req.filename &&
                    <p className="font-semibold text-md text-left mt-2">
                      File : <span className="text-sm font-normal">
                        <a className="font-normal underline text-blue-500" download rel="noopener noreferrer" target="_blank" href={`${process.env.REACT_APP_API_URL}/uploads/request/${req.filename}`}>{t('xem')}</a>
                      </span>
                    </p>
                  }
                  {
                    req.status === 'denied' &&
                    <p className="font-semibold text-md text-left mt-2">
                      {t('Phản hồi')} : <span className="text-sm font-normal">{req.denied_reason}</span>
                    </p>
                  }
                </div>
                <div className="flex flex-col items-end">
                  <p className="text-sm font-semibold">{new Date(req.request_time).toLocaleTimeString('vi').substring(0, new Date(req.request_time).toLocaleTimeString('vi').length - 3)}</p>
                  <p className="text-sm italic">{new Date(req.request_time).toLocaleDateString('vi')}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="px-6 pt-6 mt-8 mb-20">
        <h2 className="text-xl">* <strong>{t('Chú thích')}</strong> : </h2>
        <ul>
          <li className="my-2"><span role="img" aria-label="emoji">❗</span> {t('Yêu cầu màu')} <span className="text-green-300 font-bold">{t('xanh')}</span> : {t('Đã được Admin chấp nhận')}</li>
          <li className="my-2"><span role="img" aria-label="emoji">❗</span> {t('Yêu cầu màu')} <span className="text-gray-300 font-bold">{t('xám')}</span> : {t('Đã từ chối')}</li>
          <li className="my-2"><span role="img" aria-label="emoji">❗</span> {t('Yêu cầu màu')} <span className="text-yellow-300 font-bold">{t('vàng')}</span> : {t('Đang xử lí')}</li>
        </ul>
      </div>
    </div>
  );
}

export default CreateRequest;
