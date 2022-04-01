import React from 'react';
import { useForm } from '@mantine/hooks';
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  Button,
  Container,
  Center
} from '@mantine/core';
import { Logo } from '../modules/dashboard/_logo';

// temporary user state management 
interface AuthFormProps {
  user: any,
  setUserState: any,
}

export function AuthenticationForm({ user, setUserState }: AuthFormProps) {
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
  const handleAuth = () => {
    // Auth Code goes here or import from ../api
    setUserState('auth');
  }

  return (
    <Container size="xs" px="xs" pt={90}>
      <Paper radius="md" p="xl" withBorder>
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