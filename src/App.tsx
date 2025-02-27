import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminLayout from "./pages/AdminLayout";
import Profile from "./pages/Profile";
import PolicyPage from './components/PolicyPage'; // Импортируем PolicyPage
import OfferPage from './components/OfferPage'; // Импортируем OfferPage
import ErrorBoundary from "./utils/errorBoundary/ErrorBoundary";

const App: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(true);

    const handleAuthAction = () => {
        setIsAuthenticated(!isAuthenticated);
    };

    console.log('App.tsx: Rendering routes');

    return (
        <ErrorBoundary>
            <Routes>
                <Route
                    path="/"
                    element={
                        <AdminLayout
                            isAuthenticated={isAuthenticated}
                            onAuthAction={handleAuthAction}
                        />
                    }
                >
                    <Route path="profile" element={<Profile />} />
                    <Route path="stores" element={<div>Stores Page</div>} />
                    <Route path="administrators" element={<div>Administrators Page</div>} />
                    <Route index element={<div>Welcome to Admin Dashboard</div>} />
                </Route>

                {/* Добавляем маршруты для PolicyPage и OfferPage */}
                <Route
                    path="/policy"
                    element={
                        <>
                            {console.log('Rendering PolicyPage for path /policy')}
                            <PolicyPage />
                        </>
                    }
                />
                <Route
                    path="/offer"
                    element={
                        <>
                            {console.log('Rendering OfferPage for path /offer')}
                            <OfferPage />
                        </>
                    }
                />

                {/* 404 Route */}
                <Route path="*" element={
                    <div className="flex items-center justify-center min-h-screen bg-gray-50">
                        <div className="text-center">
                            <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
                            <p className="text-gray-600">Page not found</p>
                        </div>
                    </div>
                } />
            </Routes>
        </ErrorBoundary>
    );
};

export default App;