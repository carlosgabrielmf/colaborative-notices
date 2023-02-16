import { useEffect, useState } from 'react';
import { useToken } from '../../TokenContext';
import { useParams } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

import './EditNotice.css';

const EditNotice = () => {
  const { idNotice } = useParams();
  const [token] = useToken();

  const [title, setTitle] = useState('');
  const [intro, setIntro] = useState('');
  const [text, setText] = useState('');
  const [theme, setTheme] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [image, setImage] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [sucess, setSucess] = useState(false);
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  // Obtenemos la noticia para mostrar los campos con sus datos.
  const getNotice = async () => {
    setRefresh(false);
    try {
      // Hacemos la petición a la API.
      const res = await fetch(`http://localhost:4000/notice/${idNotice}/id`);

      // Obtenemos el objeto.
      const data = await res.json();

      // En caso de error lo notificamos.
      if (data.status === 'error') {
        setError(data.message);
      } else {
        // Si no, actualizamos la variable Notice con las noticias actuales.
        setImage(data.data.notice[0].image);
        setTitle(data.data.notice[0].title);
        setIntro(data.data.notice[0].intro);
        setText(data.data.notice[0].text);
        setTheme(data.data.notice[0].theme);
        setRefresh(!refresh);
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getNotice();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEdit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    //Colocamos el try para hacer el fetch y la petición Put.
    try {
      // Si queremos enviar un body con formato "form/data" es necesario
      // crear un objeto de tipo FormData y "pushear" los elementos.

      if (
        title[0] === ' ' ||
        intro[0] === ' ' ||
        text[0] === ' ' ||
        theme === ' '
      ) {
        window.alert('No se permiten solo espacios en blanco.');
      } else {
        const formData = new FormData();

        // Pusheamos las propiedades con append.
        formData.append('title', title);
        formData.append('intro', intro);
        formData.append('text', text);
        formData.append('theme', theme);
        formData.append('image', selectedFile);

        const res = await fetch(
          `http://localhost:4000/notice/${idNotice}/edit`,
          {
            method: 'PUT',
            headers: {
              Authorization: token,
            },
            body: formData,
          }
        );

        // Obtenemos el objeto.
        const data = await res.json();

        // Si el estatus de Data es error, lo notificamos y enviamos un mensaje, en caso contrario, redirigimos al inicio.
        if (data.status === 'error') {
          setError(data.message);
        } else {
          setSucess(true);
        }
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Si se creo satisfactoriamente redirigimos al inicio.
  if (sucess) return <Navigate to='/' />;

  return (
    <main className='NoticeEdit'>
      <form onSubmit={handleEdit}>
        <div>
          <label htmlFor='title'>Titulo</label>
          <input
            type='text'
            name='title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor='intro'>Intro</label>
          <input
            type='text'
            name='intro'
            value={intro}
            onChange={(e) => setIntro(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor='text'>Texto</label>
          <input
            type='text'
            name='text'
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor='theme'>Tema</label>
          <input
            type='text'
            name='theme'
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
          />
        </div>

        <div className='DivImageEdit'>
          {image && (
            <img
              src={`http://localhost:4000/${image}`}
              alt={'Imagen de la noticia'}
            />
          )}
          <input
            type='file'
            name='image'
            onChange={(e) => setSelectedFile(e.target.files[0])}
          />
        </div>
        <button disabled={loading}>Editar</button>
      </form>
      {error && <p className='Error'>{error}</p>}
    </main>
  );
};

export default EditNotice;
