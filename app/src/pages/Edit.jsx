import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ nip: '', nama: '', mata_kuliah: '' });

  useEffect(() => {
    const fetchDetail = async () => {
      const response = await fetch(`http://localhost:5050/dosen/${id}`);
      const data = await response.json();
      // Memasukkan data mata_kuliah dari database ke state form
      setForm({ 
        nip: data.nip, 
        nama: data.nama, 
        mata_kuliah: data.mata_kuliah || '' 
      });
    };
    fetchDetail();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:5050/dosen/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    navigate('/');
  };

  return (
    <div className="form-container">
      <h2>Edit Data Dosen</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label style={{ display: 'block', margin: '10px 0 5px' }}>NIP</label>
          <input type="text" style={{ width: '100%', padding: '8px' }} value={form.nip} onChange={e => setForm({...form, nip: e.target.value})} required />
        </div>
        
        <div className="form-group">
          <label style={{ display: 'block', margin: '10px 0 5px' }}>Nama Lengkap</label>
          <input type="text" style={{ width: '100%', padding: '8px' }} value={form.nama} onChange={e => setForm({...form, nama: e.target.value})} required />
        </div>

        {/* Input untuk Mengubah Mata Kuliah */}
        <div className="form-group">
          <label style={{ display: 'block', margin: '10px 0 5px' }}>Mata Kuliah</label>
          <input type="text" style={{ width: '100%', padding: '8px' }} value={form.mata_kuliah} onChange={e => setForm({...form, mata_kuliah: e.target.value})} required />
        </div>

        <div style={{ marginTop: '20px' }}>
          <button type="submit" className="btn btn-primary" style={{ marginRight: '10px' }}>Simpan Perubahan</button>
          <button type="button" className="btn btn-outline" onClick={() => navigate('/')}>Batal</button>
        </div>
      </form>
    </div>
  );
}