const Invitations = () => {
    // Sample data - replace with your actual data
    const invitations = [
        {
            id: 1,
            campaignName: 'Summer Collection 2024',
            brand: {
                name: 'Nike',
                logo: '/path-to-logo.png'
            },
            status: 'Active',
            budget: '$5000',
        },
        {
            id: 2,
            campaignName: 'Fall Fashion Week',
            brand: {
                name: 'Zara',
                logo: '/zara-logo.png'
            },
            status: 'Active',
            budget: '$3500',
        },
        {
            id: 3,
            campaignName: 'Fitness Challenge',
            brand: {
                name: 'Adidas',
                logo: '/adidas-logo.png'
            },
            status: 'Expired',
            budget: '$4200',
        },
        {
            id: 4,
            campaignName: 'Holiday Special',
            brand: {
                name: 'H&M',
                logo: '/hm-logo.png'
            },
            status: 'Active',
            budget: '$6000',
        },
        {
            id: 5,
            campaignName: 'Spring Collection',
            brand: {
                name: 'Puma',
                logo: '/puma-logo.png'
            },
            status: 'Active',
            budget: '$4800',
        },
        {
            id: 6,
            campaignName: 'Winter Essentials',
            brand: {
                name: 'Under Armour',
                logo: '/ua-logo.png'
            },
            status: 'Expired',
            budget: '$3800',
        }
    ];

    const handleAccept = (id) => {
        // Handle accept logic
        console.log('Accepted invitation:', id);
    };

    const handleReject = (id) => {
        // Handle reject logic
        console.log('Rejected invitation:', id);
    };

    const handleRowClick = (id) => {
        // Handle row click
        console.log('Clicked row:', id);
    };

    return (
        <div className="invitations-container">
        
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Campaign Name</th>
                            <th>Invited By</th>
                            <th>Status</th>
                            <th>Budget</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invitations.map((invitation) => (
                            <tr 
                                key={invitation.id}
                                onClick={() => handleRowClick(invitation.id)}
                                className="table-row"
                            >
                                <td className="campaign-cell">{invitation.campaignName}</td>
                                <td className="brand-cell">
                                    <div className="brand-wrapper">
                                        <img 
                                            src={invitation.brand.logo} 
                                            alt={invitation.brand.name}
                                            className="brand-logo"
                                        />
                                        <span>{invitation.brand.name}</span>
                                    </div>
                                </td>
                                <td className="status-cell">
                                    <span className={`status-badge ${invitation.status.toLowerCase()}`}>
                                        {invitation.status}
                                    </span>
                                </td>
                                <td className="budget-cell">{invitation.budget}</td>
                                <td className="actions-cell">
                                    <div className="actions-wrapper">
                                        <button 
                                            className="accept-btn"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleAccept(invitation.id);
                                            }}
                                        >
                                            Accept
                                        </button>
                                        <button 
                                            className="reject-btn"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleReject(invitation.id);
                                            }}
                                        >
                                            Reject
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <style jsx>{`
                .invitations-container {
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
                    padding: 0 16px;
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

                .campaign-cell {
                    padding: 16px;
                    vertical-align: middle;
                }

                .brand-cell {
                    height: 72px;
                    padding: 0 16px;
                    vertical-align: middle;
                    max-width: 200px;
                    display: flex;
                    align-items: center;
                }

                .brand-wrapper {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    white-space: nowrap;
                    width: 100%;
                }

                .brand-logo {
                    width: 24px;
                    height: 24px;
                    border-radius: 50%;
                    object-fit: cover;
                    flex-shrink: 0;
                }

                .brand-cell span {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }

                .status-cell {
                    padding: 16px;
                    vertical-align: middle;
                }

                .budget-cell {
                    padding: 16px;
                    vertical-align: middle;
                }

                .actions-cell {
                    padding: 16px;
                    vertical-align: middle;
                }

                .actions-wrapper {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }

                .status-badge {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    padding: 6px 12px;
                    border-radius: 16px;
                    font-size: 0.875rem;
                    font-weight: 500;
                }

                .accept-btn, .reject-btn {
                    padding: 8px 16px;
                    border-radius: 6px;
                    border: none;
                    cursor: pointer;
                    font-weight: 500;
                    height: 36px;
                    min-width: 80px;
                    transition: background-color 0.2s;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                }

                .accept-btn {
                    background-color: #2e7d32;
                    color: white;
                }

                .accept-btn:hover {
                    background-color: #1b5e20;
                }

                .reject-btn {
                    background-color:rgb(40, 82, 198);
                    color: white;
                }

                .reject-btn:hover {
                    background-color: rgb(14, 71, 228);
                }

                .status-badge.active {
                    background-color: #e8f5e9;
                    color: #2e7d32;
                }

                .status-badge.expired {
                    background-color: #ffebee;
                    color: rgb(14, 71, 228);
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
                td:nth-child(3) {
                    width: 15%;
                }

                th:nth-child(4), 
                td:nth-child(4) {
                    width: 15%;
                }

                th:nth-child(5), 
                td:nth-child(5) {
                    width: 20%;
                    min-width: 200px;
                }
            `}</style>
        </div>
    );
};

export default Invitations;