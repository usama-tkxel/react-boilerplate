import React from 'react';

import checkAuth from 'src/components/hoc/auth';

const UserDashboardLayout = ({ children }) => {
  return (
    <div className=''>
      {/* render header */}

      <div className='row'>
        <div>
          <div>{/* render sidebar */}</div>
          <div> {children}</div>
        </div>
      </div>
    </div>
  );
};

export default checkAuth(UserDashboardLayout);
