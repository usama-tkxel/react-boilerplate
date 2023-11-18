import React, { useState } from 'react';

import {
  FormControl,
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import InputField from 'src/components/common/inputs/input-field';
import { validateEmail } from 'src/helpers';

import { forgotPassword } from 'src/actions/auth';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import CustomButton from 'src/components/common/button';
import { DEFAULT_TOAST_SETTINGS } from 'src/constants/theme';

const ForgotPassword = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting: isFormUpdating },
  } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const toast = useToast();

  const onSubmit = (values) => {
    if (isSubmitting || isFormUpdating) {
      return;
    }
    setIsSubmitting(true);

    const { email = '' } = values ?? {};
    dispatch(forgotPassword(email))
      .unwrap()
      .then((res) => {
        setIsSubmitting(false);
        toast({
          ...DEFAULT_TOAST_SETTINGS,
          title: res?.data?.message,
          status: 'success',
        });
      })
      .catch((err) => {
        setIsSubmitting(false);
        toast({
          ...DEFAULT_TOAST_SETTINGS,
          title: err?.message,
        });
      });
  };
  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <form id="login-form" onSubmit={handleSubmit(onSubmit)}>
        <Stack
          spacing={4}
          w="full"
          maxW="md"
          bg={useColorModeValue('white', 'gray.700')}
          rounded="xl"
          boxShadow="lg"
          p={6}
          my={12}
        >
          <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
            Forgot your password?
          </Heading>
          <Text
            fontSize={{ base: 'sm', sm: 'md' }}
            color={useColorModeValue('gray.800', 'gray.400')}
          >
            You&apos;ll get an email with a reset link
          </Text>
          <FormControl id="email" isRequired>
            <FormControl id="email" isRequired isInvalid={errors.email}>
              <InputField
                id="email"
                label="Email address"
                type="email"
                name="email"
                placeholder="your-email@example.com"
                _placeholder={{ color: 'gray.500' }}
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
          </FormControl>
          <Stack spacing={6}>
            <CustomButton
              type="submit"
              loadingText="requesting..."
              isLoading={isSubmitting}
            >
              Request Reset
            </CustomButton>
          </Stack>
        </Stack>
      </form>
    </Flex>
  );
};

export default ForgotPassword;
