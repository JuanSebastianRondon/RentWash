import logo from './logo.svg';
import './App.css';
import CompShowAdmin from './Crear Administrador/ShowAdmin.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
      </header>
      <CompShowAdmin></CompShowAdmin>

    </div>
  );
}

export default App;
