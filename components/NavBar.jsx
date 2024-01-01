// components/NavBar.js
'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '../utils/supabase/client';

const NavBar = () => {
  const [forms, setForms] = useState([]);
  const supabase = createClient();

  return (
    <nav className="bg-gray-800 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">
            Home
          </Link>
          <div className="flex items-center space-x-4 text-green-500">
              Form Builder
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/forms" className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">
              My Forms
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
