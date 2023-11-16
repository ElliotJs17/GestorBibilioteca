import React, { useEffect, useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import appFirebase from "../firebase-config";
import { IoMailOutline } from "react-icons/io5";
import { RiLockPasswordLine } from "react-icons/ri";
import "./InicioSesion.css";

const auth = getAuth(appFirebase);

export const InicioSesion = () => {
    const [email, setEmail] = useState(""); //estado que almacena el email
    const [password, setPassword] = useState(""); //estado que almacena la contraseña
    const [showPassword, setShowPassword] = useState(false); //estado para controlar la visibilidad de la contraseña
    const [error, setError] = useState(false);  //estado para manejar el estado de carga
    const [loading, setLoading] = useState(false); //estado para manejar los errores

    //funcion asincronica que funciona al hacer click al boton de inicio de sesion
    const login = async () => {
        setLoading(true);
        // signInWithEmailAndPassword = funcion que inicia sesion
        try {
            const data = await signInWithEmailAndPassword(auth, email, password);
            setLoading(false);
        } catch (e) {
            setError(true);
            setLoading(false);
        }
    };

    return (
        <div className="contenedor-formulario-cuenta">
            {loading ? (
                <h2>Cargando.....</h2>
            ) : (
                <div className="info-formulario-cuenta">
                    <h2>Iniciar sesión con una cuenta</h2>
                    <form className="formulario">
                        <label>
                            <i className="icono">
                                <IoMailOutline />
                            </i>
                            <input
                                type="email"
                                placeholder="Correo Electrónico"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                            />
                        </label>

                        <label>
                            <i className="icono">
                                <RiLockPasswordLine />
                            </i>
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Contraseña"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                            />
                            <div>
                                <input className="checkbox" type="checkbox" onClick={() => setShowPassword(!showPassword)} />
                            </div>
                        </label>
                        <button onClick={login}>Iniciar Sesión</button>
                        {error && <div className="mensaje-inicio-sesion">
                            <span> El correo electrónico o contraseña introducida es incorrecta. Intente denuevo.</span>
                        </div>}
                    </form>
                </div>
            )}
        </div>
    );
};