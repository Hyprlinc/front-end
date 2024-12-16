import React from 'react';
import { 
  User, Mail, MapPin, Globe, Award, LinkIcon, 
  Youtube, Instagram, Check 
} from 'lucide-react';

// Helper component for rendering profile rows
export const ProfileRow = ({ icon: Icon, label, value }) => (
  <div className="flex items-center">
    {Icon && <Icon className="mr-2 text-gray-500" size={16} />}
    <div>
      <span className="text-gray-600 text-sm">{label}</span>
      <p className="font-medium text-gray-800">{value || 'N/A'}</p>
    </div>
  </div>
);

// Helper function to render social icons and connection status
const renderSocialIcon = (link) => {
  const isYoutube = link.includes('youtube.com');
  const isInstagram = link.includes('instagram.com');
  
  let Icon = LinkIcon;
  if (isYoutube) Icon = Youtube;
  if (isInstagram) Icon = Instagram;
  
  return (
    <div className="flex items-center mr-3">
      <Icon className="mr-2 text-gray-700" size={20} />
      <Check className="text-green-500" size={16} />
    </div>
  );
};

const UserProfileComponent = ({ user }) => {
  // Render statistics based on channel type
  const renderChannelStatistics = () => {
    const stats = [];
    
    // YouTube Statistics
    if (user.channel_age_youtube) {
      stats.push(
        <div key="youtube-stats" className="bg-gray-100 rounded-lg p-4 space-y-3">
          <h4 className="text-md font-semibold text-gray-700 border-b pb-2 flex items-center">
            <Youtube className="mr-2 text-red-500" size={20} />
            YouTube Channel Stats
          </h4>
          <div className="space-y-2">
            <ProfileRow 
              label="Channel Age" 
              value={`${user.channel_age_youtube} years`} 
            />
            <ProfileRow 
              label="Subscribers" 
              value={user.subscribers_count_youtube?.toLocaleString()} 
            />
            <ProfileRow 
              label="Avg Views" 
              value={user.avg_views_youtube?.toLocaleString()} 
            />
            <ProfileRow 
              label="Content Type" 
              value={user.content_type_youtube} 
            />
            <ProfileRow 
              label="Posting Frequency" 
              value={user.posts_freq_youtube} 
            />
            <ProfileRow 
              label="Live Streaming" 
              value={user.live_streaming_youtube ? 'Yes' : 'No'} 
            />
          </div>
        </div>
      );
    }
    
    // Instagram Statistics
    if (user.ig_account_name) {
      stats.push(
        <div key="instagram-stats" className="bg-gray-100 rounded-lg p-4 space-y-3">
          <h4 className="text-md font-semibold text-gray-700 border-b pb-2 flex items-center">
            <Instagram className="mr-2 text-pink-500" size={20} />
            Instagram Profile Stats
          </h4>
          <div className="space-y-2">
            <ProfileRow 
              label="Account Name" 
              value={user.ig_account_name} 
            />
            <ProfileRow 
              label="Account Age" 
              value={`${user.ig_account_age} years`} 
            />
            <ProfileRow 
              label="Followers" 
              value={user.ig_followers_count?.toLocaleString()} 
            />
            <ProfileRow 
              label="Avg Reel Views" 
              value={user.avg_ig_reel_views?.toLocaleString()} 
            />
            <ProfileRow 
              label="Avg Comments" 
              value={user.avg_ig_comment_count?.toLocaleString()} 
            />
            <ProfileRow 
              label="Avg Likes" 
              value={user.avg_ig_likes_count?.toLocaleString()} 
            />
            <ProfileRow 
              label="Engagement Rate" 
              value={`${user.eng_rate_ig}%`} 
            />
          </div>
        </div>
      );
    }
    
    return stats.length > 0 ? (
      <div className="grid md:grid-cols-2 gap-6 mt-6">
        {stats}
      </div>
    ) : null;
  };

  return (
    <div className="w-full h-full bg-white">
      {/* Header Section */}
      <div className="bg-blue-600 p-6">
        <div className="flex items-center space-x-4">
          <div className="bg-white p-2 rounded-full">
            <img
              src={user.avatar}
              alt={user.fullName}
              className="w-16 h-16 rounded-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">{user.fullName}</h2>
            <p className="text-white text-opacity-80">{user.email}</p>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="p-6 grid md:grid-cols-2 gap-6">
        {/* Personal Information Section */}
        <div className="bg-gray-100 rounded-lg p-5 space-y-4">
          <h3 className="text-lg font-semibold text-gray-700 border-b pb-2 flex items-center">
            <Globe className="mr-2 text-blue-500" size={20} />
            Personal Details
          </h3>
          <div className="space-y-3">
            <ProfileRow
              icon={User}
              label="Full Name"
              value={user.fullName}
            />
            <ProfileRow
              icon={Mail}
              label="Email"
              value={user.email}
            />
            <ProfileRow
              label="Gender"
              value={user.gender}
            />
            <ProfileRow
              icon={MapPin}
              label="Location"
              value={`${user.country}, ${user.city}`}
            />
          </div>
        </div>

        {/* Content Information Section */}
        <div className="bg-gray-100 rounded-lg p-5 space-y-4">
          <h3 className="text-lg font-semibold text-gray-700 border-b pb-2 flex items-center">
            <Award className="mr-2 text-blue-500" size={20} />
            Content Profile
          </h3>
          <div className="space-y-3">
            <ProfileRow
              label="Content Description"
              value={user.contentDesc}
            />
            <ProfileRow
              label="Content Languages"
              value={user.contentLang?.join(', ')}
            />
            <ProfileRow
              label="Content Genre"
              value={user.channelGenre}
            />
          </div>
        </div>
      </div>

      {/* Channel Links Section */}
      {user.channelLinks && user.channelLinks.length > 0 && (
        <div className="p-6 bg-gray-50 border-t">
          <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
            <LinkIcon className="mr-2 text-blue-500" size={20} />
            Channel Links
          </h3>
          <div className="space-y-3">
            {user.channelLinks.map((link, index) => (
              <div
                key={index}
                className="flex items-center bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-all"
              >
                {renderSocialIcon(link)}
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 text-sm truncate"
                >
                  {link}
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Channel Statistics Section */}
      {renderChannelStatistics()}
    </div>
  );
};

export default UserProfileComponent;