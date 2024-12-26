import React from 'react';
import Plan from './Plan.css'; // Assuming you have a Plan component

const PlanPage = () => {
    const plans = [
        {
            name: 'Gold Plan',
            price: '$99.99/month',
            employeeSize: 'Up to 50 employees',
            yearly: '$1199.88',
            details: [
                'Advanced features including custom analytics dashboard',
                'Priority customer support',
                'Integration with popular CRM and accounting software',
                'Unlimited user accounts',
                '24/7 monitoring and security',
                'Dedicated account manager'
            ]
        },
        {
            name: 'Silver Plan',
            price: '$49.99/month',
            employeeSize: 'Up to 20 employees',
            yearly: '$599.88',
            details: [
                'Essential features for small to medium-sized businesses',
                'Email support during business hours',
                'Integration with basic accounting software',
                'Up to 10 user accounts',
                'Regular security updates'
            ]
        },
        {
            name: 'Bronze Plan',
            price: '$19.99/month',
            employeeSize: 'Up to 10 employees',
            yearly: '$239.88',
            details: [
                'Basic features suitable for startups and small businesses',
                'Email support with limited response time',
                'Manual data backup',
                'Up to 5 user accounts',
                'Monthly security patches'
            ]
        }
    ];

    return (
        <div className="App">
            <h1>Available Plans</h1>
            <div className="plans-container">
               
            </div>
        </div>
    );
}

export default PlanPage;
