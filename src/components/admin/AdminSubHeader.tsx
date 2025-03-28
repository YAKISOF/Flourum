import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './AdminSubHeader.css';

// Обновляем тип AdminSection, добавляя 'delivery'
export type AdminSection = 'stores' | 'administrators' | 'profile' | 'assortment' | 'orders' | 'delivery';

interface AdminSubHeaderProps {
    activeSection: AdminSection;
    onSectionChange: (section: AdminSection) => void;
}

const AdminSubHeader: React.FC<AdminSubHeaderProps> = ({
                                                           activeSection,
                                                           onSectionChange,
                                                       }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
    const sectionRefs = useRef<{ [key in AdminSection]?: HTMLDivElement }>({});

    const sections: { id: AdminSection; label: string; path: string }[] = [
        { id: 'stores', label: 'Магазины', path: '/stores' },
        { id: 'administrators', label: 'Администраторы', path: '/administrators' },
        { id: 'assortment', label: 'Ассортимент', path: '/assortment' },
        { id: 'orders', label: 'Заказы', path: '/orders' },
        { id: 'delivery', label: 'Доставка', path: '/delivery' }, // Добавляем вкладку "Доставка"
        { id: 'profile', label: 'Профиль', path: '/profile' },
    ];

    useEffect(() => {
        const currentPath = location.pathname.substring(1) || 'stores';
        const section = sections.find(s => s.path.substring(1) === currentPath)?.id || 'stores';
        onSectionChange(section);
    }, [location.pathname]);

    useEffect(() => {
        const activeElement = sectionRefs.current[activeSection];
        if (activeElement) {
            const { offsetLeft, offsetWidth } = activeElement;
            setIndicatorStyle({
                left: offsetLeft,
                width: offsetWidth,
            });
        }
    }, [activeSection]);

    const handleSectionClick = (section: AdminSection, path: string) => {
        onSectionChange(section);
        navigate(path);
    };

    return (
        <nav className="admin-subheader">
            <div className="admin-subheader-content">
                {sections.map(({ id, label, path }) => (
                    <div
                        key={id}
                        ref={(el) => {
                            if (el) sectionRefs.current[id] = el;
                        }}
                        className={`section-item ${activeSection === id ? 'active' : ''}`}
                        onClick={() => handleSectionClick(id, path)}
                    >
                        {label}
                    </div>
                ))}
                <div
                    className="active-indicator"
                    style={{
                        left: `${indicatorStyle.left}px`,
                        width: `${indicatorStyle.width}px`,
                    }}
                />
            </div>
        </nav>
    );
};

export default AdminSubHeader;
