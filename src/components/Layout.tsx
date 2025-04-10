import { Link } from 'react-router-dom';
import { LogOut, Plus, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export function Layout({ children }: { children: React.ReactNode }) {
  const { user, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold text-gray-800">Blog Platform</Link>
            <div className="flex items-center gap-4">
              {user ? (
                <>
                  <Link
                    to="/create"
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                  >
                    <Plus size={18} /> New Post
                  </Link>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-700">{user.email?.split('@')[0]}</span>
                    <button
                      onClick={() => signOut()}
                      className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg transition"
                    >
                      <LogOut size={18} />
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex gap-2">
                  <Link
                    to="/login"
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                  >
                    <User size={18} /> Login
                  </Link>
                  <Link
                    to="/signup"
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
                  >
                    <User size={18} /> Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}