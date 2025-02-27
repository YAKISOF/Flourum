import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminSubHeader.css';

export type AdminSection = 'stores' | 'administrators' | 'profile';

interface AdminSubHeaderProps {
    activeSection: AdminSection;
    onSectionChange: (section: AdminSection) => void;
}

const AdminSubHeader: React.FC<AdminSubHeaderProps> = ({
    activeSection,
    onSectionChange,
}) => {
    const navigate = useNavigate();
    const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
    const sectionRefs = useRef<{ [key in AdminSection]?: HTMLDivElement }>({});

    const sections: { id: AdminSection; label: string; path: string }[] = [
        { id: 'stores', label: 'Магазины', path: '/stores' },
        { id: 'administrators', label: 'Администраторы', path: '/administrators' },
        { id: 'profile', label: 'Профиль', path: '/profile' },
    ];

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
                        transform: `translateX(${indicatorStyle.left}px)`,
                        width: `${indicatorStyle.width}px`,
                    }}
                />
            </div>
        </nav>
    );
};

export default AdminSubHeader;
