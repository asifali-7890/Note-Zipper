import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Notes from './pages/Notes';
import Footer from './pages/Footer';
import Profile from './pages/Profile'; ``
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute'; // Component for protected routes
import CreateNote from './pages/CreateNote';
import EditNote from './pages/EditNote';
import { AuthProvider } from './context/AuthContext.jsx';

function App() {
  return (

    <Router>
      <AuthProvider>
        <Navbar /> {/* Display navbar on all pages */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route
            path="/"
            element={<ProtectedRoute><Notes /></ProtectedRoute>}
          />
          <Route
            path="/profile"
            element={<ProtectedRoute><Profile /></ProtectedRoute>}
          />
          <Route
            path="/notes/create"
            element={<ProtectedRoute><CreateNote /></ProtectedRoute>}
          />
          <Route
            path="/notes/edit/:id"
            element={<ProtectedRoute><EditNote /></ProtectedRoute>}
          />
        </Routes>
        <Footer /> {/* Display navbar on all pages */}
      </AuthProvider>
    </Router>
  );
}

export default App;
