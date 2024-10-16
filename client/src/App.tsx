import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import SignIn from './pages/Signin';

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-background font-sans antialiased">
      <Navbar />
      <main className="flex-grow container mx-auto py-6 pb-24">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;