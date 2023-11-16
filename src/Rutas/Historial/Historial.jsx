import { useEffect, useState } from "react";
import { db } from "../../firebase-config";
import { collection, onSnapshot } from "firebase/firestore";
import { LoaderComponent } from "../../components/loader";
import "./Historial.css";

const Historial = ({ usuario }) => {
  const [isLoadingHistorial, setIsloadingHistorial] = useState(false);
  const [history, setHistory] = useState([]);
  const getHistorial = async () => {
    const historialRef = collection(db, "pedidos");
    setIsloadingHistorial(true);
    onSnapshot(historialRef, (querySnapshot) => {
      let historial = [];
      querySnapshot.forEach((doc) => {
        if (usuario.uid == doc.data().idUsuario) {
          historial.push({ id: doc.id, ...doc.data() });
        }
      });

      setHistory(historial);
      console.log(historial, "historial");
      setIsloadingHistorial(false);
    });
  };

  useEffect(() => {
    getHistorial();
  }, []);

  return (
    <div className="contenedor-historial">
      {isLoadingHistorial ? (
        <LoaderComponent />
      ) : (
        <div className="contenedor-historial-informacion">
          <div className="titulo-historial">
            <p> Historial</p>
          </div>
          <div className="contenido-info-historial">
            {history.map((item) => {
              return (
                <div className="contenido-historial">
                  <div className="reserva-titulo">
                    <h2>Detalle de la reserva</h2>
                    <div className="fecha-reversa-titulo">
                      <h3>Fecha de reserva : {item.fecha}</h3>
                    </div>
                  </div>
                  <div className="libros-reservados-historial">
                    <div className="libro-pedido-fecha-devolucion">
                      <h4>
                        Id de Reserva: <span>{item.id}</span>{" "}
                      </h4>
                      <h4>
                        Fecha de devolución :{" "}
                        <span>{item.fechaVencimiento}</span>
                      </h4>
                    </div>
                    <div className="portada-obra-reservada">
                      {item.idLibros.map((itemLibro) => {
                        return (
                          <div className="obra-historial-info">
                            <img src={itemLibro.imagen} />
                            <div>
                              <h5>
                                {" "}
                                <span>Título:</span> {itemLibro.titulo}
                              </h5>
                              <h5>
                                <span>Autor:</span> {itemLibro.autor}
                              </h5>
                              <h5>
                                <span>Género:</span> {itemLibro.genero}
                              </h5>
                              <h5>
                                <span>Publicación:</span> {itemLibro.publicacion}
                              </h5>
                              <h5><span>Descripción:</span> {itemLibro.descripcion}</h5>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="estado-devolucion">
                    <span>
                      <span>Estado: </span>
                      {item.entregado
                        ? "Libros devueltos dentro del tiempo estimado"
                        : "Libros reservados"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Historial;
