import React from 'react';
import PropTypes from 'prop-types';

const PhoneInput = ({ id, label, value, onChange }) => {
  return (
    <div className="mb-4">
      <label htmlFor={`field-${id}`} className="block text-sm font-medium">
        {label || 'Phone Number'}
      </label>
      <input
        type="tel"
        id={`field-${id}`}
        name={`field-${id}`}
        value={value}
        onChange={e => onChange(id, e.target.value)}
        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2"
        placeholder="(123) 456-7890"
      />
    </div>
  );
};

export default PhoneInput;
