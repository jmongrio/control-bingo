import { useState, useEffect } from "react";

interface GameTypeSelectorProps {
  onChange: (type: string) => void;
}

export default function GameTypeSelector({ onChange }: GameTypeSelectorProps) {
  const [value, setValue] = useState<string>(() => {
    return localStorage.getItem("gameType") || "Cartón lleno";
  });
  const [editing, setEditing] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem("gameType", value);
    onChange(value);
  }, [value, onChange]);

  const handleBlur = () => setEditing(false);
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setEditing(false);
    }
  };

  return (
    <div className="mb-3">
      <label className="form-label">Jugando a:</label>
      {editing ? (
        <input
          type="text"
          className="form-control"
          value={value}
          autoFocus
          onChange={(e) => setValue(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <p
          className="form-control-plaintext border rounded p-2 bg-light fw-bold fs-3"
          onClick={() => setEditing(true)}
          style={{ cursor: "pointer" }}
        >
          {value}
        </p>
      )}
    </div>
  );
}
