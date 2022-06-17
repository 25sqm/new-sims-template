import {
	Paper,
	Text,
	Divider,
	Tabs,
	Group,
	Select,
	createStyles,
	Button,
	MultiSelect,
} from '@mantine/core';
import { DatePicker, DateRangePicker } from '@mantine/dates';
import React, { useState } from 'react';
import DataTable from '../../modules/dashboard/dataTable';

const useStyles = createStyles((theme) => ({
	button: {
		borderRadius: 0,
		width: '100px',
		'&:not(:first-of-type)': {
			borderLeftWidth: 0,
		},

		'&:first-of-type': {
			borderTopLeftRadius: theme.radius.sm,
			borderBottomLeftRadius: theme.radius.sm,
		},

		'&:last-of-type': {
			borderTopRightRadius: theme.radius.sm,
			borderBottomRightRadius: theme.radius.sm,
		},
	},
}));

// MOCK DATA AND OPTIONS
const pestOptions = {
	responsive: true,
	plugins: {
		legend: {
			position: 'top' as const,
		},
		title: {
			display: true,
			text: 'Pest Count',
		},
	},
};

const mockPestData = {
	labels: [
		'01',
		'02',
		'03',
		'04',
		'05',
		'06',
		'07',
		'08',
		'09',
		'10',
		'11',
		'12',
		'13',
		'14',
		'15',
		'16',
		'17',
		'18',
		'19',
		'20',
		'21',
		'22',
		'23',
		'24',
		'25',
		'26',
		'27',
		'28',
		'29',
		'30',
	],
	datasets: [
		{
			label: 'AR',
			data: [
				0, 0, 0, 0, 0, 0, 2, 3, 3, 0, 0, 0, 0, 0, 0, 0, 2, 3, 3, 0, 0, 0, 0, 0,
				0, 0, 2, 3, 3, 0,
			],
			backgroundColor: '#1e74c6',
			borderColor: '#1e74c6',
		},
		{
			label: 'GR',
			data: [
				0, 0, 0, 0, 0, 0, 2, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0,
				0, 0, 1, 1, 0, 0,
			],
			backgroundColor: '#9eb1f8',
			borderColor: '#9eb1f8',
		},
		{
			label: 'GA',
			data: [
				0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
				0, 0, 0, 0, 0, 0,
			],
			backgroundColor: '#c2b64e',
			borderColor: '#c2b64e',
		},
	],
};

const TrendsAndReports = () => {
	const [dateValue, setDateValue] = useState<[Date | null, Date | null]>();
	const [singleDate, setSingleDate] = useState<Date | null>(new Date());

	const { classes } = useStyles();
	return (
		<>
			<Paper shadow="md" p="sm" my="md" sx={{ height: 'auto' }}>
				<Text size="xl">Trends and Reports </Text>
				<Divider my="sm" />
				<Tabs>
					<Tabs.Tab label="Pest Trending Per Month">
						<Group>
							<Select
								placeholder="Site"
								data={[{ value: 'all', label: 'All' }]}
							/>
							<Select
								placeholder="Area"
								data={[{ value: 'all', label: 'All' }]}
							/>
							<DateRangePicker
								placeholder="Pick dates range"
								value={dateValue}
								onChange={setDateValue}
							/>
							<Select
								placeholder="Pest Types"
								data={[
									{ value: 'all', label: 'All' },
									{ value: 'american_roach', label: 'American Roach' },
									{ value: 'asian_roach', label: 'Asian Roach' },
								]}
							/>
							<Group grow spacing={0}>
								<Button variant="default" className={classes.button}>
									Generate
								</Button>
								<Button variant="default" className={classes.button}>
									Print List
								</Button>
							</Group>
						</Group>
						<Text color="dimmed" mt={10}>
							Mock Data for now
						</Text>
						<DataTable
							chartType={'bar'}
							options={pestOptions}
							data={mockPestData}
						/>
					</Tabs.Tab>
					<Tabs.Tab label="Pest Trends and Thresholds">
						<Group>
							<Select
								placeholder="Site"
								data={[{ value: 'all', label: 'All' }]}
							/>
							<Select
								placeholder="Area"
								data={[{ value: 'all', label: 'All' }]}
							/>
							<DateRangePicker
								placeholder="Pick dates range"
								value={dateValue}
								onChange={setDateValue}
							/>
							<MultiSelect
								placeholder="Pest Types"
								data={[
									{ value: 'american_roach', label: 'American Roach' },
									{ value: 'asian_roach', label: 'Asian Roach' },
									{ value: 'asian_house_rat', label: 'Asian House Rat' },
									{ value: 'bat', label: 'Bat' },
									{ value: 'bird', label: 'Bird' },
								]}
							/>
							<Group grow spacing={0}>
								<Button variant="default" className={classes.button}>
									Generate
								</Button>
								<Button variant="default" className={classes.button}>
									Print List
								</Button>
							</Group>
						</Group>
						<Text color="dimmed" mt={10}>
							Mock Data for now
						</Text>
						<DataTable
							chartType={'bar'}
							options={pestOptions}
							data={mockPestData}
						/>
					</Tabs.Tab>
					<Tabs.Tab label="Summary of Pest Count">
						<Paper shadow="md" p="sm" my="md" sx={{ height: 'auto' }}>
							<Text size="lg">Summary Per Day</Text>
							<Divider my="sm" />
							<Group>
								<Select
									placeholder="Site"
									data={[{ value: 'all', label: 'All' }]}
								/>
								<DateRangePicker
									placeholder="Pick dates range"
									value={dateValue}
									onChange={setDateValue}
								/>
								<Group grow spacing={0}>
									<Button variant="default" className={classes.button}>
										Generate
									</Button>
								</Group>
							</Group>
						</Paper>
						<Paper shadow="md" p="sm" my="md" sx={{ height: 'auto' }}>
							<Text size="lg">Daily Detailed Report</Text>
							<Divider my="sm" />
							<Group>
								<Select
									placeholder="Site"
									data={[{ value: 'all', label: 'All' }]}
								/>
								<DatePicker
									placeholder="Pick date"
									value={singleDate}
									onChange={setSingleDate}
								/>
								<Group grow spacing={0}>
									<Button variant="default" className={classes.button}>
										Generate
									</Button>
								</Group>
							</Group>
						</Paper>
					</Tabs.Tab>
				</Tabs>
			</Paper>
		</>
	);
};

export default TrendsAndReports;
