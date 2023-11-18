import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Signup from 'src/pages/invite-user';
import NotFound from 'src/pages/not-found/not-found';
import Login from 'src/pages/login';
import ResetPassword from 'src/pages/reset-password';
import ForgotPassword from 'src/pages/forgot-password';

import {
  LOGIN,
  PAGE_NOT_FOUND,
  SIGNUP,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
} from 'src/constants/routes';

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path={SIGNUP} exact element={<Signup />} />
      <Route path={FORGOT_PASSWORD} exact element={<ForgotPassword />} />
      <Route path={RESET_PASSWORD} exact element={<ResetPassword />} />
      <Route path={LOGIN} exact element={<Login />} />
    </Routes>
  );
};

export default AuthRoutes;
