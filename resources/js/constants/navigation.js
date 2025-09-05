import {
  HomeIcon,
  UsersIcon,
  FolderIcon,
  CalendarIcon,
  DocumentDuplicateIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";

export const navigation = [
  { name: "Dashboard", icon: HomeIcon, current: true },
  { name: "Team", icon: UsersIcon, current: false },
  { name: "Projects", icon: FolderIcon, current: false },
  { name: "Calendar", icon: CalendarIcon, current: false },
  { name: "Documents", icon: DocumentDuplicateIcon, current: false },
  { name: "Reports", icon: ChartBarIcon, current: false },
];