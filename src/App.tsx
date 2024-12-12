import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { EntityList } from './components/EntityList';

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-100 p-4">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Home Assistant Configuration
          </h1>
        </header>
        <main>
          <EntityList />
        </main>
      </div>
    </QueryClientProvider>
  );
}

export default App;