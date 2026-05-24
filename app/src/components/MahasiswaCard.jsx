import { Link } from 'react-router-dom';

export default function MahasiswaCard({ data, onDelete }) {
  return (
    <div className="card" style={{ display: 'table', width: '100%', marginBottom: '15px' }}>
      <div style={{ display: 'table-cell', verticalAlign: 'middle' }}>
        <h3 style={{ margin: '0 0 5px 0' }}>{data.nama}</h3>
        <p style={{ margin: 0, color: '#64748b' }}>NRP: {data.nrp}</p>
        <p style={{ margin: '5px 0 0 0', color: '#10b981', fontWeight: '500', fontSize: '0.95rem' }}>
          Program Studi: {data.program_studi || '-'}
        </p>
      </div>
      <div style={{ display: 'table-cell', textAlign: 'right', verticalAlign: 'middle' }}>
        <Link to={`/mahasiswa/edit/${data._id}`} className="btn btn-primary" style={{ marginRight: '10px' }}>Edit</Link>
        <button onClick={() => onDelete(data._id)} className="btn btn-danger">Hapus</button>
      </div>
    </div>
  );
}