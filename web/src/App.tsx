import React from 'react';

import Routes from './routes';
import GlobalStyle from './styles/global';

import AppProvider from './hooks';

const App: React.FC = () => {
  return (
    <>
      <AppProvider>
        <Routes />
      </AppProvider>

      <GlobalStyle />
    </>
  );
};

export default App;
