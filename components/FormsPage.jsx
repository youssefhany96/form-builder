import React, { useState, useEffect } from 'react';
import { createClient } from '../utils/supabase/client';
import Link from 'next/link';

export default function AllFormsPage() {
  const [forms, setForms] = useState([]);
  const supabase = createClient();

  useEffect(() => {
    const fetchForms = async () => {
      let { data, error } = await supabase.from('forms').select('*');
      if (error) {
        console.error('Error fetching forms:', error);
      } else {
        setForms(data);
      }
    };

    fetchForms();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">All Forms</h1>
      <ul>
        {forms.map((form) => (
          <li key={form.id}>
            <Link href={`/forms/${form.id}`}>
              <a className="text-blue-500 hover:underline">
                {form.name || `Form #${form.id}`}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
