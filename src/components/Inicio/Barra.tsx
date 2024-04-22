import { Box } from '@mui/material'
import { BarChart } from '@mui/x-charts'
const Barra = () => {
  return (
    
    <Box>
         <BarChart
             colors={['#800e13']} 
                    xAxis={[
                        {
                            id: 'barCategories',
                            data: ['bar A', 'bar B', 'bar C'],
                            scaleType: 'band',
                        },
                    ]}
                    series={[
                        {
                            data: [2, 5, 3],
                        },
                    ]}
                    width={500}
                    height={300}
                />

    </Box>
  )
}

export default Barra