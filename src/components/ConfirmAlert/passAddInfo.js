import React from 'react'
import { confirmAlert } from 'react-confirm-alert';
import { useHistory } from 'react-router-dom';

import 'react-confirm-alert/src/react-confirm-alert.css';
import '../../assets/css/ConfirmAlert.css';

function PassAddInfo() {

    const history = useHistory();

    return (
        <div>
        {confirmAlert({
            customUI: ({ onClose }) => {
            return (
                <div className='custom-ui'>
                <h1>Bổ Sung Thông Tin</h1>
                <p>Vui lòng bổ sung thông tin để được chia sẻ hoa hồng</p>
                <button onClick={onClose}>Bổ sung sau</button>
                <button onClick={
                    () => {
                        onClose();
                        history.push('/info');
                    }
                }>
                    Bổ sung ngay
                </button>
                </div>
            );
            }
        })}
        </div>
    )
}

export default PassAddInfo
