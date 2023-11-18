import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

import {
  Flex,
  Box,
  FormControl,
  HStack,
  Stack,
  Heading,
  Text,
  useColorModeValue,
  Link as UILink,
  FormLabel,
  FormErrorMessage,
} from '@chakra-ui/react';

import InputField from 'src/components/common/inputs/input-field';
import CustomButton from 'src/components/common/button';
import PasswordInput from 'src/components/common/inputs/password-input';

import { DEFAULT_PHONE_REGEX, EMAIL_PATTERN } from 'src/helpers';

const InviteUser = () => {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors, isSubmitting: isFormUpdating },
  } = useForm();
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const password = watch('password');

  const onSubmit = (formValues) => {
    if (isSubmitting || isFormUpdating) {
      return;
    }
  };

  return (
    <Flex
      minH='100vh'
      align='center'
      justify='center'
      width='full'
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} maxW='lg' py={8} px={6} width='full'>
        <Stack align='center'>
          <Heading fontSize='4xl' textAlign='center'>
            Sign Up
          </Heading>
          <Text fontSize='lg' color='gray.600'>
            Fill below form to sign up and access platform
          </Text>
        </Stack>
        <Box
          rounded='lg'
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow='lg'
          p={4}
          width='full'
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={4}>
              {/* <FormControl id="echelon" isRequired isInvalid={false}>
                <InputField
                  label="Echelon #"
                  id="echelon"
                  name="echelon"
                  register={register('echelon', {
                    required: 'This is required',
                  })}
                  error={errors?.echelon?.message}
                />
              </FormControl> */}
              <HStack>
                <Box>
                  <FormControl
                    id='firstName'
                    isRequired
                    isInvalid={errors.firstName}
                  >
                    <InputField
                      label='First Name'
                      id='firstName'
                      name='firstName'
                      register={register('firstName', {
                        required: 'This is required',
                      })}
                      error={errors?.firstName?.message}
                    />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl
                    id='lastName'
                    isRequired
                    isInvalid={errors.lastName}
                  >
                    <InputField
                      id='lastName'
                      label='Last Name'
                      name='lastName'
                      register={register('lastName', {
                        required: 'This is required',
                      })}
                      error={errors?.lastName?.message}
                    />
                  </FormControl>
                </Box>
              </HStack>

              <FormControl id='email' isRequired isInvalid={errors.email}>
                <InputField
                  id='email'
                  label='Email address'
                  type='email'
                  name='email'
                  register={register('email', {
                    required: 'Email Address is required',
                    pattern: EMAIL_PATTERN,
                  })}
                  error={errors?.email?.message}
                />
              </FormControl>
              <HStack>
                <Box style={{ width: '50%' }}>
                  <FormControl
                    id='password'
                    isRequired
                    isInvalid={errors.password}
                  >
                    <FormLabel htmlFor='password'>Password</FormLabel>
                    <PasswordInput
                      name='password'
                      id='password'
                      {...register('password', {
                        required: 'This is required',
                      })}
                    />
                    <FormErrorMessage>
                      {errors.password && errors.password.message}
                    </FormErrorMessage>
                  </FormControl>
                </Box>
                <Box style={{ width: '50%' }}>
                  <FormControl
                    id='confirmPassword'
                    isRequired
                    isInvalid={errors.confirmPassword}
                  >
                    <FormLabel htmlFor='confirmPassword'>
                      Confirm Password
                    </FormLabel>

                    <PasswordInput
                      id='confirmPassword'
                      name='confirmPassword'
                      {...register('confirmPassword', {
                        required: 'This is required',
                        validate: (value) => {
                          if (password !== value) {
                            return 'Your passwords do no match';
                          }
                        },
                      })}
                    />

                    <FormErrorMessage>
                      {errors.confirmPassword && errors.confirmPassword.message}
                    </FormErrorMessage>
                  </FormControl>
                </Box>
              </HStack>
              <FormControl id='phone' isInvalid={errors.phone}>
                <InputField
                  id='phone'
                  label='Phone #'
                  type='phone'
                  name='phone'
                  register={register('phone', {
                    pattern: {
                      value: DEFAULT_PHONE_REGEX,
                      message: 'Invalid phone number',
                    },
                  })}
                  error={errors?.phone?.message}
                />
              </FormControl>
              <Stack spacing={10} pt={2}>
                <CustomButton
                  loadingText='creating user'
                  isLoading={isSubmitting}
                  type='submit'
                  size='lg'
                >
                  Sign Up
                </CustomButton>
              </Stack>

              <Stack pt={6}>
                <Text align='center'>
                  Already a user?
                  <UILink color='blue.400'>
                    <Link to='/'> Login</Link>
                  </UILink>
                </Text>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
};

export default InviteUser;
