import logo from './logo.svg';
import './App.css';
import CompShowAdmin from './Crear Administrador/ShowAdmin.js';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CompCreateAdmin from './Crear Administrador/CreateAdmin.js';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<CompShowAdmin />}> </Route>
          <Route path='/create' element={<CompCreateAdmin />}>   </Route>       
           
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
