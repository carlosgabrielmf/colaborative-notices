import { useEffect, useState } from 'react';
import { useToken } from '../../TokenContext';

const Votes = ({ idNotice, likedByMe, dislikedByMe }) => {
  const [token] = useToken();

  const [refresh, setRefresh] = useState(true);
  const [notice, setNotice] = useState(null);

  const [error, setError] = useState(null);
  const [updateLikes, setUpdateLikes] = useState(true);
  const [updateDislikes, setUpdateDislikes] = useState(false);

  // Mediante esta función obtenemos todas las noticias.
  const getNotices = async () => {
    // Vaciamos el error.
    setError(null);

    // Si hay token nos interesa mandarlo para comprobar las noticias de las que somos dueños.
    const params = token
      ? {
          headers: {
            Authorization: token,
          },
        }
      : {};

    try {
      // Hacemos la petición a la API.
      const res = await fetch(
        `http://localhost:4000/notice/${idNotice}/id`,
        params
      );

      // Obtenemos el objeto.
      const data = await res.json();

      // En caso de error lo notificamos.
      if (data.status === 'error') {
        setError(data.message);
        setNotice(null);
      } else {
        // Si no, actualizamos la variable Notice con las noticias actuales.
        setNotice(data.data.notice[0]);
      }
    } catch (err) {
      setError(err);
    }
  };

  // Función encargada de gestionar los likes y dislikes.
  const handleVote = async (e) => {
    // Obtenemos el div que contiene los botones.
    const div = e.target.closest('.Selection');

    // Seleccionamos los botones cada uno independiente.
    const btnLike = div.querySelector('.Like');
    const btnDislike = div.querySelector('.Dislike');

    // Creamos la variable res que depende del click del usuario se ejecutara una u otra petición a la API.
    let res;
    try {
      // Si el usuario pulso el boton Like, se envian los datos necesario para sumar un Like o en su defecto, quitarlo.
      if (e.target.value === 'true') {
        setUpdateLikes(true);

        e.target.classList.toggle('Active');
        btnDislike.classList.remove('Active');

        // Hacemos la petición a la API y le enviamos los datos necesarios.
        res = await fetch(`http://localhost:4000/notice/${idNotice}/like`, {
          method: 'POST',
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            vote: updateLikes,
          }),
        });
      }
      // Si el usuario pulso el boton Dislike, se envian los datos necesario para sumar un Dislike o en su defecto, quitarlo.
      else if (e.target.value === 'false') {
        setUpdateDislikes(false);

        btnDislike.classList.toggle('Active');
        btnLike.classList.remove('Active');

        // Hacemos la petición a la API y le enviamos los datos necesarios.
        res = await fetch(`http://localhost:4000/notice/${idNotice}/like`, {
          method: 'POST',
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            vote: updateDislikes,
          }),
        });
      }

      // Obtenemos el objeto.
      const data = await res.json();

      // Si el estatus de Data es error, lo notificamos y enviamos un mensaje, en caso contrario, actualizamos.
      if (data.status === 'ok') {
        setRefresh(!refresh);
        getNotices();
      }
    } catch (err) {
      setError(err);
    }
  };

  // Creamos la funcion que se ejecutara al hacer click.
  const handleSubmit = (e) => {
    e.preventDefault();
    // Obtenenmos las noticias.
    getNotices();
  };

  // Funcion quer actualiza los likes y dislikes apenas iniciamos la pagina.
  useEffect(() => {
    getNotices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='Selection' onClick={handleSubmit}>
      {error && <p>{error}</p>}
      <p>
        {notice && notice.likes}
        <button
          className={`Like ${token && likedByMe && 'Active'}`}
          value={true}
          onClick={token && handleVote}
        >
          👍
        </button>
      </p>
      <p>
        {notice && notice.dislikes}
        <button
          className={`Dislike ${token && dislikedByMe && 'Active'}`}
          value={false}
          onClick={token && handleVote}
        >
          👎
        </button>
      </p>
    </div>
  );
};

export default Votes;
