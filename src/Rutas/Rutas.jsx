import { Route, Routes, Navigate } from "react-router-dom";
import Barra_navegacion from "../BarraNavegacion/BarraNavegacion";
import Footer from "../Footer/Footer";
import Perfil from "./Perfil/Perfil";
import Inicio from "./Inicio/Inicio";
import Biblioteca from "./Biblioteca/Biblioteca";
import Historial from "./Historial/Historial";

export const Rutas = ({ usuario }) => {
  return (
    <div className="App" style={{ minHeight: "100vh" }}>
      <Barra_navegacion style={{ height: "15%" }}></Barra_navegacion>
      <div style={{ height: "75%" }}>
        {/*Se utiliza el componente Routes de React Router para definir las rutas de la aplicación*/}
        <Routes>
          <Route path="/" element={<Navigate to="/inicio" replace />} />
          <Route path="/inicio" element={<Inicio></Inicio>}></Route>
          <Route
            path="/biblioteca"
            element={<Biblioteca usuario={usuario}></Biblioteca>}
          ></Route>
          <Route
            path="/historial"
            element={<Historial usuario={usuario}></Historial>}
          ></Route>
          <Route
            path="/perfil"
            element={<Perfil usuario={usuario}></Perfil>}
          ></Route>
        </Routes>
      </div>
      <Footer style={{ height: "10%" }} />
    </div>
  );
};
