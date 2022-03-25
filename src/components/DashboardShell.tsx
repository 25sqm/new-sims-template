import React, {useState} from 'react'
import { Sun, MoonStars } from 'tabler-icons-react';
import { AppShell, Navbar, Header, Group, ActionIcon, useMantineColorScheme, MediaQuery, Burger, useMantineTheme } from '@mantine/core';
import { MainLinks } from '../modules/dashboard/_mainLinks';
import { User } from '../modules/dashboard/_user';
import { Logo } from '../modules/dashboard/_logo';
import DashboardContents from './DashboardContents';

const DashboardShell = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();

  return (
    <AppShell
      padding="md"
      navbarOffsetBreakpoint="sm"
      fixed
      navbar={<Navbar width={{ sm: 300, lg: 350 }}  p="md" hiddenBreakpoint="sm" hidden={!opened}>
        <Navbar.Section grow mt="xs">
          <MainLinks />
        </Navbar.Section>
        <Navbar.Section>
          <User />
        </Navbar.Section>
      </Navbar>}
      header={<Header height={70} p="md">
          <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
          <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
          />
        </MediaQuery>
        <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
        <Group sx={{ height: '100%' }} px={20} position="apart">
            <Logo colorScheme={colorScheme} />
            <ActionIcon variant="default" onClick={() => toggleColorScheme()} size={30}>
              {colorScheme === 'dark' ? <Sun size={16} /> : <MoonStars size={16} />}
            </ActionIcon>
            </Group>
        </MediaQuery>
            
      </Header>}
      styles={(theme) => ({
        main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
      })}
    >
      <DashboardContents />
    </AppShell>
  )
}

export default DashboardShell