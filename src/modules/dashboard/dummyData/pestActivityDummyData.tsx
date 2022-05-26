import faker from '@faker-js/faker';

export const pestActivityOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Pest Activity (By Month)',
      },
    },
  };
  
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  
  export const pestActivityData = {
    labels,
    datasets: [
      {
        label: 'AR',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 10 })),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'HF',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 10 })),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
        {
            label: 'FF',
            data: labels.map(() => faker.datatype.number({ min: 0, max: 10 })),
            backgroundColor: 'rgba(120, 200, 235, 0.5)',
        },
        {
            label: 'NR',
            data: labels.map(() => faker.datatype.number({ min: 0, max: 10 })),
            backgroundColor: 'rgba(0, 150, 235, 0.5)',
        },
    ],
  };