import { Menu, Moon, Sun, Bell } from 'lucide-react';
import { useThemeStore } from '@/store/themeStore';
import { useUiStore } from '@/store/uiStore';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { Avatar } from '@/components/common/Avatar';
import { Skeleton } from '@/components/common/States';

export function Topbar({ title, subtitle }: { title: string; subtitle?: string }) {
  const { theme, toggleTheme } = useThemeStore();
  const { setSidebarOpen } = useUiStore();
  const { data: user, isLoading } = useCurrentUser();

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-line bg-surface/90 px-4 backdrop-blur sm:px-6 dark:border-line-dark dark:bg-surface-dark/90">
      <div className="flex items-center gap-3">
        <button
          className="text-muted hover:text-text lg:hidden dark:text-muted-dark dark:hover:text-text-dark"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open menu"
        >
          <Menu className="size-5" />
        </button>
        <div>
          <h1 className="text-[15px] font-semibold leading-none text-text dark:text-text-dark">{title}</h1>
          {subtitle && <p className="mt-1 text-[12px] text-muted dark:text-muted-dark">{subtitle}</p>}
        </div>
      </div>

      <div className="flex items-center gap-1.5 sm:gap-3">
        <button
          className="flex size-8 items-center justify-center rounded-md text-muted transition-colors hover:bg-canvas hover:text-text dark:text-muted-dark dark:hover:bg-ink-800 dark:hover:text-text-dark"
          aria-label="Notifications"
        >
          <Bell className="size-4" />
        </button>
        <button
          onClick={toggleTheme}
          className="flex size-8 items-center justify-center rounded-md text-muted transition-colors hover:bg-canvas hover:text-text dark:text-muted-dark dark:hover:bg-ink-800 dark:hover:text-text-dark"
          aria-label="Toggle theme"
        >
          {theme === 'light' ? <Moon className="size-4" /> : <Sun className="size-4" />}
        </button>
        <div className="mx-1 h-5 w-px bg-line dark:bg-line-dark" />
        {isLoading || !user ? (
          <Skeleton className="size-8 rounded-full" />
        ) : (
          <div className="flex items-center gap-2">
            <Avatar initials={user.initials} color={user.avatarColor} size="sm" />
            <div className="hidden leading-tight sm:block">
              <p className="text-[13px] font-medium text-text dark:text-text-dark">{user.name}</p>
              <p className="text-[11px] text-muted dark:text-muted-dark">{user.role}</p>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
