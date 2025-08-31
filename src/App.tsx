import { useState, useEffect, useRef, type KeyboardEvent } from "react";
import NavBar from "./components/NavBar";
import type { Data } from "./types/Data";
import GameTypeSelector from "./components/GameTypeSelector";

export default function App() {
  const [numbers, setNumbers] = useState<Data[]>(() => {
    const stored = localStorage.getItem("dataList");
    return stored ? JSON.parse(stored) : [];
  });
  const [input, setInput] = useState<string>("");
  const [gameType, setGameType] = useState<string>(() => {
    return localStorage.getItem("gameType") || "cartonLleno";
  });
  const inputRef = useRef<HTMLInputElement>(null);

  // Cargar datos desde localStorage
  useEffect(() => {
    const stored = localStorage.getItem("dataList");
    if (stored) setNumbers(JSON.parse(stored));

    const storedGameType = localStorage.getItem("gameType");
    if (storedGameType) setGameType(storedGameType);
  }, []);

  // Guardar números en localStorage
  useEffect(() => {
    localStorage.setItem("dataList", JSON.stringify(numbers));
  }, [numbers]);

  // Guardar tipo de juego en localStorage
  useEffect(() => {
    localStorage.setItem("gameType", gameType);
  }, [gameType]);

  const focusInput = () => inputRef.current?.focus();

  const addNumber = () => {
    const parsed = parseInt(input);
    if (!parsed && parsed !== 0) {
      alert("Por favor ingrese un número válido.");
      setInput("");
      focusInput();
      return;
    }

    if (numbers.some((n) => n.Number === parsed)) {
      alert(`El número ${parsed} ya está registrado.`);
      setInput("");
      focusInput();
      return;
    }

    const newId = numbers.length ? Math.max(...numbers.map((n) => n.Id)) + 1 : 1;
    setNumbers([...numbers, { Id: newId, Number: parsed }]);
    setInput("");
    focusInput();
  };

  const deleteById = (id: number) => {
    setNumbers(numbers.filter((n) => n.Id !== id));
  };

  const deleteAll = () => {
    if (window.confirm("¿Seguro que quieres eliminar todos los números?")) {
      setNumbers([]);
      focusInput();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") addNumber();
  };

  return (
    <>
      <NavBar />
      <div className="container-fluid my-4">
        <div className="row g-4">
          {/* Panel izquierdo */}
          <div className="col-12 col-md-3">
            <div className="card shadow-lg p-4 sticky-top" style={{ top: "1rem" }}>
              <h5 className="mb-3 text-muted text-center">Panel de Control</h5>

              {/* Selector de tipo de juego */}
              <GameTypeSelector onChange={setGameType} />

              <div className="form-floating mb-3">
                <input
                  type="number"
                  className="form-control form-control-lg"
                  placeholder="Número"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  ref={inputRef}
                />
                <label>Inserte un número</label>
              </div>

              <button className="btn btn-primary w-100 mb-3" onClick={addNumber}>
                Guardar
              </button>
              <button className="btn btn-outline-danger w-100" onClick={deleteAll}>
                Eliminar todos
              </button>

              {/* Último número */}
              {numbers.length > 0 && (
                <div className="mt-4 p-3 bg-warning rounded text-center shadow">
                  <h2 className="fw-bold mb-0">Último número</h2>
                  <h1 className="display-1 fw-bold text-dark">
                    {numbers[numbers.length - 1].Number}
                  </h1>
                </div>
              )}
            </div>
          </div>

          {/* Panel derecho */}
          <div className="col-12 col-md-9">
            {numbers.length === 0 ? (
              <div className="text-center mt-5">
                <p className="fs-3 text-muted">Nada que mostrar</p>
              </div>
            ) : (
              <div className="row row-cols-2 row-cols-md-4 row-cols-lg-6 g-4">
                {numbers
                  .slice()
                  .sort((a, b) => b.Id - a.Id)
                  .map((item) => (
                    <div className="col" key={item.Id}>
                      <div className="card shadow border-0 rounded-4 text-center bg-light">
                        <div className="card-body p-4">
                          <h1 className="fw-bold display-3 text-primary">{item.Number}</h1>
                          <button
                            className="btn btn-sm btn-outline-danger mt-3"
                            onClick={() => deleteById(item.Id)}
                          >
                            Eliminar
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}