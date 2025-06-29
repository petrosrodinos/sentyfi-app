import { IconChartCandle, IconCurrencyDollar } from "@tabler/icons-react";
import { Routes } from "@/routes/routes";
import PageLayout from "@/components/layout/page-layout";

interface TrackingLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export default function TrackingLayout({ children, className }: TrackingLayoutProps) {
  return (
    <>
      <PageLayout title="Tracking" description="Manage which stocks, crypto, and other assets you want to track." sidebarNavItems={sidebarNavItems} className={className}>
        {children}
      </PageLayout>
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
