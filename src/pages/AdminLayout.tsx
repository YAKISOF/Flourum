import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import AdminHeader from '../components/admin/AdminHeader';
import AdminSubHeader from '../components/admin/AdminSubHeader';
import { AdminSection } from '../components/admin/AdminSubHeader';
import './AdminLayout.css';

interface AdminLayoutProps {
    isAuthenticated: boolean;
    onAuthAction: () => void;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({
    isAuthenticated,
    onAuthAction,
}) => {
    const [activeSection, setActiveSection] = useState<AdminSection>('stores');
    const navigate = useNavigate();

    const handleSectionChange = (section: AdminSection) => {
        setActiveSection(section);
    };

    return (
        <div className="admin-layout">
            <AdminHeader 
                isAuthenticated={isAuthenticated}
                onAuthAction={onAuthAction}
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
