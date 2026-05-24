import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function MahasiswaEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ nrp: '', nama: '', program_studi: '' });

  useEffect(() => {
    fetch(`http://localhost:5050/mahasiswa/${id}`)
      .then(res => res.json())
      .then(data => setForm({ nrp: data.nrp, nama: data.nama, program_studi: data.program_studi || '' }));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:5050/mahasiswa/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    navigate('/mahasiswa');
  };

  return (
    <div className="form-container">
      <h2>Edit Data Mahasiswa</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label style={{ display: 'block', margin: '10px 0 5px' }}>NRP</label>
          <input type="text" style={{ width: '100%', padding: '8px' }} value={form.nrp} onChange={e => setForm({...form, nrp: e.target.value})} required />
        </div>
        <div className="form-group">
          <label style={{ display: 'block', margin: '10px 0 5px' }}>Nama Lengkap</label>
          <input type="text" style={{ width: '100%', padding: '8px' }} value={form.nama} onChange={e => setForm({...form, nama: e.target.value})} required />
        </div>
        <div className="form-group">
          <label style={{ display: 'block', margin: '10px 0 5px' }}>Program Studi</label>
          <input type="text" style={{ width: '100%', padding: '8px' }} value={form.program_studi} onChange={e => setForm({...form, program_studi: e.target.value})} required />
        </div>
        <div style={{ marginTop: '20px' }}>
          <button type="submit" className="btn btn-primary" style={{ marginRight: '10px' }}>Simpan Perubahan</button>
          <button type="button" className="btn btn-outline" onClick={() => navigate('/mahasiswa')}>Batal</button>
        </div>
      </form>
    </div>
  );
}