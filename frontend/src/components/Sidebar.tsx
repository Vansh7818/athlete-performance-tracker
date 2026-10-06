import { Home, Activity, History, User, Settings, Brain, LogOut } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/' },
    { icon: Activity, label: 'Live Session', path: '/live' },
    { icon: History, label: 'History', path: '/history' },
    { icon: Brain, label: 'AI Coach', path: '/coach' },
    { icon: User, label: 'Profile', path: '/profile' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <div className="w-64 bg-[#11131a] h-full flex flex-col border-r border-gray-800">
      <div className="p-6">
        <div className="flex items-center space-x-2">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Activity className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Athlete<span className="text-blue-500">IQ</span></h1>
        </div>
      </div>
      
      <nav className="flex-1 mt-8 px-4">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center px-4 py-3 rounded-xl transition-all duration-200 ${
                    isActive 
                      ? 'bg-blue-600/10 text-blue-500 font-semibold' 
                      : 'text-gray-400 hover:bg-gray-800/50 hover:text-white'
                  }`}
                >
                  <Icon className={`w-5 h-5 mr-3 ${isActive ? 'text-blue-500' : 'text-gray-500'}`} />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 space-y-2 mb-4 px-4">
        <button className="w-full flex items-center px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-xl transition-all duration-200">
          <Settings className="w-5 h-5 mr-3 text-gray-500" />
          <span className="font-medium">Settings</span>
        </button>
        <button 
          onClick={handleLogout}
          className="w-full flex items-center px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-xl transition-all duration-200"
        >
          <LogOut className="w-5 h-5 mr-3 text-red-500" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
