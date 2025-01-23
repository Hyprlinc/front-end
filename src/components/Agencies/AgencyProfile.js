import React, { useState } from 'react';
import { 
  Building2, 
  Users, 
  CreditCard, 
  Briefcase, 
  Save, 
  Edit 
} from 'lucide-react';

const AgencyProfile = () => {
  const [activeSection, setActiveSection] = useState('agency');
  const [isEditing, setIsEditing] = useState(true);

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

  // Render appropriate section based on active tab
  const renderSection = () => {
    switch (activeSection) {
      case 'agency':
        return (
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Agency Name</label>
              <input
                type="text"
                name="agencyName"
                value={agencyData.agencyName}
                onChange={handleInputChange(setAgencyData)}
                disabled={!isEditing}
                className={`w-full px-3 py-2 border rounded-lg ${
                  isEditing ? 'bg-white' : 'bg-gray-100'
                }`}
                placeholder="Enter agency name"
              />
            </div>
            {/* Repeat for other fields like phoneNumber, websiteUrl, etc. */}
          </div>
        );
      case 'team':
        return (
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
                  className={`w-full px-3 py-2 border rounded-lg ${
                    isEditing ? 'bg-white' : 'bg-gray-100'
                  }`}
                  placeholder="Team Member Name"
                />
                {/* Repeat for email and role */}
              </div>
            ))}
          </div>
        );
      case 'campaigns':
        return (
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
                    className={`w-full px-3 py-2 border rounded-lg ${
                      isEditing ? 'bg-white' : 'bg-gray-100'
                    }`}
                    placeholder="Enter Campaign Name"
                  />
                </div>
                {/* Repeat for clientName, description, results */}
              </div>
            ))}
          </div>
        );
      case 'payment':
            return (
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label>Agency ID</label>
                  <input
                    type="text"
                    name="agencyId"
                    value={paymentInfo.agencyId}
                    onChange={handleInputChange(setPaymentInfo)}
                    disabled={!isEditing}
                    className={`w-full px-3 py-2 border rounded-lg ${
                      isEditing ? 'bg-white' : 'bg-gray-100'
                    }`}
                    placeholder="Enter Agency ID"
                  />
                </div>
                <div>
                  <label>Account Holder Name</label>
                  <input
                    type="text"
                    name="accountHolderName"
                    value={paymentInfo.accountHolderName}
                    onChange={handleInputChange(setPaymentInfo)}
                    disabled={!isEditing}
                    className={`w-full px-3 py-2 border rounded-lg ${
                      isEditing ? 'bg-white' : 'bg-gray-100'
                    }`}
                    placeholder="Enter Account Holder Name"
                  />
                </div>
                <div>
                  <label>Account Number</label>
                  <input
                    type="text"
                    name="accountNumber"
                    value={paymentInfo.accountNumber}
                    onChange={handleInputChange(setPaymentInfo)}
                    disabled={!isEditing}
                    className={`w-full px-3 py-2 border rounded-lg ${
                      isEditing ? 'bg-white' : 'bg-gray-100'
                    }`}
                    placeholder="Enter Account Number"
                  />
                </div>
                <div>
                  <label>IFSC Code</label>
                  <input
                    type="text"
                    name="ifscCode"
                    value={paymentInfo.ifscCode}
                    onChange={handleInputChange(setPaymentInfo)}
                    disabled={!isEditing}
                    className={`w-full px-3 py-2 border rounded-lg ${
                      isEditing ? 'bg-white' : 'bg-gray-100'
                    }`}
                    placeholder="Enter IFSC Code"
                  />
                </div>
                <div>
                  <label>Bank Name</label>
                  <input
                    type="text"
                    name="bankName"
                    value={paymentInfo.bankName}
                    onChange={handleInputChange(setPaymentInfo)}
                    disabled={!isEditing}
                    className={`w-full px-3 py-2 border rounded-lg ${
                      isEditing ? 'bg-white' : 'bg-gray-100'
                    }`}
                    placeholder="Enter Bank Name"
                  />
                </div>
                <div>
                  <label>GST Number</label>
                  <input
                    type="text"
                    name="gstNumber"
                    value={paymentInfo.gstNumber}
                    onChange={handleInputChange(setPaymentInfo)}
                    disabled={!isEditing}
                    className={`w-full px-3 py-2 border rounded-lg ${
                      isEditing ? 'bg-white' : 'bg-gray-100'
                    }`}
                    placeholder="Enter GST Number"
                  />
                </div>
                <div>
                  <label>PAN Number</label>
                  <input
                    type="text"
                    name="panNumber"
                    value={paymentInfo.panNumber}
                    onChange={handleInputChange(setPaymentInfo)}
                    disabled={!isEditing}
                    className={`w-full px-3 py-2 border rounded-lg ${
                      isEditing ? 'bg-white' : 'bg-gray-100'
                    }`}
                    placeholder="Enter PAN Number"
                  />
                </div>
              </div>
            );
          
      default:
        return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-lg">
      {/* Navigation Tabs */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-4">
          {[
            { icon: Building2, label: 'Agency', value: 'agency' },
            { icon: Users, label: 'Team', value: 'team' },
            { icon: Briefcase, label: 'Campaigns', value: 'campaigns' },
            { icon: CreditCard, label: 'Payment', value: 'payment' }
          ].map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveSection(tab.value)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                activeSection === tab.value
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
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          {isEditing ? <Save className="w-5 h-5" /> : <Edit className="w-5 h-5" />}
          <span>{isEditing ? 'Save' : 'Edit'}</span>
        </button>
      </div>

      {/* Render Active Section */}
      {renderSection()}
    </div>
  );
};

export default AgencyProfile;
