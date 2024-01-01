"use client";
import React, { useState, useEffect } from "react";
import { createClient } from "../../utils/supabase/client";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faShareAlt, faTrash } from "@fortawesome/free-solid-svg-icons";

const FormsPage = () => {
  const [forms, setForms] = useState([]);
  const supabase = createClient();

  useEffect(() => {
    const fetchForms = async () => {
      const { data, error } = await supabase.from("forms").select("*");

      if (error) {
        console.error("Error fetching forms:", error);
      } else {
        setForms(data);
      }
    };

    fetchForms();
  }, []);

  const handleShareForm = (formId) => {
    const formLink = `${window.location.origin}/forms/${formId}`;
    navigator.clipboard
      .writeText(formLink)
      .then(() => alert(`Form link copied to clipboard: ${formLink}`))
      .catch((err) => console.error("Error copying link: ", err));
  };

  const handleDeleteForm = async (formId) => {
    if (confirm("Are you sure you want to delete this form?")) {
      const { error } = await supabase
        .from("forms")
        .delete()
        .match({ id: formId });
      if (error) {
        console.error("Error deleting form:", error);
      } else {
        // Refresh the forms list after deletion
        const { data, error } = await supabase.from("forms").select("*");
        if (error) {
          console.error("Error fetching forms:", error);
        } else {
          setForms(data);
        }
      }
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl font-semibold mb-5">All Forms</h1>
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Created At
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {forms.map((form) => (
                    <tr key={form.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{form.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          <span className="hidden sm:inline">
                            {new Date(form.created_at).toLocaleString()}{" "}
                          </span>
                          <span className="sm:hidden">
                            {new Date(form.created_at).toLocaleDateString()}{" "}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <Link
                          href={`/forms/${form.id}`}
                          className="text-indigo-600 hover:text-indigo-900 mr-2 sm:mr-4"
                        >
                          <FontAwesomeIcon
                            icon={faEye}
                            className="inline sm:hidden"
                          />
                          <span className="hidden sm:inline">View</span>
                        </Link>
                        <button
                          className="text-green-600 hover:text-green-900 mr-2 sm:mr-4"
                          onClick={() => handleShareForm(form.id)}
                        >
                          <FontAwesomeIcon
                            icon={faShareAlt}
                            className="inline sm:hidden"
                          />
                          <span className="hidden sm:inline">Share</span>
                        </button>
                        <button
                          onClick={() => handleDeleteForm(form.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <FontAwesomeIcon
                            icon={faTrash}
                            className="inline sm:hidden"
                          />
                          <span className="hidden sm:inline">Delete</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormsPage;
