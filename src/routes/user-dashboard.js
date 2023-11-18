import React, { Suspense } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';

import UserDashboardLayout from 'src/components/layouts/user-dashboard';
import Overview from 'src/pages/dashboard/overview';

import { USER_DASHBOARD_ROUTES } from 'src/constants/routes';

// wrap every dashboard component in UserDashboardLayout as custom coponent doesnt render in Routes of react-router-dom v6

const WrappedOverview = (
  <UserDashboardLayout>
    <Overview />
  </UserDashboardLayout>
);

const UserDashboardRoutes = () => {
  return (
    <Routes>
      <Route
        exact
        path={USER_DASHBOARD_ROUTES.OVERVIEW}
        element={WrappedOverview}
      />
    </Routes>
  );
};

export default UserDashboardRoutes;
