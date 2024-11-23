import logo from './logo.svg';
import './App.css';
import CompShowAdmin from './Crear Administrador/ShowAdmin.js';
import CompCreateAdmin from './Crear Administrador/CreateAdmin.js';
import CompEditAdmin from './Crear Administrador/EditAmin.js';

//rutas
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<CompShowAdmin />}/> 
          <Route path='/create' element={<CompCreateAdmin />}/>        
          <Route path='/edit/:id' element={<CompEditAdmin />}/>        
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
