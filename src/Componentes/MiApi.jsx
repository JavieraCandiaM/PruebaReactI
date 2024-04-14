import React, { useEffect } from 'react';

const MiApi = ({ pesos, monedaSelected, setValorFinal, setDatos }) => {
  const urlBase = 'https://mindicador.cl/api';

  const search = async (moneda) => {
    try {
      const res = await fetch(`${urlBase}/${moneda}`);
      const data = await res.json();

      const valores = data.serie.map((v) => ({
        fecha: formatDate(v.fecha),
        valor: v.valor,
      }));

      setDatos(valores.reverse());

      
      const valorDeLaMoneda = valores[0].valor;

      const valorFinal = (+pesos / valorDeLaMoneda).toFixed(2);
      setValorFinal(valorFinal);
    } catch (error) {
      alert('Error al obtener los datos de la API');
      console.error(error);
    }
  };

  useEffect(() => {
    if (monedaSelected) {
      search(monedaSelected);
    }
  }, [monedaSelected, pesos]);

  const formatDate = (date) => {
    date = new Date(date);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${day}/${month}/${year}`;
  };
};

export default MiApi;