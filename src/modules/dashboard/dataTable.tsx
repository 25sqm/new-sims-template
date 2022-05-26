import React from 'react'
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

interface dataTableProps  {
    options: Object,
    data: any,
    chartType: String,
}

const DataTable = ({ options, data, chartType }: dataTableProps) => {
    if (chartType === 'line') {
        return <><Line options={options} data={data} /></>
    } else if (chartType === 'pie') {
        return <>
        <Pie width={500} height={360} data={data} options={options} />
        </>
    } else {
        return <>
            <Bar options={options} data={data} />
        </>
    }
}




export default DataTable