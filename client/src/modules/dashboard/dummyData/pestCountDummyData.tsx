import faker from '@faker-js/faker';
export const pestOptions = {
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
  
const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];


// This is where the data will be pulled. It is randomized for now.
export const pestData = {
    labels,
    datasets: [
      {
        label: 'AR',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 10 })),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'GR',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 10 })),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'GA',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 10 })),
        borderColor: 'rgb(120, 59, 132)',
        backgroundColor: 'rgba(120, 59, 132, 0.5)',
      },
      {
        label: 'Moc',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 10 })),
        borderColor: 'rgb(0, 229, 111)',
        backgroundColor: 'rgba(0, 229, 111, 0.5)',
      },
      {
        label: 'HF',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 10 })),
        borderColor: 'rgb(60, 199, 10)',
        backgroundColor: 'rgba(60, 199, 10, 0.5)',
      },
      {
        label: 'BF',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 10 })),
        borderColor: 'rgb(205, 20, 232)',
        backgroundColor: 'rgba(205, 20, 232, 0.5)',
      },
      {
        label: 'DF',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 10 })),
        borderColor: 'rgb(35, 39, 132)',
        backgroundColor: 'rgba(35, 39, 132, 0.5)',
      },
      {
        label: 'PF',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 10 })),
        borderColor: 'rgb(215, 129, 12)',
        backgroundColor: 'rgba(215, 129, 12, 0.5)',
      },
      {
        label: 'FF',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 10 })),
        borderColor: 'rgb(54, 29, 252)',
        backgroundColor: 'rgba(54, 29, 252, 0.5)',
      },
      {
        label: 'FM',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 10 })),
        borderColor: 'rgb(90, 99, 23)',
        backgroundColor: 'rgba(90, 99, 23, 0.5)',
      },
      {
        label: 'HM',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 10 })),
        borderColor: 'rgb(50, 255, 255)',
        backgroundColor: 'rgba(50, 255, 255, 0.5)',
      },
      {
        label: 'RR',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 10 })),
        borderColor: 'rgb(120, 230, 32)',
        backgroundColor: 'rgba(120, 230, 32, 0.5)',
      },
      {
        label: 'NR',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 10 })),
        borderColor: 'rgb(0, 129, 132)',
        backgroundColor: 'rgba(0, 129, 132, 0.5)',
      },
      {
        label: 'CB',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 10 })),
        borderColor: 'rgb(255, 0, 90)',
        backgroundColor: 'rgba(255, 0, 90, 0.5)',
      },
      {
        label: 'RFB',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 10 })),
        borderColor: 'rgb(0, 0, 50)',
        backgroundColor: 'rgba(0, 0, 50, 0.5)',
      },
      {
        label: 'Liz',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 10 })),
        borderColor: 'rgb(253, 23, 255)',
        backgroundColor: 'rgba(253, 23, 255, 0.5)',
      },
    ],
};