import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function MahasiswaCreate() {
  const [form, setForm] = useState({ nrp: '', nama: '', program_studi: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:5050/mahasiswa', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    navigate('/mahasiswa');
  };

  return (
    <div className="form-container">
      <h2>Tambah Data Mahasiswa</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label style={{ display: 'block', margin: '10px 0 5px' }}>NRP</label>
          <input 
            type="text" 
            style={{ width: '100%', padding: '8px' }} 
            placeholder='Contoh: 3125521011'
            value={form.nrp} 
            onChange={e => setForm({...form, nrp: e.target.value})} 
            required 
          />
        </div>
        <div className="form-group">
          <label style={{ display: 'block', margin: '10px 0 5px' }}>Nama Lengkap</label>
          <input 
            type="text" 
            style={{ width: '100%', padding: '8px' }} 
            placeholder='Contoh: Andharu Raffi'
            value={form.nama} 
            onChange={e => setForm({...form, nama: e.target.value})} 
            required 
          />
        </div>
        <div className="form-group">
          <label style={{ display: 'block', margin: '10px 0 5px' }}>Program Studi</label>
          <input 
            type="text" 
            style={{ width: '100%', padding: '8px' }} 
            placeholder="Contoh: D3 Teknik Informatika" 
            value={form.program_studi} 
            onChange={e => setForm({...form, program_studi: e.target.value})} 
            required 
          />
        </div>
        <div style={{ marginTop: '20px' }}>
          <button type="submit" className="btn btn-primary" style={{ marginRight: '10px' }}>Simpan Data</button>
          <button type="button" className="btn btn-outline" onClick={() => navigate('/mahasiswa')}>Batal</button>
        </div>
      </form>
    </div>
  );
}