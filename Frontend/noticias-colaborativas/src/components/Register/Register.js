import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useToken } from '../../TokenContext';

import './Register.css';

const Register = () => {
  const [token] = useToken();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [biography, setBiography] = useState('');
  const [selectedFile, setSelectedFile] = useState('');
  const [loading, setLoading] = useState(false);
  const [create, setCreate] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  // Creamos la funcion encargada de obtener la API y datos del Form.
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(null);
    setLoading(true);

    try {
      // Enviamos un body con formato "form/data"  para crear un objeto FormData.
      const formData = new FormData();

      // Pusheamos las propiedades.
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('biography', biography);
      formData.append('image', selectedFile);

      const res = await fetch('http://localhost:4000/users', {
        method: 'POST',
        body: formData,
      });

      // Creamos la variable que obtendra el objeto.
      const data = await res.json();

      // Capturamos el error de estatus, si no, cambiamos el valor de Message.
      if (data.status === 'error') {
        setError(data.message);
        setCreate(false);
      } else {
        setMessage(data.message);
        setCreate(true);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Si ya estamos logueados redireccionamos al inicio.
  if (token) return <Navigate to='/' />;

  return (
    <main className='Register'>
      <form>
        <div className='InputForm'>
          <label htmlFor='name'>
            Nombre (<span>*</span>)
          </label>
          <input
            type='text'
            name='name'
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className='InputForm'>
          <label htmlFor='email'>
            Email (<span>*</span>)
          </label>
          <input
            type='email'
            name='email'
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className='InputForm'>
          <label htmlFor='pass'>
            Contraseña (<span>*</span>)
          </label>
          <input
            type='password'
            name='pass'
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className='InputForm'>
          <label htmlFor='biography'>Biografia</label>
          <input
            type='text'
            name='biography'
            value={biography}
            onChange={(e) => setBiography(e.target.value)}
          />
        </div>

        <div className='DivImageForm'>
          <label htmlFor='image'>Imagen</label>
          <input
            type='file'
            name='image'
            onChange={(e) => setSelectedFile(e.target.files[0])}
          />
        </div>

        <button disabled={loading} onClick={handleSubmit}>
          Unirme
        </button>
      </form>
      {error && <p className='Error'>{error}</p>}
      {message && create && <p className='Success'>{message}</p>}
    </main>
  );
};

export default Register;
