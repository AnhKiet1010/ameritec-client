import React, { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import { Skeleton } from "@material-ui/lab";

import "react-confirm-alert/src/react-confirm-alert.css";

import {
  Table,
  TableCell,
  TableBody,
  TableRow,
  TableContainer,
  TableFooter,
  TableHeader,
  Avatar,
} from "@windmill/react-ui";

import PageTitle from "../components/Typography/PageTitle";
import { Label, Input, Button } from "@windmill/react-ui";
import Pagination from "@material-ui/lab/Pagination";
import CLIENT from "../api/Client";
import { SearchIcon } from "../icons";
import { useTranslation } from "react-i18next";

function InviteCode() {
  const [loading, setLoading] = useState(true);
  const [donate, setDonate] = useState(false);
  const inviteCode = JSON.parse(localStorage.getItem("user")).user.id;
  const buy_package = JSON.parse(localStorage.getItem("user")).user.buy_package;
  const [group, setGroup] = useState(1);
  const [donateID, setDonateID] = useState("");
  const [url, setUrl] = useState("");
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const resultsPerPage = 5;
  const [totalResults, setTotalResults] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [allPage, setAllPage] = useState(0);
  const { t } = useTranslation();

  const textAreaRef = useRef(null);

  function onPageChange(e, page) {
    e.preventDefault();
    setPage(page);
  }

  function copyToClipboard(e) {
    textAreaRef.current.select();
    document.execCommand("copy");
    e.target.focus();
    toast.success(t("Đã copy!"));
  }

  const onSubmit = (e) => {
    setSubmitted(!submitted);
  };

  const handleKeyword = (event) => {
    setKeyword(event.target.value);
  };

  useEffect(() => {
    document.title = "Ameritec || " + t("Mã giới thiệu");
    const body = {
      id: JSON.parse(localStorage.getItem("user")).user.id,
      page,
      resultsPerPage,
      keyword,
    };

    let message = t("Đã xảy ra lỗi vui lòng thử lại sau");

    CLIENT.inviteUrl(body)
      .then((res) => {
        const status = res.data.status;
        if (status !== 200) {
          toast.error(res.data.message);
        } else {
          setUrl(
            `${process.env.REACT_APP_REFERRAL_URL}/${inviteCode}/${group}/${donateID}`
          );
          setData(res.data.data.listChild);
          setTotalResults(res.data.data.totalResults);
          setAllPage(res.data.data.allPage);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(message);
      });
  }, [submitted, page]);

  useEffect(() => {
    setUrl(
      `${process.env.REACT_APP_REFERRAL_URL}/${inviteCode}/${group}/${
        donate ? donateID : ""
      }`
    );
  }, [group, donateID, donate]);

  return (
    <>
      <PageTitle>{t("Mã giới thiệu")}</PageTitle>
      <TableContainer className="mb-8">
        {!loading && (
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="text-md font-semibold">
                  {t("Mã giới thiệu")}
                </TableCell>
                <TableCell>
                  <span className="text-sm">
                    {JSON.parse(localStorage.getItem("user")).user.id}
                  </span>
                </TableCell>
              </TableRow>
              <>
                <TableRow>
                  <TableCell className="text-md font-semibold">
                    {t("Chọn nhóm để gắn cây hệ thống")}
                  </TableCell>
                  <TableCell>
                    <div className="grid md:grid-cols-3 md:grid-cols-2">
                      <Label check>
                        <Input
                          className="border border-gray-700"
                          type="radio"
                          name="group"
                          value={1}
                          onChange={(e) => {
                            setGroup(e.target.value);
                          }}
                          checked={group == 1}
                        />
                        <span className="m-0 ml-2">{t("Nhóm 1")}</span>
                      </Label>
                      <Label check>
                        <Input
                          className="border border-gray-700"
                          type="radio"
                          name="group"
                          value={2}
                          onChange={(e) => {
                            setGroup(e.target.value);
                          }}
                        />
                        <span className="m-0 ml-2">{t("Nhóm 2")}</span>
                      </Label>
                      <Label check>
                        <Input
                          className="border border-gray-700"
                          type="radio"
                          name="group"
                          value={3}
                          onChange={(e) => {
                            setGroup(e.target.value);
                          }}
                        />
                        <span className="m-0 ml-2">{t("Nhóm 3")}</span>
                      </Label>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-md font-semibold">
                    {t("Cho doanh số cấp dưới")}
                  </TableCell>
                  <TableCell>
                    <div className="grid grid-cols-2">
                      <Label check>
                        <Input
                          className="border border-gray-700"
                          type="radio"
                          name="donate"
                          value={1}
                          onChange={(e) => {
                            setDonate(true);
                          }}
                        />
                        <span className="ml-2 mb-0">{t("Có")}</span>
                      </Label>
                      <Label check>
                        <Input
                          className="border border-gray-700"
                          type="radio"
                          name="donate"
                          value={2}
                          onChange={(e) => {
                            setDonate(false);
                            setDonateID("");
                          }}
                        />
                        <span className="ml-2 mb-0">{t("Không")}</span>
                      </Label>
                    </div>
                  </TableCell>
                </TableRow>
                {donate && (
                  <TableRow>
                    <TableCell colSpan={2}>
                      <div className="mb-4 text-md font-semibold">
                        {t("Chọn ID được hưởng doanh số")}
                      </div>
                      <div className={`flex justify-start items-center`}>
                        <div className="flex sm:flex-row flex-col gap-6">
                          <div className="block relative">
                            <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2">
                              <svg
                                viewBox="0 0 24 24"
                                className="h-4 w-4 fill-current text-gray-500"
                              >
                                <path d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z"></path>
                              </svg>
                            </span>
                            <input
                              placeholder={t("Nhập tên người dùng")}
                              onChange={handleKeyword}
                              value={keyword}
                              className={`h-full min-w-40 appearance-none rounded border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-md placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none`}
                            />
                          </div>
                          <button
                            onClick={onSubmit}
                            type="button"
                            className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 mx-2 rounded-lg text-sm text-white bg-indigo-600 border border-transparent active:bg-indigo-500 hover:bg-indigo-500 focus:shadow-outline-indigo "
                          >
                            <SearchIcon
                              className="w-4 h-4 mr-3"
                              aria-hidden="true"
                            />
                            {t("Tìm kiếm")}
                          </button>
                        </div>
                      </div>
                      <TableContainer className="mt-4 mb-6 max-w-3xl">
                        <Table>
                          <TableHeader>
                            <tr>
                              <TableCell>Tên</TableCell>
                              <TableCell className="text-center">
                                {t("Mã giới thiệu")}
                              </TableCell>
                              <TableCell className="text-center">
                                {t("Thao tác")}
                              </TableCell>
                            </tr>
                          </TableHeader>
                          {!loading && (
                            <TableBody>
                              {data.length > 0 &&
                                data.map((ele, i) => (
                                  <>
                                    <TableRow key={i}>
                                      <TableCell>
                                        <div className="flex items-center">
                                          <Avatar
                                            className="hidden mr-3 md:block"
                                            src={ele.avatar}
                                            alt="ele avatar"
                                          />
                                          <div className="text-left">
                                            <p className="font-semibold">
                                              {ele.full_name}
                                            </p>
                                            <p className="text-xs text-gray-600 dark:text-gray-400">
                                              {ele.email}
                                            </p>
                                          </div>
                                        </div>
                                      </TableCell>
                                      <TableCell className="text-center">
                                        <span className="text-sm">
                                          {ele._id}
                                        </span>
                                      </TableCell>
                                      <TableCell className="text-center">
                                        <div className="w-full flex justify-center">
                                          <div>
                                            {donateID !== ele._id && (
                                              <button
                                                onClick={() => {
                                                  setDonateID(ele._id);
                                                }}
                                                type="button"
                                                className="mr-2 align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 rounded-lg text-sm text-white bg-green-600 border border-transparent active:bg-green-600 hover:bg-green-700 focus:shadow-outline-green"
                                              >
                                                {t("Chọn")}
                                              </button>
                                            )}
                                            {donateID === ele._id && (
                                              <button
                                                onClick={() => {
                                                  setDonateID("");
                                                }}
                                                type="button"
                                                className="mr-2 align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 rounded-lg text-sm text-white bg-red-600 border border-transparent active:bg-red-600 hover:bg-red-700 focus:shadow-outline-red"
                                              >
                                                {t("Huỷ")}
                                              </button>
                                            )}
                                          </div>
                                        </div>
                                      </TableCell>
                                    </TableRow>
                                  </>
                                ))}
                            </TableBody>
                          )}
                        </Table>
                        {loading ? (
                          <>
                            <div className="">
                              <Skeleton
                                variant="rect"
                                width="100%"
                                height={50}
                                count={resultsPerPage}
                              />
                            </div>
                          </>
                        ) : (
                          <TableFooter>
                            {data.length !== 0 ? (
                              <div className="flex justify-between items-center">
                                <Pagination
                                  count={Math.ceil(allPage)}
                                  page={page}
                                  onChange={onPageChange}
                                  color="primary"
                                />
                                <div>
                                  <span className="text-xl mx-1 text-gray-700">
                                    {totalResults}
                                  </span>{" "}
                                  {t("kết quả")}
                                </div>
                              </div>
                            ) : (
                              <div className="text-md text-gray-400 text-center">
                                {t("không có dữ liệu")}
                              </div>
                            )}
                          </TableFooter>
                        )}
                      </TableContainer>
                    </TableCell>
                  </TableRow>
                )}
              </>
            </TableBody>
          </Table>
        )}
      </TableContainer>
      <hr className="my-8" />

      {loading ? (
        <Skeleton variant="rect" width="100%" height={50} className="mt-4" />
      ) : (
        <Label style={{ margin: "10px 0 5px 0" }}>
          <span style={{ fontSize: "20px", fontWeight: "bold" }}>
            {t("Link giới thiệu")} :
          </span>
          <Input value={url} ref={textAreaRef} readonly />
        </Label>
      )}
      {loading ? (
        <Skeleton variant="rect" height={50} className="mt-4" />
      ) : (
        <div className="my-6">
          <Button
            onClick={(e) => {
              copyToClipboard(e);
            }}
          >
            Copy link
          </Button>
        </div>
      )}
    </>
  );
}

export default InviteCode;
