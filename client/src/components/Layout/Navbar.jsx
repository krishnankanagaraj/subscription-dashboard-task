import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import Button from '../UI/Button';
import ThemeToggle from '../UI/ThemeToggle';
import { LogOut, User, Menu, X } from 'lucide-react';

const Navbar = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const url = window.location.pathname;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav className="bg-white border-b border-gray-200 dark:bg-slate-800 dark:border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-blue-600 dark:text-blue-400">Subscription Dashboard</span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {isAuthenticated && user?.role === 'user' && (
                <Link to="/dashboard" className={url==="/dashboard" ? "border-transparent text-gray-700 border-gray-300 dark:text-slate-100 dark:border-blue-500 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium" : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-slate-300 dark:hover:text-slate-100 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"}>
                  Dashboard
                </Link>
              )}
              {isAuthenticated && user?.role === 'admin' && (
                <Link to="/admin/subscriptions" className= {url==="/admin/subscriptions" ? "border-transparent border-gray-300 text-gray-700 dark:text-slate-100 dark:border-blue-500 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium" : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-slate-300 dark:hover:text-slate-100 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"}>
                  Admin Dashboard
                </Link>
              )}
              <Link to="/plans" className={url==="/plans" ? "border-transparent border-gray-300 text-gray-700 dark:text-slate-100 dark:border-blue-500 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium" : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-slate-300 dark:hover:text-slate-100 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"}>
                Plans
              </Link>              
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-4">
            <ThemeToggle />
            {isAuthenticated ? (

                <div className="flex items-center space-x-4">
                  <Link to="/profile" className="flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400">
                    <User className="h-4 w-4 mr-2" />
                    {user?.name}
                  </Link>
                  <Button variant="ghost" size="sm" onClick={handleLogout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </div>
              ) : (

              <div className="space-x-4">
                <Link to="/login">
                  <Button variant="ghost">Login</Button>
                </Link>
                <Link to="/register">
                  <Button>Register</Button>
                </Link>
              </div>
            )}
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden dark:bg-slate-800">
          <div className="pt-2 pb-3 space-y-1">
            <Link to="/plans" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-slate-100">
              Plans
            </Link>
            {isAuthenticated && (
              <Link to="/dashboard" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-slate-100">
                Dashboard
              </Link>
            )}
            {isAuthenticated && user?.role === 'admin' && (
              <Link to="/admin/subscriptions" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-slate-100">
                Admin
              </Link>
            )}
          </div>
          <div className="pt-4 pb-4 border-t border-gray-200 dark:border-slate-700">
            <div className="px-4 mb-3">
               <div className="flex items-center justify-between">
                  <span className="text-base font-medium text-gray-500 dark:text-slate-400">Theme</span>
                  <ThemeToggle />
               </div>
            </div>
            {isAuthenticated ? (
              <div className="flex items-center px-4">
                <div className="flex-shrink-0">
                  <Link to="/profile">
                    <User className="h-10 w-10 rounded-full bg-gray-100 p-2 hover:bg-gray-200" />
                  </Link>
                </div>
                <div className="ml-3">
                  <Link to="/profile" className="text-base font-medium text-gray-800 hover:text-blue-600 dark:text-slate-100 dark:hover:text-blue-400">
                    {user?.name}
                  </Link>
                  <div className="text-sm font-medium text-gray-500 dark:text-slate-400">{user?.email}</div>
                </div>
                <Button variant="ghost" size="sm" onClick={handleLogout} className="ml-auto">
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>

            ) : (
              <div className="mt-3 space-y-1 px-2">
                <Link to="/login" className="block">
                  <Button variant="ghost" className="w-full justify-start">Login</Button>
                </Link>
                <Link to="/register" className="block">
                  <Button className="w-full justify-start">Register</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
