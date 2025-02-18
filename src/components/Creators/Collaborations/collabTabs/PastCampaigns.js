const PastCampaigns = () => {
    // Sample data - replace with actual data
    const pastCampaigns = [
        {
            id: 1,
            campaignName: 'Summer Collection 2023',
            brand: {
                name: 'Nike',
                logo: '/path-to-logo.png'
            },
            startDate: '2023-06-01',
            completionDate: '2023-08-15',
            earnings: '$6,500'
        },
        {
            id: 2,
            campaignName: 'Winter Fashion Series',
            brand: {
                name: 'Zara',
                logo: '/zara-logo.png'
            },
            startDate: '2023-11-01',
            completionDate: '2023-12-31',
            earnings: '$4,200'
        }
    ];

    const handleRowClick = (id) => {
        // Handle row click to show more details
        console.log('Clicked campaign:', id);
    };

    return (
        <div className="past-campaigns-container">
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Campaign Name</th>
                            <th>Brand</th>
                            <th>Started On</th>
                            <th>Completed On</th>
                            <th>Earnings</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pastCampaigns.map((campaign) => (
                            <tr 
                                key={campaign.id}
                                onClick={() => handleRowClick(campaign.id)}
                                className="table-row"
                            >
                                <td className="campaign-cell">{campaign.campaignName}</td>
                                <td className="brand-cell">
                                    <div className="brand-wrapper">
                                        <img 
                                            src={campaign.brand.logo} 
                                            alt={campaign.brand.name}
                                            className="brand-logo"
                                        />
                                        <span>{campaign.brand.name}</span>
                                    </div>
                                </td>
                                <td className="date-cell">{new Date(campaign.startDate).toLocaleDateString()}</td>
                                <td className="date-cell">{new Date(campaign.completionDate).toLocaleDateString()}</td>
                                <td className="earnings-cell">{campaign.earnings}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <style jsx>{`
                .past-campaigns-container {
                    padding: 20px;
                }

                .table-container {
                    margin-top: 20px;
                    border-radius: 8px;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                    overflow-x: auto;
                }

                table {
                    width: 100%;
                    border-collapse: collapse;
                    background: white;
                    table-layout: fixed;
                }

                th, td {
                    padding: 16px;
                    text-align: left;
                    border-bottom: 1px solid #eee;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    vertical-align: middle;
                }

                th {
                    background-color: #f8f9fa;
                    font-weight: 600;
                }

                .table-row {
                    cursor: pointer;
                    transition: background-color 0.2s;
                    height: 72px;
                }

                .table-row:hover {
                    background-color: #f8f9fa;
                }

                .brand-cell {
                    height: 72px;
                    vertical-align: middle;
                }

                .brand-wrapper {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }

                .brand-logo {
                    width: 24px;
                    height: 24px;
                    border-radius: 50%;
                    object-fit: cover;
                }

                .earnings-cell {
                    font-weight: 600;
                    color: #2e7d32;
                }

                th:nth-child(1), 
                td:nth-child(1) {
                    width: 25%;
                }

                th:nth-child(2), 
                td:nth-child(2) {
                    width: 25%;
                }

                th:nth-child(3), 
                td:nth-child(3),
                th:nth-child(4), 
                td:nth-child(4) {
                    width: 15%;
                }

                th:nth-child(5), 
                td:nth-child(5) {
                    width: 20%;
                }
            `}</style>
        </div>
    );
};

export default PastCampaigns;