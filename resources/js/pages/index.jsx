import { useState } from "react";

export default function index() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError("Please fill in all fields.");
      return;
    }
    // Handle login logic here
    alert("Logged in!");
  };

  return (
    <div class="h-dvh w-full flex">
      <div class="w-1/2 bg-gray-900">
        <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
          <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <img src="https://arashlaw.com/wp-content/uploads/2023/08/AKLAW-Logo-khorsandi-bold-and-law-bold-no-number-white-370x97-1-e1677008268600.webp" alt="Your Company" class="mx-auto h-auto w-100" />
            {error && (
              <div className="mb-4 text-red-500 text-sm text-center">{error}</div>
            )}
          </div>

          <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form action="#" method="POST" class="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label for="email" class="block text-sm/6 font-medium text-white">Email address</label>
                <div class="mt-2">
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
                <div class="flex items-center justify-between">
                  <label for="password" class="block text-sm/6 font-medium text-white">Password</label>
                </div>
                <div class="mt-2">
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
                <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Sign in</button>
              </div>
            </form>

            <p class="mt-10 text-center text-sm/6 text-white">
             Forgot password? <a href="#" class="font-semibold text-indigo-400 hover:text-indigo-300">Click here to reset your password.</a>
            </p>
          </div>
        </div>
      </div>
      <div class="w-1/2 bg-white h-full bg-[url('https://images.pexels.com/photos/15686925/pexels-photo-15686925.jpeg')] bg-cover bg-center" >
          <div class="bg-gray-400 mix-blend-multiply w-full h-full"></div>
      </div>
    </div>
  );
}