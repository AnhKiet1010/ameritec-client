import PropTypes from 'prop-types';
import React from 'react';
import Select from 'react-select';
import { FormGroup, Label } from 'reactstrap';

import './index.css';

SelectField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,

  label: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  options: PropTypes.array,
  note: PropTypes.string,
  isRequired: PropTypes.bool,
  classInput: PropTypes.string,
  classLabel: PropTypes.string,
};

SelectField.defaultProps = {
  label: '',
  placeholder: '',
  disabled: false,
  options: [],
  note: '',
  isRequired: true,
  classLabel: "dark:text-white",
}

function SelectField(props) {
  const { field, options, placeholder, disabled,form, label,
    // note,isRequired,
     classLabel } = props;
  const { name, value } = field;
  const {errors , touched} = form;
  const showError = errors[name] && touched[name];
  const selectedOption = options.find(option => option.value === value);

  const handleSelectedOptionChange = (selectedOption) => {
    const selectedValue = selectedOption ? selectedOption.value : selectedOption;

    const changeEvent = {
      target: {
        name: name,
        value: selectedValue
      }
    };
    field.onChange(changeEvent);
  }

  return (
    <div className="mt-3">
    <FormGroup>
      {label && <Label for={name}>
      <span className={classLabel}>{label} {showError && <span style={{color: '#F31818'}}>*</span>}</span>
      </Label>}

      <Select
        id={name}
        {...field}
        value={selectedOption}
        onChange={handleSelectedOptionChange}

        placeholder={placeholder}
        isDisabled={disabled}
        options={options}

        className={`${showError ? 'is-invalid bg-red-100' : ''} mt-2 service-small`}
      />

      {/* {showError ? <FormFeedback className="note error">{errors[name]}</FormFeedback> : <p className="note">{note}</p>} */}
    </FormGroup>
    </div>
  );
}

export default SelectField; 