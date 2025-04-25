// src/FormCriarJogadores/TxtBoxCriarJogadores.tsx
import React from 'react';

interface TxtBoxCriarJogadoresProps {
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error: string | null;
}


function TxtBoxCriarJogadores({ label, value, onChange, error }: TxtBoxCriarJogadoresProps) {
    return (
      <div className="mb-3">
        <label className="form-label">{label}</label>
        <input
          type="text"
          className={`form-control ${error ? 'is-invalid' : ''}`}
          value={value}
          onChange={onChange}
        />
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    );
  }

export default TxtBoxCriarJogadores;
