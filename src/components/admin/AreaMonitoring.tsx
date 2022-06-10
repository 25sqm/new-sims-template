import React, { useEffect } from 'react';

import { Title, Text, Paper, Divider, Tabs } from '@mantine/core';
import { areaMonitoring, areaInformation } from './dummyData';
import TableRender from '../../modules/admin/TableRender';

const AreaMonitoring = () => {
	return (
		<>
			<Paper shadow="md" p="sm" my="md" sx={{ height: 'auto' }}>
				<Text size="xl">Area Management</Text>
				<Divider my="sm" />
				<Tabs>
					<Tabs.Tab label="Area Monitoring">
						<TableRender
							data={areaMonitoring}
							idColumn={'ref_no'}
							ignoreColumn={'actionbtn'}
							columnHeadings={[
								'',
								'',
								'Service Order',
								'Ref No',
								'Site',
								'Area',
								'Findings',
								'Proposed Action',
								'Action Taken',
								'Person In Charge',
								'Risk Assessment',
								'Status',
								'Timestamp',
							]}
							filterableHeadings={['area', 'status']}
						/>
					</Tabs.Tab>
					<Tabs.Tab label="Area Information">
						<TableRender
							data={areaInformation}
							idColumn={'client'}
							ignoreColumn={'actionbtn'}
							columnHeadings={[
								'Client',
								'Area Code',
								'Area',
								'Level',
								'Description',
								'Length',
								'Width',
								'Height',
								'Perimeter',
								'Volume',
								'Custom Volume',
								'Map',
								'SRA',
								'TAM',
								'Action',
							]}
							filterableHeadings={['client']}
						/>
					</Tabs.Tab>
					<Tabs.Tab label="Area Threshold"></Tabs.Tab>
					<Tabs.Tab label="Pest Incidence Map"></Tabs.Tab>
				</Tabs>
			</Paper>
		</>
	);
};

export default AreaMonitoring;
