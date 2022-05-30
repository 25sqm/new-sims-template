import React from 'react';
import { useForm } from '@mantine/hooks';
import { encodeToken } from '../api/utils'
import {
  createStyles,
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  Button,
  Container,
  Center,
  useMantineColorScheme,
  Switch
} from '@mantine/core';
import { Check, ExclamationMark } from 'tabler-icons-react';
import { Logo } from '../modules/dashboard/_logo';
import { logIn } from '../api/user'
import { showNotification, updateNotification } from '@mantine/notifications';

// temporary user state management 
interface AuthFormProps {
  user: any,
  setUserState: any,
  isAdmin: any,
  setIsAdmin: any,
}

const useStyles = createStyles((theme) => ({
  container: {
    backgroundColor: `${theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white}`,
    width: '100vw',
    height: '100vh'
  },
  containerCard: {
    width: '32vw',
  }
}));

export function AuthenticationForm({ user, setUserState, isAdmin, setIsAdmin }: AuthFormProps) {
  
  const { colorScheme } = useMantineColorScheme();
  const { classes } = useStyles();
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

// Client function for handling auth success and error
  const handleAuth = async () => {
    showNotification({
            id: 'load-data',
            loading: true,
            title: 'Logging you in...',
            message: 'Have a cup of coffee while waiting! ☕️',
            autoClose: false,
            disallowClose: true,
          })
    const response = await logIn(form.values.name, form.values.password);

    if (response === null) { 
      setTimeout(() => {
            updateNotification({
              id: 'load-data',
              color: 'red',
              title: 'Could not log you in.',
              message: `Please check your user credentials`,
              icon: <ExclamationMark />,
              autoClose: 2000,
            });
          }, 600);
    } else {
      const user = response.data;

      // temporary admin switch
      sessionStorage.setItem('token', encodeToken(user.data.token))
      sessionStorage.setItem('user', user.data.name)
      sessionStorage.setItem('isAdmin', JSON.stringify(isAdmin));
      // console.log(user.data)
      setTimeout(() => {
              updateNotification({
                id: 'load-data',
                color: 'teal',
                title: 'Logged you in successfully.',
                message: `Welcome, ${user.data.name}`,
                icon: <Check />,
                autoClose: 2000,
              });
            }, 600);
      setUserState(user.data);
    }
    
  }

  return (
    <Center className={classes.container}>
    <Container size="xs" px="xs" className={classes.containerCard}>
      <Paper radius="md" p="xl" withBorder>
        <Center py="sm">
          <Logo colorScheme={colorScheme} />
        </Center>
        <Center>
          <Text size="lg" weight={500}>
              Welcome to SIMS!
          </Text>
        </Center>
          <form onSubmit={form.onSubmit(() => { })}>
              <Group direction="column" grow>

                <TextInput
                  required
                  label="Username"
                  placeholder="hello"
                  value={form.values.name}
                  onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
                  error={form.errors.name && 'Invalid username'}
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
              <Switch
                checked={isAdmin}
                onChange={(event) => setIsAdmin(event.currentTarget.checked)}
                label="Admin"
              />
              </Group>
          </form>
          
          </Paper>
    </Container>
    </Center>
  );
}