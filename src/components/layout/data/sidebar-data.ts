import {
  IconBell,
  IconCalendarDue,
  IconChartLine,
  IconHelp,
  IconLayoutDashboard,
  IconLockPassword,
  IconPalette,
  IconUserCircle,
  IconUserCog,
  IconAlertTriangle,
  IconSearch,
  IconUser,
} from "@tabler/icons-react";
import { Command, CreditCard } from "lucide-react";
import { type SidebarData } from "../types";
import { APP_NAME } from "@/constants/index";
import { Routes } from "@/routes/routes";
import { RoleTypes } from "@/features/user/interfaces/user";

export const sidebarData: SidebarData = {
  teams: [
    {
      name: APP_NAME,
      logo: Command,
      plan: "Vite + ShadcnUI",
    },
  ],
  navGroups: [
    {
      access: RoleTypes.admin,
      title: "Admin",
      items: [
        {
          title: "Users",
          url: Routes.admin.users,
          icon: IconUser,
        },
        {
          title: "Alerts",
          url: Routes.admin.alerts,
          icon: IconAlertTriangle,
        },
      ],
    },
    {
      title: "Console",
      items: [
        {
          title: "Dashboard",
          url: Routes.dashboard,
          icon: IconLayoutDashboard,
        },
        {
          title: "Alerts",
          url: Routes.alerts,
          icon: IconAlertTriangle,
        },
      ],
    },
    {
      title: "Monitoring ",
      items: [
        {
          title: "Media",
          url: Routes.media.twitter,
          icon: IconSearch,
        },
        {
          title: "Tracking",
          url: Routes.tracking.stocks,
          icon: IconChartLine,
        },
        {
          title: "Notifications",
          url: Routes.notifications.root,
          icon: IconBell,
        },
      ]
    },
    {
      title: "Settings",
      items: [
        {
          title: "Account",
          icon: IconUserCircle,
          items: [
            {
              title: "Profile",
              url: "#",
              icon: IconUserCog,
            },

            {
              title: "Password",
              url: "#",
              icon: IconLockPassword,
            },
            {
              title: "Appearance",
              url: "#",
              icon: IconPalette,
            },
          ],
        },
        {
          title: "Billing",
          icon: CreditCard,
          items: [
            {
              title: "Subscription",
              url: "#",
              icon: IconCalendarDue,
            },
          ],
        },

      ],
    },
    {
      title: "Other",
      items: [
        {
          title: "Help Center",
          url: "#",
          icon: IconHelp,
        },
      ],
    },
  ],
};
