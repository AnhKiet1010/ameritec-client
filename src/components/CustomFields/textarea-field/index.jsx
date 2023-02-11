import PropTypes from 'prop-types';
import React from 'react';
import { Label  } from '@windmill/react-ui'
import './index.css';
import {Input, FormFeedback} from 'reactstrap';

TextareaField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,

  type: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  isRequired: PropTypes.bool,
  label: PropTypes.string,
  note: PropTypes.string,
  classInput: PropTypes.string,
  classLabel: PropTypes.string,
};

TextareaField.defaultProps = {
  type: 'text',
  placeholder: '',
  label: '',
  disabled: false,
  isRequired: true,
  note: '',
  classInput: `block w-full text-sm focus:outline-none border-gray-300 form-input leading-5 focus:border-purple-400 focus:shadow-outline-purple mt-2`,
}

function TextareaField(props) {
  const {
    field, form,
    label, type, placeholder,
    //  note,
      disabled, classLabel, classInput,
  } = props;

  const {name} = field;
  const {errors , touched} = form;
  const showError = errors[name] && touched[name];

  return (
    <div className="mt-3">
    <Label forhtml={name}>
      <span className={classLabel}>{label} {showError && <span style={{color: '#F31818'}}>*</span>}</span>
      <Input
        {...field}
        id={name}

        type="textarea"
        placeholder={placeholder}
        disabled={disabled}

        className={`${classInput} ${showError && "border-red-600"} ${showError && "bg-red-100"}`}

        invalid={showError}
        autoComplete="off"
      />
      {showError && <FormFeedback className="note error">{errors[name]}</FormFeedback>}
    </Label>
    </div>
  );
}

export default TextareaField;