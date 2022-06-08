import React from 'react';
import Chart from 'react-apexcharts';
import { Line, Pie, Bar } from 'react-chartjs-2';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	ArcElement,
	BarElement,
} from 'chart.js';

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	ArcElement,
	BarElement,
);

interface dataTableProps {
	options: Object;
	data: any;
	chartType: String;
}

const DataTable = ({ options, data, chartType }: dataTableProps) => {
	let newSeries: { name: string; data: number[] }[] = [];
	const labels = data.labels;

	data.datasets.forEach((element: { label: string; data: number[] }) => {
		newSeries.push({ name: element.label, data: element.data });
	});

	const lineOptions = {
		xaxis: { categories: labels },
	};

	if (chartType === 'line') {
		return (
			<>
				<Line options={options} data={data} />
				{/* <Chart
					options={lineOptions}
					series={newSeries}
					type="bar"
					width="700"
				/> */}
			</>
		);
	} else if (chartType === 'pie') {
		return (
			<>
				<Pie width={500} height={360} data={data} options={options} />
			</>
		);
	} else {
		return (
			<>
				<Bar options={options} data={data} />
			</>
		);
	}
};

export default DataTable;
