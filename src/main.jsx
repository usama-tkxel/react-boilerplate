import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { PersistGate } from 'redux-persist/integration/react';
import { ChakraProvider } from '@chakra-ui/react';
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import ErrorBoundary from 'src/services/error-boundry';

import App from './App';

import { persistor, store } from './store/store';

import { CUSTOM_THEME } from './constants/theme';

import './index.css';
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  // <React.StrictMode>
   <ErrorBoundary>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Suspense fallback={() => 'loading...'}>
            <ChakraProvider theme={CUSTOM_THEME}>
              <App />
            </ChakraProvider>
          </Suspense>
          <ToastContainer hideProgressBar theme='colored' autoClose={false} />
        </BrowserRouter>
        {/* <ReactQueryDevtools/> */}
      </QueryClientProvider>
    </PersistGate>
  </Provider>,
   </ErrorBoundary>,
  // </React.StrictMode>
);
