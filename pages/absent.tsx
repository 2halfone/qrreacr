import React, { useState } from 'react';
import { useRouter } from 'next/router';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function AbsentPage() {
  const router = useRouter();
  const { name, surname } = router.query;

  const [reason, setReason] = useState('Vacation');
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    const res = await fetch('/api/submitAbsence', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, surname, reason })
    });
    const data = await res.json();
    setMessage(data.message);
  };

  return (
    <div className="container text-center mt-5">
      <h1>Register Absence</h1>
      <p><strong>Name:</strong> {name}</p>
      <p><strong>Surname:</strong> {surname}</p>

      <div className="form-group">
        <label htmlFor="reasonSelect">Reason for absence</label>
        <select
          className="form-control"
          id="reasonSelect"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        >
          <option value="Vacation">Vacation</option>
          <option value="Sickness">Sickness</option>
          <option value="Permission">Permission</option>
          <option value="Medical Visit">Medical Visit</option>
          <option value="Family Emergency">Family Emergency</option>
          <option value="Hospital">Hospital</option>
        </select>
      </div>

      <button className="btn btn-danger btn-lg mt-4" onClick={handleSubmit}>
        Confirm Absence
      </button>

      {message && <div className="alert alert-info mt-3">{message}</div>}
    </div>
  );
}
