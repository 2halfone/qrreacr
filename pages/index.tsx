import React, { useState } from 'react';
import { useRouter } from 'next/router';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Desktop() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [message, setMessage] = useState('');

  const handlePresence = async () => {
    const res = await fetch('/api/submitPresence', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, surname })
    });
    const data = await res.json();
    setMessage(data.message);
  };

  const handleAbsence = () => {
    router.push(`/absent?name=${encodeURIComponent(name)}&surname=${encodeURIComponent(surname)}`);
  };

  return (
    <div className="container text-center mt-5">
      <h1>Confirm Your Presence</h1>
      <input
        className="form-control my-3"
        type="text"
        placeholder="First Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="form-control my-3"
        type="text"
        placeholder="Last Name"
        value={surname}
        onChange={(e) => setSurname(e.target.value)}
      />
      <div className="d-grid gap-2 col-6 mx-auto">
        <button className="btn btn-success btn-lg" onClick={handlePresence}>Present</button>
        <button className="btn btn-danger btn-lg" onClick={handleAbsence}>Absent</button>
      </div>
      {message && <div className="alert alert-info mt-3">{message}</div>}
    </div>
  );
}
