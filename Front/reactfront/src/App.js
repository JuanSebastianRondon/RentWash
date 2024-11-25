import './App.css';
// Importa la nueva imagen
import image from './image.jpg'; // Cambia el nombre según tu archivo

//rutas
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CompShowProduct from './AdminLavadoras/ShowProduct.js';
import CompCreateProduct from './AdminLavadoras/CreateProduct.js';
import CompEditProduct from './AdminLavadoras/EditProduct.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* Usa la nueva imagen aquí */}
        <img src={image} className="App-logo" alt="Logo personalizado" />
      </header>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<CompShowProduct />} />
          <Route path='/create' element={<CompCreateProduct />} />
          <Route path='/edit/:id' element={<CompEditProduct />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
