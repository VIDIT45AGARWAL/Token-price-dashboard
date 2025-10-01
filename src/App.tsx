import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Dashboard from './pages/Dashboard'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WalletProvider } from './providers/WalletProvider';


const queryClient = new QueryClient();

function App() {
  
  return (
    <>
      <WalletProvider>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Dashboard/>}/>
            </Routes>
          </BrowserRouter>
        </QueryClientProvider>    
      </WalletProvider>
    </>
  )
}

export default App
