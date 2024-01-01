"use client";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { createClient } from "../../../utils/supabase/client";

export default function FormPage() {
  const params = useParams();
  const router = useRouter();
  console.log(params);
  console.log(router);

  const { formId } = params;
  const [form, setForm] = useState(null);

  const supabase = createClient();

  useEffect(() => {
    const fetchForm = async () => {
      if (formId) {
        const supabase = createClient();
        let { data, error } = await supabase
          .from("forms")
          .select("*")
          .eq("id", formId)
          .single();

        if (error) {
          console.error("Error fetching form:", error);
        } else {
          setForm(data);
        }
      }
    };

    fetchForm();
  }, [formId]);

  const saveFormResponse = async (formId, response) => {
    const { data, error } = await supabase
      .from("form_responses")
      .insert([{ form_id: formId, response: JSON.stringify(response) }])
      .then((response) => ({ data: response.data, error: response.error })) // Ensure we always return an object
      .catch((error) => ({ data: null, error: error })); // Catch any errors

    return { data, error }; // Return an object with data and error
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const allRequiredFieldsFilled = form.fields.every(
      (field) => !field.isRequired || field.value
    );
  
    if (!allRequiredFieldsFilled) {
      alert("Please fill in all required fields.");
      return;
    }

    // Construct the response object
    const response = form.fields.map((field) => ({
      fieldId: field.id,
      value: field.value,
    }));

    try {
      const { data, error } = await saveFormResponse(form.id, response);
      if (error) throw error;

      router.push("/forms");
      // Optionally reset the form or navigate the user away
    } catch (error) {
      console.error("Error saving form response:", error);
    }
  };

  const handleFieldChange = (id, value) => {
    setForm((currentForm) => ({
      ...currentForm,
      fields: currentForm.fields.map((field) =>
        field.id === id ? { ...field, value: value } : field
      ),
    }));
  };

  if (!form) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">{form.name}</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {form.fields.map((field) => {
          switch (field.type) {
            case "shortText":
              return (
                <div key={field.id}>
                  <label
                    htmlFor={`field-${field.id}`}
                    className="block text-sm font-medium"
                  >
                    {field.label || "Short Text"}{" "}
                    {field.isRequired && (
                      <span className="text-red-500">*</span>
                    )}
                  </label>
                  <input
                    type="text"
                    id={`field-${field.id}`}
                    className="mt-1 block w-full rounded-md border-gray-700 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2 text-gray-700"
                    value={field.value}
                    onChange={(e) =>
                      handleFieldChange(field.id, e.target.value)
                    }
                    required={field.isRequired}
                  />
                </div>
              );
            case "email":
              return (
                <div key={field.id}>
                  <label
                    htmlFor={`field-${field.id}`}
                    className="block text-sm font-medium"
                  >
                    {field.label || "Email"} {field.isRequired && "*"}
                  </label>
                  <input
                    type="email"
                    id={`field-${field.id}`}
                    className="mt-1 block w-full rounded-md border-gray-700 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2 text-gray-700"
                    value={field.value}
                    onChange={(e) =>
                      handleFieldChange(field.id, e.target.value)
                    }
                    required={field.isRequired}
                  />
                </div>
              );
            case "multipleChoice":
              return (
                <div key={field.id} className="flex flex-col">
                  <label className="block text-sm font-medium">
                    {field.label || "Multiple Choice"} {field.isRequired && "*"}
                  </label>
                  {field.options.map((option, index) => (
                    <label
                      key={index}
                      className="inline-flex items-center mt-3"
                    >
                      <input
                        type="radio"
                        name={`field-${field.id}`}
                        value={option.value}
                        checked={field.value === option.value}
                        onChange={(e) =>
                          handleFieldChange(field.id, e.target.value)
                        }
                        className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                        required={field.isRequired}
                      />
                      <span className="ml-2 text-gray-700">{option.label}</span>
                    </label>
                  ))}
                </div>
              );
            case "multiSelect":
              return (
                <div key={field.id}>
                  <label
                    htmlFor={`field-${field.id}`}
                    className="block text-sm font-medium"
                  >
                    {field.label || "Multi-select"} {field.isRequired && "*"}
                  </label>
                  <select
                    multiple
                    id={`field-${field.id}`}
                    value={field.value}
                    onChange={(e) =>
                      handleFieldChange(
                        field.id,
                        Array.from(
                          e.target.selectedOptions,
                          (option) => option.value
                        )
                      )
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    required={field.isRequired}
                  >
                    {field.options.map((option) => (
                      <option
                        key={option.value}
                        value={option.value}
                        className="text-gray-800"
                      >
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              );
            case "phone":
              return (
                <div key={field.id}>
                  <label
                    htmlFor={`field-${field.id}`}
                    className="block text-sm font-medium"
                  >
                    {field.label || "Phone Number"} {field.isRequired && "*"}
                  </label>
                  <input
                    type="tel"
                    id={`field-${field.id}`}
                    value={field.value}
                    onChange={(e) =>
                      handleFieldChange(field.id, e.target.value)
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    required={field.isRequired}
                  />
                </div>
              );
            case "boolean":
              return (
                <div key={field.id} className="flex flex-col">
                  <label className="block text-sm font-medium">
                    {field.label || "Boolean Choice"} {field.isRequired && "*"}
                  </label>
                  <select
                    id={`field-${field.id}`}
                    value={field.value}
                    onChange={(e) =>
                      handleFieldChange(field.id, e.target.value)
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    required={field.isRequired}
                  >
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </div>
              );

            default:
              return null; // If the field type is not recognized
          }
        })}
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
