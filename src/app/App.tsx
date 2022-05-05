import React, { useState } from 'react';
import { AuthenticationForm } from '../components/AuthenticationForm';
import { MantineProvider, ColorSchemeProvider, ColorScheme } from '@mantine/core';
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
  const [user, setUserState] = useState('');

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{ colorScheme }}>
        {user === 'auth' ? <DashboardShell /> : <AuthenticationForm user={user} setUserState={setUserState} />}
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
