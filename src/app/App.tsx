import React, { useState, useEffect } from 'react';
import { AuthenticationForm } from '../components/AuthenticationForm';
import { MantineProvider, ColorSchemeProvider, ColorScheme, LoadingOverlay } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { useHotkeys, useLocalStorage } from '@mantine/hooks';

import './App.css';

import DashboardShell from '../components/DashboardShell';
function App() {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
  });
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
  
  
  // temporary auth state management
  const [user, setUserState] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{ colorScheme }}>
        <NotificationsProvider>
          {user !== null ? <DashboardShell user={user} isAdmin={isAdmin} setIsAdmin={setIsAdmin} setUserState={setUserState} /> : <AuthenticationForm user={user} isAdmin={isAdmin} setIsAdmin={setIsAdmin} setUserState={setUserState} />}
        </NotificationsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
