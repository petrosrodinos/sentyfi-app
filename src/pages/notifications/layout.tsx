import { IconMail, IconMessageCircle, IconBrandWhatsapp, IconBrandTelegram, IconBrandDiscord, IconBell, IconPhone, IconList } from "@tabler/icons-react";
import { Routes } from "@/routes/routes";
import PageLayout from "@/components/layout/page-layout";
import { Outlet } from "react-router-dom";

export default function NotificationsLayout() {
  return (
    <PageLayout title="Notifications" description="Manage which notifications you want to receive." sidebarNavItems={sidebarNavItems}>
      <Outlet />
    </PageLayout>
  );
}

const sidebarNavItems = [
  {
    title: "Channels",
    icon: <IconList size={18} />,
    href: Routes.notifications.channels,
  },
  {
    title: "Telegram",
    icon: <IconBrandTelegram size={18} />,
    href: Routes.notifications.telegram,
  },
  {
    title: "Email",
    icon: <IconMail size={18} />,
    href: Routes.notifications.email,
  },
  {
    title: "SMS",
    icon: <IconMessageCircle size={18} />,
    href: Routes.notifications.sms,
  },
  {
    title: "Push Notifications",
    icon: <IconBell size={18} />,
    href: Routes.notifications.push,
    disabled: true,
  },
  {
    title: "WhatsApp",
    icon: <IconBrandWhatsapp size={18} />,
    href: Routes.notifications.whatsapp,
    disabled: true,
  },
  {
    title: "Discord",
    icon: <IconBrandDiscord size={18} />,
    href: Routes.notifications.discord,
    disabled: true,
  },
  {
    title: "Phone Call",
    icon: <IconPhone size={18} />,
    href: Routes.notifications.phone,
    disabled: true,
  },
];
