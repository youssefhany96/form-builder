export default function EmailInput({ id, label, value, onChange }) {
  return (
    <div>
      <label htmlFor={`field-${id}`} className="block mb-2 font-medium">{label || 'Email'}</label>
      <input
        type="email"
        id={`field-${id}`}
        value={value}
        onChange={e => onChange(e.target.value)}
        className="border-2 rounded p-2 w-full text-gray-800"
      />
    </div>
  );
}
