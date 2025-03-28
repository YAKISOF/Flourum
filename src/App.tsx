import React, { useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import AdminLayout from "./pages/AdminLayout";
import Profile from "./pages/Profile";
import AuthPage from './pages/AuthPage';
import StoresPage from './pages/StoresPage';
import AdministratorsPage from './pages/AdministratorsPage';
import AssortmentPage from './pages/AssortmentPage';
import PolicyPage from './components/PolicyPage';
import OfferPage from './components/OfferPage';
import OrdersPage from './pages/OrdersPage';
import DeliveryPage from './pages/DeliveryPage'; // Добавляем импорт страницы DeliveryPage
import ErrorBoundary from "./utils/errorBoundary/ErrorBoundary";

const App: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const location = useLocation();

    return (
        <ErrorBoundary>
            <Routes>
                <Route
                    path="/login"
                    element={
                        isAuthenticated ? (
                            <Navigate to={location.state?.from || "/"} replace />
                        ) : (
                            <AuthPage setIsAuthenticated={setIsAuthenticated} />
                        )
                    }
                />
                <Route
                    path="/"
                    element={
                        isAuthenticated ? (
                            <AdminLayout
                                isAuthenticated={isAuthenticated}
                                onAuthAction={() => setIsAuthenticated(false)}
                            />
                        ) : (
                            <Navigate
                                to="/login"
                                replace
                                state={{ from: location.pathname }}
                            />
                        )
                    }
                >
                    <Route index element={<Navigate to="/stores" replace />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="stores" element={<StoresPage />} />
                    <Route path="administrators" element={<AdministratorsPage />} />
                    <Route path="assortment" element={<AssortmentPage />} />
                    <Route path="orders" element={<OrdersPage />} />
                    <Route path="delivery" element={<DeliveryPage />} /> {/* Добавляем маршрут для страницы Доставка */}
                </Route>

                <Route path="/policy" element={<PolicyPage />} />
                <Route path="/offer" element={<OfferPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </ErrorBoundary>
    );
};

export default App;