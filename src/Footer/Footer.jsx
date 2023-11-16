import React from "react";
import { NavLink } from "react-router-dom";
import "./Footer.css"

function Footer() {

    return (
        <footer className="footer">
            <div className="contenedor contenedor-footer">
                <div className="menu-footer">
                    <div className="integrantes">
                        <p className="titulo-footer">Integrantes:</p>
                        <ul>
                            <li>Tataje Guzman, Kenner Alison</li>
                            <li>Rojas Rojas, Darwin Jostein</li>
                            <li>Mallco Laurente, Frans Andre</li>
                            <li>Ramirez Patiño, Fabrizio Gabriel</li>
                        </ul>
                    </div>
                    <div className="email-contacto">
                        <p className="titulo-footer">Correo de contacto:</p>
                        <ul>
                            <li>kenner.tataje@unmsm.edu.pe</li>
                            <li>darwin.rojas@unmsm.edu.pe</li>
                            <li>frans.mallco@unmsm.edu.pe</li>
                            <li>fabrizio.ramirez@unmsm.edu.pe</li>
                        </ul>
                    </div>
                    <div className="celular">
                        <p className="titulo-footer">Número de contacto:</p>
                        <ul>
                            <li>+51 921 893 521</li>
                            <li>+51 962 749 668 </li>
                            <li>+51 935 701 378</li>
                            <li>+51 965 061 737</li>
                        </ul>
                    </div>
                    <div className="barra-navegacion">
                        <p className="titulo-footer">Dirigirse a:</p>
                        <ul>
                            <li><NavLink to='/inicio' className="link-item">Inicio</NavLink></li>
                            <li><NavLink to='/biblioteca' className="link-item">Biblioteca</NavLink></li>
                            <li><NavLink to='/historial' className="link-item">Historial</NavLink></li>
                            <li><NavLink to='/perfil' className="link-item">Perfil</NavLink></li>
                        </ul>
                    </div>
                </div>
                <div className="copyright">
                    <p>
                        &copy; 2023 Desarrollado por Squad Coders. Todos los derechos reservados.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;