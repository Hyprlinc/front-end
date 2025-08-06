import React from "react";
import {
    Home,
    Users,
    Briefcase,
    User2,
    MessageSquare,
    Package,
    FolderOpen,
    BarChart2,
    Settings,
    X
} from "lucide-react";
import { useIsMobile } from "../hooks/use-mobile";
import logo from "../../assets/logo/logoForSidebar.png";

const AgencySidebar = ({
    isOpen,
    activeSection,
    setActiveSection,
    toggleSidebar
}) => {
    const isMobile = useIsMobile();

    const handleItemClick = (section) => {
        setActiveSection(section);
        if (isMobile) {
            toggleSidebar();
        }
    };

    const menuItems = [
        {
            icon: <Home className="w-5 h-5" />,
            text: 'Dashboard',
            id: 'dashboard'
        },
        {
            icon: <Users className="w-5 h-5" />,
            text: 'Discover Influencers',
            id: 'discover-influencers'
        },
        {
            icon: <Briefcase className="w-5 h-5" />,
            text: 'Campaign Management',
            id: 'discover-campaigns'
        },
        {
            icon: <User2 className="w-5 h-5" />,
            text: 'Profile Management',
            id: 'profile'
        },
        {
            icon: <Briefcase className="w-5 h-5" />,
            text: 'Campaigns',
            id: 'campaigns'
        },
        {
            icon: <MessageSquare className="w-5 h-5" />,
            text: 'Messages',
            id: 'messages'
        },
        {
            icon: <Package className="w-5 h-5" />,
            text: 'Orders',
            id: 'orders'
        },
        {
            icon: <FolderOpen className="w-5 h-5" />,
            text: 'Portfolio',
            id: 'portfolio'
        },
        {
            icon: <BarChart2 className="w-5 h-5" />,
            text: 'Reports & Analytics',
            id: 'reports'
        },
        {
            icon: <Settings className="w-5 h-5" />,
            text: 'Settings',
            id: 'settings'
        }
    ];

    return (
        <div
            className={`fixed inset-y-0 z-50 w-64 h-full bg-gradient-to-b from-gray-900 to-gray-800 border-r border-gray-700 p-5 flex flex-col text-white shadow-xl overflow-y-auto transition-all duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'
                } md:translate-x-0 md:relative`}
        >
            {/* Close Button (Mobile Only) */}
            <button
                onClick={toggleSidebar}
                className="md:hidden absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
                <X className="h-6 w-6" />
            </button>

            {/* Logo */}
            <div className="mb-8 flex justify-center transition-transform hover:scale-105">
                <img
                    src={logo}
                    alt="Logo"
                    className="w-28 filter drop-shadow-lg"
                />
            </div>

            {/* Navigation Menu */}
            <nav className="space-y-1 flex-1 mb-4">
                {menuItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => handleItemClick(item.id)}
                        className={`w-full flex items-center p-2 space-x-2 rounded-xl cursor-pointer transition-all duration-200 ${activeSection === item.id
                            ? "bg-blue-600 shadow-md shadow-blue-500/20"
                            : "hover:bg-gray-700 hover:translate-x-1"
                            }`}
                    >
                        <div className={`w-6 h-6 flex items-center justify-center ${activeSection === item.id ? 'text-white' : 'text-gray-300'
                            }`}>
                            {item.icon}
                        </div>
                        <span className="text-sm font-medium">{item.text}</span>
                        {activeSection === item.id && (
                            <div className="ml-auto w-2 h-2 bg-white rounded-full"></div>
                        )}
                    </button>
                ))}
            </nav>

            {/* Bottom Section */}
            <div className="mt-auto pt-4 border-t border-gray-200">
                <div className="p-3 text-center text-sm text-gray-500">
                    Need help? <a href="#" className="text-blue-600 hover:underline">Contact Support</a>
                </div>
            </div>
        </div>
    );
};

export default AgencySidebar;