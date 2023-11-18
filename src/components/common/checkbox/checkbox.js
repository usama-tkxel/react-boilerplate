import {
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Checkbox,
} from '@chakra-ui/react';
import React from 'react';

const CheckboxField = ({
  className = '',
  label = null,
  prefixIcon,
  suffixIcon,
  error = null,
  type = 'text',
  errorBorderColor = 'red.300',
  id = '',
  name = '',
  variant = 'outline',
  register = {},
  isCheck = false,
  setValue,
  ...rest
}) => {

  const handleCheckBox = (e) => {
    const isChecked = e.target.checked == true ? 1 : 0;
    setValue(name, isChecked);
  }

  return (
    <>
      <InputGroup>
        {prefixIcon && <InputLeftElement>{prefixIcon}</InputLeftElement>}
        <Checkbox
          defaultChecked={isCheck}
          onChange={handleCheckBox}
          {...register}
          {...rest}
        >
          {label}
        </Checkbox>
        {suffixIcon && <InputRightElement>{suffixIcon}</InputRightElement>}
      </InputGroup>

      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </>
  );
};

export default CheckboxField;
