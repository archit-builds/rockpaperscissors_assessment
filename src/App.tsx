import { Routes, Route } from 'react-router-dom';
import { DashboardPage } from '@/pages/DashboardPage';
import { LeavePage } from '@/pages/LeavePage';
import { DirectoryPage } from '@/pages/DirectoryPage';
import { AnnouncementsPage } from '@/pages/AnnouncementsPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/leave" element={<LeavePage />} />
      <Route path="/directory" element={<DirectoryPage />} />
      <Route path="/announcements" element={<AnnouncementsPage />} />
    </Routes>
  );
}

export default App;
