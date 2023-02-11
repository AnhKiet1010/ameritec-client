import PropTypes from 'prop-types';
import React from 'react';
import { Label  } from '@windmill/react-ui'
import './index.css';
import {Input} from 'reactstrap';

RadioField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,

  type: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
};

RadioField.defaultProps = {
  type: 'radio',
  label: '',
  value: ''
}

function RadioField(props) {
  const {
    field, type,form, label, value
  } = props;

  const {name} = field;
  const {errors , touched} = form;
  const showError = errors[name] && touched[name];



  return (
    <Label className="mt-6" check style={{display: 'block'}}>
      <Input 
      {...field}

      type={type}
      value={value}
      className="form-radio text-purple-600 text-xl form-Radio focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray focus:border-purple-400 dark:border-gray-600 focus:shadow-outline-purple dark:focus:border-gray-600 dark:focus:shadow-outline-gray dark:bg-gray-700"
      />
      <span className="ml-2" style={{fontSize: '20px'}}>
        {label}
      </span>
      <br/>
      {showError && <div><p style={{color: '#F31818',fontSize: 'small',marginLeft: '25px',textAlign: 'left'}}>{errors[name]}</p></div>}
    </Label>
  );
}

export default RadioField;