import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import AdminHeader from '../components/admin/AdminHeader';
import AdminSubHeader from '../components/admin/AdminSubHeader';
import { AdminSection } from '../components/admin/AdminSubHeader';
import './AdminLayout.css';

interface AdminLayoutProps {
    isAuthenticated: boolean;  
    onAuthAction?: () => void;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({
    isAuthenticated,
    onAuthAction,
}) => {
    const location = useLocation();
    const initialSection = (location.pathname.substring(1) || 'stores') as AdminSection;
    const [activeSection, setActiveSection] = useState<AdminSection>(initialSection);
    const navigate = useNavigate();

    const handleLogout = () => {
        onAuthAction?.(); // This will set isAuthenticated to false
        navigate('/login');
    };

    const handleSectionChange = (section: AdminSection) => {
        setActiveSection(section);
        navigate(`/${section}`);
    };

    return (
        <div className="admin-layout">
            <AdminHeader 
                isAuthenticated={isAuthenticated}
                onAuthAction={handleLogout}
            />
            <AdminSubHeader
                activeSection={activeSection}
                onSectionChange={handleSectionChange}
            />
            <main className="admin-content">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
