import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencilAlt,
  faTasks,
  faPhone,
  faEnvelope,
  faToggleOn,
  faListUl,
} from "@fortawesome/free-solid-svg-icons";

const inputTypes = [
  { label: "Short answer", value: "shortText", icon: faPencilAlt },
  { label: "Multiple choice", value: "multipleChoice", icon: faListUl },
  { label: "Multi-select", value: "multiSelect", icon: faTasks },
  { label: "Email", value: "email", icon: faEnvelope },
  { label: "Phone number", value: "phone", icon: faPhone },
  { label: "Boolean", value: "boolean", icon: faToggleOn },
];

export default function Sidebar({ onAddField }) {
  return (
    <div className="fixed inset-x-0 bottom-0 sm:fixed sm:top-16 sm:left-0 bg-white shadow-lg p-4 sm:w-64 sm:h-full z-10">
      <div className="flex sm:block">
        {inputTypes.map((inputType) => (
          <button
            key={inputType.value}
            className="flex items-center justify-center sm:justify-start w-full sm:mb-2 p-2 hover:bg-gray-100 rounded transition duration-200 ease-in-out"
            onClick={() => onAddField(inputType.value)}
            title={inputType.label}
          >
            <FontAwesomeIcon
              icon={inputType.icon}
              className="text-xl sm:text-base text-gray-700"
            />
            <span className="hidden sm:inline text-gray-800 font-medium p-2">
              {inputType.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

