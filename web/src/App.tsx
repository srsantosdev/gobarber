import React from 'react';

import Routes from './routes';
import GlobalStyle from './styles/global';

import { AuthProvider } from './hooks/AuthContext';

const App: React.FC = () => {
  return (
    <>
      <AuthProvider>
        <Routes />
      </AuthProvider>
      <GlobalStyle />
    </>
  );
};

export default App;
