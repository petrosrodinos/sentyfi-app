import { IconChartCandle, IconCurrencyDollar } from "@tabler/icons-react";
import { Routes } from "@/routes/routes";
import PageLayout from "@/components/layout/page-layout";
import { Outlet } from "react-router-dom";

export default function TrackingLayout() {
  return (
    <>
      <PageLayout title="Tracking" description="Manage which stocks, crypto, and other assets you want to track." sidebarNavItems={sidebarNavItems}>
        <Outlet />
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
