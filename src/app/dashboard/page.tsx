import DashboardContent from '../components/DashboardContent';
import StyleSelector from '../components/StyleSelector';
import ProtectedRoute from '../components/auth/ProtectedRoute';

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <DashboardContent />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <StyleSelector />
        </div>
      </div>
    </ProtectedRoute>
  );
}

// {
//   "fe6ec381-d7ca-4d89-826a-6945beccd8fd" : "aziz2025",
//   "1234567890" : "jdajdakljdajdasjkl"
// }
// save in ../public/projects/../§