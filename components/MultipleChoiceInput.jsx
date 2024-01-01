import React, { useState } from 'react';

const MultipleChoiceInput = ({ id, label, options, onChange }) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
    if (onChange) {
      onChange(event.target.value);
    }
  };

  return (
    <div>
      <label htmlFor={`multiple-choice-${id}`} className="block mb-2 font-medium">
        {label || 'Choose an option'}
      </label>
      <div id={`multiple-choice-${id}`} className="mt-2">
        {options.map((option, index) => (
          <div key={option.value} className="flex items-center mb-2">
            <input
              id={`option-${id}-${index}`}
              name={`multiple-choice-${id}`}
              type="radio"
              value={option.value}
              checked={selectedOption === option.value}
              onChange={handleChange}
              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded-full"
            />
            <label htmlFor={`option-${id}-${index}`} className="ml-3 text-sm font-medium">
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultipleChoiceInput;
