import React from "react";
import { NavLink } from "react-router-dom";
import logo from "./logo.jpg";
import "./BarraNavegacion.css";
import { MdSupportAgent } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { FaBars } from "react-icons/fa";
import { BsDoorClosedFill } from "react-icons/bs";
import { getAuth, signOut } from "firebase/auth";
import appFirebase from "../firebase-config";

const auth = getAuth(appFirebase);

function Barra_navegacion() {
    const logout = () => {
        // signOut = funcion para cerrar sesion 
        signOut(auth);
    };

    return (
        <header>
            <div className="contendor-principal">
                <div className="contenedor principal">
                    <div className="contenedor-soporte">
                        <MdSupportAgent className="logo-soporte" />
                        <div className="info-soporte">
                            <span className="text">Soporte al cliente</span>
                            <span className="number">123-946-9214</span>
                        </div>
                    </div>

                    <NavLink to="/inicio" className="contenedor-logo">
                        <img
                            className="logo-aplicacion"
                            src={logo}
                            alt="Logo de la aplicacion"
                        />
                        <h1 className="logo-titulo">
                            GESTOR DE <br />
                            BIBLIOTECA VIRTUAL
                        </h1>
                    </NavLink>
                    <div className="contenedor-opciones">
                        <NavLink to="/perfil" className="contenedor-usuario">
                            <CgProfile className="logo-usuario" />
                            <p>Perfil</p>
                        </NavLink>
                        <div className="contenedor-cerrar-sesion">
                            <button onClick={logout}>
                                <BsDoorClosedFill className="logo-cerrar-sesion" />
                                <p>Cerrar Sesión</p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="contenedor-navegacion">
                <nav className="navegacion contenedor">
                    <FaBars className="barra-responsive" />
                    <ul className="menu">
                        <li>
                            <NavLink to="/inicio" className="link-item">
                                Inicio
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/biblioteca" className="link-item">
                                Biblioteca
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/historial" className="link-item">
                                Historial
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Barra_navegacion;