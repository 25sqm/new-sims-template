import React, { useEffect } from 'react';

import { Title, Text, Paper, Divider } from '@mantine/core';
import { dummyData } from './dummyData';
import TableRender from '../../modules/admin/TableRender';

const ServiceManagement = () => {
	return (
		<>
			<Paper shadow="md" p="sm" my="md" sx={{ height: 'auto' }}>
				<Text size="xl">Service Order</Text>
				<Divider my="sm" />
				<TableRender
					data={dummyData}
					idColumn={'ref_no'}
					ignoreColumn={'actionbtn'}
					columnHeadings={[
						'ID',
						'Ref No',
						'Service Type',
						'Location',
						'Staff',
						'Date',
						'Time',
						'End Time',
						'Status',
						'Action',
					]}
					filterableHeadings={['location', 'service_type']}
				/>
			</Paper>
		</>
	);
};

export default ServiceManagement;
