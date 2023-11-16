import React, { useEffect, useState, useRef, useCallback } from "react";
import { getAuth, signOut } from "firebase/auth";
import {
  getFirestore,
  collection,
  onSnapshot,
  addDoc,
} from "firebase/firestore";
import appFirebase, { db } from "../../firebase-config";
import Filtrado_lista from "./FiltradoLista";
import "./Biblioteca.css";
import { LoaderComponent } from "../../components/loader";

const auth = getAuth(appFirebase);

function Biblioteca({ usuario }) {
  const [valueinput, setValueInput] = useState("");
  const [error, setError] = useState(null);
  const isFirstInput = useRef(true);

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = isFirstInput === "";
      return;
    }

    if (valueinput === "") {
      setError("No se puede buscar una obra vacía");
      return;
    }

    if (valueinput.match(/^\d+$/)) {
      setError("No se puede buscar una obra con un número");
      return;
    }

    if (valueinput.length < 3) {
      setError("La búsqueda debe tener al menos 3 caracteres");
      return;
    }

    setError(null);
  }, [valueinput]);

  const [libros, setLibros] = useState([]);
  const [librosFilter, setLibrosFilter] = useState([]);
  const [autor, setAutor] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [isLoadingBook, setIsloadingBook] = useState(false);
  const [isLoadingReserva, setIsloadingReserva] = useState(false);

//obtiene todos los libros de la base de datos
  const getLibros = async () => {
    const productosRef = collection(db, "libros");
    setIsloadingBook(true);
    // trae la data de la coleccion
    onSnapshot(productosRef, (querySnapshot) => {
      const librosData = [];
      //mapea la base de datos para traer los libros
      querySnapshot.forEach((doc) => {
        librosData.push({ id: doc.id, ...doc.data() });
      });
      setLibros(librosData);
      setLibrosFilter(librosData);
      const autorFilter = [];
      //mapea la base de datos para filtrar
      librosData.map((item) => {
        autorFilter.push(item.autor);
      });
      console.log(autorFilter, "autorFilter");
      setAutor(autorFilter);
      console.log(librosData, "librosData");
      setIsloadingBook(false);
    });
  };

  useEffect(() => {
    getLibros();
  }, []);

  const searchBook = () => {
    if (valueinput != "") {
      console.log(libros, "===");

      const data = libros.filter((item) => {
        const titulo = item.titulo.toLowerCase();
        const autor = item.autor.toLowerCase();
        const genero = item.genero.toLowerCase();

        const valorInput = valueinput.toLowerCase();

        return (
          titulo.includes(valorInput) ||
          autor.includes(valorInput) ||
          genero.includes(valorInput)
        );
      });
      console.log(data, "===");
      setLibrosFilter(data);
    } else {
      setLibrosFilter(libros);
    }
  };

  useEffect(() => {
    searchBook();
  }, [valueinput]);

  const filtrarPorAutor = (autores, arrayDeObjetos) => {
    const objetosFiltrados = arrayDeObjetos.filter((objeto) =>
      autores.includes(objeto.autor)
    );
    return objetosFiltrados;
  };

  const [message, setMessage] = useState();

  const registrarPedido = async () => {
    setIsloadingReserva(true);
    const pedidosRef = collection(db, "pedidos");
    const fechaActual = new Date();
    fechaActual.setDate(fechaActual.getDate() + 30);

    const docRef = await addDoc(pedidosRef, {
      idUsuario: usuario.uid,
      idLibros: carrito,
      pedido: true,
      entregado: false,
      fecha: (new Date()).toLocaleString("es-ES"),
      fechaVencimiento: fechaActual.toLocaleString("es-ES"),
    });

    setIsloadingReserva(false);
    setMessage("LIBROS RESERVADOS EXITOSAMENTE");
    setCarrito([]);
    console.log(docRef, "docRef ");
  };

  return (
    <div style={{ width: "100%" }}>
      <div className="buscador-contenedor">
        <h2 className="buscador-titulo">Encuentre la obra de su elección</h2>
        <br />
        <p className="buscador-texto">
          "Encuentra tu próxima lectura: busca entre una amplia variedad de
          libros por título, autor o palabra clave. ¡Explora nuestro catálogo y
          descubre tus próximas aventuras literarias!"
        </p>
        <form
          className="formulario-buscador"
          onSubmit={(e) => {
            e.preventDefault();
            // searchBook()
          }}
        >
          <input
            type="text"
            placeholder="Escriba aqui ..."
            value={valueinput}
            onChange={(e) => {
              setValueInput(e.target.value);
            }}
          />
          <button type="submit">Buscar</button>
        </form>
        {error && <p className="error">{error}</p>}
      </div>
      <div className="contenido-contenedor" style={{ width: "100%" }}>
        <div style={{ width: "70%", display: "flex" }}>
          {isLoadingBook ? (
            <LoaderComponent />
          ) : (
            <>
              {" "}
              <div className="filtros-contenedor" style={{ width: "30%" }}>
                <h2 className="titulo-carrito">Filtros de búsqueda:</h2>
                <div className="color-contenedor">
                  <h2 className="filtro-autor">Autor</h2>
                  <div className="opciones-autor">
                    <Filtrado_lista
                      data={autor}
                      callback={(e) => {
                        const data = Object.keys(e).filter((key) => e[key]);
                        if (data.length > 0) {
                          setLibrosFilter(filtrarPorAutor(data, libros));
                        } else {
                          setLibrosFilter(libros);
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
              <div
                className="todos-los-libros-contenedor"
                style={{ width: "70%" }}
              >
                <h2 className="titulo-carrito">Obras disponibles:</h2>
                <div className="libros-informacion-contenedor">
                  {librosFilter.map((item) => {
                    return (
                      <div className="libros-informacion">
                        <p className="titulo-obra">{item.titulo}</p>
                        <img className="portada-libros" src={item.imagen} />
                        <div>
                          <p className="titulo-autor">
                            <span>1. Autor: </span>
                            {item.autor}
                          </p>
                          <p className="titulo-genero">
                            <span>2. Género: </span>
                            {item.genero}
                          </p>
                          <p className="titulo-publicacion">
                            <span>3. Publicación: </span>
                            {item.publicacion}
                          </p>
                        </div>
                        <button
                          className="boton-agregar-libro"
                          onClick={() => {
                            const data = [...carrito];
                            if (!data.some((objeto) => objeto.id === item.id)) {
                              setCarrito([...data, item]);
                            }
                          }}
                        >
                          Agregar libro
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>

        <div className="carrito-contenedor" style={{ width: "30%" }}>
          {isLoadingReserva ? (
            <LoaderComponent />
          ) : (
            <div className="caja-carrito-contenedor">
              <h2 className="titulo-carrito">Carrito de reserva:</h2>
              <div className="libros-reservados-contenedor">
                {carrito.map((item) => {
                  return (
                    <div className="libros-reservados">
                      <div
                        className="portada-libros-reservado"
                        style={{ width: "50%" }}
                      >
                        <img src={item.imagen} />
                      </div>
                      <div
                        className="info-libros-reservados"
                        style={{ width: "50%" }}
                      >
                        <h2 className="portada-titulo-reservado">
                          {item.titulo}
                        </h2>
                        <h2 className="portada-autor-reservado">
                          <span>
                            Autor: <br />
                          </span>
                          {item.autor}
                        </h2>
                        <h2 className="portada-genero-reservado">
                          <span>
                            Género: <br />{" "}
                          </span>{" "}
                          {item.genero}
                        </h2>
                        <h2 className="portada-publicacion-reservado">
                          {" "}
                          <span>
                            Publicación: <br />{" "}
                          </span>
                          {item.publicacion}
                        </h2>
                        <h2 className="portada-id-reservado">
                          <span>
                            Id producto: <br />{" "}
                          </span>{" "}
                          {item.id}
                        </h2>
                      </div>
                    </div>
                  );
                })}
              </div>           
              <h2 className="titulo-carrito">Resumen de la reverva:</h2>
              <div className="boton-reservar-contenedor">
                <span>
                  Al momento de reservar los libros, se contará 30 días de la
                  fecha actual.
                </span>
                <button onClick={registrarPedido}>Reservar libros</button>
                <h6 className="mensaje-reservado">{message}</h6>  
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Biblioteca;
