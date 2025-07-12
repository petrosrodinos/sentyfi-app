import { IconBrandX, IconBrandYoutube, IconBrandReddit, IconNews } from "@tabler/icons-react";
import { Routes } from "@/routes/routes";
import PageLayout from "@/components/layout/page-layout";
import { Outlet } from "react-router-dom";

export default function MediaLayout({ className }: { className?: string }) {
  return (
    <>
      <PageLayout title="Media" description="Manage which social media accounts you want to track." sidebarNavItems={sidebarNavItems} className={className}>
        <Outlet />
      </PageLayout>
    </>
  );
}

const sidebarNavItems = [
  {
    title: "X (Twitter)",
    icon: <IconBrandX size={18} />,
    href: Routes.media.twitter,
  },

  {
    title: "Youtube",
    icon: <IconBrandYoutube size={18} />,
    href: Routes.media.youtube,
  },
  {
    title: "Reddit",
    icon: <IconBrandReddit size={18} />,
    href: Routes.media.reddit,
  },
  {
    title: "News",
    icon: <IconNews size={18} />,
    href: Routes.media.news,
  },
];
