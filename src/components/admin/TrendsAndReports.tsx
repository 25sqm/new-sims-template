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
