import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useToken } from '../../TokenContext';

import './NoticeCreate.css';

const NoticeCreate = () => {
  const [token] = useToken();

  const [title, setTitle] = useState('');
  const [intro, setIntro] = useState('');
  const [text, setText] = useState('');
  const [theme, setTheme] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(null);
    setLoading(true);

    try {
      // Evaluamos que el usuario no quiera insertar puros espacios en blancos en campos requeridos.
      if (title[0] === ' ' || text[0] === ' ' || theme[0] === ' ') {
        window.alert(
          'Cualquier campo obligatorio debe empezar con alguna Letra.'
        );
      } else {
        // Si queremos enviar un body con formato "form/data" es necesario
        // crear un objeto de tipo FormData y "pushear" los elementos.
        const formData = new FormData();

        // Pusheamos las propiedades con append.
        formData.append('title', title);
        formData.append('intro', intro);
        formData.append('text', text);
        formData.append('theme', theme);
        formData.append('image', selectedFile);

        // Hacemos la petición a la API mediante el Fecth y pasamos la cabecera de Authorization y el Body.
        const res = await fetch('http://localhost:4000/notice', {
          method: 'POST',
          headers: {
            Authorization: token,
          },
          body: formData,
        });
        // Obtenemos el objeto.
        const data = await res.json();

        if (data.status === 'error') {
          setError(data.message);
        } else {
          setSuccess(true);
        }
      }
    } catch (error) {
      setError(error.massage);
    } finally {
      setLoading(false);
    }
  };

  // Si no tenemos el token o el success rediraccionamos a la pagina principal.
  if (!token || success) return <Navigate to='/' />;

  return (
    <main className='NoticeCreate'>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='title'>
            Titulo (<span>*</span>)
          </label>
          <input
            type='text'
            name='title'
            required
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
          <label htmlFor='text'>
            Texto (<span>*</span>)
          </label>
          <input
            type='text'
            name='text'
            required
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor='theme'>
            Tema (<span>*</span>)
          </label>
          <input
            type='text'
            name='theme'
            required
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
          />
        </div>

        <div className='DivImagenCreate'>
          <label htmlFor='image'>Imagen</label>
          <input
            type='file'
            name='image'
            onChange={(e) => setSelectedFile(e.target.files[0])}
          />
        </div>
        <button disabled={loading}>Publicar</button>
      </form>
      {error && <p className='Error'>{error}</p>}
    </main>
  );
};

export default NoticeCreate;
