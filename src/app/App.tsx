import React, { useState } from 'react';
import { AuthenticationForm } from '../components/AuthenticationForm';
import {  MantineProvider, ColorSchemeProvider, ColorScheme } from '@mantine/core';

import './App.css';

import DashboardShell from '../components/DashboardShell';
function App() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
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
