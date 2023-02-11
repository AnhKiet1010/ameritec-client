import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import { FastField, Form, Formik } from "formik";
import jwt from "jsonwebtoken";

import ImageLight from '../assets/img/login-office.jpeg'
import ImageDark from '../assets/img/login-office-dark.jpeg'
import { Button } from '@windmill/react-ui'
import InputField from "../components/CustomFields/input-field";
import Spinner from "../components/Spinner";
import API from '../api/API';
import { useTranslation } from "react-i18next";

function Activate({ match }) {
  const { t } = useTranslation();
  const token = match.params.token;
  const { full_name } = jwt.decode(token);
  const history = useHistory();

  const initialValues = {
    token
  }

  const handleSubmit = (values,actions) => {
    const body = { token : values.token};
    API.active(body)
      .then((res) => {
        const status = res.data.status;
        if(status !== 200) {
          toast.error(res.data.message)
          actions.setSubmitting(false);
          history.push('/login');
        } else {
          new Promise((resolve, reject) => {
            setTimeout(() => {
              toast.success(res.data.message);
            },1000); 
            history.push('/login');
            resolve(false);
          })
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Có vấn đề xảy ra! Vui lòng thử lại!");
      });
  };

  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <ToastContainer />
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2">
            <img
              aria-hidden="true"
              className="object-cover w-full h-full dark:hidden"
              src={ImageLight}
              alt="Office"
            />
            <img
              aria-hidden="true"
              className="hidden object-cover w-full h-full dark:block"
              src={ImageDark}
              alt="Office"
            />
          </div>
          <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
            <h1 className="text-xl xl:text-2xl font-extrabold text-center text-red-500">
              <span role="img" aria-label="congra">🎉</span> Chào mừng <span aria-label="congra" role="img">🎉</span> <br /><p className="text-purple-700">{full_name}</p>đến với Ameritec
            </h1>
              <Formik
              initialValues={initialValues}
              onSubmit={handleSubmit}
            >
              {(formikProps) => {
                const { isSubmitting } = formikProps;

                return (
                  <Form className="w-full flex-1 mt-8 text-indigo-500">
                      <FastField 
                        component={InputField}
                        
                        name="token"
                        type="hidden"
                        placeholder=""
                      />
                      <Button type="submit" className="mt-4" block disabled={isSubmitting}>
                      {isSubmitting ? <Spinner /> : <i className="fas fa-sign-in-alt  w-6 -ml-2 mx-3" />  }
                        Kích hoạt tài khoản
                      </Button>
                  </Form>
                );
              }}
            </Formik>

              <hr className="my-8" />

              <Button block layout="outline" tag={Link} to="/login">
                Đăng nhập
              </Button>
              <Button className="mt-4" block layout="outline" tag={Link} to="/create-account">
                Đăng ký
              </Button>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default Activate
