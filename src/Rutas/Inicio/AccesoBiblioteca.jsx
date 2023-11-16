import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./AccesoBiblioteca.css"

function Acceso_biblioteca() {
    return (
        <section className="contenedor-link-biblioteca">
            <div className="contenido-link">
                <h2>"Visita nuestro respositorio donde <br />encontrarás una gran variedad de<br /> obras que podrás reversar con tan<br /> solo un click."</h2>
                <NavLink to="/biblioteca" className="a">
                    <p>Ir a biblioteca</p>
                </NavLink>
            </div>
        </section>
    );
}

export default Acceso_biblioteca;