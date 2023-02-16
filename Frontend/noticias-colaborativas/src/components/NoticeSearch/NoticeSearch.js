import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { useToken } from '../../TokenContext';
import { NavLink } from 'react-router-dom';
import Votes from '../Votes/Votes';

import './NoticeSearch.css';

const SearchNotice = () => {
  const [token] = useToken();

  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(true);
  const [notices, setNotices] = useState(null);
  const [error, setError] = useState(null);

  // Mediante esta función obtenemos todas las noticias.
  const getNotices = async () => {
    setLoading(true);

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
        `http://localhost:4000/notice/get?keyword=${keyword}`,
        params
      );
      // Obtenemos el objeto.
      const data = await res.json();

      // En caso de error lo notificamos.
      if (data.status === 'error') {
        setError(data.message);
        setNotices(null);
      } else {
        // Si no, actualizamos la variable Notice con las noticias actuales.
        setNotices(data.data.notices);
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  // Creamos la funcion que se ejecutara al hacer click.
  const handleSubmit = (e) => {
    e.preventDefault();

    // Obtenenmos las noticias.
    getNotices();
  };

  // Función para eliminar Noticia SOLO si es la misma persona que la creo.
  const handleDelete = async (idNotice) => {
    setLoading(true);
    setError(null);
    if (window.confirm('¿Deseas la noticia?')) {
      try {
        const res = await fetch(`http://localhost:4000/notice/${idNotice}`, {
          method: 'DELETE',
          headers: {
            Authorization: token,
          },
        });

        // Obtenemos el objeto.
        const data = await res.json();

        // Si el estatus de Data es error, lo notificamos y enviamos un mensaje, en caso contrario, actualizamos la noticia.
        if (data.status === 'error') {
          setError(data.message);
        } else {
          setRefresh(!refresh);
          getNotices();
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
  };
  // Con este "useEffect" hacemos que se muestren las noticias apenas se cargue la pagina.
  useEffect(() => {
    getNotices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className='NoticeSearch'>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          name='keyword'
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button disabled={loading}>Buscar</button>
      </form>

      {error && <p className='Error'>{error}</p>}

      {notices && (
        <ul className='NoticeList'>
          {notices.map((notice) => {
            const dateTime = format(new Date(notice.createdAt), 'yyyy-MM-dd');

            return (
              <li key={notice.id} data-id={notice.id}>
                <header className='HeaderNotice'>
                  <p>u/{notice.name}</p>
                  <time dateTime={dateTime}>
                    {format(new Date(notice.createdAt), 'hh:mm - dd/MM/yy')}
                  </time>
                </header>
                <div className='BodyNotice'>
                  <div className='UpNotice'>
                    <p>{notice.title}</p>
                    <p>{notice.theme}</p>
                  </div>
                  <div className='DownNotice'>
                    <p>{notice.intro}</p>
                    <p>{notice.text}</p>
                    {notice.image && (
                      <img
                        className='ImagenNotice'
                        src={`http://localhost:4000/${notice.image}`}
                        alt='Imagen del tweet'
                      />
                    )}
                  </div>
                </div>

                <footer>
                  {
                    <Votes
                      idNotice={notice.id}
                      likedByMe={notice.likedByMe}
                      dislikedByMe={notice.dislikedByMe}
                    />
                  }
                  <div>
                    {token && notice.owner === 1 && (
                      <button className='BtnEdit'>
                        <NavLink to={`notice/${notice.id}/edit`}>
                          Editar
                        </NavLink>
                      </button>
                    )}

                    {token && notice.owner === 1 && (
                      <button onClick={() => handleDelete(notice.id)}>
                        Eliminar
                      </button>
                    )}
                  </div>
                </footer>
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
};

export default SearchNotice;
