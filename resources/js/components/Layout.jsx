import { useState, useEffect } from "react";

// Importing components
import UserProfileHero from "./UserProfileHero";
import NavUserTeams from "./NavUserTeams";
import NavSideBar from "./NavSideBar";
import LanguageSelector from "./LanguageSelector";
import DashboardOverviewPanel from "./DashboardOverviewPanel";

// Importing static data
import DashboardUpcomingTips from "./DashboardUpcomingTips";
import { navigation } from "../constants/navigation";
import { teams } from "../constants/teams";
import { messages } from "../constants/messages";
import ProjectBoard from "./ProjectBoard";
import ProfileSettingsSection from "./ProfileSettingsSection";


function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Layout({ children }) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || {});
  const [lang, setLang] = useState("en");
  const [selectedPage, setSelectedPage] = useState("Dashboard");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      window.location.href = "/";
    }
  }, []);

  const translate = (key) => messages[lang]?.[key] ?? key;

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div className="flex w-64 flex-col border-r border-gray-800 bg-gray-900">
        <div className="flex flex-col flex-grow overflow-y-auto">
          <div className="flex items-center h-16 flex-shrink-0 px-4 justify-between">
            <span className="text-lg font-bold text-indigo-400">AK PM</span>

            {/* Language selector (compact) */}
            <LanguageSelector lang={lang} setLang={setLang} />
          </div>

          {/* Navigation */}
          <NavSideBar navigation={navigation} onSelect={setSelectedPage} selectedPage={selectedPage}/>

          {/* Teams */}
          <NavUserTeams teams={teams} />
        </div>

        {/* User profile */}
        <UserProfileHero user={user} onProfileClick={() => setSelectedPage("Profile")} />
      </div>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6">
          {selectedPage === "Dashboard" && (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <DashboardOverviewPanel translate={translate} />
              <DashboardUpcomingTips translate={translate} />
            </div>
          )}
          {selectedPage === "Team" && <div>Team Content</div>}
          {selectedPage === "Projects" && (
            <div><ProjectBoard /></div>
          )}
          {selectedPage === "Profile" && (
            <ProfileSettingsSection userInfo={user} setUser={setUser} setSelectedPage={setSelectedPage}/>
          )}
          {/* Add more as needed */}
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
