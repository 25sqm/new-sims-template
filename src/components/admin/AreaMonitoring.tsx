import React, { useEffect } from 'react';

import { Title, Text, Paper, Divider } from '@mantine/core';
import { areaMonitoring } from './dummyData';
import TableRender from '../../modules/admin/TableRender';

const AreaMonitoring = () => {
	return (
		<>
			<Paper shadow="md" p="sm" my="md" sx={{ height: 'auto' }}>
				<Text size="xl">Area Monitoring</Text>
				<Divider my="sm" />
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
			</Paper>
		</>
	);
};

export default AreaMonitoring;
