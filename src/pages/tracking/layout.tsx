import { IconChartCandle, IconCurrencyDollar } from "@tabler/icons-react";
import { Separator } from "@/components/ui/separator";
import { Main } from "@/components/layout/main";
import SidebarNav from "@/components/sidebar-nav";
import { Routes } from "@/routes/routes";

interface TrackingLayoutProps {
  children: React.ReactNode;
}

export default function TrackingLayout({ children }: TrackingLayoutProps) {
  return (
    <>
      <Main fixed>
        <div className="space-y-0.5">
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Tracking</h1>
          <p className="text-muted-foreground">Add your portfolio and track your investments.</p>
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
    title: "Stocks",
    icon: <IconChartCandle size={18} />,
    href: Routes.tracking.stocks,
  },
  {
    title: "Crypto",
    icon: <IconCurrencyDollar size={18} />,
    href: Routes.tracking.crypto,
  },
];
