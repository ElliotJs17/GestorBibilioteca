import React, { useState } from "react";
import { InicioSesion } from "./InicioSesion";
import { RegistroUsuario } from "./RegistroUsuario";
import "./Login.css"

export const Login = () => {
    //estado para mostrar el inicio de sesion o el registro de datos
    const [showLogin, setShowLogin] = useState(true);
    return (
        <div className="contenedor-total">
            <div className="contenedor-login">
                <div className="contenedor-bienvenido">
                    <div className="info-bienvenido">
                        <h2>Bienvenido</h2>
                        <p>Descubre una experiencia única al unirte a nuestra comunidad. Regístrate para acceder a nuestra página web. Si ya eres parte de nosotros, inicia sesión para continuar disfrutando de todo lo que tenemos para ofrecer.</p>
                        <button
                            onClick={() => {
                                setShowLogin(false);
                            }}
                        >
                            Registrarse
                        </button>
                        <button
                            onClick={() => {
                                setShowLogin(true);
                            }}
                        >
                            Iniciar Sesión
                        </button>
                    </div>

                </div>
                <div className="contenedor-formulario-cuenta">{showLogin ? <InicioSesion /> : <RegistroUsuario />}</div>
            </div>
        </div>
    );
};