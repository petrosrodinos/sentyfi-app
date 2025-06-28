import { IconBrandX, IconBrandYoutube, IconBrandReddit, IconNews } from "@tabler/icons-react";
import { Separator } from "@/components/ui/separator";
import { Main } from "@/components/layout/main";
import SidebarNav from "@/components/sidebar-nav";
import { Routes } from "@/routes/routes";

interface MediaLayoutProps {
  children: React.ReactNode;
}

export default function MediaLayout({ children }: MediaLayoutProps) {
  return (
    <>
      <Main fixed>
        <div className="space-y-0.5">
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Media</h1>
          <p className="text-muted-foreground">Manage which social media accounts you want to track.</p>
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
