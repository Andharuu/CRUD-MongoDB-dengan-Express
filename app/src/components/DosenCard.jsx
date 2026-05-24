import { Link } from 'react-router-dom';

export default function DosenCard({ data, onDelete }) {
  return (
    <div className="card" style={{ display: 'table', width: '100%', marginBottom: '15px' }}>
      <div style={{ display: 'table-cell', verticalAlign: 'middle' }}>
        <h3 style={{ margin: '0 0 5px 0' }}>{data.nama}</h3>
        <p style={{ margin: 0, color: '#64748b' }}>NIP: {data.nip}</p>
        {/* Menampilkan Mata Kuliah */}
        <p style={{ margin: '5px 0 0 0', color: '#4f46e5', fontWeight: '500', fontSize: '0.95rem' }}>
          Mata Kuliah: {data.mata_kuliah || '-'}
        </p>
      </div>
      <div style={{ display: 'table-cell', textAlign: 'right', verticalAlign: 'middle' }}>
        <Link to={`/edit/${data._id}`} className="btn btn-primary" style={{ marginRight: '10px' }}>Edit</Link>
        <button onClick={() => onDelete(data._id)} className="btn btn-danger">Hapus</button>
      </div>
    </div>
  );
}