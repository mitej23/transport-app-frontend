import logo from './logo.svg';
import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Users from './pages/admin/Users';
import Orders from './pages/admin/Orders';
import ProtectedRoutes from './components/Layout/ProtectedRoutes';
import UserOrders from './pages/user/UserOrders';
import CreateOrder from './pages/user/CreateOrder';
import NotFound from './pages/extra/NotFound';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <Router>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <Routes>
        <Route path='/login' exact element={<Login />} />
        <Route path='/register' exact element={<Register />} />
        <Route path='/admin' exact element={<ProtectedRoutes><Orders /></ProtectedRoutes>} />
        <Route path='/admin/users' exact element={<ProtectedRoutes><Users /></ProtectedRoutes>} />
        <Route path='/orders' exact element={<UserOrders />} />
        <Route path='/create-order' exact element={<CreateOrder />} />
        <Route path='/' exact element={<h1>Home Page</h1>} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
