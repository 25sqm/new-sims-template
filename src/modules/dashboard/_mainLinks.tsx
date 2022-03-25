import React from 'react';
// import { GitPullRequest, AlertCircle, Messages, Database } from 'tabler-icons-react';
import { Dashboard, AlertTriangle, Search, UserSearch, Backpack, FileDescription, DeviceMobile, TriangleSquareCircle} from 'tabler-icons-react';
import { ThemeIcon, UnstyledButton, Group, Text } from '@mantine/core';

interface MainLinkProps {
    icon: React.ReactNode;
    color: string;
    label: string;
}

function MainLink({ icon, color, label }: MainLinkProps) {
    return (
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
    );
}

const data = [
    { icon: <Dashboard size={16} />, color: 'blue', label: 'Dashboard' },
    { icon: <AlertTriangle size={16} />, color: 'blue', label: 'Threshold Breach Incident' },
    { icon: <Search size={16} />, color: 'blue', label: 'Findings' },
    { icon: <UserSearch size={16} />, color: 'blue', label: 'Real Time Monitoring' },
    { icon: <Backpack size={16} />, color: 'blue', label: 'Service Orders' },
    { icon: <FileDescription size={16} />, color: 'blue', label: 'Reports' },
    { icon: <DeviceMobile size={16} />, color: 'blue', label: 'Feedback' },
    { icon: <TriangleSquareCircle size={16} />, color: 'blue', label: 'Bait Station Monitoring' },
];
  
export function MainLinks() {
    const links = data.map((link) => <MainLink {...link} key={link.label} />);
    return <div>{links}</div>;
}