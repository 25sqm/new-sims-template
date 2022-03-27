import React, { useState } from 'react';
import { AuthenticationForm } from '../components/AuthenticationForm';
import { Container, MantineProvider, ColorSchemeProvider, ColorScheme } from '@mantine/core';

import './App.css';

import { DarkModeBtn } from '../modules/DarkModeBtn';
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
        {/* <Routes>
          <Route index element={<AuthenticationForm user={user} setUserState={setUserState} />} />
          <Route path="/dashboard" element={<DashboardShell />} />
        </Routes> */}

        {user === 'auth' ? <DashboardShell /> : <AuthenticationForm user={user} setUserState={setUserState} />}
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
