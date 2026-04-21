import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Leccion from './pages/Leccion';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Auth modo="login" />} />
        <Route path="/registro" element={<Auth modo="registro" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/curso" element={<Dashboard />} />
        <Route path="/curso/:modId/:lecId" element={<Leccion />} />
      </Routes>
    </BrowserRouter>
  );
}
