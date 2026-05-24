import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MahasiswaCard from '../components/MahasiswaCard';

export default function MahasiswaHome() {
  const [mhsList, setMhsList] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5050/mahasiswa')
      .then(res => res.json())
      .then(data => setMhsList(data))
      .catch(err => console.error(err));
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Yakin ingin menghapus data mahasiswa ini?')) {
      await fetch(`http://localhost:5050/mahasiswa/${id}`, { method: 'DELETE' });
      setMhsList(mhsList.filter(mhs => mhs._id !== id));
    }
  };

  return (
    <div>
      <div style={{ display: 'table', width: '100%', marginBottom: '20px' }}>
        <div style={{ display: 'table-cell' }}><h2>Daftar Mahasiswa</h2></div>
        <div style={{ display: 'table-cell', textAlign: 'right' }}>
          <Link to="/mahasiswa/create" className="btn btn-primary">+ Tambah Mahasiswa</Link>
        </div>
      </div>
      
      {mhsList.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', color: '#64748b' }}>Belum ada data mahasiswa.</div>
      ) : (
        mhsList.map(mhs => <MahasiswaCard key={mhs._id} data={mhs} onDelete={handleDelete} />)
      )}
    </div>
  );
}