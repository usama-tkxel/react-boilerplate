import React from 'react';
import './index.scss';
const Toggle = ({
  togleText = '',
  isChecked = false,
  onChange = null,
  order,
  labelClass,
  gap,
  name = null,
  disabled = false,
  title = ''
}) => {
  return (
    <div>
      <label
        forhtml="toogleA"
        className={`flex items-center cursor-pointer ${gap}`}
        title={title}
      >
        {/* <!-- toggle --> */}
        <div className="relative order-1">
          {/* <!-- input --> */}
          <input
            id="toogleA"
            type="checkbox"
            name={name}
            checked={isChecked}
            value={isChecked}
            onChange={onChange}
            className="sr-only"
            disabled={disabled}
          />
          {/* <!-- line --> */}
          <div className="w-10 h-4 bg-[#C3C4F4] rounded-full shadow-sm"></div>
          {/* <!-- dot --> */}
          <div className="dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition"></div>
        </div>
        {/* <!-- label --> */}
        <span className={`text-gray-500 font-sm ${order} ${labelClass}`}>
          {togleText}
        </span>
      </label>
    </div>
  );
};

export default Toggle;
