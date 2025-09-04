import { useState } from "react";
import { router } from '@inertiajs/react';

import axios from "axios";

export default function index() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  // Get CSRF token from meta tag
  const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError("Please fill in all fields.");
      return;
    }
    try {
      const res = await axios.post(
        "http://localhost:8000/api/login",
        form,
        csrfToken
          ? { headers: { "X-CSRF-TOKEN": csrfToken } }
          : undefined
      );

      localStorage.setItem("auth_token", res.data.access_token);
      localStorage.setItem("token_type", res.data.token_type);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      router.visit('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="h-dvh w-full flex">
      <div className="w-1/2 bg-gray-900">
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
          {error && (
            <div className="mb-4 text-red-500 text-sm text-center">{error}</div>
          )}
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img src="https://arashlaw.com/wp-content/uploads/2023/08/AKLAW-Logo-khorsandi-bold-and-law-bold-no-number-white-370x97-1-e1677008268600.webp" alt="Your Company" className="mx-auto h-auto w-100" />
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form action="#" method="POST" className="space-y-6" onSubmit={handleSubmit}>
              {/* Hidden CSRF input for completeness */}
              <input type="hidden" name="_token" value={csrfToken || ""} />
              <div>
                <label htmlFor="email" className="block text-sm/6 font-medium text-white">Email address</label>
                <div className="mt-2">
                  <input
                    className="w-full px-3 py-2 border border-white text-white rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    autoComplete="username"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm/6 font-medium text-white">Password</label>
                </div>
                <div className="mt-2">
                  <input
                    className="w-full px-3 py-2 border border-white rounded text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    type="password"
                    id="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    autoComplete="current-password"
                  />
                </div>
              </div>

              <div>
                <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Sign in</button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm/6 text-white">
              Forgot password? <a href="#" className="font-semibold text-indigo-400 hover:text-indigo-300">Reset your password here.</a>
            </p>
          </div>
        </div>
      </div>
      <div className="w-1/2 bg-white h-full bg-[url('https://images.pexels.com/photos/15686925/pexels-photo-15686925.jpeg')] bg-cover bg-center" >
        <div className="bg-gray-400 mix-blend-multiply w-full h-full"></div>
      </div>
    </div>
  );
}