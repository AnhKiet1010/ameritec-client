import React, { useState, useRef, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Skeleton } from "@material-ui/lab";

import {
  Table,
  TableCell,
  TableBody,
  TableRow,
  TableContainer,
} from "@windmill/react-ui";

import PageTitle from "../../components/Typography/PageTitle";
import CTA from "../../components/CTA";
import { Label, Input, Button } from "@windmill/react-ui";

function InviteCode() {

  const [url, setUrl] = useState("");
  const textAreaRef = useRef(null);

  function copyToClipboard(e) {
    textAreaRef.current.select();
    document.execCommand("copy");
    e.target.focus();
    toast.success("Đã copy!")
  }

  useEffect(() => {
    // const body = { id: JSON.parse(localStorage.getItem("user")).user.id };
    // let message = t('Đã xảy ra lỗi vui lòng thử lại sau');
    // CLIENT.inviteUrl(body)
    //   .then((res) => {

    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     toast.error(message);
    //   });
  }, []);

  useEffect(() => {
    setUrl(
      `${process.env.REACT_APP_REFERRAL_URL}/${process.env.REACT_APP_COMPANY_INVITE_CODE}/0`
    );
  }, []);

  return (
    <>
      <PageTitle>Mã giới thiệu</PageTitle>
      <ToastContainer />
      <TableContainer className="mb-8">
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Mã giới thiệu</TableCell>
              <TableCell>
                <span className="text-sm">
                  {process.env.REACT_APP_COMPANY_INVITE_CODE}
                </span>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <hr className="my-8" />


      <Label style={{ margin: "10px 0 5px 0" }}>
        <span style={{ fontSize: "20px", fontWeight: "bold" }}>
          Link giới thiệu :
        </span>
        <Input value={url} ref={textAreaRef} />
      </Label>
      <div className="my-6">
        <Button
          onClick={(e) => {
            copyToClipboard(e);
          }}
        >
          Copy link
        </Button>
      </div>
    </>
  );
}

export default InviteCode;
