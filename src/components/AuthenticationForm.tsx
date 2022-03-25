import React from 'react';
import { useForm, useToggle, upperFirst } from '@mantine/hooks';
import { useNavigate } from "react-router-dom";
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Container,
  Center
} from '@mantine/core';
import { Logo } from '../modules/dashboard/_logo';

export function AuthenticationForm(props: PaperProps<'div'>) {
  const form = useForm({
    initialValues: {
      email: '',
      name: '',
      password: '',
      terms: true,
    },

    validationRules: {
      email: (val) => /^\S+@\S+$/.test(val),
      password: (val) => val.length >= 6,
    },
  });

  const navigate = useNavigate();
  const handleAuth = () => {
    // Auth Code goes here or import from ../api

    console.log('User Authenticated 🚀');
    navigate('/dashboard');
  }

  return (
    <Container size="xs" px="xs" pt={90}>
      <Paper radius="md" p="xl" withBorder {...props}>
        <Center py="sm">
          <Logo colorScheme="light" />
        </Center>
        <Center>
          <Text size="lg" weight={500}>
              Welcome to SIMS!
          </Text>
        </Center>
            <form onSubmit={form.onSubmit(() => {})}>
              <Group direction="column" grow>

                <TextInput
                  required
                  label="Email"
                  placeholder="hello@mantine.dev"
                  value={form.values.email}
                  onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
                  error={form.errors.email && 'Invalid email'}
                />

                <PasswordInput
                  required
                  label="Password"
                  placeholder="Your password"
                  value={form.values.password}
                  onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
                  error={form.errors.password && 'Password should include at least 6 characters'}
                />
              </Group>

              <Group position="apart" mt="xl">
            <Button onClick={handleAuth} type="submit">Login</Button>
              </Group>
            </form>
          </Paper>
    </Container>
    
  );
}