import React, {useState} from 'react'
import { Sun, MoonStars } from 'tabler-icons-react';
import { Badge, AppShell, Navbar, Header, Group, ActionIcon, useMantineColorScheme, MediaQuery, Burger, useMantineTheme } from '@mantine/core';
import { MainLinks } from '../modules/dashboard/_mainLinks';
import { User } from '../modules/dashboard/_user';
import { Logo } from '../modules/dashboard/_logo';
import DashboardContents from './DashboardContents';
import {
  Routes,
  Route,
} from "react-router-dom";
import ThresholdBreaches from './ThresholdBreaches';
import Findings from './Findings';
import RealtimeMonitoring from './RealtimeMonitoring';
import ServiceOrders from './ServiceOrders';
import { Feedback } from './Feedback';
import { ChangePasswordForm } from './ChangePasswordForm';
import Reports from './Reports';
import BaitStationMonitoring from './BaitStationMonitoring';
import ServiceManagement from './admin/ServiceManagement'
import DeviceManagement from './admin/DeviceManagement'
import UserManagement from './admin/UserManagement'

interface AuthFormProps {
  user: any,
  setUserState: any,
  isAdmin: any, 
  setIsAdmin: any,
}

const DashboardShell = ({user, setUserState, isAdmin, setIsAdmin}: AuthFormProps) => {
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
          <MainLinks isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
        </Navbar.Section>
        <Navbar.Section>
          <User isAdmin={isAdmin} setIsAdmin={setIsAdmin} user={user} setUserState={setUserState} />
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
      <Badge>Sterix Incorporated - Unit 701</Badge>
      <Routes>
        {isAdmin ? (
          <>
            <Route index element={<ServiceManagement />} />
            <Route path='/user-management' element={<UserManagement />} />
            <Route path='/device-management' element={<DeviceManagement />} />
          </>
        ) : (
            <>
          <Route index element={<DashboardContents />} />
          <Route path='/threshold-breach' element={<ThresholdBreaches />} />
          <Route path='/findings' element={<Findings />} />
          <Route path='/realtime' element={<RealtimeMonitoring />} />
          <Route path='/service-orders' element={<ServiceOrders />} />
          <Route path='/reports' element={<Reports />} />
          <Route path='/feedback' element={<Feedback />} />
          <Route path='/bait-monitoring' element={<BaitStationMonitoring />} />
          <Route path='/change-password' element={<ChangePasswordForm />} />
            </>
        )}
      </Routes>
      
    </AppShell>
  )
}

export default DashboardShell