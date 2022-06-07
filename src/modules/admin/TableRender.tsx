import React, { useState, useEffect } from 'react';
import {
	createStyles,
	Table,
	ScrollArea,
	Group,
	Text,
	Pagination,
	Skeleton,
	NativeSelect,
} from '@mantine/core';

const useStyles = createStyles((theme) => ({
	th: {
		padding: '0 !important',
	},

	td: {
		overflow: 'hidden',
		textOverflow: 'ellipsis',
		whiteSpace: 'nowrap',
	},

	control: {
		width: '100%',
		padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,

		'&:hover': {
			backgroundColor:
				theme.colorScheme === 'dark'
					? theme.colors.dark[6]
					: theme.colors.gray[0],
		},
	},

	icon: {
		width: 21,
		height: 21,
		borderRadius: 21,
	},
}));

interface Props {
	data: Array<Object>;
	idColumn: string;
	ignoreColumn?: string;
	columnHeadings?: Array<string>;
}

const TableRender = ({
	data,
	idColumn,
	ignoreColumn,
	columnHeadings,
}: Props) => {
	const { classes } = useStyles();
	const [loading, setLoading] = useState<boolean>(true);
	const [activePage, setPage] = useState<number>(1);
	const [currentLimit, setCurrentLimit] = useState<number>(10);
	const [dataRendered, setDataRendered] = useState(data.slice(0, 9));

	const columnStrings: string[] = columnHeadings
		? columnHeadings
		: Object.keys(data[0]);
	const columns = columnStrings.map((heading) => <th>{heading}</th>);

	const rows = dataRendered.map((row: any) => {
		const unique = row[idColumn];
		return (
			<tr key={unique}>
				{Object.keys(row).map((rowdata) => {
					return <td>{row[rowdata].length >= 100 ? '' : row[rowdata]}</td>;
				})}
			</tr>
		);
	});

	useEffect(() => {
		console.log(data);
		console.log(idColumn);
		setLoading(false);
	}, []);

	const reloadData = (page: number) => {
		setLoading(true);
		const lowerBound = page * currentLimit - currentLimit;
		const upperBound = page * currentLimit - 1;
		setDataRendered(data.slice(lowerBound, upperBound));
		setLoading(false);
	};

	return (
		<>
			<Skeleton visible={loading}>
				<ScrollArea sx={{ height: 'auto' }}>
					<Table
						fontSize={12}
						horizontalSpacing="md"
						verticalSpacing="xs"
						striped
						highlightOnHover
						sx={{ tableLayout: 'auto', minWidth: 700 }}
					>
						<thead>
							<tr>{columns}</tr>
						</thead>
						<tbody>
							{rows.length > 0 ? (
								rows
							) : (
								<tr>
									<td colSpan={9}>
										<Text weight={500} align="center">
											Nothing found
										</Text>
									</td>
								</tr>
							)}
						</tbody>
					</Table>
				</ScrollArea>
			</Skeleton>
			<Group>
				<Text>
					<Group>
						Showing 1 to {currentLimit} of {data.length} rows{' '}
						<NativeSelect
							data={['10', '25', '50']}
							placeholder={'10'}
							onChange={(event) => {
								setPage(1);
								setCurrentLimit(Number(event.currentTarget.value));
								reloadData(1);
							}}
						/>
						rows per page
					</Group>
				</Text>
				<Pagination
					my="sm"
					page={activePage}
					onChange={(page) => {
						reloadData(page);
						setPage(page);
					}}
					total={data.length / 10}
				/>
			</Group>
		</>
	);
};

export default TableRender;
