// components/MultiSelectInput.js
export default function MultiSelectInput({ id, label, options = [], value, onChange }) {
  
  // Handler for when the selection changes
  const handleChange = (event) => {
    // Get all selected options from the event target (the select element)
    const selectedOptions = Array.from(event.target.selectedOptions, option => option.value);
    onChange(selectedOptions); // Pass the array of selected options to the onChange handler
  };

  return (
    <div>
      <label htmlFor={`field-${id}`} className="block mb-2 font-medium">
        {label || 'Select Options'}
      </label>
      <select
        id={`field-${id}`}
        multiple // This enables multiple selection
        value={value} // This should be an array of selected option values
        onChange={handleChange} // Set the handler for changes
        className="border-2 rounded p-2 w-full text-gray-800"
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
