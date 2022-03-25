import React, { useState } from 'react';
import { AuthenticationForm } from '../components/AuthenticationForm';
import { Container, MantineProvider, ColorSchemeProvider, ColorScheme } from '@mantine/core';
import {
  Routes,
  Route,
} from "react-router-dom";
import './App.css';

import { DarkModeBtn } from '../modules/DarkModeBtn';
import DashboardShell from '../components/DashboardShell';
function App() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark')); 

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{ colorScheme }}>
        <Routes>
          <Route index element={<AuthenticationForm />} />
          <Route path="/dashboard" element={<DashboardShell />} />
        </Routes>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
