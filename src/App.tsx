import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import uaeTheme from './theme';
import { Layout } from './components';
import {
  Dashboard,
  TransactionValidator,
  IBANValidator,
  CodeExplorer,
  CodeReference,
  Documentation,
  ExceptionInvestigation,
  TaxonomyHarmonization,
  UAECorridors,
  CorridorTranslator,
} from './pages';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={uaeTheme}>
        <CssBaseline />
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/validate" element={<TransactionValidator />} />
              <Route path="/exception" element={<ExceptionInvestigation />} />
              <Route path="/iban" element={<IBANValidator />} />
              <Route path="/codes" element={<CodeExplorer />} />
              <Route path="/reference" element={<CodeReference />} />
              <Route path="/taxonomy" element={<TaxonomyHarmonization />} />
              <Route path="/corridors" element={<UAECorridors />} />
              <Route path="/translator" element={<CorridorTranslator />} />
              <Route path="/docs" element={<Documentation />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
