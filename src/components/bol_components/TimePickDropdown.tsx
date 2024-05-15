import { useState, useEffect } from 'react';
import Select from 'react-select';

type ValidationType = {
  required: string | boolean;
};

export interface PropTypes {
  name: string;
  time: any;
  options: any;
  className?: string;
  placeholder?: string;
  onChange: any;
  validation?: ValidationType;
  isValidationTriggered: boolean;
  initialValue?: any
}

export default function TimePickDropdown({
  time,
  name,
  options,
  placeholder,
  onChange,
  isValidationTriggered,
  initialValue
}: PropTypes) {
  const [selectedValue, setSelectedValue] = useState(null);
  
  useEffect(() => {
    if (initialValue) {
      setSelectedValue(initialValue);
    }
  }, [initialValue]);

  const handleChange = (selectedOption: any) => {
    setSelectedValue(selectedOption);
    onChange(selectedOption);
  }

  return (
    <div>
      <Select
        className='basic-single'
        classNamePrefix='select'
        name={name}
        options={options}
        placeholder={placeholder}
        onChange={handleChange}
        value={selectedValue}
        styles={{
          control: (baseStyles) => ({
            ...baseStyles,
            borderColor: isValidationTriggered && !time ? 'red' : '',
          }),
        }}
      />
      {isValidationTriggered && !time && (
        <div className='-mt-1'>
          <label className='italic text-red-500 text-lg'>*Required</label>
        </div>
      )}
    </div>
  );
}
