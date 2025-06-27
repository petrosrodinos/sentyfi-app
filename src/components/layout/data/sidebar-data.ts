import {
  IconAlignBoxLeftStretch,
  IconBriefcase,
  IconBrowserCheck,
  IconCalendarDue,
  IconCreditCard,
  IconDatabase,
  IconFileInvoiceFilled,
  IconFolders,
  IconHelp,
  IconLanguage,
  IconLayoutDashboard,
  IconLockPassword,
  IconMail,
  IconMessageCircle,
  IconPalette,
  IconSchool,
  IconStars,
  IconTool,
  IconUser,
  IconUserCircle,
  IconUserCog,
  IconUsers,
} from "@tabler/icons-react";
import { Command, CreditCard, Share2 } from "lucide-react";
import { type SidebarData } from "../types";
import { APP_NAME } from "@/constants/index";

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
      title: "Admin",
      access: "admin",
      items: [
        {
          title: "Dashboard",
          url: "/console/admin/dashboard",
          icon: IconLayoutDashboard,
        },
        {
          title: "Users",
          url: "/console/admin/users",
          icon: IconUser,
        },
        {
          title: "Affiliates",
          url: "/console/admin/affiliates",
          icon: IconUsers,
        },
        {
          title: "Feedback",
          url: "/console/admin/feedback",
          icon: IconMessageCircle,
        },
      ],
    },
    {
      title: "General",
      items: [
        {
          title: "Dashboard",
          url: "/console/dashboard",
          icon: IconLayoutDashboard,
        },
      ],
    },
    {
      title: "Pages",
      items: [
        {
          title: "Portfolio",
          icon: IconDatabase,
          items: [
            {
              title: "Profile",
              url: "/console/portfolio/profile",
              icon: IconUser,
            },
            {
              title: "Bio",
              url: "/console/portfolio/bio",
              icon: IconUserCircle,
            },
            {
              title: "Experience",
              url: "/console/portfolio/experience",
              icon: IconBriefcase,
            },
            {
              title: "Projects",
              url: "/console/portfolio/projects",
              icon: IconFolders,
            },
            {
              title: "Education",
              url: "/console/portfolio/education",
              icon: IconSchool,
            },
            {
              title: "Services",
              url: "/console/portfolio/services",
              icon: IconTool,
            },
            {
              title: "Skills",
              url: "/console/portfolio/skills",
              icon: IconStars,
            },
            {
              title: "Links",
              url: "/console/portfolio/links",
              icon: Share2,
            },
            {
              title: "Languages",
              url: "/console/portfolio/languages",
              icon: IconLanguage,
            },
            {
              title: "Appearance",
              url: "/console/portfolio/appearance",
              icon: IconPalette,
            },
            {
              title: "Display",
              url: "/console/portfolio/display",
              icon: IconBrowserCheck,
            },
          ],
        },
        {
          title: "Account",
          icon: IconUserCircle,
          items: [
            {
              title: "Profile",
              url: "/console/account/profile",
              icon: IconUserCog,
            },
            // {
            //   title: 'Business',
            //   url: '/console/account/business',
            //   icon: Building2,
            // },
            // {
            //   title: 'Email',
            //   url: '/console/account/email',
            //   icon: IconMail,
            // },
            {
              title: "Password",
              url: "/console/account/password",
              icon: IconLockPassword,
            },
            {
              title: "Appearance",
              url: "/console/account/appearance",
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
              url: "/console/billing/subscription",
              icon: IconCalendarDue,
            },
          ],
        },
        {
          title: "Affiliate",
          icon: IconUsers,
          items: [
            {
              title: "Affiliate",
              url: "/console/affiliate",
              icon: IconUsers,
            },
          ],
        },
      ],
    },
    // {
    //   title: "Other",
    //   items: [
    //     {
    //       title: "Help Center",
    //       url: "/console/help-center",
    //       icon: IconHelp,
    //     },
    //   ],
    // },
  ],
};
