import { NavLink } from 'react-router-dom';
import { useToken } from '../../TokenContext';

import './Header.css';
import IdentityUser from '../IdentityUser/IdentityUser';

const Header = () => {
  const [token, setToken] = useToken();

  // Función para deslogear al usuario.
  const Logout = () => {
    setToken(null);
  };

  return (
    <header>
      <div className='Title'>
        <h1>Bubble</h1>
      </div>

      {!token && <NavLink to='/'>Inicio</NavLink>}
      {token && <IdentityUser />}

      <div className='Buttons'>
        {!token && (
          <div className='BtnSignup'>
            <NavLink to='/users'>Unirse</NavLink>
          </div>
        )}
        {!token && (
          <div className='BtnLogin'>
            <NavLink to='/login'>Ingresar</NavLink>
          </div>
        )}
        {token && (
          <div className='BtnNotice'>
            <NavLink to='/notice'>Nuevo</NavLink>
          </div>
        )}
        {token && (
          <div className='BtnLogout' onClick={() => Logout()}>
            <p>Salir</p>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
