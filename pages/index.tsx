import React from 'react';
import { useRouter } from 'next/router';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function HomePage() {
  const router = useRouter();

  const handleQRLogin = () => {
    // In un sistema reale: attiva lettura QR Code o scanner
    router.push('/dashboard');
  };

  return (
    <div className="container text-center py-5">
      <h1 className="mb-4">Welcome to the Digital Presence System</h1>
      <p className="mb-4">Please log in by scanning your QR code.</p>
      <button className="btn btn-primary btn-lg" onClick={handleQRLogin}>
        Scan QR Code
      </button>
    </div>
  );
}
