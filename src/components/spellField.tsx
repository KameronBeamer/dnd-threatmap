'use client';

import { useState } from 'react';

export default function spellSearch() {
  const [spellId, setSpellId] = useState('');
  const [spell, setSpell] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchSpell = async () => {
    if (!spellId.trim()) return;

    setLoading(true);
    setError(null);
    setSpell(null);

    try {
      const res = await fetch(`/api/spells/${spellId}`);
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Failed to fetch spell');

      setSpell(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto', textAlign: 'center' }}>
      <h2>Search Spell</h2>
      <input
        type="text"
        value={spellId}
        onChange={(e) => setSpellId(e.target.value)}
        placeholder="Enter Spell ID (e.g., fireball)"
        style={{ padding: '0.5rem', width: '80%' }}
      />
      <br />
      <button
        onClick={fetchSpell}
        style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}
      >
        Fetch Spell
      </button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {spell && (
        <div style={{ marginTop: '1rem', textAlign: 'left' }}>
          <h3>{spell.name}</h3>
          <p>Range: {spell.range}</p>
          {spell.aoe && (
            <p>
              Area of Effect: {spell.aoe.type} ({spell.aoe.size} feet)
            </p>
          )}
          {/* {spell.shape && (
            <p>
              Shape: {spell.aoe.type} ({spell.aoe.size} feet)
            </p>
          )} */}
          {/* <p>aoe: {spell.aoe}</p> */}
          {/* <p>shape: {spell.shape}</p> */}
        </div>
      )}
    </div>
  );
}
