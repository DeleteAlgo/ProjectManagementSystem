// resources/js/components/MultiColumnAppShell.jsx
// Multi-column Project Management App Shell (React + Tailwind)

import { useState } from "react";

export default function MultiColumnAppShell({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Top Nav */}
      <header className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-14 flex items-center gap-3">
          {/* Mobile menu button */}
          <button
            className="inline-flex items-center justify-center rounded-xl p-2 hover:bg-gray-100 lg:hidden"
            onClick={() => setSidebarOpen((v) => !v)}
            aria-label="Toggle sidebar"
          >
            {/* Hamburger icon */}
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path strokeWidth="2" strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Brand */}
          <div className="flex items-center gap-2 font-semibold">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-indigo-600 text-white text-xs">
              PM
            </span>
            <span>Project Manager</span>
          </div>

          {/* Global Search */}
          <div className="ml-auto hidden md:block md:flex-1 md:max-w-md">
            <label className="relative block">
              <span className="sr-only">Search</span>
              <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  className="h-5 w-5 text-gray-400"
                >
                  <circle cx="11" cy="11" r="7" strokeWidth="2" />
                  <path d="M20 20l-3.2-3.2" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </span>
              <input
                className="w-full rounded-xl border border-gray-200 bg-white py-2 pl-10 pr-3 text-sm shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-indigo-50 focus:border-indigo-300"
                placeholder="Search projects, tasks, teams…"
              />
            </label>
          </div>

          {/* User avatar */}
          <button className="ml-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-200">
            <span className="text-sm font-medium">R</span>
          </button>
        </div>
      </header>

      {/* Main Grid: Sidebar | Filters | Content | Right Panel */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[16rem,14rem,1fr,20rem] gap-6 py-6">
          {/* Sidebar */}
          <aside
            className={`lg:sticky lg:top-16 lg:self-start ${
              sidebarOpen ? "block" : "hidden"
            } lg:block`}
          >
            <nav className="rounded-2xl border bg-white p-3 shadow-sm">
              <h3 className="px-2 pb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Navigation
              </h3>
              <ul className="space-y-1">
                {[
                  { name: "Dashboard" },
                  { name: "Projects" },
                  { name: "Tasks" },
                  { name: "Calendar" },
                  { name: "Documents" },
                  { name: "Reports" },
                ].map((item) => (
                  <li key={item.name}>
                    <a
                      href="#"
                      className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm hover:bg-gray-50"
                    >
                      <span className="inline-flex h-5 w-5 items-center justify-center rounded-md bg-gray-100 text-[10px]">
                        {item.name[0]}
                      </span>
                      <span>{item.name}</span>
                    </a>
                  </li>
                ))}
              </ul>

              <div className="mt-4 border-t pt-4">
                <h4 className="px-2 pb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Teams
                </h4>
                <ul className="space-y-1">
                  {["Frontend", "Backend", "Design"].map((t) => (
                    <li key={t}>
                      <a
                        href="#"
                        className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm hover:bg-gray-50"
                      >
                        <span className="h-2 w-2 rounded-full bg-emerald-500" />
                        <span>{t}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>
          </aside>

          {/* Secondary Sidebar (Filters) */}
          <aside className="lg:sticky lg:top-16 lg:self-start">
            <div className="rounded-2xl border bg-white p-4 shadow-sm">
              <h3 className="mb-3 text-sm font-semibold">Filters</h3>
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                  My tasks
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                  Due this week
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                  With attachments
                </label>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="rounded-2xl border bg-white p-6 shadow-sm">
            {children || <p className="text-gray-500">Welcome to your dashboard.</p>}
          </main>

          {/* Right Panel */}
          <aside className="lg:sticky lg:top-16 lg:self-start">
            <div className="rounded-2xl border bg-white p-4 shadow-sm">
              <h3 className="mb-3 text-sm font-semibold">Activity</h3>
              <ul className="space-y-3 text-sm">
                <li>📌 Project "Alpha" updated</li>
                <li>✅ Task "Wireframes" completed</li>
                <li>👥 New member joined "Design"</li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
