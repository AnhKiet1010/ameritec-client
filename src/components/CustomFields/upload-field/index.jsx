import PropTypes from 'prop-types';
import React, {useState} from 'react';
import { FormFeedback, FormGroup, Input, Label } from 'reactstrap';
import './index.css';

import avatarDefault from '../../../img/avatar.png';

UploadField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,

  type: PropTypes.string,
  avatar: PropTypes.string,
  onChange: PropTypes.func,
};

UploadField.defaultProps = {
  type: 'file',
  avatar: '',
  onChange: null,
  avatar: ''
}


function UploadField(props) {

    const {
        field, form, type
      } = props;
    
      const {name, onChange} = field;
      const {errors , touched, values} = form;

    const [avatar, setAvatar] = useState(avatarDefault);
    const [inputValue, setInputValue] = useState({});


    const handleFileUpload = (event) => {
        let reader = new FileReader();
        let file = event.target.files[0];
        reader.onloadend = () => {
            setAvatar(reader.result);
            setInputValue(file);
        };
        reader.readAsDataURL(file);
    }   

  return (
    <div className="w-32 h-32 relative m-auto">
        <div className="group w-full h-full rounded-full overflow-hidden shadow-inner text-center bg-purple table cursor-pointer">
            <img src={avatar} alt="lovely avatar" className="object-cover object-center w-full h-full visible group-hover:hidden" />
            <label className="absolute avatar-label">
            <Input
                accept="image/*"
                id={name}
                {...field}
                onChange={handleFileUpload}
                
                type={type}
                className=""
            />
            </label>
        </div>
    </div>
  );
}

export default UploadField;