import { useState } from "react";
import "./App.css";
import appFirebase from "./firebase-config";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Login } from "./Login/Login";
import { Rutas } from "./Rutas/Rutas";

// getAuth = llama a los datos del firebase
const auth = getAuth(appFirebase);

function App() {
  // variable de estado para que el usuario registrado
  const [usuario, setUsuario] = useState(null);

  // onAuthStateChanged = hooks que escucha los cambios de estado de autenticacion de usuario
  // usuariofirebase = parametro que obtiene los datos
  onAuthStateChanged(auth, (usuariofirebase) => {
    if (usuariofirebase) {
      setUsuario(usuariofirebase);
    } else {
      setUsuario(null);
    }
  });

  return (
    <div>
      {usuario ? (
        <Rutas usuario={usuario} />
      ) : (
        <div>
          <Login />
        </div>
      )}
    </div>
  )
}

export default App
