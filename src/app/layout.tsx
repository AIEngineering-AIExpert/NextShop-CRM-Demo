import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import SidebarLink from "@/components/ui/SidebarLink";
import NotificationDropdown from "@/components/NotificationDropdown";
import ThemeToggle from "@/components/ThemeToggle";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const navItems = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: "dashboard",
  },
  {
    href: "/clients",
    label: "Clients",
    icon: "clients",
  },
  {
    href: "/billing",
    label: "Billing",
    icon: "billing",
  },
];

export const metadata: Metadata = {
  title: "NextShop CRM",
  description: "CRM demo workspace bootstrapped with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} min-h-screen bg-[var(--bg-main)] text-primary font-sans antialiased transition-colors`}
      >
        <aside className="fixed inset-y-0 left-0 z-30 hidden w-60 flex-col border border-[var(--border-color)] bg-[rgba(31,31,31,0.85)] px-6 py-8 shadow-lg backdrop-blur-lg md:flex">
          <Link href="/dashboard" className="flex items-center gap-2 text-lg font-semibold text-primary">
            <span
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg"
              style={{
                background: "var(--accent-gradient)",
                color: "#0d0d0d",
                boxShadow: "0 0 18px rgba(34,201,151,0.25)",
              }}
            >
              NS
            </span>
            NextShop CRM
          </Link>
          <nav className="mt-8 flex flex-1 flex-col gap-1">
            {navItems.map((item) => (
              <SidebarLink key={item.href} {...item} />
            ))}
          </nav>
          <div className="mt-6">
            <ThemeToggle />
          </div>
          <div className="pt-6">
            <SidebarLink
              href="/login"
              label="Logout"
              icon="logout"
            />
          </div>
        </aside>

        <div className="min-h-screen md:pl-60">
          <header className="sticky top-0 z-20 border-b border-[var(--border-color)] bg-[rgba(31,31,31,0.85)] px-4 py-3 shadow-lg backdrop-blur-md md:hidden">
            <div className="flex items-center justify-between">
              <Link href="/dashboard" className="flex items-center gap-2 text-base font-semibold text-primary">
                <span
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-sm font-semibold"
                  style={{
                    background: "var(--accent-gradient)",
                    color: "#0d0d0d",
                    boxShadow: "0 0 16px rgba(34,201,151,0.25)",
                  }}
                >
                  NS
                </span>
                NextShop CRM
              </Link>
              <div className="flex items-center gap-3">
                <nav className="flex items-center gap-2">
                  {[
                    ...navItems,
                    { href: "/login", label: "Logout", icon: "logout" as const },
                  ].map((item) => (
                    <SidebarLink
                      key={`mobile-${item.href}`}
                      {...item}
                      variant="mobile"
                    />
                  ))}
                </nav>
                <NotificationDropdown />
                <ThemeToggle className="w-auto" />
              </div>
            </div>
          </header>

          <div className="hidden items-center justify-end gap-4 px-8 pt-6 md:flex">
            <div className="flex items-center gap-3">
              <NotificationDropdown />
              <ThemeToggle className="w-auto" />
            </div>
          </div>

          <main className="px-4 py-6 md:px-8">{children}</main>
        </div>
        <Toaster
          position="top-right"
          richColors
          theme="dark"
          toastOptions={{
            classNames: {
              toast: "border border-[rgba(34,201,151,0.35)] bg-[rgba(18,18,18,0.95)] text-primary",
            },
          }}
        />
      </body>
    </html>
  );
}
