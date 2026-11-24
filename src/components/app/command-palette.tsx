"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { BarChart3, CalendarDays, CreditCard, FileBarChart, Handshake, LayoutDashboard, Settings } from "lucide-react";

import { CommandPalette, type CommandItem } from "@/components/ui/command";

const ITEMS: CommandItem[] = [
  { group: "Money", label: "Overview", value: "/dashboard", icon: <LayoutDashboard className="size-4" /> },
  { group: "Money", label: "Cash flow", value: "/cash-flow", icon: <BarChart3 className="size-4" /> },
  { group: "Money", label: "Payments", value: "/payments", icon: <CreditCard className="size-4" /> },
  { group: "Operations", label: "Calendar", value: "/calendar", icon: <CalendarDays className="size-4" /> },
  { group: "Operations", label: "Deals", value: "/deals", icon: <Handshake className="size-4" /> },
  { group: "Insight", label: "Reports", value: "/reports", icon: <FileBarChart className="size-4" /> },
  { group: "Insight", label: "Settings", value: "/settings", icon: <Settings className="size-4" /> },
];

/** App-wide ⌘K palette — navigates to the selected screen. */
function AppCommandPalette() {
  const router = useRouter();
  return (
    <CommandPalette items={ITEMS} onSelect={(item) => router.push(item.value)} />
  );
}

export { AppCommandPalette };
