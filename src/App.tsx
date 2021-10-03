import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from 'theme';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import ATM from 'components/container/ATM';

function App() {
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box p={3}>
          <ATM />
        </Box>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
