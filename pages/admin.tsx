import React, { useState } from 'react';
import { QRCode } from 'qrcode.react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function AdminPage() {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [qrVisible, setQrVisible] = useState(false);

  const generateLink = () => {
    if (!name || !surname) return '';
    return `${window.location.origin}/?name=${encodeURIComponent(name)}&surname=${encodeURIComponent(surname)}`;
  };

  return (
    <div className="container text-center mt-5">
      <h1>QR Code Generator</h1>
      <input
        className="form-control my-2"
        type="text"
        placeholder="First Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="form-control my-2"
        type="text"
        placeholder="Last Name"
        value={surname}
        onChange={(e) => setSurname(e.target.value)}
      />

      <button className="btn btn-primary mt-3" onClick={() => setQrVisible(true)}>
        Generate QR Code
      </button>

      {qrVisible && (
        <div className="mt-4">
          <QRCode value={generateLink()} size={256} />
          <p className="mt-3"><a href={generateLink()} target="_blank" rel="noreferrer">{generateLink()}</a></p>
        </div>
      )}
    </div>
  );
}
