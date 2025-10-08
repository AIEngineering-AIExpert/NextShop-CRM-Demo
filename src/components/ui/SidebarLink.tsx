/*
 * Navigation link used throughout the sidebar and mobile nav.
 */
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CreditCard,
  Home,
  LogOut,
  Users,
} from "lucide-react";

const iconMap = {
  dashboard: Home,
  clients: Users,
  billing: CreditCard,
  logout: LogOut,
} as const;

type IconKey = keyof typeof iconMap;

type SidebarLinkProps = {
  href: string;
  label: string;
  icon: IconKey;
  className?: string;
  variant?: "desktop" | "mobile";
};

const SidebarLink = ({
  href,
  label,
  icon,
  className = "",
  variant = "desktop",
}: SidebarLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  const isMobile = variant === "mobile";
  const IconComponent = iconMap[icon];

  const baseClasses = isMobile
    ? "md:hidden inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-medium transition-all duration-200"
    : "flex w-full items-center gap-3 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200";

  const stateClasses = isActive
    ? "bg-gradient-to-r from-[rgba(34,201,151,0.16)] to-[rgba(59,130,246,0.18)] text-primary shadow-[0_0_12px_rgba(34,201,151,0.25)]"
    : "text-secondary hover:text-primary hover:bg-[rgba(255,255,255,0.05)]";

  const mobileStateClasses = isActive
    ? "bg-gradient-to-r from-[rgba(34,201,151,0.2)] to-[rgba(59,130,246,0.2)] text-primary shadow-[0_0_12px_rgba(34,201,151,0.25)]"
    : "bg-[rgba(255,255,255,0.05)] text-secondary hover:text-primary";

  const combined = [
    isMobile ? mobileStateClasses : stateClasses,
    baseClasses,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const iconSize = isMobile ? 16 : 20;

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={combined}
    >
      <IconComponent className="shrink-0" size={iconSize} />
      <span>{label}</span>
    </Link>
  );
};

export default SidebarLink;
