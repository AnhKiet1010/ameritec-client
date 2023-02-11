import React from "react";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { FastField, Form, Formik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import ImageLight from "../assets/img/logo-ameritec.png";
import { Button } from "@windmill/react-ui";
import InputField from "../components/CustomFields/input-field";
import Spinner from "../components/Spinner";
import API from "../api/API";

function ForgotPassword() {
  const { t } = useTranslation();
  document.title = "Ameritec || " +  t("Quên mật khẩu");
  const history = useHistory();
  const initialValues = {
    email: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email(t("Vui lòng điền đúng định dạng Email"))
      .required(t("Vui lòng điền Email")),
  });

  const handleSubmit = (values, actions) => {
    const { email } = values;

    if (email) {
      API.forgot({
        email,
      })
        .then((res) => {
          const status = res.data.status;
          if (status !== 200) {
            toast.error(t('Người dùng với email này không tồn tại'));
            actions.setSubmitting(false);
          } else {
            return new Promise((resolve) => {
              toast.success(t("Mail reset đã được gửi đến Email của Bạn! Vui lòng kiểm tra"));
              actions.setSubmitting(false);

              setTimeout(() => {
                history.push("/login");
              }, 2000);
              resolve(true);
            });
          }
        })
        .catch((err) => {
          toast.error(t("Có vấn đề xảy ra! Vui lòng thử lại!"));
          actions.setSubmitting(false);
        });
    } else {
      toast.error(t("Vui lòng điền đầy đủ thông tin"));
      actions.setSubmitting(false);
    }
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
                      name="email"
                      type="email"
                      label="Email"
                      placeholder="Email"
                    />

                    <Button type="submit" block className="mt-4">
                      {isSubmitting ? (
                        <Spinner />
                      ) : (
                        <i className="fas fa-sign-in-alt  w-6 -ml-2 mx-3" />
                      )}
                      {t('Khôi phục mật khẩu')}
                    </Button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
