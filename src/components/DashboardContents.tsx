import React, { useEffect, useState } from 'react';
import {
	Grid,
	Paper,
	ThemeIcon,
	Group,
	ActionIcon,
	Text,
	Center,
	SimpleGrid,
	ScrollArea,
	Title,
	Table,
	Avatar,
	Divider,
	LoadingOverlay,
	Box,
	RingProgress,
} from '@mantine/core';
import {
	CalendarEvent,
	ChevronRight,
	Stack2,
	Search,
	AlertTriangle,
	ExclamationMark,
} from 'tabler-icons-react';
import DataTable from '../modules/dashboard/dataTable';
import { getData } from '../api/clientdb';

// Interfaces
interface DataSet {
	label: string;
	data: Array<number>;
	borderColor: string;
	backgroundColor: string;
}

interface DashboardData {
	breachCount: string;
	findingsCount: string;
	acknowledgeCount: string;
	nextVisit: string;
	dailyPestData?: {
		labels: string[];
		datasets: DataSet[];
	};
	findingsData: {
		labels: string[];
		datasets: Object[];
	};
	devicesData: IPMDeviceHealth[];
	criticalFindings: CriticalFinding[];
	pestCountMetrics: PestCountMetric[];
}

interface IPMDeviceHealth {
	device_type_name: string;
	good: number | string;
	damaged: number | string;
	for_repair: number | string;
	blocked: number | string;
	total: number;
}

interface PestCountMetric {
	pest_type_name: string;
	today: string;
	yesterday: string;
	this_week: string;
	last_week: string;
}

interface CriticalFinding {
	reference_no: number;
	service_order_id: number;
	Timestamp: string;
	findings: string;
	proposed_action: string;
	area: string;
	status: string;
	action_taken: string;
	actiontaken_by_client: string;
	person_in_charge: string;
	risk_assessment: string;
	client_location_name: string;
}

// Interfaces END

// Chart Options

const findingsOptions = {
	responsive: false,
	maintainAspectRatio: true,
	plugins: {
		legend: {
			position: 'top' as const,
		},
		title: {
			display: true,
			text: 'Findings (Month)',
		},
	},
};

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

// Chart Options END

// MODULES

const DeviceHealth = ({ devicesData }: DashboardData) => {
	const rows = devicesData.map((element: any) => (
		<tr key={element.device_type_name}>
			<td style={{ fontWeight: '500' }}>{element.device_type_name}</td>
			<td style={{ color: 'green' }}>{element.good}</td>
			<td style={element.damaged > 0 ? { color: 'red' } : { color: 'unset' }}>
				{element.damaged}
			</td>
			<td
				style={element.for_repair > 0 ? { color: 'red' } : { color: 'unset' }}
			>
				{element.for_repair}
			</td>
			<td style={element.blocked > 0 ? { color: 'red' } : { color: 'unset' }}>
				{element.blocked}
			</td>
		</tr>
	));

	let totalGood = 0;
	let totalCount = 0;
	devicesData.forEach((element) => {
		totalGood += element.total;
		if (Number(element.blocked) !== 0) {
			totalCount += Number(element.blocked);
		}

		if (Number(element.damaged) !== 0) {
			totalCount += Number(element.damaged);
		}

		if (Number(element.for_repair) !== 0) {
			totalCount += Number(element.for_repair);
		}
	});

	const percentage = 100 - (100 * totalCount) / totalGood;

	return (
		<Paper shadow="md" p="md">
			<Title order={2}>IPM Device Health</Title>
			<Text mb="md">
				Analysis:{' '}
				<span style={{ color: 'green' }}>{percentage.toFixed(0)}%</span> of the
				devices are in good working condition
			</Text>
			<ScrollArea>
				<Table>
					<thead>
						<tr>
							<th>IPM Devices</th>
							<th>Good</th>
							<th>Damaged</th>
							<th>Missing</th>
							<th>Inaccessible</th>
						</tr>
					</thead>
					<tbody>{rows}</tbody>
				</Table>
			</ScrollArea>
		</Paper>
	);
};

const PestCountMetrics = ({ pestCountMetrics }: DashboardData) => {
	const percentChange = (today: string, yesterday: string) => {
		const todayValue = Number(today);
		const yesterdayValue = Number(yesterday);
		let percent;
		if (todayValue !== 0) {
			if (yesterdayValue !== 0) {
				percent = ((todayValue - yesterdayValue) / yesterdayValue) * 100;
			} else {
				percent = todayValue * 100;
			}
		} else {
			percent = -yesterdayValue * 100;
		}
		return Math.floor(percent);
	};

	const rows = pestCountMetrics.map((element: any) => (
		<tr key={element.pest_type_name}>
			<td>{element.pest_type_name}</td>
			{Number(element.today) !== 0 ? (
				<td style={{ color: 'red' }}>
					{percentChange(element.today, element.yesterday)}%,{' '}
					{element.today - element.yesterday >= 0
						? `${element.today}`
						: `-${element.today}`}{' '}
				</td>
			) : (
				<td style={{ color: 'green' }}>
					{percentChange(element.today, element.yesterday)}%,{' '}
					{element.today - element.yesterday >= 0
						? `${element.today}`
						: `-${element.today}`}
				</td>
			)}

			{Number(element.this_week) !== 0 ? (
				<td style={{ color: 'red' }}>
					{percentChange(element.this_week, element.last_week)}%,{' '}
					{element.this_week - element.last_week >= 0
						? `${element.this_week}`
						: `-${element.this_week}`}{' '}
				</td>
			) : (
				<td style={{ color: 'green' }}>
					{percentChange(element.this_week, element.last_week)}%,{' '}
					{element.this_week - element.last_week >= 0
						? `${element.this_week}`
						: `-${element.this_week}`}
				</td>
			)}
		</tr>
	));

	return (
		<Paper shadow="md" p="md">
			<Title order={2}>Pest Count Metrics</Title>
			<ScrollArea>
				<Table>
					<thead>
						<tr>
							<th></th>
							<th>Today</th>
							<th>Week</th>
						</tr>
					</thead>
					<tbody>{rows}</tbody>
				</Table>
			</ScrollArea>
		</Paper>
	);
};

const CriticalFindings = ({ criticalFindings }: DashboardData) => {
	return (
		<Paper shadow="md" p="md">
			<Title order={2} pb="md">
				Critical Findings
			</Title>
			<ScrollArea style={{ height: 250 }} offsetScrollbars>
				{criticalFindings.length > 0 ? (
					criticalFindings.map((finding) => (
						<div
							key={finding.reference_no}
							style={{ margin: '0 0 10px 0', padding: '0 0 20px 0' }}
						>
							<Group align="top">
								<Avatar alt="Critical Finding" radius="xl">
									<ExclamationMark />
								</Avatar>
								<div style={{ flexGrow: '1' }}>
									<Text weight={500}>{finding.findings}</Text>
									<Text size="xs" color="dimmed">
										SO: {finding.service_order_id} •{' '}
										{new Date(finding.Timestamp).toLocaleDateString('en-us', {
											weekday: 'short',
											year: 'numeric',
											day: '2-digit',
											month: 'short',
										})}{' '}
										• Ref: {finding.reference_no}
									</Text>
									<Divider my="xs" label="Proposed Action" />
									<Text size="sm">{finding.proposed_action}</Text>
								</div>
							</Group>
						</div>
					))
				) : (
					<Text weight={500} align="center">
						<Box
							sx={(theme) => ({
								backgroundColor:
									theme.colorScheme === 'dark'
										? theme.colors.dark[6]
										: theme.colors.gray[0],
								textAlign: 'center',
								padding: theme.spacing.xl,
								borderRadius: theme.radius.md,
								cursor: 'pointer',
								height: '100%',

								'&:hover': {
									backgroundColor:
										theme.colorScheme === 'dark'
											? theme.colors.dark[5]
											: theme.colors.gray[1],
								},
							})}
						>
							Nothing found
						</Box>
					</Text>
				)}
			</ScrollArea>
		</Paper>
	);
};

const IPMDeviceHealth = () => {
	const dummy = [
		{
			timeframe: 'Current Status (Today)',
			inspectionPercent: 75,
			treatmentPercent: 20,
		},
		{
			timeframe: 'Weekly',
			inspectionPercent: 75,
			treatmentPercent: 20,
		},
		{
			timeframe: 'Monthly',
			inspectionPercent: 75,
			treatmentPercent: 20,
		},
	];

	const rows = dummy.map((element, id) => (
		<tr key={id}>
			<td>
				<Text weight={500} size="md">
					{element.timeframe}
				</Text>
			</td>
			<td>
				<RingProgress
					size={65}
					thickness={5}
					roundCaps
					sections={[{ value: element.inspectionPercent, color: 'blue' }]}
					label={
						<Text color="blue" weight={400} align="center" size="md">
							{element.inspectionPercent}
						</Text>
					}
				/>
			</td>
			<td>
				<RingProgress
					size={65}
					thickness={5}
					roundCaps
					sections={[{ value: element.treatmentPercent, color: 'blue' }]}
					label={
						<Text color="blue" weight={400} align="center" size="md">
							{element.treatmentPercent}
						</Text>
					}
				/>
			</td>
		</tr>
	));
	return (
		<Paper shadow="md" p="md">
			<Title order={2} pb="md">
				IPM Service Updates
			</Title>
			<Text color="dimmed">Mock data for now</Text>
			<Table>
				<thead>
					<tr>
						<th> </th>
						<th>GPC Inspection</th>
						<th>GPC Treatment</th>
					</tr>
				</thead>
				<tbody>{rows}</tbody>
			</Table>
		</Paper>
	);
};

// MODULES END

const DashboardContents = () => {
	const [data, setData] = useState<DashboardData>({
		breachCount: '',
		findingsCount: '',
		acknowledgeCount: '',
		nextVisit: '',
		dailyPestData: {
			labels: [''],
			datasets: [{ label: '', data: [], backgroundColor: '', borderColor: '' }],
		},
		findingsData: { labels: [], datasets: [] },
		devicesData: [],
		criticalFindings: [],
		pestCountMetrics: [],
	});
	const [isLoading, setIsLoading] = useState(true);
	const load = () => [
		getData()
			.then((payload) => {
				setData(payload);
				setIsLoading(false);
			})
			.catch(function (error) {
				console.log(error);
			}),
	];

	useEffect(() => {
		load();
	}, []);
	return (
		// <ScrollArea style={{height: 'auto'}}>
		<>
			<LoadingOverlay
				overlayOpacity={1}
				style={{ position: 'fixed' }}
				visible={isLoading}
			/>
			<Grid py="md">
				<Grid.Col md={6} lg={3}>
					<Paper shadow="md" p="md">
						<Group spacing="xs">
							{/* <ThemeIcon variant="light" radius="xs" size={40}>
                        <CalendarEvent size={20}/>
                          </ThemeIcon> */}
							<Group grow direction="column" spacing={0}>
								<h5 style={{ marginTop: 0, marginBottom: 0 }}>
									{data.nextVisit.toString()}
								</h5>
								<Text
									color="dimmed"
									size="sm"
									sx={{ marginTop: 0, marginBottom: 5 }}
								>
									Schedule of Next Visit
								</Text>
							</Group>
							<ActionIcon sx={{ marginLeft: 'auto' }} size="lg" radius="xs">
								<ChevronRight />
							</ActionIcon>
						</Group>
					</Paper>
				</Grid.Col>
				<Grid.Col md={6} lg={3}>
					<Paper shadow="md" p="md">
						<Group spacing="xs">
							{/* <ThemeIcon color="red" variant="light" radius="xs" size={40}>
                        <Stack2 size={20}/>
                          </ThemeIcon> */}
							<Group grow direction="column" spacing={0}>
								<h5 style={{ marginTop: 0, marginBottom: 0 }}>
									{data.acknowledgeCount.toString()}
								</h5>
								<Text
									color="dimmed"
									size="sm"
									sx={{ marginTop: 0, marginBottom: 5 }}
								>
									S.O. for Acknowledgement
								</Text>
							</Group>
							<ActionIcon sx={{ marginLeft: 'auto' }} size="lg" radius="xs">
								<ChevronRight />
							</ActionIcon>
						</Group>
					</Paper>
				</Grid.Col>
				<Grid.Col md={6} lg={3}>
					<Paper shadow="md" p="md">
						<Group spacing="xs">
							{/* <ThemeIcon color="yellow" variant="light" radius="xs" size={40}>
                        <Search size={20}/>
                          </ThemeIcon> */}
							<Group grow direction="column" spacing={0}>
								<h5 style={{ marginTop: 0, marginBottom: 0 }}>
									{data.findingsCount.toString()}
								</h5>
								<Text
									color="dimmed"
									size="sm"
									sx={{ marginTop: 0, marginBottom: 5 }}
								>
									Findings for Acknowledgement
								</Text>
							</Group>
							<ActionIcon sx={{ marginLeft: 'auto' }} size="lg" radius="xs">
								<ChevronRight />
							</ActionIcon>
						</Group>
					</Paper>
				</Grid.Col>
				<Grid.Col md={6} lg={3}>
					<Paper shadow="md" p="md">
						<Group spacing="xs">
							{/* <ThemeIcon color="gray" variant="light" radius="xs" size={40}>
                        <AlertTriangle size={20}/>
                          </ThemeIcon> */}
							<Group grow direction="column" spacing={0}>
								<h5 style={{ marginTop: 0, marginBottom: 0 }}>
									{data.breachCount}
								</h5>
								<Text
									color="dimmed"
									size="sm"
									sx={{ marginTop: 0, marginBottom: 5 }}
								>
									Threshold Breach
								</Text>
							</Group>
							<ActionIcon sx={{ marginLeft: 'auto' }} size="lg" radius="xs">
								<ChevronRight />
							</ActionIcon>
						</Group>
					</Paper>
				</Grid.Col>
			</Grid>
			<SimpleGrid
				cols={2}
				breakpoints={[
					{ minWidth: 'xs', cols: 1 },
					{ minWidth: 'sm', cols: 1 },
					{ minWidth: 'md', cols: 2 },
					{ minWidth: 1200, cols: 2 },
				]}
			>
				<div>
					<IPMDeviceHealth />
				</div>
				<div>
					<Paper shadow="md" p="md">
						<DataTable
							chartType={'bar'}
							options={pestOptions}
							data={data.dailyPestData}
						/>
					</Paper>
				</div>
				<div>
					<Paper shadow="md" p="md">
						<Center>
							<DataTable
								chartType={'pie'}
								data={data.findingsData}
								options={findingsOptions}
							/>
						</Center>
					</Paper>
				</div>
				<div>
					<DeviceHealth {...data} />
				</div>
				<div>
					<PestCountMetrics {...data} />
				</div>
				<div>
					<CriticalFindings {...data} />
				</div>
			</SimpleGrid>
		</>
		// </ScrollArea>
	);
};

export default DashboardContents;
