"use client";
import DashboardDrawer from "@/components/dashboard/dashboardDrawer/DashboardDrawer";
import { isLoggedIn } from "@/services/auth.service";
import { useRouter } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  if (!isLoggedIn()) {
    return router.push("/login");
  }

  return <DashboardDrawer>{children} </DashboardDrawer>;
}
