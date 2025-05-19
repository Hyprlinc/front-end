import React, { useState, useEffect } from 'react';
import {
  Building2,
  Users,
  CreditCard,
  Briefcase,
  Save,
  Edit,
  Package // Add this import
} from 'lucide-react';
import AgencyPackagesAPI from '../../services/agencies/AgencyPackagesServices';

const AgencyProfile = () => {
  const [activeSection, setActiveSection] = useState('agency');
  const [isEditing, setIsEditing] = useState(true);

  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isPackagesModified, setIsPackagesModified] = useState(false);

  useEffect(() => {
    const fetchPackages = async () => {
      setLoading(true);
      try {
        const response = await AgencyPackagesAPI.getPackages();
        setPackages(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  // Agency Information State
  const [agencyData, setAgencyData] = useState({
    agencyName: '',
    phoneNumber: '',
    websiteUrl: '',
    establishedYear: '',
    employeeCountRange: '',
    logoUrl: '',
    bannerUrl: '',
    campaignBudgetMin: '',
    campaignBudgetMax: ''
  });

  // Team Members State
  const [teamMembers, setTeamMembers] = useState([
    { name: '', email: '', role: '' }
  ]);

  // Campaign Projects State
  const [campaigns, setCampaigns] = useState([
    { campaignName: '', clientName: '', description: '', results: '' }
  ]);

  // Payment Information State
  const [paymentInfo, setPaymentInfo] = useState({
    agencyId: '',
    accountHolderName: '',
    accountNumber: '',
    ifscCode: '',
    bankName: '',
    gstNumber: '',
    panNumber: ''
  });

  // Generic input change handler
  const handleInputChange = (setter) => (e) => {
    const { name, value } = e.target;
    setter((prev) => ({
      ...prev,
      [name]: value
    }));
  };


  // Add this function inside the AgencyProfile component
  const handleSavePackages = async () => {
    if (!isEditing) return;

    try {
      setLoading(true);
      for (const pkg of packages) {
        if (pkg.id && typeof pkg.id === 'number') {
          // Update existing package
          await AgencyPackagesAPI.updatePackage(pkg.id, pkg);
        } else {
          // Create new package
          await AgencyPackagesAPI.createPackage(pkg);
        }
      }
      setIsEditing(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveAgency = () => {}
  const handleSaveTeam = () => {}
  const handleSaveCampaigns = () => {}


  


  // Render appropriate section based on active tab
  const renderSection = () => {
    switch (activeSection) {
      case 'agency':
        return (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Agency Information</h2>
              <button
                onClick={isEditing ? handleSaveAgency : () => setIsEditing(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                {isEditing ? <Save className="w-5 h-5" /> : <Edit className="w-5 h-5" />}
                <span>{isEditing ? 'Save' : 'Edit'}</span>
              </button>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Agency Name</label>
                <input
                  type="text"
                  name="agencyName"
                  value={agencyData.agencyName}
                  onChange={handleInputChange(setAgencyData)}
                  disabled={!isEditing}
                  className={`w-full px-3 py-2 border rounded-lg ${isEditing ? 'bg-white' : 'bg-gray-100'
                    }`}
                  placeholder="Enter agency name"
                />
              </div>
              {/* Repeat for other fields like phoneNumber, websiteUrl, etc. */}
            </div>
          </div>
        );

      case 'team':
        return (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Team Members</h2>
              <button
                onClick={isEditing ? handleSaveTeam : () => setIsEditing(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                {isEditing ? <Save className="w-5 h-5" /> : <Edit className="w-5 h-5" />}
                <span>{isEditing ? 'Save' : 'Edit'}</span>
              </button>
            </div>
            <div className="space-y-4">
              {teamMembers.map((member, index) => (
                <div key={index} className="grid md:grid-cols-3 gap-4 items-center">
                  <input
                    type="text"
                    name="name"
                    value={member.name}
                    onChange={(e) => handleInputChange((prev) => {
                      const updatedMembers = [...teamMembers];
                      updatedMembers[index] = { ...updatedMembers[index], name: e.target.value };
                      return updatedMembers;
                    })}
                    disabled={!isEditing}
                    className={`w-full px-3 py-2 border rounded-lg ${isEditing ? 'bg-white' : 'bg-gray-100'
                      }`}
                    placeholder="Team Member Name"
                  />
                  {/* Repeat for email and role */}
                </div>
              ))}
            </div>
          </div>
        );

      case 'campaigns':
        return (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Campaigns</h2>
              <button
                onClick={isEditing ? handleSaveCampaigns : () => setIsEditing(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                {isEditing ? <Save className="w-5 h-5" /> : <Edit className="w-5 h-5" />}
                <span>{isEditing ? 'Save' : 'Edit'}</span>
              </button>
            </div>
            <div className="space-y-4">
              {campaigns.map((campaign, index) => (
                <div key={index} className="space-y-2">
                  <div>
                    <label>Campaign Name</label>
                    <input
                      type="text"
                      name="campaignName"
                      value={campaign.campaignName}
                      onChange={(e) => handleInputChange((prev) => {
                        const updatedCampaigns = [...campaigns];
                        updatedCampaigns[index] = {
                          ...updatedCampaigns[index],
                          campaignName: e.target.value
                        };
                        return updatedCampaigns;
                      })}
                      disabled={!isEditing}
                      className={`w-full px-3 py-2 border rounded-lg ${isEditing ? 'bg-white' : 'bg-gray-100'
                        }`}
                      placeholder="Enter Campaign Name"
                    />
                  </div>
                  {/* Repeat for clientName, description, results */}
                </div>
              ))}
            </div>
          </div>
        );

      case 'payment':
        return (
          <div className="space-y-6">
            {loading ? (
              <div className="text-center">Loading packages...</div>
            ) : error ? (
              <div className="text-red-500 text-center">{error}</div>
            ) : (
              <>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Your Packages</h2>
                  <div className="space-x-2">
                    <button
                      onClick={() => {
                        setPackages([...packages, {
                          id: Date.now(),
                          package_type: '',
                          price: '',
                          features: [],
                          delivery_time_days: ''
                        }]);
                        setIsPackagesModified(true);
                      }}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                    >
                      Add New Package
                    </button>
                    {isPackagesModified && (
                      <button
                        onClick={async () => {
                          await handleSavePackages();
                          setIsPackagesModified(false);
                        }}
                        className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                      >
                        <Save className="w-5 h-5" />
                        <span>Save Changes</span>
                      </button>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {packages.map((pkg, index) => (
                    <div key={pkg.id} className="border rounded-lg p-4 space-y-4 bg-white shadow">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Package Type
                        </label>
                        <input
                          type="text"
                          value={pkg.package_type}
                          onChange={(e) => {
                            const updatedPackages = [...packages];
                            updatedPackages[index] = {
                              ...pkg,
                              package_type: e.target.value
                            };
                            setPackages(updatedPackages);
                            setIsPackagesModified(true);
                          }}
                          className={`w-full px-3 py-2 border rounded-lg bg-white`}
                          placeholder="e.g., Basic, Premium, Pro"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Price (₹)
                        </label>
                        <input
                          type="number"
                          value={pkg.price}
                          onChange={(e) => {
                            const updatedPackages = [...packages];
                            updatedPackages[index] = {
                              ...pkg,
                              price: e.target.value
                            };
                            setPackages(updatedPackages);
                            setIsPackagesModified(true);
                          }}
                          className={`w-full px-3 py-2 border rounded-lg bg-white`}
                          placeholder="Enter price"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Features (one per line)
                        </label>
                        <textarea
                          value={pkg.features.join('\n')}
                          onChange={(e) => {
                            const updatedPackages = [...packages];
                            updatedPackages[index] = {
                              ...pkg,
                              features: e.target.value.split('\n').filter(Boolean)
                            };
                            setPackages(updatedPackages);
                            setIsPackagesModified(true);
                          }}
                          rows={4}
                          className={`w-full px-3 py-2 border rounded-lg bg-white`}
                          placeholder="Enter features (one per line)"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Delivery Time (days)
                        </label>
                        <input
                          type="number"
                          value={pkg.delivery_time_days}
                          onChange={(e) => {
                            const updatedPackages = [...packages];
                            updatedPackages[index] = {
                              ...pkg,
                              delivery_time_days: e.target.value
                            };
                            setPackages(updatedPackages);
                            setIsPackagesModified(true);
                          }}
                          className={`w-full px-3 py-2 border rounded-lg bg-white`}
                          placeholder="Enter delivery time in days"
                        />
                      </div>

                      {isEditing && (
                        <button
                          onClick={() => {
                            const updatedPackages = packages.filter((_, i) => i !== index);
                            setPackages(updatedPackages);
                            setIsPackagesModified(true);
                          }}
                          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                        >
                          Remove Package
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        );

      default:
        return null;
      }
    }
  

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-lg">
      {/* Navigation Tabs */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-4">
          {[
            { icon: Building2, label: 'Agency', value: 'agency' },
            { icon: Users, label: 'Team', value: 'team' },
            { icon: Briefcase, label: 'Campaigns', value: 'campaigns' },
            { icon: CreditCard, label: 'Packages and Payments', value: 'payment' },

          ].map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveSection(tab.value)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${activeSection === tab.value
                ? 'bg-blue-500 text-white'
                : 'hover:bg-gray-100 text-gray-700'
                }`}
            >
              <tab.icon className="w-5 h-5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
        {/* Edit/Save Button */}
        {/* <button
          onClick={handleSavePackages}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          {isEditing ? <Save className="w-5 h-5" /> : <Edit className="w-5 h-5" />}
          <span>{isEditing ? 'Save' : 'Edit'}</span>
        </button> */}
      </div>

      {/* Render Active Section */}
      {renderSection()}
    </div>
  );
  

}

export default AgencyProfile;
