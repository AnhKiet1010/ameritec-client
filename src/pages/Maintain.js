import React from "react";

import MAINTAIN from "../assets/img/maintain.jpg";

function Page404() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="flex flex-col items-center">
        <p className="text-gray-700 dark:text-gray-300 text-2xl mt-10">
          Website đang cập nhật
        </p>
        <img src={MAINTAIN} width="350px" />
        <p className="text-gray-700 dark:text-gray-300 text-xl mt-10">
          <a className="text-blue-500 hover:underline dark:text-blue-300 underline"
            href="/"
          >
            Trở về Trang Chủ
          </a>
        </p>
      </div>
    </div>
  );
}

export default Page404;
