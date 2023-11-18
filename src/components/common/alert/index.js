import React from 'react';
import { BiSolidInfoCircle } from 'react-icons/bi';
const Alert = ({
  icon = <BiSolidInfoCircle />,
  text = 'Sample text',
  textColor = 'black',
  className= 'font-medium text-sm',
  bg = 'white',
  crossIcon,
}) => {
  return (
    <div className={`${bg} rounded-md px-3 py-2 relative`}>
      <div className="flex">
        <div className="flex-shrink-0">{icon}</div>
        <div className="ml-2 flex-1 md:flex md:justify-between">
          <p className={`${textColor} ${className}`}>{text}</p>
        </div>
      </div>
      <div className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer">
        {crossIcon}
      </div>
    </div>
  );
};
export default Alert;
