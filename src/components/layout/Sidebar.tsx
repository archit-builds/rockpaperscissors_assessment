import { NavLink } from "react-router-dom";
import { LayoutGrid, CalendarDays, Users, Megaphone, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { useUiStore } from "@/store/uiStore";

const NAV_ITEMS = [
  { to: "/", label: "Dashboard", icon: LayoutGrid, end: true },
  { to: "/leave", label: "Leave", icon: CalendarDays },
  { to: "/directory", label: "Directory", icon: Users },
  { to: "/announcements", label: "Announcements", icon: Megaphone },
];

export function Sidebar() {
  const { sidebarOpen, setSidebarOpen } = useUiStore();

  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-ink-950/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-60 flex-col bg-ink-900 transition-transform lg:sticky lg:top-0 lg:h-screen lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-14 items-center justify-between px-5">
          <div className="flex items-center gap-2.5">
            <div className="flex size-7 items-center justify-center rounded-md bg-accent-500 text-[13px] font-bold text-white">
              N
            </div>
            <span className="text-[14px] font-semibold tracking-tight text-white">
              RPS.studio
            </span>
          </div>
          <button
            className="text-white/70 hover:text-white lg:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close menu"
          >
            <X className="size-5" />
          </button>
        </div>

        <nav className="mt-4 flex-1 space-y-0.5 px-3">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                cn(
                  "group flex items-center gap-2.5 rounded-md border-l-2 px-3 py-2 text-[13px] font-medium transition-colors",
                  isActive
                    ? "border-accent-500 bg-white/5 text-white"
                    : "border-transparent text-white/55 hover:bg-white/5 hover:text-white/90",
                )
              }
            >
              <item.icon className="size-4" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-white/10 px-5 py-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-white/35">
            RPS.studio · v1.0
          </p>
        </div>
      </aside>
    </>
  );
}
