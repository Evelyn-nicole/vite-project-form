import React, { useState } from "react";
import PropTypes from "prop-types";


const Form = () => {
  // Estado para almacenar los datos del formulario
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    fechaNacimiento: "",
    direccion: "",
    telefono: "",
  });

  // Estado para almacenar la lista de personas
  const [personas, setPersonas] = useState([]);

  // Maneja los cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Maneja el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    // Crear un objeto persona con los datos del formulario
    const nuevaPersona = {
      nombre: formData.nombre,
      apellido: formData.apellido,
      fechaNacimiento: formData.fechaNacimiento,
      direccion: formData.direccion,
      telefono: formData.telefono,
    };

    // Agregar la nueva persona a la lista de personas
    setPersonas([...personas, nuevaPersona]);

    // Limpiar el formulario después de agregar
    setFormData({
      nombre: "",
      apellido: "",
      fechaNacimiento: "",
      direccion: "",
      telefono: "",
    });
  };

  return (
    <div className="container mt-4">
      <div className="card text-white">
        <div className="card-body">
          <h2 className="text-center mb-4">FORMULARIO</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="nombre" className="form-label">
                Ingresa tu Nombre
              </label>
              <input
                type="text"
                className="form-control"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="apellido" className="form-label">
                Ingresa tu Apellido
              </label>
              <input
                type="text"
                className="form-control"
                id="apellido"
                name="apellido"
                value={formData.apellido}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="fechaNacimiento" className="form-label">
                Ingresa tu Fecha de Nacimiento
              </label>
              <input
                type="date"
                className="form-control"
                id="fechaNacimiento"
                name="fechaNacimiento"
                value={formData.fechaNacimiento}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="direccion" className="form-label">
                Ingresa tu Dirección
              </label>
              <input
                type="text"
                className="form-control"
                id="direccion"
                name="direccion"
                value={formData.direccion}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="telefono" className="form-label">
                Ingresa tu Teléfono
              </label>
              <input
                type="tel"
                className="form-control"
                id="telefono"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Guardar
            </button>
          </form>
        </div>
      </div>

      {/* Mostrar la lista de personas */}
      <div className="card">
        <div className="card-body">
          <h2 className="text-white">LISTA DE PERSONAS</h2>
          <ul className="list-group">
            {personas.map((persona, index) => (
              <li key={index} className="list-group-item">
                <strong>
                  {persona.nombre} {persona.apellido}
                </strong>
                <br />
                Fecha de Nacimiento: {persona.fechaNacimiento}
                <br />
                Dirección: {persona.direccion}
                <br />
                Teléfono: {persona.telefono}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

// Definición de los tipos de las props
Form.propTypes = {
  formData: PropTypes.shape({
    nombre: PropTypes.string.isRequired,
    apellido: PropTypes.string.isRequired,
    fechaNacimiento: PropTypes.string.isRequired,
    direccion: PropTypes.string.isRequired,
    telefono: PropTypes.string.isRequired,
  }),
};

export default Form;