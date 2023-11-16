import React, { useEffect, useState } from "react";
import "./Perfil.css";
import { useForm } from "react-hook-form";
import { collection,updateDoc,doc,addDoc,onSnapshot} from "firebase/firestore";
import {EmailAuthProvider,getAuth,reauthenticateWithCredential,updatePassword} from "firebase/auth";
import appFirebase, { db } from "../../firebase-config";
import { LoaderComponent } from "../../components/loader";

const auth = getAuth(appFirebase);

const Perfil = ({ usuario }) => {

  //gestiona dos secciones del formulario: una para la información personal
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      nombre: "",
      apellido: "",
      dni: "",
      sexo: "mas",
      nacimiento: "",
      celular: "",
      domicilio: "lima",
      direccion: "",
    },
  });


  // actualizacion de contraseña
  const {
    register: registerUser,
    handleSubmit: handleSubmitUser,
    formState: { errors: errorsUser },
    watch: watchUser,
    setValue: setValueUser,
    reset: resetUser,
  } = useForm({
    defaultValues: {
      correo: "",
      contraseñaActual: "",
      contraseñaNueva: "",
    },
  });


  //Se utiliza un efecto para cargar la informacion personal del usuario cuando la prop usuario cambia
  useEffect(() => {
    setIsLoading(true);
    // creo una coleccion users para guardar datos
    const usersRef = collection(db, "users");
    //se declara un objeto vacio que se usara para almacenar los datos del usuario
    let usuarioInfo = {};
    //se utiliza onSnapshot para suscribirse a cambios en la colección users
    //querySnapshot = contiene los documentos actuales en la coleccion
    onSnapshot(usersRef, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // obtiene los datos del documento actual
          const datauser = doc.data();
        if (doc.id == usuario.uid) {
          usuarioInfo = {
            nombre: datauser.nombre || "",
            apellido: datauser.apellido || "",
            dni: datauser.dni || "",
            sexo: datauser.sexo || "mas",
            nacimiento: datauser.nacimiento || "",
            celular: datauser.celular || "",
            domicilio: datauser.domicilio || "lima",
            direccion: datauser.direccion || "",
          };
        }

        // voy a setear el valor de nombre con el del alado
        setValue("nombre", usuarioInfo.nombre);
        setValue("apellido", usuarioInfo.apellido);
        setValue("dni", usuarioInfo.dni);
        setValue("sexo", usuarioInfo.sexo);
        setValue("nacimiento", usuarioInfo.nacimiento);
        setValue("celular", usuarioInfo.celular);
        setValue("domicilio", usuarioInfo.domicilio);
        setValue("direccion", usuarioInfo.direccion);
        setValue("foto", usuarioInfo.foto);
        setIsLoading(false);
      });
    });
  }, [usuario]); //Este efecto se ejecuta cuando cambia la dependencia usuario

  const [infomrationPersonal, setInfomrationPersonal] = useState();

  const onSubmit = handleSubmit((data) => {
    setIsLoading(true);

    const collectionRef = doc(db, "users", usuario.uid);
    const newData = {
      nombre: data.nombre,
      apellido: data.apellido,
      dni: data.dni,
      sexo: data.sexo,
      nacimiento: data.nacimiento,
      celular: data.celular,
      domicilio: data.domicilio,
      direccion: data.direccion,
    };

     // actualiza la coleccion con la data obtenida anteriormente
    updateDoc(collectionRef, newData)
      .then(() => {
        setInfomrationPersonal("Datos actualizados");
        setIsLoading(false);
      })
      .catch(() => {
        setInfomrationPersonal("Los datos no pudieron actualizarse");
        setIsLoading(false);
      });
  });

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState();

  const onSubmitUser = handleSubmitUser((data) => {
    setIsLoading(true);
    //Obtiene el usuario actualmente autenticado desde la instancia de autenticación de Firebase
    const user = auth.currentUser;
    //EmailAuthProvider = funcion de firebase que valida el inicio de sesion 
    const credential = EmailAuthProvider.credential(
      usuario.email,
      data.contraseñaActual
    );

    //reauthenticateWithCredential = reautenticar al usuario con las credenciales proporcionadas
    reauthenticateWithCredential(user, credential)
      .then(() => {
        const newPassword = data.contraseñaNueva;
        //funcion que actualiza la contraseña
        updatePassword(user, newPassword)
          .then(() => {
            setMessage("Contraseña actualizada con éxito");
            console.log("Contraseña actualizada con éxito");
            setIsLoading(false);
          })
          .catch((error) => {
            console.error("Error al actualizar la contraseña:", error);
            setMessage("Error al actualizar la contraseña");
            setIsLoading(false);
          });
      })
      .catch((error) => {
        console.error("Error al reautenticar al usuario:", error);
        setMessage("Error al reautenticar al usuario");
        setIsLoading(false);
      });
  });

  const [showPassword, setShowPassword] = useState(false);  

  return (
    <div>
      {isLoading ? (
        <LoaderComponent />
      ) : (
        <div className="input-perfil-contenedor" style={{ minHeight: "100vh" }}>
          <div className="input-perfil-caja">
            <div className="mi-perfil-titulo">
              <p>Mi perfil</p>
            </div>
            <div className="info-perfil-contenedor" style={{ width: "100%" }}>
              <div style={{ width: "50%" }}>
                <div className="informacion-personal">
                  <p>Información Personal:</p>
                </div>
                <form
                  className="informacion-personal-input"
                  onSubmit={onSubmit}
                >
                  <div>
                    <label>Nombres</label>
                    <input
                      type="text"
                      name="nombre"
                      {...register("nombre", {
                        required: {
                          value: true,
                          message: "Nombre es requerido",
                        },
                        maxLength: 20,
                        minLength: 2,
                      })}
                    />
                  </div>
                  <div className="mensaje-error">
                    {errors.nombre?.type === "required" && (
                      <span>Nombres requerido</span>
                    )}
                    {errors.nombre?.type === "maxLength" && (
                      <span>Nombres no debe ser mayor a 20 caracteres</span>
                    )}
                    {errors.nombre?.type === "minLength" && (
                      <span>Nombres debe ser mayor a 2 caracteres</span>
                    )}
                  </div>
                  <div>
                    <label>Apellidos</label>
                    <input
                      type="text"
                      name="apellido"
                      {...register("apellido", {
                        required: {
                          value: true,
                          message: "Apellido es requerido",
                        },
                        maxLength: 20,
                        minLength: 2,
                      })}
                    />
                  </div>
                  <div className="mensaje-error">
                    {errors.apellido?.type === "required" && (
                      <span>Apellidos requerido</span>
                    )}
                    {errors.apellido?.type === "maxLength" && (
                      <span>Apellidos no debe ser mayor a 20 caracteres</span>
                    )}
                    {errors.apellido?.type === "minLength" && (
                      <span>Apellidos debe ser mayor a 2 caracteres</span>
                    )}
                  </div>
                  <div>
                    <label>Documento de identidad (DNI)</label>
                    <input
                      type="number"
                      name="dni"
                      {...register("dni", {
                        required: {
                          value: true,
                          message: "El DNI es requerido",
                        },
                        pattern: {
                          value: /^[0-9]{8}$/,
                          message: "El DNI debe ser un número de 8 dígitos",
                        },
                      })}
                    />
                  </div>
                  <div className="mensaje-error">
                    {errors.dni?.message && <span>{errors.dni.message}</span>}
                  </div>
                  <div>
                    <label htmlFor="sexo">Sexo</label>
                    <select
                      name="sexo"
                      id="sexo"
                      {...register("sexo", {
                        required: "Selecciona una opción",
                      })}
                    >
                      <option value="mas">Masculino</option>
                      <option value="fem">Femenino</option>
                      <option value="otr">otro</option>
                    </select>
                  </div>
                  <div className="mensaje-error">
                    {errors.sexo?.message && <span>{errors.sexo.message}</span>}
                  </div>
                  <div>
                    <label>Fecha de Nacimiento</label>
                    <input
                      type="date"
                      name="nacimiento"
                      {...register("nacimiento", {
                        required: {
                          value: true,
                          message: "Fecha de nacimiento es requerida",
                        },
                        validate: (value) => {
                          const fechaNacimiento = new Date(value);
                          const fechaActual = new Date();
                          const edad =
                            fechaActual.getFullYear() -
                            fechaNacimiento.getFullYear();
                          return edad >= 18 || "Debes ser mayor de edad";
                        },
                      })}
                    />
                  </div>
                  <div className="mensaje-error">
                    {errors.nacimiento && (
                      <span>{errors.nacimiento.message}</span>
                    )}
                  </div>
                  <div>
                    <label>Celular</label>
                    <input
                      type="number"
                      name="celular"
                      {...register("celular", {
                        required: {
                          value: true,
                          message: "El número de celular es obligatorio",
                        },
                        pattern: {
                          value: /^(\+51)?9\d{8}$/,
                          message:
                            "Ingrese un número de celular válido (debe tener 9 dígitos numéricos)",
                        },
                      })}
                    />
                  </div>
                  <div className="mensaje-error">
                    {errors.celular?.message && (
                      <span>{errors.celular.message}</span>
                    )}
                  </div>
                  <div>
                    <label htmlFor="domicilio">Domicilio </label>
                    <select
                      name="domicilio"
                      id="domicilio"
                      {...register("domicilio", {
                        required: "Selecciona una opción",
                      })}
                    >
                      <option value="ancon">Ancón</option>
                      <option value="ate">Ate</option>
                      <option value="barranco">Barranco</option>
                      <option value="breña">Breña</option>
                      <option value="carabayllo">Carabayllo</option>
                      <option value="chaclacayo">Chaclacayo</option>
                      <option value="chorrillos">Chorrillos</option>
                      <option value="cieneguilla">Cieneguilla</option>
                      <option value="comas">Comas</option>
                      <option value="agustino">El Agustino</option>
                      <option value="independencia">Independencia</option>
                      <option value="jesusmaria">Jesús María</option>
                      <option value="molina">La Molina</option>
                      <option value="victoria">La Victoria</option>
                      <option value="lima">Lima</option>
                      <option value="lince">Lince</option>
                      <option value="olivos">Los Olivos</option>
                      <option value="lurigancho">Lurigancho</option>
                      <option value="lurin">Lurín</option>
                      <option value="magdalena">Magdalena del Mar</option>
                      <option value="miraflores">Miraflores</option>
                      <option value="pachacamac">Pachacamac</option>
                      <option value="pucusana">Pucusana</option>
                      <option value="pueblolibre">Pueblo Libre</option>
                      <option value="puentepiedra">Puente Piedra</option>
                      <option value="puntahermosa">Punta Hermosa</option>
                      <option value="puntanegra">Punta Negra</option>
                      <option value="rimac">Rímac</option>
                      <option value="sanbartolo">San Bartolo</option>
                      <option value="sanborja">San Borja</option>
                      <option value="sanisidro">San Isidro</option>
                      <option value="sanjuanlurigancho">
                        San Juan de Lurigancho
                      </option>
                      <option value="sanjuanmiraflores">
                        San Juan de Miraflores
                      </option>
                      <option value="sanluis">San Luis</option>
                      <option value="sanmartin">San Martín de Porres</option>
                      <option value="sanmiguel">San Miguel</option>
                      <option value="santaanita">Santa Anita</option>
                      <option value="santamaria">Santa María del Mar</option>
                      <option value="santarosa">Santa Rosa</option>
                      <option value="surco">Santiago de Surco</option>
                      <option value="surquillo">Surquillo</option>
                      <option value="salvador">Villa El Salvador</option>
                      <option value="mariatriunfo">
                        Villa María del Triunfo
                      </option>
                    </select>
                  </div>
                  <div className="mensaje-error">
                    {errors.domicilio?.message && (
                      <span>{errors.domicilio.message}</span>
                    )}
                  </div>
                  <div>
                    <label>Dirección</label>
                    <input
                      type="text"
                      name="direccion"
                      {...register("direccion", {
                        required: {
                          value: true,
                          message: "La dirección es obligatoria",
                        },
                        pattern: {
                          value: /^[a-zA-Z0-9\s,.'-]{3,}$/,
                          message: "Ingrese una dirección válida",
                        },
                      })}
                    />
                  </div>
                  <div className="mensaje-error">
                    {errors.direccion?.message && (
                      <span>{errors.direccion.message}</span>
                    )}
                  </div>
                  <div className="mensaje-error">
                    {infomrationPersonal && <span>{infomrationPersonal}</span>}
                  </div>
                  <button type="submit">Registrar datos</button>
                </form>
              </div>
              <div style={{ width: "50%" }}>
                <div className="informacion-usuario">
                  <p>Información de usuario:</p>
                </div>
                <form
                  className="informacion-personal-input"
                  onSubmit={onSubmitUser}
                >
                  <div>
                    <label>Correo Electrónico</label>
                    <input
                      type="text"
                      name="correo"
                      value={usuario.email}
                      disabled
                    />
                  </div>
                  <div className="mensaje-error"></div>

                  <div style={{ width: "100%" }}>
                    <label style={{ width: "50%" }}>Contraseña actual</label>
                    <input style={{ width: "40%" }}
                      type={showPassword ? "text" : "password"}
                      name="contraseñaActual"
                      {...registerUser("contraseñaActual", {
                        required: {
                          value: true,
                          message: "Contraseña es requerida",
                        },
                        minLength: {
                          value: 6,
                          message: "Contraseña debe ser mayor a 6 caracteres",
                        },
                      })}
                    />
                    <div className="chexbox-modificar-contraseña" style={{ width: "10%" }}>
                      <input 
                        className="checkbox-2"
                        type="checkbox"
                        onClick={() => setShowPassword(!showPassword)}
                      />
                    </div>
                  </div>

                  <div className="mensaje-error">
                    {errorsUser.contraseña && (
                      <span>{errorsUser.contraseña.message}</span>
                    )}
                  </div>
                  <div style={{ width: "100%" }}>
                    <label style={{ width: "50%" }}>Contraseña nueva</label>
                    <input style={{ width: "40%" }}
                      type={showPassword ? "text" : "password"}
                      name="contraseñaNueva"
                      {...registerUser("contraseñaNueva", {
                        required: {
                          value: true,
                          message: "Confirmar contraseña es requerida",
                        },
                        minLength: {
                          value: 6,
                          message:
                            "Confirmar contraseña debe ser mayor a 6 caracteres",
                        },
                      })}
                    />
                    <div className="chexbox-modificar-contraseña" style={{ width: "10%" }}>
                      <input
                        className="checkbox-2"
                        type="checkbox"
                        onClick={() => setShowPassword(!showPassword)}
                      />
                    </div>
                  </div>
                  <div className="mensaje-error">
                    {errorsUser.confirmarcontraseña && (
                      <span>{errorsUser.confirmarcontraseña.message}</span>
                    )}
                  </div>
                  <div className="mensaje-error">
                    {message && <span>{message}</span>}
                  </div>
                  <button type="submit">Actualizar contraseña</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Perfil;
