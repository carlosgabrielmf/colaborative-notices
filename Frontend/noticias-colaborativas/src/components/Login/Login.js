import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useToken } from '../../TokenContext';

import './Login.css';

const Login = () => {
  const [token, setToken] = useToken();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Si ya estamos logueados redireccionamos a la pagina principal.
  if (token) return <Navigate to='/' />;

  // Función que se ejecutara al dar click en Entrar al Formulario.
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(null);

    // Colocamos Loading en True para que se bloquee el boton y no lo pueda pulsar reitaradas veces.
    setLoading(true);

    try {
      // Hacemos el Fecth para obtener la API y le pasamos el method,headers...
      const res = await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      // Obtenemos el objeto.
      const data = await res.json();

      // Si el status es Error lanzamos un error.
      if (data.status === 'error') {
        setError(data.message);
      } else {
        setToken(data.data.token);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <main className='Login'>
      <form onSubmit={handleSubmit}>
        <div className='InputForm'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className='InputForm'>
          <label htmlFor='pass'>Contraseña</label>
          <input
            type='password'
            name='pass'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button disabled={loading}>Ingresar</button>
      </form>
      {error && <p className='Error'>{error}</p>}
    </main>
  );
};

export default Login;
