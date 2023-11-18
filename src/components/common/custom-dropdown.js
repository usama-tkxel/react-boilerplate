import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import React from 'react';

const CustomDropdown = ({
  as,
  text,
  icon,
  className,
  list,
  listIcon,
  itemListClass,
}) => {
  return (
    <Menu>
      <MenuButton as={Button} rightIcon={icon} className={className}>
        {text}
      </MenuButton>
      <MenuList>
        {list.map((item, index) => {
          return (
            <MenuItem key={index + 1} className="p-0">
              <div
                className={`${itemListClass} hover:bg-[#EEEEFC] w-full px-3.5 py-1.5 flex justify-between items-center`}
              >
                <span>{item}</span>
                <span className="icon-color">{listIcon}</span>
              </div>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
};

export default CustomDropdown;
