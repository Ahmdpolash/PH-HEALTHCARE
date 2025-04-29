import DashboardDrawer from "@/components/dashboard/dashboardDrawer/DashboardDrawer";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardDrawer>{children} </DashboardDrawer>;
}
