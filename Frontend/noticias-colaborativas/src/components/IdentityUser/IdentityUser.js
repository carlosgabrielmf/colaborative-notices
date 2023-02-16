import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useToken } from '../../TokenContext';

import './IdentityUser.css';

const IdentityUser = () => {
  const [token] = useToken();

  const [username, setUsername] = useState();
  const [image, setImage] = useState();

  const userData = async () => {
    try {
      const res = await fetch('http://localhost:4000/users/profile', {
        headers: {
          Authorization: token,
        },
      });

      // Obtenemos el objeto.
      const data = await res.json();

      if (data.status === 'ok') {
        setUsername(data.data.user[0].name);
        setImage(data.data.user[0].image);
      }
    } catch (error) {
      console.error(error);
    }
  };

  userData();

  return (
    <div className='Identity'>
      {image && (
        <img
          className='ImagenIdentity'
          src={`http://localhost:4000/${image}`}
          alt={`Imagen perfil de ${username}`}
        />
      )}

      <NavLink to='/'>u/{username}</NavLink>
    </div>
  );
};

export default IdentityUser;
