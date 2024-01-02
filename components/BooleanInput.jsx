export default function BooleanInput({ id, label, value, onChange }) {
  return (
    <div className="flex items-center">
      <label htmlFor={`field-${id}`} className="mr-2 font-medium">{label || 'Yes/No'}</label>
      <input
        type="checkbox"
        id={`field-${id}`}
        checked={value}
        onChange={e => onChange(e.target.checked)}
        className="rounded text-blue-600"
      />
    </div>
  );
}
