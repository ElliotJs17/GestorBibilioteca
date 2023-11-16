import React, { useEffect, useState } from "react";
import "./FiltradoLista.css";

const Filtrado_lista = ({ data = [], callback }) => {
  const [checkedItems, setCheckedItems] = useState({});
  useEffect(() => {
    //funcion que emite el parametro
    callback(checkedItems);
  }, [checkedItems]);

  const handleChange = (event) => {
    setCheckedItems({
      ...checkedItems,
      //cual es el valor cual esta chequeado
      [event.target.value]: event.target.checked,
    });
  };

  const [newData, setNewData] = useState([]);
  useEffect(() => {
    console.log(data, "data filtrado");
    //elimina los duplicados
    const setDeLabels = new Set(data);
    const arraySinDuplicados = [...setDeLabels];
    setNewData(arraySinDuplicados);
  }, [data]);

  return (
    <div className="filtrado-lista">
      {newData &&
        newData.map((option, index) => (
          <div key={index}>
            <label className="opciones-filtrado">
              <input
                type="checkbox"
                value={option}
                checked={checkedItems[option] || false}
                onChange={handleChange}
              />
              {option}
            </label>
          </div>
        ))}
    </div>
  );
};

export default Filtrado_lista;
