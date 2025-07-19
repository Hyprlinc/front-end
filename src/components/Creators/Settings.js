const AccountSettings = () => {
  return (
    <div className="max-w-3xl mx-auto md:mt-6 p-6 bg-white rounded-xl shadow-sm">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Account Settings
      </h2>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Profile Card */}
        <div className="p-5 border border-gray-100 rounded-lg hover:border-blue-200 hover:shadow-md transition-all cursor-pointer">
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-blue-50 rounded-full">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-lg text-gray-800">
                Profile Information
              </h3>
              <p className="text-gray-500 mt-1">
                Manage your personal details and account preferences
              </p>
            </div>
          </div>
        </div>

        {/* Notifications Card */}
        <div className="p-5 border border-gray-100 rounded-lg hover:border-purple-200 hover:shadow-md transition-all cursor-pointer">
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-purple-50 rounded-full">
              <svg
                className="w-6 h-6 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-lg text-gray-800">
                Notification Preferences
              </h3>
              <p className="text-gray-500 mt-1">
                Control how and when you receive notifications
              </p>
            </div>
          </div>
        </div>

        {/* Privacy Card */}
        <div className="p-5 border border-gray-100 rounded-lg hover:border-green-200 hover:shadow-md transition-all cursor-pointer">
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-green-50 rounded-full">
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-lg text-gray-800">
                Privacy Settings
              </h3>
              <p className="text-gray-500 mt-1">
                Manage your data sharing and visibility
              </p>
            </div>
          </div>
        </div>

        {/* Additional Card (example) */}
        <div className="p-5 border border-gray-100 rounded-lg hover:border-orange-200 hover:shadow-md transition-all cursor-pointer">
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-orange-50 rounded-full">
              <svg
                className="w-6 h-6 text-orange-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-lg text-gray-800">
                Billing & Subscriptions
              </h3>
              <p className="text-gray-500 mt-1">
                View and manage your payment methods
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
