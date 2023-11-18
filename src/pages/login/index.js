import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Box,
  Button,
  Checkbox,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
//3rd party imports on top

//local compnents imports
import PasswordInput from 'src/components/common/inputs/password-input';
import InputField from 'src/components/common/inputs/input-field';
import CenterSpinner from 'src/components/common/center-spinner';

//actions import
import { loginUser } from 'src/actions/auth';

//helpers import
import { validateEmail } from 'src/helpers';

// selector methods import
import { getAuthenticationStatus } from 'src/selectors/auth';

//constant imports
import { FORGOT_PASSWORD } from 'src/constants/routes';

export const Login = () => {
  const dispatch = useDispatch();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting: isFormUpdating },
  } = useForm();

  const isAuthenticated = useSelector(getAuthenticationStatus);

  useEffect(() => {
    if (!isSubmitting && isAuthenticated) {
      //redirect if user is authenticated
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  const onSubmit = (values) => {
    setError('');
    if (isSubmitting || isFormUpdating) {
      return;
    }
    setIsSubmitting(true);

    const { email = '', password = '' } = values ?? {};
    dispatch(loginUser({ email, password }))
      .unwrap()
      .then((res) => {})
      .catch((err) => {
        setIsSubmitting(false);
        setError('Invalid Credentials');
      });
  };

  if (isAuthenticated) {
    return <CenterSpinner />;
  }

  return (
    <Box minH='100vh' bg={useColorModeValue('gray.50', 'gray.800')}>
      <Flex align='center' justify='center' width='full'>
        <Container
          maxW='lg'
          py={{ base: '12', md: '24' }}
          px={{ base: '0', sm: '8' }}
          bg={useColorModeValue('gray.50', 'gray.800')}
        >
          <form id='login-form' onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing='8'>
              <Stack spacing='6'>
                <Stack align='center'>
                  <Heading fontSize='4xl' textAlign='center' color='gray.800'>
                    Login
                  </Heading>
                </Stack>
              </Stack>
              <Box
                py={{ base: '0', sm: '8' }}
                px={{ base: '4', sm: '10' }}
                bg={{ base: 'transparent', sm: 'bg.surface' }}
                borderRadius='10px'
                border='1px solid #e8e8e8'
                boxShadow={{ base: '8', sm: 'md' }}
              >
                <Stack spacing='6'>
                  <Stack spacing='5'>
                    <FormControl id='email' isRequired isInvalid={errors.email}>
                      <InputField
                        id='email'
                        label='Email address'
                        type='email'
                        name='email'
                        register={register('email', {
                          required: 'Email address is required',
                          validate: (value) => {
                            if (!validateEmail(value)) {
                              return 'Email is not valid';
                            }
                          },
                        })}
                        error={errors?.email?.message}
                      />
                    </FormControl>

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
                    {Boolean(error) && (
                      <FormControl isInvalid={Boolean(error)}>
                        <FormErrorMessage>{error}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Stack>
                  <HStack justify='space-between'>
                    <Checkbox defaultChecked>Remember me</Checkbox>
                    <Button variant='text' size='sm'>
                      <Link to={FORGOT_PASSWORD}> Forgot password?</Link>
                    </Button>
                  </HStack>
                  <Stack spacing='6'>
                    <Button type='submit' isLoading={isSubmitting}>
                      Sign in
                    </Button>
                  </Stack>
                </Stack>
              </Box>
            </Stack>
          </form>
        </Container>
      </Flex>
    </Box>
  );
};

export default Login;
