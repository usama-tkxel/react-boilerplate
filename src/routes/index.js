import React from 'react';

import UserDashboardRoutes from 'src/routes/user-dashboard';
import AuthRoutes from 'src/routes/auth';

const AppRoutes = () => {
  return (
    <>
      <UserDashboardRoutes />
      <AuthRoutes />
    </>
  );
};

export default AppRoutes;
