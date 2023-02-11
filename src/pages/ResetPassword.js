import React from 'react'
import { useHistory } from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import { FastField, Form, Formik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import ImageLight from '../assets/img/logo-ameritec.png'
import {Button } from '@windmill/react-ui'
import InputField from "../components/CustomFields/input-field";
import Spinner from "../components/Spinner";
import API from '../api/API';

function ResetPassword({match}) {
    const { t } = useTranslation();
    document.title = "Ameritec || " +  t("Quên mật khẩu");
    const history = useHistory();
    const token = match.params.token;

    const initialValues = {
      newPassword: "",
      confirm_newPassword: "",
      token,
    };
  
    const validationSchema = Yup.object().shape({
      newPassword: Yup.string()
      .required(t("Vui lòng điền mật khẩu"))
      .matches(
        // /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
        // /^(?=.*?[a-z])(?=.*?[0-9]).{8,}$/,
        /^(?=.*?[a-z])(?=.*?[0-9]).{8,}$/,
        t("Mật khẩu phải chứa ít nhất 8 ký tự và một số")
      ),
      confirm_newPassword: Yup.string()
      .required(t("Vui lòng điền lại mật khẩu"))
      .oneOf([Yup.ref("newPassword"), null], t("Không trùng khớp")),
      token: Yup.string()
    });
  
    const handleSubmit = (values, actions) => {
    const body = { ...values };

    API.reset(body)
      .then(res => {
        const status = res.data.status;
        if(status !== 200) {
          toast.error(t("Đường link đã hết hạn, Vui lòng thử lại"));
          actions.setSubmitting(false);
        } else {
          return new Promise(resolve => {
            toast.success(t("🎉 Tuyệt vời! Bây giờ bạn có thể đăng nhập bằng mật khẩu mới của mình"));
            actions.setSubmitting(false);
  
            setTimeout(() => {
              history.push('/login');
            }, 2000);
            resolve(true);
          });
        }
      })
      .catch(err => {
        toast.error(t('Có vấn đề xảy ra! Vui lòng thử lại'));
      })
    };


  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
       <ToastContainer />
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2">
            <img
              aria-hidden="true"
              className="object-contain w-full h-full"
              src={ImageLight}
              alt="Office"
            />
          </div>
          
          <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {(formikProps) => {
                  const { isSubmitting } = formikProps;

                  return (
                    <Form className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
                        <div className="w-full">
                          <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                            {t('Quên mật khẩu')}
                          </h1>

                        <FastField
                            component={InputField}
                            name="newPassword"
                            type="password"
                            label={t('Mật khẩu mới')}
                            placeholder={t('Nhập mật khẩu mới')}
                        />
                        <FastField
                            component={InputField}
                            name="confirm_newPassword"
                            type="password"
                            label={t('Nhập lại mật khẩu mới')}
                            placeholder={t('Nhập lại mật khẩu mới')}
                        />
                        <FastField
                            component={InputField}
                            name="token"
                            type="hidden"
                            placeholder=""
                        />

                          <Button type="submit" block className="mt-4">
                          {isSubmitting ? <Spinner /> : <i className="fas fa-sign-in-alt  w-6 -ml-2 mx-3" />  }
                          {t('Xác nhận')}
                          </Button>
                        </div>
                    </Form>
                  );
                }}
              </Formik>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword
