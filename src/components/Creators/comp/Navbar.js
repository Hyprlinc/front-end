import React from "react";
import msgIcon from "../../../assets/icons/messagesicon.png";
import notificationIcon from "../../../assets/icons/notificationicon.png";

const Navbar = ({ user, onSidebarToggle }) => {
  return (
    <nav className="bg-white shadow-sm p-4">
      <div className="max-w-6xl mx-auto flex justify-end">
        {/* Right side icons and profile button */}
        <div className="flex items-center gap-4">
          <button className="flex items-center justify-center h-[48px] w-[48px] bg-gray-50 rounded-lg hover:bg-gray-100 transition-all">
            <img src={msgIcon} alt="Icon 1" className="w-[24px] h-[24px]" />
          </button>
          <button className="flex items-center justify-center h-[48px] w-[48px] bg-gray-50 rounded-lg hover:bg-gray-100 transition-all">
            <img
              src={notificationIcon}
              alt="Icon 2"
              className="w-[24px] h-[24px]"
            />
          </button>
          <button
            onClick={onSidebarToggle}
            className="flex items-center bg-gray-50 rounded-lg h-[48px] w-[160px] p-2 hover:bg-gray-100 transition-all"
          >
            <div className="relative">
              <img
                src={
                  user.profilePicture || "https://avatar.iran.liara.run/public"
                }
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover border-2 border-blue-400"
              />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-800"></div>
            </div>

            <div className="ml-3 text-left">
              <p className="text-sm font-medium text-gray-900">
                {user.fullName}
              </p>
              <p className="text-xs text-gray-500">
                {user.profileType || "Influencer"}
              </p>
            </div>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
