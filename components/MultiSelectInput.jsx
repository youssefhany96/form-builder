export default function MultiSelectInput({ id, label, options = [], value, onChange }) {
  const handleChange = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions, option => option.value);
    onChange(selectedOptions);
  };

  return (
    <div>
      <label htmlFor={`field-${id}`} className="block mb-2 font-medium">
        {label || 'Select Options'}
      </label>
      <select
        id={`field-${id}`}
        multiple
        value={value}
        onChange={handleChange}
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
