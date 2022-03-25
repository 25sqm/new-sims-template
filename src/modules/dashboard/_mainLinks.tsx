import React from 'react';
// import { GitPullRequest, AlertCircle, Messages, Database } from 'tabler-icons-react';
import { Dashboard, AlertTriangle, Search, UserSearch, Backpack, FileDescription, DeviceMobile, TriangleSquareCircle} from 'tabler-icons-react';
import { ThemeIcon, UnstyledButton, Group, Text } from '@mantine/core';
import { Link } from 'react-router-dom';

interface MainLinkProps {
    icon: React.ReactNode;
    color: string;
    label: string;
    link: string;
}

function MainLink({ icon, color, label, link }: MainLinkProps) {
  return (
    <Link to={link} style={{ textDecoration: 'none' }}>
      <UnstyledButton
      sx={(theme) => ({
        display: 'block',
        width: '100%',
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

        '&:hover': {
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        },
      })}
    >
      <Group>
        <ThemeIcon color={color} variant="light">
          {icon}
        </ThemeIcon>

        <Text size="sm">{label}</Text>
      </Group>
    </UnstyledButton>
      </Link>
      
    );
}

const data = [
    { icon: <Dashboard size={16} />, color: 'blue', label: 'Dashboard', link: '/dashboard' },
    { icon: <AlertTriangle size={16} />, color: 'blue', label: 'Threshold Breach Incident', link: "/" },
    { icon: <Search size={16} />, color: 'blue', label: 'Findings', link: "/" },
    { icon: <UserSearch size={16} />, color: 'blue', label: 'Real Time Monitoring', link: "/" },
    { icon: <Backpack size={16} />, color: 'blue', label: 'Service Orders', link: "/" },
    { icon: <FileDescription size={16} />, color: 'blue', label: 'Reports', link: "/" },
    { icon: <DeviceMobile size={16} />, color: 'blue', label: 'Feedback', link: "/" },
    { icon: <TriangleSquareCircle size={16} />, color: 'blue', label: 'Bait Station Monitoring', link: "/" },
];
  
export function MainLinks() {
    const links = data.map((link) => <MainLink {...link} key={link.label} />);
    return <div>{links}</div>;
}