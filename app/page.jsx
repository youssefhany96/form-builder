// pages/index.jsx
import React from 'react';
import Head from 'next/head';
import FormBuilder from '../components/FormBuilder';
import NavBar from '../components/NavBar';

export default function Home() {
  return (
    <div className="flex flex-col ">
      <Head>
        <title>Form Builder App</title>
        <meta name="description" content="Dynamic form builder application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-1">
        <FormBuilder />
      </main>
    </div>
  );
}
