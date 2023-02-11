import React, { useState } from "react";
import { Dropdown, DropdownItem } from "@windmill/react-ui";
import { useTranslation } from "react-i18next";

import VN_FLAG from "../assets/img/vietnam.svg";
import EN_FLAG from "../assets/img/united-states.svg";

function SelectLanguageField() {
    const { i18n } = useTranslation();
    const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false)

    function handleClickVi() {
        i18n.changeLanguage("vi");
        setIsLanguageMenuOpen(false);
    }

    function handleClickEn() {
        i18n.changeLanguage("en");
        setIsLanguageMenuOpen(false);
    }

    function handleLanguageClick() {
        setIsLanguageMenuOpen(!isLanguageMenuOpen)
    }

    return (
        <div className="relative flex items-center">
            <button
                className="focus:outline-none"
                onClick={handleLanguageClick}
                aria-label="Account"
                aria-haspopup="true"
            >
                {
                    i18n.language === "vi" ?
                    <div className="h-8 w-8 flex justify-center items-center bg-blue-500 text-white text-xs font-semibold">VN</div>
                        :
                        <div className="h-8 w-8 flex justify-center items-center bg-blue-500 text-white text-xs font-semibold">US</div>
                }
            </button>
            <Dropdown
                align="right"
                isOpen={isLanguageMenuOpen}
                onClose={() => setIsLanguageMenuOpen(false)}
                className="mt-2 z-50"
            >
                <DropdownItem tag="a" onClick={handleClickVi} className="focus:outline-none">
                <div className="h-6 w-6 flex justify-center items-center bg-blue-500 text-white text-xs font-semibold mr-3">VN</div>
                    <span>Tiếng Việt</span>
                </DropdownItem>
                <DropdownItem tag="a" onClick={handleClickEn} className="focus:outline-none">
                <div className="h-6 w-6 flex justify-center items-center bg-blue-500 text-white text-xs font-semibold mr-3">US</div>
                    <span>English</span>
                </DropdownItem>
            </Dropdown>
        </div>
    );
}

export default SelectLanguageField;
