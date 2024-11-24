import logo from './logo.svg';
import './App.css';
//import CompShowAdmin from './Crear Administrador/ShowAdmin.js';
//import CompCreateAdmin from './Crear Administrador/CreateAdmin.js';
//import CompEditAdmin from './Crear Administrador/EditAmin.js';

//rutas
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CompShowProduct from './AdminLavadoras/ShowProduct.js';
import CompCreateProduct from './AdminLavadoras/CreateProduct.js';
import CompEditProduct from './AdminLavadoras/EditProduct.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <BrowserRouter>
        <Routes>
       {/* <Route path='/' element={<CompShowAdmin />}/> 
          <Route path='/create' element={<CompCreateAdmin />}/>        
          <Route path='/edit/:id' element={<CompEditAdmin />}/>   
        
        */  } 
          <Route path='/' element={<CompShowProduct />}/> 
          <Route path='/create' element={<CompCreateProduct />}/>        
          <Route path='/edit/:id' element={<CompEditProduct />}/>         
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
