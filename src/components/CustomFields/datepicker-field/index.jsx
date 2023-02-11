import PropTypes from 'prop-types';
import React from 'react';
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import en from "date-fns/locale/en-AU"; // the locale you want
import vi from "date-fns/locale/vi"; // the locale you want
import { FormFeedback, FormGroup, Label } from 'reactstrap';
import { useTranslation } from "react-i18next";
// import DatePicker from "reactstrap-date-picker";

import './index.css';

DatepickerField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  
  placeholderText: PropTypes.string,
  dateFormat: PropTypes.string,
  onChange: PropTypes.func,
  label: PropTypes.string,
  note: PropTypes.string,
  isRequired: PropTypes.bool,
  classLabel: PropTypes.string,
};

DatepickerField.defaultProps = {
    placeholderText: '',
    dateFormat: '',
    locale: 'vi',
    onChange: undefined,
    label: '',
    note: '',
    isRequired: true,
    classLabel: "dark:text-white",
}

function DatepickerField(props) {
  const { i18n } = useTranslation();

  const {
    field, form,
    selected,placeholderText,dateFormat,locale,onChange, label, 
    // note, isRequired,
     classLabel
  } = props;

  if(i18n.language == 'en') {
    registerLocale("en", en); // register it with the name you want 
  } else {
    registerLocale("vi", vi); // register it with the name you want
  }

  const {name} = field;
  const {errors , touched} = form;
  const showError = errors[name] && touched[name];

  return (
    <div className="mt-3">
    <FormGroup>
      {label && <Label for={name} >
      <span className={classLabel}>{label} {showError && <span style={{color: '#F31818'}}>*</span>}</span>
      </Label>}
        <DatePicker
            {...field}
            selected={selected}
            placeholderText={placeholderText}
            dateFormat={dateFormat}
            locale={locale}
            onChange={onChange}

            className={`${showError ? 'is-invalid bg-red-100' : ''} mt-2`}
        />

        {showError && <FormFeedback className="note error">{errors[name]}</FormFeedback>}
    </FormGroup>
    </div>
  );
}

export default DatepickerField;