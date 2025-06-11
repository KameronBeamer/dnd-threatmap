'use client';

import { useState } from 'react';
import { useResultContext } from '@/context/apiContext'


export default function WeaponSearch() {
  const [weaponId, setWeaponId] = useState('');
  const [weapon, setWeapon] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchWeapon = async () => {
    if (!weaponId.trim()) return;

    setLoading(true);
    setError(null);
    setWeapon(null);

    try {
      const res = await fetch(`/api/weapons/${weaponId}`);
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Failed to fetch weapon');

      setWeapon(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto', textAlign: 'center' }}>
      <h2>Search Weapon</h2>
      <input
        type="text"
        value={weaponId}
        onChange={(e) => setWeaponId(e.target.value)}
        placeholder="Enter weapon ID (e.g., shortbow)"
        style={{ padding: '0.5rem', width: '80%' }}
      />
      <br />
      <button
        onClick={fetchWeapon}
        style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}
      >
        Fetch Weapon
      </button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {weapon && (
        <div style={{ marginTop: '1rem', textAlign: 'left' }}>
          <h3>{weapon.name}</h3>
          <p>Normal Range: {weapon.rangeNormal}</p>
          <p>Long Range: {weapon.rangeLong}</p>
        </div>
      )}
    </div>
  );
}
