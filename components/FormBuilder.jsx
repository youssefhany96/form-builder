"use client";
import React, { useState } from "react";
import { createClient } from "../utils/supabase/client";
import { useRouter } from "next/navigation";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Sidebar from "./Sidebar";
import TextInput from "./TextInput";
import EmailInput from "./EmailInput";
import MultiSelectInput from "./MultiSelectInput";
import MultipleChoiceInput from "./MultipleChoiceInput";
import BooleanInput from "./BooleanInput";
import PhoneInput from "./PhoneInput";
import FieldOptions from "./FieldOptions";
import EditFieldModal from "./modal/EditFieldModal";

export default function FormBuilder() {
  const [fields, setFields] = useState([]);
  const [formName, setFormName] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentEditingField, setCurrentEditingField] = useState(null);

  const supabase = createClient();
  const router = useRouter();

  const handleAddField = (type) => {
    let newField = {
      id: Date.now(),
      type, 
      value: "",
      label: "",
      isRequired: false,
    };
    if (type === "multiSelect") {
      newField = {
        ...newField,
        options: [
          { label: "Option 1", value: "option1" },
          { label: "Option 2", value: "option2" },
          { label: "Option 3", value: "option3" },
        ],
        value: [],
      };
    }
    if (type === "multipleChoice") {
      newField = {
        ...newField,
        options: [
          { label: "Option 1", value: "option1" },
          { label: "Option 2", value: "option2" },
        ],
        value: "",
      };
    }

    setFields((fields) => [...fields, newField]);
  };

  const handleDeleteField = (id) => {
    setFields(fields.filter((field) => field.id !== id));
  };

  const handleEditField = (field) => {
    setCurrentEditingField(field);
    setIsEditModalOpen(true);
  };

  const saveFormResponse = async (formId, responseData) => {
    const { data, error } = await supabase
      .from("form_responses")
      .insert([{ form_id: formId, response: responseData }]);

    if (error) {
      console.error("Error saving form response: ", error);
    } else {
      console.log("Form response saved successfully!", data);
    }
  };

  function handleFormReset() {
    setFields([]);
  }

  const handleFieldChange = (id, newValue) => {
    setFields(
      fields.map((field) =>
        field.id === id ? { ...field, value: newValue } : field
      )
    );
  };

  const handleSaveForm = async () => {
    if (fields.length === 0) {
      alert("Error: Form must have at least one field.");
      return; 
    }
    const formData = {
      name: formName,
      fields: fields,
    };

    const { data, error } = await supabase.from("forms").insert([formData]);

    if (error) {
      console.error("Error saving form: ", error);
    } else {
      router.push("/forms");
    }
  };

  function renderField(field, index) {
    switch (field.type) {
      case "shortText":
        return (
          <TextInput
            id={field.id}
            label={field.label}
            onChange={(newValue) => handleFieldChange(field.id, newValue)}
          />
        );
      case "email":
        return (
          <EmailInput
            id={field.id}
            label={field.label}
            onChange={(newValue) => handleFieldChange(field.id, newValue)}
          />
        );
      case "multipleChoice":
        return (
          <MultipleChoiceInput
            id={field.id}
            label={field.label}
            options={field.options}
            onChange={(newValue) => handleFieldChange(field.id, newValue)}
          />
        );
      case "multiSelect":
        return (
          <MultiSelectInput
            id={field.id}
            label={field.label}
            options={field.options}
            onChange={(newValue) => handleFieldChange(field.id, newValue)}
          />
        );
      case "boolean":
        return (
          <BooleanInput
            id={field.id}
            label={field.label}
            onChange={(newValue) => handleFieldChange(field.id, newValue)}
          />
        );
      case "phone":
        return (
          <PhoneInput
            key={field.id}
            id={field.id}
            label={field.label}
            value={field.value}
            onChange={handleFieldChange}
          />
        );
      default:
        return null;
    }
  }

  function reorder(list, startIndex, endIndex) {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  }

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const newFields = reorder(
      fields,
      result.source.index,
      result.destination.index
    );

    setFields(newFields);
  };

  const handleSaveField = (updatedField) => {
    setFields(
      fields.map((field) =>
        field.id === updatedField.id ? { ...field, ...updatedField } : field
      )
    );
    setIsEditModalOpen(false);
  };

  return (
    <>
      <div className="flex flex-col items-center p-4">
        <input
          type="text"
          placeholder="Enter Form Name"
          value={formName}
          onChange={(e) => setFormName(e.target.value)}
          className="mb-4 p-2 w-72 border-2 rounded text-gray-700 sm:w-96"
        />
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex">
            <Sidebar onAddField={handleAddField} />
            <Droppable droppableId="droppable-fields">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="flex-grow p-4"
                >
                  {fields.map((field, index) => (
                    <Draggable
                      key={field.id}
                      draggableId={field.id.toString()}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className="relative w-72 group p-2 border-2 rounded mb-2 sm:w-96 h-30"
                        >
                          {/* Field rendering logic */}

                          {renderField(field, index)}
                          <FieldOptions
                            onDelete={() => handleDeleteField(field.id)}
                            onEdit={() => handleEditField(field)}
                            dragHandleProps={provided.dragHandleProps}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </DragDropContext>
      </div>
      <div className="fixed bottom-20 right-4 space-x-2 sm:bottom-4">
        <button
          type="button"
          onClick={handleFormReset}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Reset Fields
        </button>
        <button
          type="button"
          onClick={handleSaveForm}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Save Form
        </button>
      </div>

      {isEditModalOpen && (
        <EditFieldModal
          isOpen={isEditModalOpen}
          field={currentEditingField}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSaveField}
        />
      )}
    </>
  );
}
