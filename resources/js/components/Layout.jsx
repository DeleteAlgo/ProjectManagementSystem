import { useState } from "react";
import {
  HomeIcon,
  UsersIcon,
  FolderIcon,
  CalendarIcon,
  DocumentDuplicateIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";

const navigation = [
  { name: "Dashboard", icon: HomeIcon, current: true },
  { name: "Team", icon: UsersIcon, current: false },
  { name: "Projects", icon: FolderIcon, current: false },
  { name: "Calendar", icon: CalendarIcon, current: false },
  { name: "Documents", icon: DocumentDuplicateIcon, current: false },
  { name: "Reports", icon: ChartBarIcon, current: false },
];

const user = JSON.parse(localStorage.getItem("user"));

const teams = [
  { id: 1, name: "Heroicons", initials: "H" },
  { id: 2, name: "Tailwind Labs", initials: "T" },
  { id: 3, name: "Workcation", initials: "W" },
];

// --- Minimal i18n dictionary (no external libs) ---
const messages = {
  en: {
    header: "Project Management Dashboard",
    subheader: "Overview of your projects, tasks, and team activity.",
    statsTitle: "Today's Highlights",
    projects: "Projects",
    tasks: "Tasks",
    due: "Due this week",
    primaryCta: "Create Project",
    secondaryCta: "Add Task",

    rightTitle: "Upcoming & Tips",
    upcoming: "Upcoming",
    tipTitle: "Quick Tips",
    tip1: "Use labels to group related tasks.",
    tip2: "Assign due dates to improve forecasting.",
    tip3: "Mention teammates with @ to notify them.",

    u1: "Design review for Alpha",
    u2: "Client call: immigration case",
    u3: "Sprint planning (Team Frontend)",
  },
  tl: {
    header: "Dashboard ng Pamamahala ng Proyekto",
    subheader: "Buod ng iyong mga proyekto, gawain, at aktibidad ng koponan.",
    statsTitle: "Mga Highlight Ngayon",
    projects: "Mga Proyekto",
    tasks: "Mga Gawain",
    due: "Nakatalaga ngayong linggo",
    primaryCta: "Lumikha ng Proyekto",
    secondaryCta: "Magdagdag ng Gawain",

    rightTitle: "Paparating at Mga Tip",
    upcoming: "Paparating",
    tipTitle: "Mabilis na Mga Tip",
    tip1: "Gumamit ng labels para pangkatin ang magkakaugnay na gawain.",
    tip2: "Magtakda ng due dates para mas mahusay ang forecast.",
    tip3: "Banggitin ang kakampi gamit ang @ para ma-notify sila.",

    u1: "Design review para sa Alpha",
    u2: "Tawag sa kliyente: kaso sa immigration",
    u3: "Sprint planning (Team Frontend)",
  },
  es: {
    header: "Panel de Gestión de Proyectos",
    subheader: "Resumen de tus proyectos, tareas y actividad del equipo.",
    statsTitle: "Destacados de Hoy",
    projects: "Proyectos",
    tasks: "Tareas",
    due: "Para esta semana",
    primaryCta: "Crear Proyecto",
    secondaryCta: "Añadir Tarea",

    rightTitle: "Próximos y Consejos",
    upcoming: "Próximos",
    tipTitle: "Consejos Rápidos",
    tip1: "Usa etiquetas para agrupar tareas relacionadas.",
    tip2: "Asigna fechas de vencimiento para mejorar la previsión.",
    tip3: "Menciona a compañeros con @ para avisarles.",

    u1: "Revisión de diseño para Alpha",
    u2: "Llamada con cliente: caso de inmigración",
    u3: "Planificación de sprint (Equipo Frontend)",
  },
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Layout({ children }) {
  const [lang, setLang] = useState("en");

  const t = (key) => messages[lang]?.[key] ?? key;

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div className="flex w-64 flex-col border-r border-gray-800 bg-gray-900">
        <div className="flex flex-col flex-grow overflow-y-auto">
          <div className="flex items-center h-16 flex-shrink-0 px-4 justify-between">
            <span className="text-lg font-bold text-indigo-400">AK PM</span>

            {/* Language selector (compact) */}
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              className="rounded-md border border-gray-700 bg-gray-800 px-2 py-1 text-xs text-gray-200 focus:outline-none"
              aria-label="Language"
              title="Language"
            >
              <option value="en">EN</option>
              <option value="tl">TL</option>
              <option value="es">ES</option>
            </select>
          </div>
          <nav className="flex-1 space-y-1 px-2">
            {navigation.map((item) => (
              <a
                key={item.name}
                href="#"
                className={classNames(
                  item.current
                    ? "bg-gray-800 text-white"
                    : "text-gray-400 hover:bg-gray-800 hover:text-white",
                  "group flex items-center rounded-md px-2 py-2 text-sm font-medium"
                )}
              >
                <item.icon
                  className="mr-3 h-5 w-5 flex-shrink-0 text-gray-400"
                  aria-hidden="true"
                />
                {item.name}
              </a>
            ))}
          </nav>

          {/* Teams */}
          <div className="mt-6 px-2">
            <p className="px-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
              Your teams
            </p>
            <div className="mt-2 space-y-1">
              {teams.map((team) => (
                <a
                  key={team.id}
                  href="#"
                  className="group flex items-center rounded-md px-2 py-2 text-sm font-medium text-gray-400 hover:bg-gray-800 hover:text-white"
                >
                  <span className="mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-gray-800 text-xs font-medium text-gray-400">
                    {team.initials}
                  </span>
                  <span className="truncate">{team.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* User profile */}
        <div className="flex flex-shrink-0 border-t border-gray-800 p-4">
          <a href="#" className="group block flex-shrink-0 w-full">
            <div className="flex items-center">
              <img
                className="inline-block h-9 w-9 rounded-full"
                src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="Tom Cook"
              />
              <div className="ml-3">
                <p className="text-sm font-medium text-white"> { user.name || "User"}</p>
                <p className="text-xs font-medium text-gray-400 group-hover:text-gray-300">
                  View profile
                </p>
              </div>
            </div>
          </a>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Left panel: Overview, stats, actions */}
            <div className="rounded-lg border border-dashed border-gray-700 bg-gray-800 p-6">
              <h2 className="text-white text-xl font-semibold">{t("header")}</h2>
              <p className="mt-1 text-sm text-gray-300">{t("subheader")}</p>

              {/* Stats */}
              <h3 className="mt-6 text-sm font-semibold text-gray-200">{t("statsTitle")}</h3>
              <div className="mt-3 grid grid-cols-3 gap-3 text-center">
                <div className="rounded-md bg-gray-900/40 p-3">
                  <div className="text-2xl font-bold text-white">12</div>
                  <div className="text-xs text-gray-400">{t("projects")}</div>
                </div>
                <div className="rounded-md bg-gray-900/40 p-3">
                  <div className="text-2xl font-bold text-white">34</div>
                  <div className="text-xs text-gray-400">{t("tasks")}</div>
                </div>
                <div className="rounded-md bg-gray-900/40 p-3">
                  <div className="text-2xl font-bold text-white">7</div>
                  <div className="text-xs text-gray-400">{t("due")}</div>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-6 flex gap-3">
                <button className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-500">
                  {t("primaryCta")}
                </button>
                <button className="rounded-md border border-gray-600 px-3 py-2 text-sm font-medium text-gray-100 hover:bg-gray-700">
                  {t("secondaryCta")}
                </button>
              </div>
            </div>

            {/* Right panel: Upcoming + Tips */}
            <div className="rounded-lg border border-dashed border-gray-700 bg-gray-800 p-6">
              <h2 className="text-white text-xl font-semibold">{t("rightTitle")}</h2>

              {/* Upcoming */}
              <h3 className="mt-4 text-sm font-semibold text-gray-200">{t("upcoming")}</h3>
              <ul className="mt-2 space-y-2 text-sm text-gray-300">
                <li className="rounded-md bg-gray-900/40 p-3">• {t("u1")}</li>
                <li className="rounded-md bg-gray-900/40 p-3">• {t("u2")}</li>
                <li className="rounded-md bg-gray-900/40 p-3">• {t("u3")}</li>
              </ul>

              {/* Tips */}
              <h3 className="mt-6 text-sm font-semibold text-gray-200">{t("tipTitle")}</h3>
              <ul className="mt-2 list-disc pl-5 text-sm text-gray-300 space-y-1">
                <li>{t("tip1")}</li>
                <li>{t("tip2")}</li>
                <li>{t("tip3")}</li>
              </ul>
            </div>
          </div>

          {/* Optional: render external children below the two primary panels */}
          {children && (
            <div className="mt-6 rounded-lg border border-dashed border-gray-700 bg-gray-800 p-6">
              {children}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
