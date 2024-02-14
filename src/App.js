import logo from './logo.svg';
import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Orders from './pages/Orders';
import Users from './pages/Users';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' exact element={<p>login</p>} />
        <Route path='/register' exact element={<p>register</p>} />
        <Route path='/users' exact element={<Users />} />
        <Route path='/' exact element={<Orders />} />
      </Routes>
    </Router>
  );
}

export default App;
