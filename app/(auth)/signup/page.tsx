"use client";
import { useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { signUpMetadata as metadata } from '@/components/toknwrks/metadata'; // Adjust the import path as needed

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted');

    const res = await fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    if (res.ok) {
      setSuccess('Account created successfully!');
      setError('');
      console.log('Account created successfully');
    } else {
      const data = await res.json();
      setError(data.error || 'Error creating account');
      setSuccess('');
      console.error('Error creating account:', data.error);
    }
  };

  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>
      <section>
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="py-12 md:py-20">
            {/* Section header */}
            <div className="pb-12 text-center">
              <h1 className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,theme(colors.gray.200),theme(colors.indigo.200),theme(colors.gray.50),theme(colors.indigo.300),theme(colors.gray.200))] bg-[length:200%_auto] bg-clip-text font-nacelle text-3xl font-semibold text-transparent md:text-4xl">
                Create an account
              </h1>
            </div>
            {/* Contact form */}
            <form className="mx-auto max-w-[400px]" onSubmit={handleSubmit}>
              <div className="space-y-5">
                <div>
                  <label
                    className="mb-1 block text-sm font-medium text-indigo-200/65"
                    htmlFor="name"
                  >
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-input w-full bg-gray-800 text-white border-gray-600 focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label
                    className="mb-1 block text-sm font-medium text-indigo-200/65"
                    htmlFor="email"
                  >
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-input w-full bg-gray-800 text-white border-gray-600 focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="Your email"
                    required
                  />
                </div>
                <div>
                  <label
                    className="mb-1 block text-sm font-medium text-indigo-200/65"
                    htmlFor="password"
                  >
                    Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-input w-full bg-gray-800 text-white border-gray-600 focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="Your password"
                    required
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full rounded-md bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Sign Up
                  </button>
                </div>
                {error && <div className="text-red-500">{error}</div>}
                {success && <div className="text-green-500">{success}</div>}
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
