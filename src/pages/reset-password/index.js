import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// eslint-disable-next-line import/no-extraneous-dependencies
import { useForm } from 'react-hook-form';
import {
  Flex,
  Box,
  FormControl,
  HStack,
  Stack,
  Heading,
  useColorModeValue,
  Link as UILink,
  FormLabel,
  FormErrorMessage,
  useToast,
} from '@chakra-ui/react';

import InputField from 'src/components/common/inputs/input-field';
import { validateEmail, validatePassword } from 'src/helpers';

import useQueryParams from 'src/hooks/query-param';

import PasswordInput from 'src/components/common/inputs/password-input';

import CustomButton from 'src/components/common/button';
import { resetPassword } from 'src/actions/auth';
import { DEFAULT_TOAST_SETTINGS } from 'src/constants/theme';
import { LOGIN } from 'src/constants/routes';
import { snakifyKeys } from 'src/helpers/convert-keys';

const ResetPassword = () => {
  const searchParams = useQueryParams();

  const tokenFromUrl = searchParams.get('token');
  const emailFromUrl = searchParams.get('email');
  const {
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { errors, isSubmitting: isFormUpdating },
  } = useForm();
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const password = watch('password');

  useEffect(() => {
    setValue('email', emailFromUrl);
  }, [emailFromUrl]);

  const onSubmit = (formValues) => {
    if (isSubmitting || isFormUpdating) {
      return;
    }
    setIsSubmitting(true);
    const token = tokenFromUrl;
    const updatedFormValues = snakifyKeys({ ...formValues, token });
    dispatch(resetPassword(updatedFormValues))
      .unwrap()
      .then((res) => {
        toast({
          ...DEFAULT_TOAST_SETTINGS,
          title: 'Password Updated Successfully!',
          status: 'success',
        });
        setIsSubmitting(false);
        navigate(LOGIN);
      })
      .catch((err) => {
        toast({
          ...DEFAULT_TOAST_SETTINGS,
          title: 'Something went wrong, try again later',
        });
        setIsSubmitting(false);
        throw err;
      });
  };

  return (
    <Flex
      minH='100vh'
      align='center'
      justify='center'
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack
        spacing={4}
        w='full'
        maxW='md'
        bg={useColorModeValue('white', 'gray.700')}
        rounded='xl'
        boxShadow='lg'
        p={6}
        my={12}
      >
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
          Reset Password
        </Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl id='email' isRequired isInvalid={errors.email}>
            <InputField
              id='email'
              label='Email address'
              type='email'
              name='email'
              placeholder='your-email@example.com'
              _placeholder={{ color: 'gray.500' }}
              register={register('email', {
                required: 'Email address is required',
                validate: (value) => {
                  if (!validateEmail(value)) {
                    return 'Email is not valid';
                  }
                },
              })}
              disabled
              error={errors?.email?.message}
            />
          </FormControl>
          <HStack mt={6} pb={16}>
            <Box style={{ width: '50%' }}>
              <FormControl id='password' isRequired isInvalid={errors.password}>
                <FormLabel htmlFor='password'>Password</FormLabel>
                <PasswordInput
                  name='password'
                  id='password'
                  {...register('password', {
                    required: 'This is required',
                    validate: (value) => {
                      if (!validatePassword(value)) {
                        return 'password must be 8 characters long, contains 1 Upper case ,1 Lower case 1 number and 1 special character';
                      }
                    },
                  })}
                />
                <FormErrorMessage>
                  {errors.password && errors.password.message}
                </FormErrorMessage>
              </FormControl>
            </Box>
            <Box style={{ width: '50%' }}>
              <FormControl
                id='passwordConfirmation'
                isRequired
                isInvalid={errors.passwordConfirmation}
              >
                <FormLabel htmlFor='passwordConfirmation'>
                  Confirm Password
                </FormLabel>

                <PasswordInput
                  id='passwordConfirmation'
                  name='passwordConfirmation'
                  {...register('passwordConfirmation', {
                    required: 'This is required',
                    validate: (value) => {
                      if (password !== value) {
                        return 'Your passwords do no match';
                      }
                    },
                  })}
                />

                <FormErrorMessage>
                  {errors.passwordConfirmation &&
                    errors.passwordConfirmation.message}
                </FormErrorMessage>
              </FormControl>
            </Box>
          </HStack>
          <Stack spacing={6}>
            <CustomButton
              type='submit'
              loadingText='resetting password...'
              isLoading={isSubmitting}
            >
              Submit
            </CustomButton>
          </Stack>
        </form>
      </Stack>
    </Flex>
  );
};

export default ResetPassword;
