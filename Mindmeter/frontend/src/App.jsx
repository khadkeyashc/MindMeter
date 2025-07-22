import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Register from './pages/Register';
import Login from './pages/Login';
import Test from './pages/Test';

// Higher-order component to protect routes
const PrivateRoute = ({ element }) => {
  const token = localStorage.getItem("accessToken");
  return token ? element : <Navigate to="/login" />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="test" element={<PrivateRoute element={<Test />} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
