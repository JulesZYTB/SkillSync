import { Outlet } from "react-router-dom";
import { useAuth } from "../../services/AuthContext";
import Header from "./header";
import Footer from "./footer";

export default function Layout() {
  const { user } = useAuth();

  return (
    <div className="flex h-screen overflow-hidden bg-white dark:bg-gray-900">
      <Header />
      
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 overflow-y-auto p-8 relative">
          {!user && <div className="absolute top-6 right-6 font-bold text-blue-600 dark:text-blue-400">SkillSync</div>}
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}