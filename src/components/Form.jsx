// Componente Form.
import React, { useState } from "react";
import { format } from "date-fns";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";

// Estado para almacenar y modificar (setFormData) datos del formulario.
const Form = () => {
  const [formData, setFormData] = useState({
    id: "",
    nombre: "",
    apellido: "",
    fechaNacimiento: "",
    direccion: "",
    telefono: "",
  });

  // Estado para almacenar la lista de personas y modificar (setPersonas).
  // Estado para manejar la edicion de personas (setEditIndex).
  const [personas, setPersonas] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  // Maneja cambios en campos del formulario, actualiza FormData.
  // setFormData actualiza datos de formData.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Maneja el envío del formulario, agega nueva persona al estado personas y limpia el formulario
  const handleSubmit = (e) => {
    e.preventDefault();


    // Validación de campos requeridos
    const { nombre, apellido, fechaNacimiento, direccion, telefono } = formData;
    if (!nombre || !apellido || !fechaNacimiento || !direccion || !telefono) {
      Swal.fire("Error", "Todos los campos son obligatorios.", "error");
      return;
    }


    // Si se esta editando una persona existente (editIndex no es null)
    if (editIndex !== null) {
      const updatePersonas = personas.map((persona, index) =>
        index === editIndex ? { ...formData, id: persona.id } : persona
      );
      setPersonas(updatePersonas); // Para actualizar la lista de personas con los datos editados
      setEditIndex(null); // Para resetear el índice de edición a null y salir del editor.
      Swal.fire("Actualizado!", "Datos actualizados con éxito.", "success");
      console.log("Personas actualizadas:", updatePersonas);
    } else {
      const nuevaPersona = { ...formData, id: uuidv4() };
      setPersonas([...personas, nuevaPersona]);
      Swal.fire("Agregado!", "Persona agregada con éxito.", "success");
      console.log("Nueva persona agregada:", nuevaPersona);
    }

    // Limpiar el formulario después de agregar
    setFormData({
      id: "",
      nombre: "",
      apellido: "",
      fechaNacimiento: "",
      direccion: "",
      telefono: "",
    });
  };

  const handleDelete = (index) => {
    const updatePersonas = personas.filter((_, i) => i !== index); // Filtra la lista de personas para eliminar la persona en el índice especificado.
    setPersonas(updatePersonas); // Actualiza el estado de personas con la lista filtrada.
    Swal.fire("Eliminado!", "La persona ha sido eliminada.", "success");
    console.log(
      "Persona eliminada. Lista actualizada de personas:",
      updatePersonas
    );
  };

  const handleEdit = (index) => {
    setFormData(personas[index]); // Carga los datos de la persona seleccionada en el formulario.
    setEditIndex(index); // Establece el índice de edición al índice de la persona seleccionada.
    console.log(
      "Persona que se va a editar:",
      index,
      "Datos:",
      personas[index]
    );
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  // Renderizado del formulario
  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md">
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
                    /* Manejador onChange, actualiza el estado de formData */
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
                  {editIndex !== null ? "Actualizar" : "Guardar"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Mostrar la lista de personas */}
      <div className="row justify-content-center">
        <div className="col-md">
          <div className="card">
            <div className="card-body">
              <h2 className="text-white">LISTA DE PERSONAS</h2>
              <ul className="list-group">
                {personas.map((persona, index) => (
                  <li key={persona.id} className="list-group-item">
                    <strong>
                    {capitalizeFirstLetter(persona.nombre)} {capitalizeFirstLetter(persona.apellido)}
                    </strong>
                    <br />
                    Teléfono: {persona.telefono}
                    <br />
                    Dirección: {capitalizeFirstLetter(persona.direccion)}
                    <br />
                    Fecha de Nacimiento:{" "}
                    {format(new Date(persona.fechaNacimiento), "dd-MM-yyyy")}
                    <br />
                    <button
                      className="btn btn-danger btn-sm me-2"
                      onClick={() => handleDelete(index)}
                    >
                      Eliminar
                    </button>
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => handleEdit(index)}
                    >
                      Editar
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
