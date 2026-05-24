import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Create() {
  // Tambahkan mata_kuliah di dalam objek state
  const [form, setForm] = useState({ nip: '', nama: '', mata_kuliah: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:5050/dosen', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    navigate('/');
  };

  return (
    <div className="form-container">
      <h2>Tambah Data Dosen</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label style={{ display: 'block', margin: '10px 0 5px' }}>NIP</label>
          <input type="text" style={{ width: '100%', padding: '8px' }} placeholder='Contoh: 198508152010121001' value={form.nip} onChange={e => setForm({...form, nip: e.target.value})} required />
        </div>
        
        <div className="form-group">
          <label style={{ display: 'block', margin: '10px 0 5px' }}>Nama Lengkap</label>
          <input type="text" style={{ width: '100%', padding: '8px' }} placeholder='Contoh: Andharu Raffi S.Kom, M.Kom' value={form.nama} onChange={e => setForm({...form, nama: e.target.value})} required />
        </div>

        {/* Input Baru untuk Mata Kuliah */}
        <div className="form-group">
          <label style={{ display: 'block', margin: '10px 0 5px' }}>Mata Kuliah</label>
          <input type="text" style={{ width: '100%', padding: '8px' }} placeholder="Contoh: Workshop Pemrograman Web" value={form.mata_kuliah} onChange={e => setForm({...form, mata_kuliah: e.target.value})} required />
        </div>

        <div style={{ marginTop: '20px' }}>
          <button type="submit" className="btn btn-primary" style={{ marginRight: '10px' }}>Simpan Data</button>
          <button type="button" className="btn btn-outline" onClick={() => navigate('/')}>Batal</button>
        </div>
      </form>
    </div>
  );
}