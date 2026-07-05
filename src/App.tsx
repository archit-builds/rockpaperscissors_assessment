import { Suspense, lazy } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Spinner } from '@/components/common/States';

const DashboardPage = lazy(() => import('@/pages/DashboardPage').then((m) => ({ default: m.DashboardPage })));
const LeavePage = lazy(() => import('@/pages/LeavePage').then((m) => ({ default: m.LeavePage })));
const DirectoryPage = lazy(() => import('@/pages/DirectoryPage').then((m) => ({ default: m.DirectoryPage })));
const AnnouncementsPage = lazy(() =>
  import('@/pages/AnnouncementsPage').then((m) => ({ default: m.AnnouncementsPage }))
);

function PageFallback() {
  return (
    <div className="flex h-screen items-center justify-center bg-canvas dark:bg-canvas-dark">
      <Spinner className="size-5" />
    </div>
  );
}

function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2 bg-canvas text-center dark:bg-canvas-dark">
      <p className="figure text-4xl font-semibold text-text dark:text-text-dark">404</p>
      <p className="text-sm text-muted dark:text-muted-dark">This page doesn't exist.</p>
      <Link to="/" className="mt-2 text-sm font-medium text-accent-600 hover:underline dark:text-accent-400">
        Back to dashboard
      </Link>
    </div>
  );
}

function App() {
  return (
    <Suspense fallback={<PageFallback />}>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/leave" element={<LeavePage />} />
        <Route path="/directory" element={<DirectoryPage />} />
        <Route path="/announcements" element={<AnnouncementsPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;
