const ActiveCampaigns = () => {
    // Example data structure - replace with your actual data source
    const campaigns = [
        {
            id: 1,
            campaignName: "Summer Collection 2024",
            brand: {
                name: "Brand Name",
                logo: "logo-url",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                niches: ["Fashion", "Lifestyle", "Beauty"]
            },
            budget: 5000
        }
    ];

    const handleCampaignClick = (campaignId) => {
        // Add your navigation or action logic here
        console.log(`Clicked campaign: ${campaignId}`);
    };

    const getBrandTooltipContent = (brand) => {
        return `${brand.description}\n\nTarget Niches: ${brand.niches.join(', ')}`;
    };

    return (
        <div className="active-campaigns">
            <table className="campaigns-table">
                <thead>
                    <tr>
                        <th>Campaign Name</th>
                        <th>Posted By</th>
                        <th>Budget</th>
                        <th>Posted On</th>
                    </tr>
                </thead>
                <tbody>
                    {campaigns.map((campaign) => (
                        <tr 
                            key={campaign.id}
                            onClick={() => handleCampaignClick(campaign.id)}
                            className="campaign-row"
                        >
                            <td>{campaign.campaignName}</td>
                            <td className="brand-cell">
                                <img 
                                    src={campaign.brand.logo} 
                                    alt={`${campaign.brand.name} logo`}
                                    className="brand-logo"
                                />
                                <span className="brand-info" 
                                      data-tooltip={getBrandTooltipContent(campaign.brand)}>
                                    {campaign.brand.name}
                                </span>
                            </td>
                            <td>${campaign.budget}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ActiveCampaigns;