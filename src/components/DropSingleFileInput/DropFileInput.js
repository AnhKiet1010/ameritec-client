import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import './drop-file-input.css';

import { ImageConfig } from '../../helpers/ImageConfig';
import uploadImg from '../../assets/img/cloud-upload-regular-240.png';
import { useTranslation } from "react-i18next";

const DropFileInput = ({ onFileChange, setFileList, fileList }) => {
    const { t } = useTranslation();


    const wrapperRef = useRef(null);

    const onDragEnter = () => wrapperRef.current.classList.add('dragover');

    const onDragLeave = () => wrapperRef.current.classList.remove('dragover');

    const onDrop = () => wrapperRef.current.classList.remove('dragover');

    const onFileDrop = (e) => {
        const newFile = e.target.files[0];
        if (newFile) {
            const updatedList = [newFile];
            setFileList(updatedList);
            onFileChange(updatedList);
        }
    }

    const fileRemove = (file) => {
        const updatedList = [...fileList];
        updatedList.splice(fileList.indexOf(file), 1);
        setFileList(updatedList);
        onFileChange(updatedList);
    }

    return (
        <>
            <div
                ref={wrapperRef}
                className="drop-file-input"
                onDragEnter={onDragEnter}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
            >
                <div className="drop-file-input__label">
                    <img src={uploadImg} alt="" />
                    <p>{t('Kéo & thả tệp của bạn vào đây')} <br></br> {t('(nhỏ hơn 1MB)')}</p>
                </div>
                <input type="file" value="" onChange={onFileDrop} multiple={false} />
            </div>
            {
                fileList[0] ? (
                    <div className="drop-file-preview">
                        {
                            fileList[0].size >= 1048576 ?
                                <p className="drop-file-preview__title">
                                {t('File có dung lượng quá lớn (sẽ tự động xóa sau 3s)')}
                                </p> :
                                <p className="drop-file-preview__title">
                                    {t('Sẵn sàng để tải lên')}
                                </p>
                        }
                        {
                            fileList.map((item, index) => {
                                if (item.size >= 1048576) {
                                    setTimeout(() => {
                                        fileRemove(item);
                                    }, 3000);
                                } else {
                                    return <div key={index} className="drop-file-preview__item">
                                        <img src={ImageConfig[item.type.split('/')[1]] || ImageConfig['default']} alt="" />
                                        <div className="drop-file-preview__item__info">
                                            <p>{item.name}</p>
                                            <p>{item.size}B</p>
                                        </div>
                                        <span className="drop-file-preview__item__del" onClick={() => fileRemove(item)}>x</span>
                                    </div>
                                }
                            })
                        }
                    </div>
                ) : null
            }
        </>
    );
}

DropFileInput.propTypes = {
    onFileChange: PropTypes.func
}

export default DropFileInput;
