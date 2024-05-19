import React, { useRef, useState } from 'react';

const DynamicForm = () => {
  const inputRefs = useRef([]);
  const [validations, setValidations] = useState({});
  const [formData, setFormData] = useState({});

  const handleFocus = (index) => {
    inputRefs.current[index].focus();
  };

  const validateInput = (index, value) => {
    const isValid = value.length >= 3;
    setValidations((prev) => ({ ...prev, [index]: isValid }));
  };

  const handleChange = (index, value) => {
    setFormData((prev) => ({ ...prev, [index]: value }));
    validateInput(index, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValidForm = Object.values(validations).every((valid) => valid);
    if (isValidForm) {
      console.log('Form Data:', formData);
    } else {
      alert('Please correct the errors before submitting.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {['First Name', 'Last Name', 'Email'].map((label, index) => (
        <div key={index}>
          <label>{label}</label>
          <input
            type="text"
            ref={(el) => (inputRefs.current[index] = el)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && index < inputRefs.current.length - 1) {
                e.preventDefault();
                handleFocus(index + 1);
              }
            }}
            onChange={(e) => handleChange(index, e.target.value)}
          />
          {validations[index] === false && (
            <span style={{ color: 'red' }}>Must be at least 3 characters</span>
          )}
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

export default DynamicForm;
