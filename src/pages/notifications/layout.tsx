import { IconMail, IconMessageCircle, IconBrandWhatsapp, IconBrandTelegram, IconBrandDiscord, IconBell } from "@tabler/icons-react";
import { Separator } from "@/components/ui/separator";
import { Main } from "@/components/layout/main";
import SidebarNav from "@/components/sidebar-nav";
import { Routes } from "@/routes/routes";

interface NotificationsLayoutProps {
  children: React.ReactNode;
}

export default function NotificationsLayout({ children }: NotificationsLayoutProps) {
  return (
    <>
      <Main fixed>
        <div className="space-y-0.5">
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Notifications</h1>
          <p className="text-muted-foreground">Manage which notifications you want to receive.</p>
        </div>
        <Separator className="my-4 lg:my-6" />
        <div className="flex flex-1 flex-col space-y-2 overflow-hidden md:space-y-2 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="top-0 lg:sticky lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex w-full overflow-y-hidden p-1 pr-4">{children}</div>
        </div>
      </Main>
    </>
  );
}

const sidebarNavItems = [
  {
    title: "Push Notifications",
    icon: <IconBell size={18} />,
    href: Routes.notifications.push,
  },
  {
    title: "Web Notifications",
    icon: <IconBell size={18} />,
    href: Routes.notifications.web,
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
    title: "WhatsApp",
    icon: <IconBrandWhatsapp size={18} />,
    href: Routes.notifications.whatsapp,
  },
  {
    title: "Telegram",
    icon: <IconBrandTelegram size={18} />,
    href: Routes.notifications.telegram,
  },
  {
    title: "Discord",
    icon: <IconBrandDiscord size={18} />,
    href: Routes.notifications.discord,
  },
];
