import PropTypes from 'prop-types';
import React from 'react';
import { Label  } from '@windmill/react-ui'
import './index.css';
import {Input} from 'reactstrap';
import { useTranslation } from "react-i18next";

CheckboxField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,

  type: PropTypes.string,
  text: PropTypes.string,
  link: PropTypes.string,
};

CheckboxField.defaultProps = {
  type: 'checkbox',
  text: '',
  link: ''
}

function CheckboxField(props) {
  const { t } = useTranslation();
  const {
    field, type,form, checked, text, link
  } = props;

  const {name} = field;
  const {errors , touched} = form;
  const showError = errors[name] && touched[name];



  return (
    <Label className="mt-6" check style={{display: 'block'}}>
      <Input 
      {...field}

      type={type}
      checked={checked}
      className="text-purple-600 border border-gray-700 form-checkbox focus:border-purple-400 focus:outline-none focus:shadow-outline-purple focus:border-purple-400 focus:shadow-outline-purple"
      />
      {
        !text ? <span className="ml-2 text-gray-500" style={{fontSize: 'small'}}>
        {t('Tôi đồng ý với')} <span className="underline"><a href={link}>{t('Quy định đăng ký thành viên')} {showError && <span style={{color: '#F31818'}}>*</span>}</a></span>
      </span> : 
        <span className="ml-2" style={{fontSize: '15px'}}>{text}</span>
      }
      <br/>
      {showError && <div><p style={{color: '#F31818',fontSize: 'small',marginLeft: '25px',textAlign: 'left'}}>{errors[name]}</p></div>}
    </Label>
  );
}

export default CheckboxField;