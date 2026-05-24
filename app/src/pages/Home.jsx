import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DosenCard from '../components/DosenCard';

export default function Home() {
  const [dosenList, setDosenList] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5050/dosen');
      const data = await response.json();
      setDosenList(data);
    } catch (error) {
      console.error("Gagal mengambil data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus data dosen ini?')) {
      await fetch(`http://localhost:5050/dosen/${id}`, { method: 'DELETE' });
      // Filter state agar UI langsung update tanpa perlu refresh halaman
      setDosenList(dosenList.filter(dosen => dosen._id !== id));
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h2>Daftar Dosen</h2>
        <Link to="/create" className="btn btn-primary">+ Tambah Dosen</Link>
      </div>

      {dosenList.length === 0 ? (
        <div className="card" style={{ justifyContent: 'center', color: '#64748b' }}>
          Belum ada data dosen.
        </div>
      ) : (
        dosenList.map(dosen => (
          <DosenCard key={dosen._id} data={dosen} onDelete={handleDelete} />
        ))
      )}
    </div>
  );
}