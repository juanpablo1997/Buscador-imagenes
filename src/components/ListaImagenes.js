/* IMPORTACIÓN DE DEPENDENCIAS */
import React from "react";

/* IMPORTACIÓN DE COMPONENTES */
import Imagen from "./Imagen";

const ListaImagenes = ({imagenes}) => {
    return (
        <div className="col-12 p-5 row">
           {imagenes.map(imagen => (
               <Imagen
                    key={imagen.id}
                    imagen={imagen}
               />
           ))} 
        </div>
    )
}

export default ListaImagenes;
