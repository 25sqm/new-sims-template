import React, { useEffect } from 'react';
import { ChevronRight, ChevronLeft, ArrowsLeftRight, Logout } from 'tabler-icons-react';
import { Link } from 'react-router-dom';
import { UnstyledButton, Group, Avatar, Text, Box, useMantineTheme, Menu  } from '@mantine/core';
interface AuthFormProps {
  user: any,
  setUserState: any,
}

export function User({ user, setUserState }: AuthFormProps) {
  const theme = useMantineTheme();
  useEffect(() => {
    console.log(user)
  })
  
  const userBtn = (
    <Box
      sx={{
        paddingTop: theme.spacing.sm,
        borderTop: `1px solid ${
          theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
        }`,
      }}
    >
      <UnstyledButton
        sx={{
          display: 'block',
          width: '100%',
          padding: theme.spacing.xs,
          borderRadius: theme.radius.sm,
          color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

          '&:hover': {
            backgroundColor:
              theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
          },
        }}
          >     
        <Group>
          <Avatar
            src={null}
            radius="xl"
          />
          <Box sx={{ flex: 1 }}>
            <Text size="sm" weight={500}>
              {user.name}
            </Text>
            <Text color="dimmed" size="xs">
              Supervisor
            </Text>
          </Box>

          {theme.dir === 'ltr' ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </Group>
      </UnstyledButton>
    </Box>
  )

  return (
    <Menu sx={(theme) => ({
      width: '100%',
    })} control={userBtn}>
      <Menu.Label>User Control</Menu.Label>
      <Menu.Item component={Link} to="/change-password" icon={<ArrowsLeftRight size={14} />}>Change Password</Menu.Item>
      <Menu.Item onClick={() => {setUserState({})}}component="a" href="/" color="red" icon={<Logout size={14} />}>Log Out</Menu.Item>
    </Menu>
  );
}