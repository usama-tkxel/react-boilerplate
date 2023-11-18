import {
  mgCustomerService,
  smManager,
  smSalesRep,
  superAdmin,
} from 'src/constants/app-defaults';

// eslint-disable-next-line import/prefer-default-export
export const authParser = (response = {}) => {
  const { authorization = {}, user = {} } = response ?? {};
  const { token = '' } = authorization;
  const { role: { id } = {} } = user;
  localStorage.setItem('authToken', token);
  const DEFAULT_USER = {
    superAdmin: false,
    MGCustomerService: false,
    SMAdmin: false,
    SMSalesRep: false,
    authenticated: false,
  };

  const updatedUser = {
    ...DEFAULT_USER,
    ...user,
    authorization,
    authenticated: true,
  };
  switch (id) {
    case superAdmin.id:
      return {
        ...updatedUser,
        superAdmin: true,
      };

    case mgCustomerService.id:
      return {
        ...updatedUser,
        MGCustomerService: true,
      };

    case smManager.id:
      return { ...updatedUser, SMAdmin: true };

    case smSalesRep.id:
      return {
        ...updatedUser,
        SMSalesRep: true,
      };

    default:
      return DEFAULT_USER;
  }
};
