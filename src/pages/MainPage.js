import { Box, Grid } from '@material-ui/core';
import React from 'react';
import Content from '../components/Content/Content';
import MainLayout from '../layouts/MainLayout';

const MainPage = () => {
  return (
    <MainLayout>
      <Box p={2}>
        <Grid container spacing={5}>
          <Content />
        </Grid>
      </Box>
    </MainLayout>
  );
};

export default MainPage;
