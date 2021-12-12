import { Box, Grid } from '@material-ui/core'
import React from 'react'
import Content from '../components/Content/Content'
import MainLayout from '../layouts/MainLayout'

const MainPage = () => {
   return (
      <MainLayout>
      <Box p={5}>
          <Grid container spacing={3}>
              <Content />
          </Grid>
      </Box>
  </MainLayout>
)
}

export default MainPage
