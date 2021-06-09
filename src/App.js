/* IMPORTACIÓN DE DEPENDENCIAS */
import React, { useState, useEffect } from "react";
import "./App.css";

/* IMPORTACIÓN DE COMPONENTES */
import Formulario from "./components/Formulario";
import ListaImagenes from "./components/ListaImagenes";

function App() {
  const [terminoBusqueda, guardarTerminoBusqueda] = useState("");
  const [imagenes, guardarImagenes] = useState([]);

  /* Páginador */
  const [paginaactual, guardarPaginaactual] = useState(1);
  const [totalpaginas, guardarTotalpaginas] = useState(1);

  /* Cuando el término de la búsqueda cambie 
  ejecuta este código: */
  useEffect(() => {
    /* Como la primera vez que se recargue la página
    no se ha insertado un término para hacer una 
    consulta a la API entonces no hagas la consulta hasta que terminoBusqueda sea diferente de un String vacío: */
    if (terminoBusqueda === "") return;
    const consultaAPI = async () => {
      const imagenesPorPagina = 16;
      const key = "21498702-4976f815941b7b1bda633d9b5";
      const urlAPI = `https://pixabay.com/api/?key=${key}&q=${terminoBusqueda}&per_page=${imagenesPorPagina}&page=${paginaactual}`;

      const resultadoConsulta = await fetch(urlAPI);
      const imagenes = await resultadoConsulta.json();
      guardarImagenes(imagenes.hits);

      /* Calcular el total de páginas */
      const calcularTotalPaginas = Math.ceil(imagenes.totalHits / 30);
      guardarTotalpaginas(calcularTotalPaginas);

      /* Mueve la pantalla hacia arriba al hacer la consulta */
      const jumbotron = document.querySelector(".jumbotron");
      jumbotron.scrollIntoView({behavior: "smooth"});
    };
    consultaAPI();
  }, [terminoBusqueda, paginaactual]);

  /* Define la página anterior */
  const paginaAnterior = () => {
    const nuevaPgActual = paginaactual - 1;

    /* Si llegas al numero cero para */
    if (nuevaPgActual === 0) {
      return;
    }

    guardarPaginaactual(nuevaPgActual);
  };

  /* Define la página siguiente */
  const paginaSiguiente = () => {
    const nuevaPgActual = paginaactual + 1;

    /* Si llegas hacer mayor que el total de páginas
    entonces para */
    if (nuevaPgActual > totalpaginas) {
      return;
    }

    guardarPaginaactual(nuevaPgActual);
  };

  return (
    <div className="container">
      <div className="jumbotron mt-5">
        <p className="lead text-center">Buscador de imagenes</p>
        <Formulario guardarTerminoBusqueda={guardarTerminoBusqueda} />
      </div>
      <div className="row justify-content-center">
        <ListaImagenes imagenes={imagenes} />

        {/* Botines de paginación */}
        <div className="mb-5">
          {paginaactual === 1 ? null : (
            <button
              type="button"
              className="btn btn-info mr-1"
              onClick={paginaAnterior}
            >
              &laquo; Anterior
            </button>
          )}
          {paginaactual === totalpaginas ? null : (
            <button
              type="button"
              className="btn btn-info mr-1"
              onClick={paginaSiguiente}
            >
              Siguiente &raquo;
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
