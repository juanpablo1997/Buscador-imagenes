/* IMPORTACIÓN DE DEPENDENCIAS */
import React, { useState } from "react";

/* IMPORTACIÓN DE COMPONENTES */
import Error from "./Error";

const Formulario = ({guardarTerminoBusqueda}) => {
  const [termino, guardarTermino] = useState("");
  const [error, guardarError] = useState(false);

  const capturaStingInput = e => {
    guardarTermino(e.target.value);
  }

  const buscarImagenes = e => {
    e.preventDefault();

    /* Validar el input: */
    if (termino.trim() === "") {
        guardarError(true);
        return; 
    } 

    /* Si el campo está validado entonces no muestres
    ningún mensaje de error: */
    guardarError(false);

    /* Luego de la validación pasa el término de búsqueda
    al componente principal App.js: */
    guardarTerminoBusqueda(termino);
  }

  return (
    <form
        onSubmit={buscarImagenes}
        className="mt-5"
    >
      <div className="row">
        <div className="form-group col-md-8">
          <input
            type="text"
            className="form-control form-control-lg input-buscar"
            placeholder="Buscar imagen"
            onChange={capturaStingInput}
          />
        </div>
        <div className="form-group col-md-4">
          <input
            type="submit"
            className="btn btn-lg btn-danger btn-block"
            value="Buscar"
          />
        </div>
      </div>
      {error ? (<Error mensaje={"¡Agrega un término de búsqueda!"}/>): null}
    </form>
  );
};

export default Formulario;
