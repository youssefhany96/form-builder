import React, { useState } from "react";

const EditFieldModal = ({ isOpen, field, onClose, onSave, onDelete }) => {
  const [formData, setFormData] = useState(field);

  if (!isOpen) return null;

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">Options</h3>
        <div className="space-y-4">
          <div className="flex flex-row space-y-2 gap-5 justify-between items-center">
            <label
              htmlFor="label"
              className="block text-sm font-medium text-gray-700"
            >
              Label
            </label>
            <input
              id="label"
              name="label"
              type="text"
              value={formData.label}
              onChange={handleInputChange}
              className="focus:ring-indigo-500 focus:border-indigo-500 w-full block shadow-sm sm:text-sm border-gray-300 rounded-md text-gray-700"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <div className="flex items-center justify-between">
              <label
                htmlFor="required"
                className="block text-sm font-medium text-gray-700"
              >
                Required
              </label>
              <input
                id="isRequired"
                name="isRequired"
                type="checkbox"
                checked={formData.isRequired}
                onChange={handleInputChange}
                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-between mt-4">
          <button
            onClick={onClose}
            className="py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditFieldModal;
