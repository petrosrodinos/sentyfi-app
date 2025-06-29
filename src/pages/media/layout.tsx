import { IconBrandX, IconBrandYoutube, IconBrandReddit, IconNews } from "@tabler/icons-react";
import { Routes } from "@/routes/routes";
import PageLayout from "@/components/layout/page-layout";

interface MediaLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export default function MediaLayout({ children, className }: MediaLayoutProps) {
  return (
    <>
      <PageLayout title="Media" description="Manage which social media accounts you want to track." sidebarNavItems={sidebarNavItems} className={className}>
        {children}
      </PageLayout>
    </>
  );
}

const sidebarNavItems = [
  {
    title: "X (Twitter)",
    icon: <IconBrandX size={18} />,
    href: Routes.media.x,
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
