import { PieChart } from '@mui/x-charts/PieChart';

export default function Pie() {
  return (
    <PieChart
        colors={['#fcb1a6', '#f38375', '#ffdccc']} 
      series={[
        {
          data: [
            { id: 0, value: 10, label: 'series A' },
            { id: 1, value: 15, label: 'series B' },
            { id: 2, value: 20, label: 'series C' },
          ],
        },
      ]}
      width={400}
      height={200}
    />
  );
}
