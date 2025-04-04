// src/pages/Dashboard.tsx
import { Box, Paper, Typography, Button } from '@mui/material';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Dummy data for Line Chart (Unique Visitors)
const lineChartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [
    {
      label: 'Page Views',
      data: [100, 120, 140, 180, 130, 160, 170, 150, 180, 200, 190, 175],
      borderColor: '#2979ff',
      backgroundColor: 'rgba(41, 121, 255, 0.2)',
      fill: true,
    },
    {
      label: 'Sessions',
      data: [80, 100, 120, 160, 110, 140, 150, 130, 160, 180, 170, 155],
      borderColor: '#0D47A1',
      backgroundColor: 'rgba(13, 71, 161, 0.2)',
      fill: true,
    },
  ],
};

// Dummy data for Bar Chart (Income Overview)
const barChartData = {
  labels: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
  datasets: [
    {
      label: 'Revenue',
      data: [5000, 7000, 6000, 4000, 6500, 7200, 6800],
      backgroundColor: '#26A69A',
    },
  ],
};

const Dashboard = () => {
  return (
    <Box
      sx={{
        p: 3,
        overflowX: 'hidden',     // 👈 Hide horizontal scroll
        width: '100%',           // 👈 Take full screen width
        boxSizing: 'border-box', // 👈 Prevent layout shift
      }}
    >
      <Typography variant="h5" fontWeight="bold">
        Dashboard
      </Typography>

      {/* Stats Cards */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 3, my: 4 }}>
        {[
          { title: 'Total Page Views', value: '4,42,236', percent: '+59.3%', color: '#2979ff' },
          { title: 'Total Users', value: '78,250', percent: '+70.5%', color: '#0D47A1' },
          { title: 'Total Orders', value: '18,800', percent: '-27.4%', color: '#FF8A65' },
          { title: 'Total Sales', value: '35,078', percent: '-27.4%', color: '#FF8A65' },
        ].map((item, index) => (
          <Paper key={index} sx={{ p: 3, textAlign: 'center', borderBottom: `4px solid ${item.color}` }}>
            <Typography variant="h6">{item.title}</Typography>
            <Typography variant="h4" fontWeight="bold">
              {item.value}
            </Typography>
            <Typography variant="body2" color={item.percent.startsWith('+') ? 'green' : 'red'}>
              {item.percent}
            </Typography>
          </Paper>
        ))}
      </Box>

      {/* Graphs */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' }, gap: 3 }}>
        {/* Line Chart */}
        <Paper sx={{ p: 3 , overflowX: 'auto'}}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6">Unique Visitor</Typography>
            <Box>
              <Button variant="outlined" size="small" sx={{ mr: 1 }}>
                Month
              </Button>
              <Button variant="text" size="small">
                Week
              </Button>
            </Box>
          </Box>
          <Line data={lineChartData} />
        </Paper>

        {/* Bar Chart */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6">Income Overview</Typography>
          <Typography variant="h5" fontWeight="bold" sx={{ mt: 1 }}>
            $7,650
          </Typography>
          <Bar data={barChartData} />
        </Paper>
      </Box>
    </Box>
  );
};

export default Dashboard;
