import React from 'react';
// import { GitPullRequest, AlertCircle, Messages, Database } from 'tabler-icons-react';
import {
	Dashboard,
	AlertTriangle,
	Search,
	UserSearch,
	Backpack,
	FileDescription,
	DeviceMobile,
	TriangleSquareCircle,
	ChartArea,
	Users,
	AntennaBars5,
} from 'tabler-icons-react';
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
					color:
						theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

					'&:hover': {
						backgroundColor:
							theme.colorScheme === 'dark'
								? theme.colors.dark[6]
								: theme.colors.gray[0],
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

const clientNav = [
	{
		icon: <Dashboard size={16} />,
		color: 'blue',
		label: 'Dashboard',
		link: '/',
	},
	{
		icon: <AlertTriangle size={16} />,
		color: 'blue',
		label: 'Threshold Breach Incident',
		link: '/threshold-breach',
	},
	{
		icon: <Search size={16} />,
		color: 'blue',
		label: 'Findings',
		link: '/findings',
	},
	{
		icon: <UserSearch size={16} />,
		color: 'blue',
		label: 'Real Time Monitoring',
		link: '/realtime',
	},
	{
		icon: <Backpack size={16} />,
		color: 'blue',
		label: 'Service Orders',
		link: '/service-orders',
	},
	{
		icon: <FileDescription size={16} />,
		color: 'blue',
		label: 'Reports',
		link: '/reports',
	},
	{
		icon: <DeviceMobile size={16} />,
		color: 'blue',
		label: 'Feedback',
		link: '/feedback',
	},
	{
		icon: <TriangleSquareCircle size={16} />,
		color: 'blue',
		label: 'Bait Station Monitoring',
		link: '/bait-monitoring',
	},
];

const adminNav = [
	{
		icon: <UserSearch size={16} />,
		color: 'blue',
		label: 'User Management',
		link: '/user-management',
	},
	{
		icon: <FileDescription size={16} />,
		color: 'blue',
		label: 'Device Management',
		link: '/device-management',
	},
	{
		icon: <Backpack size={16} />,
		color: 'blue',
		label: 'Service Management',
		link: '/',
	},
	{
		icon: <ChartArea size={16} />,
		color: 'blue',
		label: 'Area Management',
		link: '/area-management',
	},
	{
		icon: <Users size={16} />,
		color: 'blue',
		label: 'Client Management',
		link: '/client-management',
	},
	{
		icon: <AntennaBars5 size={16} />,
		color: 'blue',
		label: 'Trends and Reports',
		link: '/trends-reports',
	},
	{
		icon: <TriangleSquareCircle size={16} />,
		color: 'blue',
		label: 'Bait Station Monitoring',
		link: '/bait-monitoring',
	},
];

export function MainLinks({ isAdmin, setIsAdmin }: any) {
	const data = isAdmin ? adminNav : clientNav;
	const links = data.map((link) => <MainLink {...link} key={link.label} />);
	return <div>{links}</div>;
}
