export default function TextInput({ id, label, value, onChange }) {
  return (
    <div>
      <label htmlFor={`field-${id}`} className="block mb-2 font-medium">
        {label || "Short Text"}
      </label>
      <input
        type="text"
        id={`field-${id}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border-2 rounded p-2 w-full text-gray-800"
        maxLength="50"
      />
    </div>
  );
}
