import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Create from './pages/Create';
import Edit from './pages/Edit';
import MahasiswaHome from './pages/MahasiswaHome';
import MahasiswaCreate from './pages/MahasiswaCreate';
import MahasiswaEdit from './pages/MahasiswaEdit';
import './index.css';

// Komponen khusus untuk Switch Navigasi
function NavigationSwitch() {
  const location = useLocation();
  // Jika URL mengandung kata '/mahasiswa', berarti tab Mahasiswa aktif
  const isMahasiswa = location.pathname.includes('/mahasiswa');

  return (
    <div className="nav-switch">
      <Link 
        to="/" 
        className={`nav-link ${!isMahasiswa ? 'active' : ''}`}
      >
        Data Dosen
      </Link>
      <Link 
        to="/mahasiswa" 
        className={`nav-link ${isMahasiswa ? 'active' : ''}`}
      >
        Data Mahasiswa
      </Link>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="container">
        
        <header className="header" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h1 style={{ textAlign: 'center', color: '#1e293b' }}>Sistem Akademik</h1>
          {/* Memanggil Switch Navigasi */}
          <NavigationSwitch />
        </header>
        
        <main>
          <Routes>
            {/* Routes untuk Dosen */}
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<Create />} />
            <Route path="/edit/:id" element={<Edit />} />

            {/* Routes untuk Mahasiswa */}
            <Route path="/mahasiswa" element={<MahasiswaHome />} />
            <Route path="/mahasiswa/create" element={<MahasiswaCreate />} />
            <Route path="/mahasiswa/edit/:id" element={<MahasiswaEdit />} />
          </Routes>
        </main>
        
      </div>
    </BrowserRouter>
  );
}