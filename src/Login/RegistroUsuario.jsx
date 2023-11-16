import React, { useEffect, useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import appFirebase, { db } from "../firebase-config";
import { IoMailOutline } from "react-icons/io5";
import { RiLockPasswordLine } from "react-icons/ri";
import { collection, doc, setDoc, addDoc } from "firebase/firestore";

import "./RegistroUsuario.css";

const auth = getAuth(appFirebase);

export const RegistroUsuario = () => {
  const [email, setEmail] = useState(""); //estado que almacena el email
  const [password, setPassword] = useState(""); //estado que almacena la contraseña
  const [showPassword, setShowPassword] = useState(false); //estado para controlar la visibilidad de la contraseña
  const [loading, setLoading] = useState(false); //estado para manejar el estado de carga
  const [error, setError] = useState(false); //estado para manejar los errores

  const register = async () => {
    setLoading(true);

    //funcion asincronica que funciona al hacer click al boton de registro
    try {
      console.log(email, password, "datos");
      // createUserWithEmailAndPassword = funcion de firebase que cree un usuario
      const data = await createUserWithEmailAndPassword(auth, email, password);
      const usuariosRef = collection(db, "users");
      // doc = funcion de firebase que agrega una colleccion a users
      const userRef = doc(usuariosRef, data.user.uid);
      //aca agrego los datos
      await setDoc(userRef, {
        id: data.user.uid,
        email: email,
        password: password,
      });

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
          <h2>Crear una cuenta</h2>
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
                <input
                  className="checkbox"
                  type="checkbox"
                  onClick={() => setShowPassword(!showPassword)}
                />
              </div>
            </label>
            <button type="button" onClick={register}>
              Registrarse
            </button>
            {error && (
              <div className="mensaje-registro">
                <span>
                  Error al intentar registrar sus datos. Intente denuevo
                </span>
              </div>
            )}
          </form>
        </div>
      )}
    </div>
  );
};
