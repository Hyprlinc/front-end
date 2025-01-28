import { LayoutDashboard, Search, ClipboardList, BarChart, MessageCircle, Settings } from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    { icon: <LayoutDashboard />, label: 'Dashboard' },
    { icon: <Search />, label: 'Discover Influencers' },
    { icon: <ClipboardList />, label: 'Campaigns' },
    { icon: <BarChart />, label: 'Analytics' },
    { icon: <MessageCircle />, label: 'Messages' },
    { icon: <Settings />, label: 'Settings' },
  ];

  return (
    <aside className="w-64 bg-white shadow-md p-4">
      <nav>
        <ul>
          {menuItems.map((item, index) => (
            <li key={index} className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
              {item.icon}
              <span>{item.label}</span>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;