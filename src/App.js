import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AuthContext from './contexts/AuthContext';
import RoomsContext from './contexts/RoomsContext';
import AppRoutes from './routes';

const App = () => {
  return (
    <BrowserRouter>
      <AuthContext>
        <RoomsContext>
          <AppRoutes />
        </RoomsContext>
      </AuthContext>
    </BrowserRouter>
  );
};

export default App;
