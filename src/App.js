import logo from './logo.svg';
import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Orders from './pages/Orders';
import Users from './pages/Users';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' exact element={<Login />} />
        <Route path='/register' exact element={<Register />} />
        <Route path='/users' exact element={<Users />} />
        <Route path='/' exact element={<Orders />} />
      </Routes>
    </Router>
  );
}

export default App;
