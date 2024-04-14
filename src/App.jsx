import { useState } from 'react';
import MiApi from './Componentes/MiApi';
import 'bootstrap/dist/css/bootstrap.min.css';
import backgroundImage from './assets/img/fondoprueba.jpg';


function App() {
  const [pesos, setPesos] = useState('');
  const [monedaSelected, setMonedaSelected] = useState('');
  const [valorFinal, setValorFinal] = useState('');
  const [datos, setDatos] = useState([]);
  const [fechaBuscada, setFechaBuscada] = useState('');

  const handlePesosChange = (e) => {
    setPesos(e.target.value);
    if (e.target.value === '') {
      setValorFinal('');
      setMonedaSelected('');
      setFechaBuscada('');
    }
  };

  const handleFechaChange = (e) => {
    setFechaBuscada(e.target.value);
  };

  const filteredDatos = datos.filter(({ fecha }) => fecha.includes(fechaBuscada));

  const sortedDatos = filteredDatos.sort((a, b) => {
    return new Date(a.fecha) - new Date(b.fecha);
  });

  sortedDatos.reverse();

  return (
    <div style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh' }}>
    <div className="container d-flex justify-content-center align-items-center">
      <div className="row">
        <div className="col-md-12">
          <header className="text-center mb-3">
            <h1 class="elemento-escalado" style={{ fontWeight: 'bold' }}>Conversor de Moneda Chilena</h1>
            <hr className="text-info" />
          </header>
          <main>
            <div className="mb-3">
              <h3 style={{ fontWeight: 'bold' }}>Pesos CLP</h3>
              <input
                placeholder="Ingresar el monto en CLP"
                className="form-control"
                value={pesos}
                onChange={handlePesosChange}
              />
            </div>
            <div className="mb-3">
              <h6 style={{ fontWeight: 'bold' }}>Moneda a Convertir</h6>
              <select
                className="form-select"
                value={monedaSelected}
                onChange={(e) => setMonedaSelected(e.target.value)}
                disabled={!pesos}
              >
                <option defaultValue={'selected'}>Seleccione moneda</option>
                <option value="dolar">Dolar</option>
                <option value="uf">UF</option>
              </select>
            </div>
            <div className="mb-3">
              <h6 style={{ fontWeight: 'bold' }}>Buscar por Fecha</h6>
              <input
                type="text"
                placeholder="Ingrese fecha"
                className="form-control"
                value={fechaBuscada}
                onChange={handleFechaChange}
              />
            </div>
          </main>
          
          {pesos !== '' && monedaSelected !== '' && (
            <>
              <MiApi
                pesos={pesos}
                monedaSelected={monedaSelected}
                setValorFinal={setValorFinal}
                setDatos={setDatos}
              />
              <div className="table-responsive">
                <table className="table table-striped table-hover shadow-lg my-5">
                  <thead>
                    <tr>
                      <th>Fecha</th>
                      <th>Valor</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedDatos.map(({ fecha, valor }) => (
                      <tr key={fecha}>
                        <td>{fecha}</td>
                        <td>{valor}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
    </div>
  );
}

export default App;
