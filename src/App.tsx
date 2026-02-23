import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import Checkout from './pages/Checkout';
import Dashboard from './pages/Dashboard';
import Tienda from './pages/Tienda';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/tienda" element={<Tienda />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
