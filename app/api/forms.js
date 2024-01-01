import { v4 as uuidv4 } from 'uuid';
import { supabase } from '../../utils/supabase';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Generate a unique identifier for the form
    const formId = uuidv4();

    // Store the form configuration along with the unique identifier
    const { data, error } = await supabase
      .from('forms')
      .insert([{ id: formId, ...req.body }]);

    // Handle errors
    if (error) return res.status(500).json({ error: error.message });

    // Return the public link
    res.status(200).json({ link: `https://localhost:3000/forms/${formId}` });
  }
}
