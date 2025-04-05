"use client";

import React, { useState, useEffect } from 'react';
// @ts-ignore
import QRCode from 'qrcode.react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function AdminPage() {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [qrValue, setQrValue] = useState('');
  const [origin, setOrigin] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setOrigin(window.location.origin);
    }
  }, []);

  const generateQR = () => {
    if (!name || !surname || !origin) return;
    const url = `${origin}/?name=${encodeURIComponent(name)}&surname=${encodeURIComponent(surname)}`;
    setQrValue(url);
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4">QR Code Generator</h2>

      <input
        type="text"
        className="form-control mb-2"
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        className="form-control mb-2"
        placeholder="Enter surname"
        value={surname}
        onChange={(e) => setSurname(e.target.value)}
      />

      <button className="btn btn-primary" onClick={generateQR}>
        Generate QR Code
      </button>

      {qrValue && (
        <div className="text-center mt-4">
          <QRCode value={qrValue} size={256} />
          <p className="mt-3">
            <a href={qrValue} target="_blank" rel="noreferrer">{qrValue}</a>
          </p>
        </div>
      )}
    </div>
  );
}
