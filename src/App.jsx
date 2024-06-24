// Archivo App, se importan componentes, estilos y bootstrap.
import React from 'react';
import Form from './components/Form';
import './App.css';
import './styles.css'
import 'bootstrap/dist/css/bootstrap.min.css';

// Declaración del componente app y los componentes que se rendizaran
const App = () => {
  return (
    <div>
      <Form />
    </div>
  );
};

export default App;
