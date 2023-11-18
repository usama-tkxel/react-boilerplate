// ---------------------------------- Default Routes Constants ----------------------------------//

export const FORGOT_PASSWORD = '/forgot-password';
export const RESET_PASSWORD = '/reset-password';
export const INVITE_USER = '/invite-user';
export const PAGE_NOT_FOUND = '/page-not-found';
export const LOGIN = '/';
export const SIGNUP = '/signup';

// ---------------------------------- USER_DASHBOARD Routes Constants ----------------------------------//

export const USER_DASHBOARD_ROUTES = {
  INDEX: '/dashboard',
  OVERVIEW: '/dashboard/overview',
  SETTINGS: '/dashboard/settings',
};

export const { OVERVIEW, SETTINGS } = USER_DASHBOARD_ROUTES;

export const USER_DASHBOARD_NAV_LINKS = [
  {
    name: 'overView',
    title: 'Overview',
    link: OVERVIEW,
    icon: '',
  },

  {
    name: 'settings',
    title: 'Settings',
    link: SETTINGS,
    icon: '',
  },
];
