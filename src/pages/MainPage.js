import { Box, Grid } from '@material-ui/core';
import React from 'react';
import Content from '../components/Content/Content';
import Filtration from '../components/Sidebar/Filtration';
import MainLayout from '../layouts/MainLayout';

const MainPage = () => {
  return (
    <MainLayout>
      <Box p={4}>
        <Grid container spacing={3}>
          <Filtration />
          <Content />
        </Grid>
      </Box>
    </MainLayout>
  );
};

export default MainPage;
