import logo from './logo.svg';
import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Users from './pages/admin/Users';
import Orders from './pages/admin/Orders';
import ProtectedRoutes from './components/Layout/ProtectedRoutes';
import UserOrders from './pages/user/UserOrders';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' exact element={<Login />} />
        <Route path='/register' exact element={<Register />} />
        <Route path='/admin' exact element={<ProtectedRoutes><Orders /></ProtectedRoutes>} />
        <Route path='/admin/users' exact element={<ProtectedRoutes><Users /></ProtectedRoutes>} />
        <Route path='/orders' exact element={<UserOrders />} />
      </Routes>
    </Router>
  );
}

export default App;
