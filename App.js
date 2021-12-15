import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { theme } from './src/theme';
import App from './src/App'
import Store from './src/store'

export default Main = ()=> {
  return (
    <Store>
      <PaperProvider theme={theme}>
        <App></App>
      </PaperProvider>
    </Store>
  )
}
